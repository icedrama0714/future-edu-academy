function jsonResponse(res, statusCode, body) {
  res.statusCode = statusCode;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
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

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return jsonResponse(res, 405, { error: "method_not_allowed" });
  }

  const payload = typeof req.body === "string" ? JSON.parse(req.body || "{}") : req.body || {};
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return jsonResponse(res, 200, { report: safeText(payload.baseDraft), fallback: true });
  }

  const prompt = [
    "미래엔 에듀 영수학원의 학부모 발송용 학습리포트 초안을 작성해주세요.",
    "저장된 학습기록에 있는 사실만 사용하고, 없는 내용은 단정하지 마세요.",
    "톤은 따뜻하고 전문적으로, 과장은 줄이고 실제 수업 관리에 도움이 되게 작성해주세요.",
    "형식은 제목 1줄, 기간/수강 과목, [학습 요약], [칭찬할 점], [보완할 점], [다음 학습 방향] 순서로 작성해주세요.",
    "학부모님께 바로 보낼 수 있도록 한국어로만 작성해주세요.",
    "",
    JSON.stringify(payload, null, 2),
  ].join("\n");

  try {
    const openaiResponse = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || "gpt-4.1-mini",
        input: prompt,
        max_output_tokens: 900,
      }),
    });

    if (!openaiResponse.ok) {
      return jsonResponse(res, 200, { report: safeText(payload.baseDraft), fallback: true });
    }

    const data = await openaiResponse.json();
    const report = extractResponseText(data) || safeText(payload.baseDraft);
    return jsonResponse(res, 200, { report });
  } catch (error) {
    return jsonResponse(res, 200, { report: safeText(payload.baseDraft), fallback: true });
  }
};
