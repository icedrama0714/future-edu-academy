function jsonResponse(res, statusCode, body) {
  res.statusCode = statusCode;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", "no-store");
  res.end(JSON.stringify(body));
}

function extractResponseText(data) {
  if (typeof data?.output_text === "string") return data.output_text.trim();
  const parts = [];
  for (const item of data?.output || []) {
    for (const content of item.content || []) {
      if (typeof content.text === "string") parts.push(content.text);
    }
  }
  return parts.join("\n").trim();
}

function safeText(value, limit = 6000) {
  return String(value || "").slice(0, limit);
}

const REPORT_INSTRUCTIONS = `
역할: 당신은 미래엔 에듀 영수학원의 학부모용 학습보고서를 작성하는 교육 전문가입니다.

학원 정보:
- 대상은 유치부부터 중학교 3학년입니다.
- 과목은 한글, 연산, 수학, 영어, 독서논술, 국어, 사회, 과학, 한국사, 세계사입니다.
- 가장 중요한 교육목표는 학생의 자기주도학습 역량 향상입니다.

목표:
- 제공된 학습기록만으로 카카오톡이나 문자에 바로 사용할 수 있는 보고서를 작성합니다.
- 첫 줄에는 "학생명 학년 보고서 종류"를 씁니다.
- 이후에는 2~3개의 짧은 문단으로 작성하며 전체 길이는 200~300자로 맞춥니다.
- 성장 요약, 학습내용, 성장한 점, 성취도, 학습 태도, 연습할 점, 다음 목표, 선생님 코멘트를 짧게 연결합니다.

보고서 종류별 초점:
- 월간 학습보고서: 해당 월의 학습 흐름과 다음 달 목표
- 상담용 보고서: 현재 학습상태, 강점, 보완방법
- 시험 결과보고서: 입력된 시험결과와 오답관리 방향
- 학기말 종합보고서: 학기 동안의 성장과 다음 학기 목표

평가기준:
- 공통: 자기주도성, 수업 참여도, 과제 수행, 학습 태도, 출석
- 수학: 개념 이해, 계산 정확도, 문제해결력, 응용력, 오답관리
- 영어: 어휘, 문법, 읽기, 듣기, 말하기, 쓰기
- 독서논술·국어: 중심문장 찾기, 핵심어휘 이해, 내용 이해, 근거 찾기, 요약하기, 글의 구성, 자기 생각 표현하기
- 사회·과학·한국사·세계사: 학습목표 이해 및 설명, 핵심개념 이해, 주요 용어 이해, 자료 해석, 원인과 결과 파악, 내용 연결, 서술형 표현
- 유치부 한글·연산: 한글 읽기, 한글 쓰기, 어휘 이해, 수 개념, 계산 정확도, 규칙 찾기, 집중력

문체:
- 따뜻하고 친근하면서 전문적이고 신뢰감 있게 씁니다.
- 칭찬과 격려를 중심으로 쉬운 한글을 사용합니다.
- 학생의 약한 부분은 학생의 기록에서 확인되는 강점을 활용해 보완할 수 있는 구체적인 방법과 함께 설명합니다.

반드시 지킬 원칙:
- 입력되지 않은 성적, 행동, 성향, 시험결과를 추측하거나 만들지 않습니다.
- 다른 학생과 비교하거나 질책하고 낙인찍는 표현을 쓰지 않습니다.
- 확인되지 않은 진단이나 성향을 단정하지 않습니다.
- 제공되지 않은 정보는 자연스럽게 생략합니다.
- 동일한 상투적 문장을 반복하지 않습니다.
- 어려운 전문용어와 불필요한 개인정보를 추가하지 않습니다.
- 보고서 본문만 출력하고 작성 과정, 설명, 마크다운 코드블록은 출력하지 않습니다.
`.trim();

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return jsonResponse(res, 405, { error: "method_not_allowed" });
  }

  let payload = {};
  try {
    payload = typeof req.body === "string" ? JSON.parse(req.body || "{}") : req.body || {};
  } catch (error) {
    return jsonResponse(res, 200, { report: "", fallback: true });
  }
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return jsonResponse(res, 200, { report: safeText(payload.baseDraft), fallback: true });
  }

  try {
    const openaiResponse = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || "gpt-4.1-mini",
        instructions: REPORT_INSTRUCTIONS,
        input: `다음 학습기록으로 보고서를 작성하세요.\n${JSON.stringify(payload, null, 2)}`,
        max_output_tokens: 500,
        store: false,
      }),
    });

    if (!openaiResponse.ok) {
      let errorCode = `http_${openaiResponse.status}`;
      try {
        const errorData = await openaiResponse.json();
        errorCode = errorData?.error?.code || errorData?.error?.type || errorCode;
      } catch (error) {
        // The status code is enough for the private server log.
      }
      console.warn("Learning report AI fallback", { status: openaiResponse.status, code: errorCode });
      return jsonResponse(res, 200, { report: safeText(payload.baseDraft), fallback: true });
    }

    const data = await openaiResponse.json();
    const report = extractResponseText(data) || safeText(payload.baseDraft);
    return jsonResponse(res, 200, { report });
  } catch (error) {
    console.warn("Learning report AI fallback", { code: error?.name || "request_failed" });
    return jsonResponse(res, 200, { report: safeText(payload.baseDraft), fallback: true });
  }
};
