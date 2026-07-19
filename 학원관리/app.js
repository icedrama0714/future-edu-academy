const STORAGE_KEY = "literacy_academy_students_v1";
const PAYMENT_RECORDS_KEY = "literacy_academy_payment_records_v1";
const NOTICE_STORAGE_KEY = "literacy_academy_notices_v1";
const FINANCE_RECORDS_KEY = "literacy_academy_finance_records_v1";
const FIXED_EXPENSE_TEMPLATES_KEY = "literacy_academy_fixed_expense_templates_v1";
const TUITION_RATES_KEY = "literacy_academy_tuition_rates_v1";
const BOOK_FEE_RATES_KEY = "literacy_academy_book_fee_rates_v1";
const BOOK_FEE_RATES_SEED_KEY = "literacy_academy_book_fee_rates_seed_v1";
const BOOK_CATALOG_KEY = "literacy_academy_book_catalog_v1";
const BOOK_STOCK_RECORDS_KEY = "literacy_academy_book_stock_records_v1";
const CHANGE_LOG_KEY = "literacy_academy_change_logs_v1";
const USER_ACCOUNTS_KEY = "literacy_academy_user_accounts_v1";
const KAKAO_SETTINGS_KEY = "literacy_academy_kakao_settings_v1";
const KAKAO_MESSAGE_LOGS_KEY = "literacy_academy_kakao_message_logs_v1";
const CURRENT_USER_KEY = "literacy_academy_current_user_v1";
const ROLE_MODE_KEY = "literacy_academy_role_mode";
const AUTO_ABSENCE_LAST_DATE_KEY = "literacy_academy_auto_absence_last_date";
const ROSTER_VERSION_KEY = "literacy_academy_roster_version";
const ROSTER_VERSION = "future-edu-real-roster-2026-07-05-v3";
const MINERVA_BOOK_FEE_SEED_VERSION = "minerva-book-fees-2026-07-10-compact-v2";
const APP_BACKUP_VERSION = "future-edu-management-backup-v1";

const SUBJECTS = [
  "미래엔 수학",
  "미래엔 영어",
  "중등 수학",
  "고등 수학",
  "공필왕",
  "문해력",
  "소한이 한글",
];

const GONGPIL_SUBJECTS = [
  "국어",
  "사회",
  "과학",
  "한국사",
  "세계사",
];

const PAYMENT_METHOD_OPTIONS = ["카드결제", "제로페이", "계좌이체", "현금"];
const PAYMENT_TYPE_OPTIONS = ["정규 교육비", "추가 수강", "분납", "이월", "교재비", "환불", "기타"];

const FINANCE_CATEGORIES = {
  income: ["기타 수입", "입회비", "교재비", "특강비", "환불입금", "지원금", "기타"],
  expense: ["임대료", "선생님 급여", "교재 구입", "교구/비품", "광고/홍보", "관리비", "간식/소모품", "세금/수수료", "환불", "기타"],
};

const DEFAULT_USER_ACCOUNTS = [
  { id: "director", name: "원장", role: "director", password: "0000", workRecords: [] },
  { id: "teacher", name: "선생님", role: "teacher", password: "1111", workRecords: [] },
  { id: "desk", name: "데스크", role: "desk", password: "2222", workRecords: [] },
];

const ROLE_VIEW_LIMITS = {
  director: [],
  teacher: ["payments", "finance", "tuition", "books", "kakao", "archive"],
  desk: ["finance", "tuition", "books", "kakao", "archive"],
};

const DEFAULT_KAKAO_SETTINGS = {
  enabled: false,
  provider: "",
  channelName: "미래엔 에듀 영수학원",
  arriveTemplateCode: "",
  leaveTemplateCode: "",
  arriveMessage: "#{학생명} 학생이 #{시간}에 등원했습니다. - 미래엔 에듀 영수학원",
  leaveMessage: "#{학생명} 학생이 #{시간}에 하원했습니다. - 미래엔 에듀 영수학원",
};

const SUBJECT_ASSIGNMENTS = {
  문해력: [
    "손지원",
    "양지혁",
    "오주빈",
    "유하랑",
    "유해강",
    "윤수비",
    "이승우",
    "전시우",
    "주현영",
    "천예진",
    "최지원",
    "황아진",
  ],
  "미래엔 수학": [
    "송효림",
    "양지혁",
    "유하랑",
    "유해강",
    "이서현",
    "이지한",
    "장유주",
    "전시우",
    "정서윤",
    "정예나",
    "조수아",
    "주현영",
    "천다온",
    "최지원",
    "홍아영",
    "황다인",
    "황아진",
    "박지훈",
    "백시율",
    "백시후",
    "박찬",
  ],
  "중등 수학": [
    "김지율",
    "오경훈",
    "이서윤",
    "이서현",
    "이시율",
    "주현영",
    "안서희",
    "홍서현",
    "김민준",
    "김마가희",
  ],
};

const SUBJECT_START_RECORDS = [
  {
    studentName: "양지혁",
    subject: "미래엔 수학",
    startDate: "2026-07-01",
    action: "추가",
    memo: "기존 문해력 수강 중 미래엔 수학 추가",
  },
  {
    studentName: "최지원",
    subject: "미래엔 수학",
    startDate: "2026-07-01",
    action: "추가",
    memo: "기존 문해력 수강 중 미래엔 수학 추가",
  },
];

const STUDENT_NAME_CORRECTIONS = {
  오경호: "오경훈",
  이지하: "이지한",
  천다운: "천다온",
  김마가렛: "김마가희",
  손은우: "손윤우",
};

const GRADES = [
  "예비초",
  "초1",
  "초2",
  "초3",
  "초4",
  "초5",
  "초6",
  "중1",
  "중2",
  "중3",
  "고1",
  "고2",
  "고3",
  "성인",
  "5세",
  "7세",
  "8세",
  "9세",
  "10세",
  "11세",
  "12세",
  "13세",
  "14세",
  "15세",
  "16세",
];

const GRADE_FILTER_OPTIONS = GRADES.filter((grade) => !/^\d+세$/.test(grade));

const WEEKDAYS = [
  { label: "월", value: 1 },
  { label: "화", value: 2 },
  { label: "수", value: 3 },
  { label: "목", value: 4 },
  { label: "금", value: 5 },
  { label: "토", value: 6 },
];

const FEEDBACK_RECOMMENDATIONS = {
  "미래엔 영어": [
    "오늘 미래엔 영어 학습에서는 지문을 읽고 핵심 내용을 파악하는 과정이 좋았습니다. 새로 익힌 어휘는 예문 속에서 다시 확인하면 더 오래 기억할 수 있습니다.",
    "문장 구조를 차분히 분석하며 해석하려는 태도가 돋보였습니다. 다음 시간에는 틀린 문장의 어법 포인트를 다시 짚어 정확도를 높이겠습니다.",
    "단어 뜻을 추측하고 문맥 안에서 이해하려는 힘이 좋아지고 있습니다. 가정에서는 오늘 배운 단어를 소리 내어 2회 복습하면 좋겠습니다.",
  ],
  "미래엔 수학": [
    "오늘 미래엔 수학 학습에서는 개념을 문제에 적용하려는 과정이 좋았습니다. 풀이 과정을 한 줄씩 정리하면 실수를 더 줄일 수 있습니다.",
    "기본 문제는 안정적으로 해결했고, 응용 문제에서는 조건을 표시하며 접근하는 연습이 필요합니다. 다음 시간에는 비슷한 유형을 반복해 자신감을 높이겠습니다.",
    "계산 속도보다 정확도를 우선하며 차분히 풀었습니다. 틀린 문제는 풀이 시작 부분을 다시 확인하는 습관을 잡아가면 좋겠습니다.",
  ],
  "중등 수학": [
    "오늘 중등 수학 학습에서는 개념을 식과 그래프로 연결해 보려는 태도가 좋았습니다. 풀이 근거를 한 줄씩 남기면 오답 점검이 쉬워집니다.",
    "유형 접근은 안정적이었고, 조건을 끝까지 읽고 식을 세우는 연습이 더해지면 정확도가 올라갑니다. 다음 시간에는 비슷한 심화 유형을 함께 풀겠습니다.",
    "계산 과정이 복잡한 문제에서도 차분히 따라왔습니다. 틀린 문제는 개념, 식 세우기, 계산 중 어느 단계에서 막혔는지 나누어 정리하겠습니다.",
  ],
  "고등 수학": [
    "오늘 고등 수학 학습에서는 개념을 식과 그래프로 연결해 보려는 태도가 좋았습니다. 풀이 근거를 한 줄씩 남기면 오답 점검이 쉬워집니다.",
    "유형 접근은 안정적이었고, 조건을 끝까지 읽고 식을 세우는 연습이 더해지면 정확도가 올라갑니다. 다음 시간에는 비슷한 심화 유형을 함께 풀겠습니다.",
    "계산 과정이 복잡한 문제에서도 차분히 따라왔습니다. 틀린 문제는 개념, 식 세우기, 계산 중 어느 단계에서 막혔는지 나누어 정리하겠습니다.",
  ],
  공필왕: [
    "오늘 공필왕 학습에서는 핵심 개념을 읽고 중요한 내용을 표시하는 과정이 좋았습니다. 선택 과목별 용어를 짧은 문장으로 다시 말해보면 정리가 더 잘 됩니다.",
    "자료와 지문을 읽고 필요한 정보를 찾는 힘이 좋아지고 있습니다. 다음 시간에는 틀린 문제의 핵심어와 근거를 함께 확인하겠습니다.",
    "단원 흐름은 잘 따라왔고, 세부 개념을 정확히 구분하는 연습이 필요합니다. 국어, 사회, 과학, 역사 과목별 핵심어를 따로 묶어 복습하면 좋겠습니다.",
  ],
  문해력: [
    "오늘 문해력 수업에서는 글의 중심 생각을 찾고 자신의 말로 표현하려는 모습이 좋았습니다. 근거 문장을 함께 적는 연습을 이어가겠습니다.",
    "읽은 내용을 말로 풀어내는 힘이 좋아지고 있습니다. 다음 시간에는 생각을 문단으로 정리하는 연습을 더 해보겠습니다.",
    "인물의 마음과 사건의 흐름을 잘 따라왔습니다. 자신의 의견을 쓸 때 이유를 한 문장 더 붙이면 글이 더 탄탄해집니다.",
  ],
  "소한이 한글": [
    "오늘 소한이 한글 학습에서는 글자를 또박또박 읽고 소리와 모양을 연결하려는 모습이 좋았습니다. 짧은 문장을 소리 내어 읽는 연습을 이어가겠습니다.",
    "받침이 있는 낱말을 천천히 확인하며 읽었습니다. 가정에서는 오늘 배운 낱말을 3개만 골라 다시 읽어보면 좋겠습니다.",
    "읽기에 대한 자신감이 조금씩 좋아지고 있습니다. 다음 시간에는 낱말 읽기에서 문장 읽기로 자연스럽게 이어가겠습니다.",
  ],
};

function createId() {
  if (window.crypto?.randomUUID) return window.crypto.randomUUID();
  return `student-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

const blankStudent = () => ({
  id: createId(),
  studentName: "",
  school: "",
  grade: "초1",
  studentPhone: "",
  parentName: "",
  parentPhone: "",
  parentPhone2: "",
  parentPhone3: "",
  parentPhone4: "",
  subjects: [],
  gongpilSubjects: [],
  teacher: "",
  attendanceStatus: "등원",
  attendanceDays: [],
  attendanceRecords: [],
  weeklySubjectSchedule: "",
  presentDays: 0,
  absentDays: 0,
  baseTuition: 0,
  tuition: 0,
  paymentStatus: "납부완료",
  paymentMethod: "계좌이체",
  paymentName: "",
  paidAmount: 0,
  unpaidAmount: 0,
  paymentDiscount: 0,
  paymentDueDate: "",
  paymentDate: "",
  paymentMemo: "",
  paymentRecords: [],
  courseHistory: [],
  bookFeeTitle: "",
  bookFeeCount: "",
  bookFeeAmount: 0,
  subjectAllocations: [],
  joinDate: new Date().toISOString().slice(0, 10),
  leaveDate: "",
  enrollmentStatus: "재원",
  currentBooks: "",
  completedBooks: "",
  counselingRecords: "",
  makeupDateRecords: "",
  feedbackRecords: [],
  memo: "",
});

function parseRosterDate(value) {
  const text = String(value);
  if (text.length !== 8) return "";
  return `${text.slice(0, 4)}-${text.slice(4, 6)}-${text.slice(6, 8)}`;
}

function currentMonthDueDate(day) {
  const numericDay = Number(day);
  if (!numericDay) return "";
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const lastDay = new Date(year, now.getMonth() + 1, 0).getDate();
  const safeDay = Math.min(Math.max(numericDay, 1), lastDay);
  return `${year}-${month}-${String(safeDay).padStart(2, "0")}`;
}

function extractPaymentDayFromMemo(memo) {
  const match = String(memo || "").match(/수납일:\s*(\d+)/);
  return match ? Number(match[1]) : 0;
}

function extractMemoValue(memo, label) {
  const match = String(memo || "").match(new RegExp(`${label}:\\s*([^\\n]+)`));
  return match ? match[1].trim() : "";
}

function isExcelSourceMemoLine(line = "") {
  return /^엑셀 원본\s+.+\.xlsx\s+\d*행$/.test(String(line || "").trim());
}

function visiblePaymentMemo(memo = "") {
  return String(memo || "")
    .split("\n")
    .filter((line) => !isExcelSourceMemoLine(line))
    .join("\n")
    .trim();
}

function hiddenExcelSourceMemo(memo = "") {
  return String(memo || "")
    .split("\n")
    .filter(isExcelSourceMemoLine)
    .join("\n")
    .trim();
}

function mergeVisibleAndHiddenPaymentMemo(visibleMemo = "", previousMemo = "") {
  return [String(visibleMemo || "").trim(), hiddenExcelSourceMemo(previousMemo)]
    .filter(Boolean)
    .join("\n");
}

function cleanLearningMemo(memo) {
  return String(memo || "")
    .split("\n")
    .filter((line) => {
      const trimmed = line.trim();
      return !(
        trimmed.startsWith("수납일:") ||
        trimmed.startsWith("납부현황 적용:")
      );
    })
    .join("\n")
    .trim();
}

function parseRosterDays(value) {
  const dayMap = { 월: 1, 화: 2, 수: 3, 목: 4, 금: 5, 토: 6, 일: 0 };
  return String(value)
    .split(",")
    .map((day) => day.trim())
    .filter(Boolean)
    .map((day) => dayMap[day])
    .filter((day) => day !== undefined);
}

function gradeFromAge(age, school) {
  const numericAge = Number(age);
  if (school.includes("유치원") || numericAge < 8) return `${numericAge}세`;
  if (numericAge >= 8 && numericAge <= 13) return `초${numericAge - 7}`;
  if (numericAge >= 14 && numericAge <= 16) return `중${numericAge - 13}`;
  if (numericAge >= 17 && numericAge <= 19) return `고${numericAge - 16}`;
  return `${numericAge}세`;
}

const paymentUpdates = {
  최지원: { status: "납부완료", registered: "2026-07-04", paymentName: "미래엔 수학 주3회", tuition: 170000, paidAmount: 170000, unpaidAmount: 0, paymentDate: "2026-07-04", paymentMethod: "카드결제" },
  박이준: { status: "납부완료", registered: "2026-07-03", paymentName: "빠른한글 소한이", tuition: 115000, paidAmount: 115000, unpaidAmount: 0, paymentDate: "2026-07-03", paymentMethod: "계좌입금" },
  전은결: { status: "납부완료", registered: "2026-07-01", paymentName: "빠른한글 소한이 주1회", tuition: 100000, paidAmount: 100000, unpaidAmount: 0, paymentDate: "2026-07-01", paymentMethod: "제로페이" },
  오주빈: { status: "미납", registered: "2026-07-01", paymentName: "[이월] 20260601 [이월] 20260525 영어+문해력 주2회", tuition: 362000, paidAmount: 0, unpaidAmount: 362000, paymentDate: "", paymentMethod: "" },
  송효림: { status: "미납", registered: "2026-07-01", paymentName: "[이월] 20260625 수학+영어+문해력", tuition: 412000, paidAmount: 0, unpaidAmount: 412000, paymentDate: "", paymentMethod: "" },
  김마가희: { status: "미납", registered: "2026-07-01", paymentName: "[이월] 20260625 중등 수학5회 문해3회", tuition: 430000, paidAmount: 0, unpaidAmount: 430000, paymentDate: "", paymentMethod: "" },
  홍서현: { status: "납부완료", registered: "2026-07-01", paymentName: "[이월] 20260625 중등 수학영어", tuition: 482000, paidAmount: 482000, unpaidAmount: 0, paymentDate: "2026-07-02", paymentMethod: "카드결제" },
  황다인: { status: "납부완료", registered: "2026-07-01", paymentName: "[이월] 20260625 미래엔 수학+영어", tuition: 392000, paidAmount: 392000, unpaidAmount: 0, paymentDate: "2026-07-03", paymentMethod: "망고페이" },
  손지원: { status: "납부완료", registered: "2026-07-01", paymentName: "[이월] 20260625 문해력 주2회", tuition: 160000, paidAmount: 160000, unpaidAmount: 0, paymentDate: "2026-07-03", paymentMethod: "망고페이" },
  조윤하: { status: "납부완료", registered: "2026-07-01", paymentName: "[이월] 20260625 소한이+요리수 주1회씩", tuition: 200000, paidAmount: 200000, unpaidAmount: 0, paymentDate: "2026-07-02", paymentMethod: "제로페이" },
  백시후: { status: "미납", registered: "2026-07-01", paymentName: "[이월] 20260625 미래엔 수학3+영어3+문해력2", tuition: 490000, paidAmount: 0, unpaidAmount: 490000, paymentDate: "", paymentMethod: "" },
  백시율: { status: "미납", registered: "2026-07-01", paymentName: "[이월] 20260625 수학+영어+문해력", tuition: 532000, paidAmount: 0, unpaidAmount: 532000, paymentDate: "", paymentMethod: "" },
  안서희: { status: "미납", registered: "2026-07-01", paymentName: "[이월] 20260625 영어 교재비", tuition: 22000, paidAmount: 0, unpaidAmount: 22000, paymentDate: "", paymentMethod: "" },
  이윤겸: { status: "납부완료", registered: "2026-07-01", paymentName: "소한이 요리수 각 주1회", tuition: 200000, paidAmount: 200000, unpaidAmount: 0, paymentDate: "2026-07-01", paymentMethod: "제로페이" },
  손승현: { status: "납부완료", registered: "2026-07-01", paymentName: "미래엔 영어 주5회", tuition: 200000, paidAmount: 200000, unpaidAmount: 0, paymentDate: "2026-07-01", paymentMethod: "제로페이" },
  천예진: { status: "납부완료", registered: "2026-07-01", paymentName: "문해력 수업 주2회", tuition: 160000, paidAmount: 160000, unpaidAmount: 0, paymentDate: "2026-07-01", paymentMethod: "제로페이" },
  이시율: { status: "미납", registered: "2026-07-01", paymentName: "중등 수학영어+문해력1", tuition: 560000, paidAmount: 0, unpaidAmount: 560000, paymentDate: "", paymentMethod: "" },
};

function normalizeBookFees(bookFees = [], fallbackTitle = "", fallbackAmount = 0) {
  const items = Array.isArray(bookFees) ? bookFees : [];
  const normalized = items
    .map((item) => ({
      title: String(item.title || item.bookFeeTitle || "").trim(),
      amount: Number(item.amount || item.bookFeeAmount || 0),
    }))
    .filter((item) => item.title || item.amount);

  if (!normalized.length && (fallbackTitle || Number(fallbackAmount || 0))) {
    normalized.push({
      title: String(fallbackTitle || "").trim(),
      amount: Number(fallbackAmount || 0),
    });
  }

  return normalized;
}

const SUBJECT_FINANCE_GROUPS = ["미래엔 영어", "중등 수학", "고등 수학", "유치초저", "미래엔 수학", "문해력", "공필왕", "기타", "배분 필요"];

function normalizeSubjectAllocations(subjectAllocations = []) {
  return (Array.isArray(subjectAllocations) ? subjectAllocations : [])
    .map((item) => ({
      subject: normalizeSubjectFinanceGroup(item.subject || item.group || ""),
      amount: Number(item.amount || 0),
      memo: String(item.memo || "").trim(),
    }))
    .filter((item) => SUBJECT_FINANCE_GROUPS.includes(item.subject) && Number(item.amount || 0) !== 0);
}

function normalizeSubjectFinanceGroup(value = "") {
  const text = String(value || "").trim();
  if (text === "중고등 수학" || text === "중고등수학" || text === "중등수학") return "중등 수학";
  if (text === "고등수학") return "고등 수학";
  return text;
}

function normalizePaymentParts(paymentParts = []) {
  return (Array.isArray(paymentParts) ? paymentParts : [])
    .map((item) => ({
      date: String(item.date || item.paymentDate || "").trim(),
      method: String(item.method || item.paymentMethod || "").trim(),
      amount: Number(item.amount || item.paidAmount || 0),
      cashReceiptDate: String(item.cashReceiptDate || "").trim(),
      memo: String(item.memo || "").trim(),
    }))
    .filter((item) => item.date || item.method || Number(item.amount || 0) || item.cashReceiptDate || item.memo);
}

function paymentPartsTotal(paymentParts = []) {
  return normalizePaymentParts(paymentParts).reduce((sum, item) => sum + Number(item.amount || 0), 0);
}

function normalizePaymentType(value = "", record = {}) {
  const text = String(value || "").trim();
  if (PAYMENT_TYPE_OPTIONS.includes(text)) return text;
  const source = `${record.paymentName || ""} ${record.paymentMethod || ""} ${record.status || ""}`;
  if (source.includes("추가")) return "추가 수강";
  if (source.includes("분납")) return "분납";
  if (source.includes("이월")) return "이월";
  if (source.includes("교재")) return "교재비";
  if (source.includes("환불")) return "환불";
  return "정규 교육비";
}

function paymentRecord(studentName, {
  registered = "",
  paymentType = "",
  paymentName = "",
  baseTuition = null,
  tuition = 0,
  discount = 0,
  paidAmount = 0,
  unpaidAmount = 0,
  paymentDate = "",
  paymentMethod = "",
  cashReceiptDate = "",
  memo = "",
  bookFeeTitle = "",
  bookFeeCount = "",
  bookFeeAmount = 0,
  bookFees = [],
  subjectAllocations = [],
  paymentParts = [],
  status = "납부완료",
  preservePaymentName = false,
}) {
  const normalizedBookFees = normalizeBookFees(bookFees, bookFeeTitle, bookFeeAmount);
  const normalizedSubjectAllocations = normalizeSubjectAllocations(subjectAllocations);
  const normalizedPaymentParts = normalizePaymentParts(paymentParts);
  const normalizedPaymentType = normalizePaymentType(paymentType, { paymentName, paymentMethod, status });
  const firstBookFee = normalizedBookFees[0] || { title: "", amount: 0 };
  const baseTuitionAmount = baseTuition === null || baseTuition === undefined || baseTuition === ""
    ? Number(tuition || 0)
    : Number(baseTuition || 0);
  const bookFeeAmountTotal = normalizedBookFees.reduce((sum, item) => sum + Number(item.amount || 0), 0);
  const totalTuition = baseTuitionAmount + bookFeeAmountTotal;
  const normalizedStatus = status || "납부완료";
  const payableAmount = Math.max(0, totalTuition + Number(discount || 0));
  const partsPaidAmount = paymentPartsTotal(normalizedPaymentParts);
  const normalizedPaidAmount = partsPaidAmount > 0
    ? partsPaidAmount
    : normalizedStatus === "납부완료" && Number(paidAmount || 0) <= 0
    ? payableAmount
    : Number(paidAmount || 0);
  const normalizedUnpaidAmount = normalizedStatus === "납부완료"
    ? 0
    : Number(unpaidAmount || 0);
  const partMethods = uniqueValues(normalizedPaymentParts.map((item) => item.method).filter(Boolean));
  const partDates = normalizedPaymentParts.map((item) => item.date).filter(Boolean).sort();
  return {
    id: [
      canonicalStudentName(studentName),
      registered,
      normalizedPaymentType,
      partDates.join(",") || paymentDate,
      paymentName,
      totalTuition,
      discount,
      normalizedPaidAmount,
      JSON.stringify(normalizedBookFees),
      JSON.stringify(normalizedSubjectAllocations),
      JSON.stringify(normalizedPaymentParts),
    ].join("|"),
    studentName: canonicalStudentName(studentName),
    registered,
    paymentType: normalizedPaymentType,
    paymentName: preservePaymentName ? String(paymentName || "").trim() : normalizeCourseText(paymentName),
    baseTuition: baseTuitionAmount,
    tuition: totalTuition,
    discount: Number(discount || 0),
    paidAmount: normalizedPaidAmount,
    unpaidAmount: normalizedUnpaidAmount,
    paymentDate: partDates[partDates.length - 1] || paymentDate,
    paymentMethod: partMethods.length > 1 ? "복합결제" : (partMethods[0] || paymentMethod),
    cashReceiptDate: String(cashReceiptDate || "").trim(),
    memo: String(memo || "").trim(),
    bookFeeTitle: firstBookFee.title,
    bookFeeCount: "",
    bookFeeAmount: Number(firstBookFee.amount || 0),
    bookFees: normalizedBookFees,
    subjectAllocations: normalizedSubjectAllocations,
    paymentParts: normalizedPaymentParts,
    status: normalizedStatus,
    preservePaymentName: Boolean(preservePaymentName),
  };
}

const JULY_PAYMENT_RECORDS = Object.entries(paymentUpdates).map(([studentName, payment]) => paymentRecord(studentName, {
  registered: payment.registered,
  paymentName: payment.paymentName,
  tuition: payment.tuition,
  paidAmount: payment.paidAmount,
  unpaidAmount: payment.unpaidAmount,
  paymentDate: payment.paymentDate,
  paymentMethod: payment.paymentMethod,
  status: payment.status,
}));

const JUNE_PAYMENT_RECORDS = [
  paymentRecord("김지율", { registered: "2026-06-26", paymentName: "분납2", tuition: 10000, paidAmount: 10000, paymentDate: "2026-06-26", paymentMethod: "계좌입금" }),
  paymentRecord("김예람", { registered: "2026-06-25", paymentName: "미래엔 수학", tuition: 190000, discount: -10000, paidAmount: 180000, paymentDate: "2026-06-25", paymentMethod: "카드결제" }),
  paymentRecord("김예준", { registered: "2026-06-25", paymentName: "미래엔 수학", tuition: 190000, paidAmount: 190000, paymentDate: "2026-06-25", paymentMethod: "카드결제" }),
  paymentRecord("김다은", { registered: "2026-06-25", paymentName: "미래엔 수학+영어", tuition: 412000, paidAmount: 412000, paymentDate: "2026-06-29", paymentMethod: "카드결제" }),
  paymentRecord("이서윤", { registered: "2026-06-25", paymentName: "중등 수학+영어", tuition: 482000, paidAmount: 482000, paymentDate: "2026-06-26", paymentMethod: "망고페이" }),
  paymentRecord("이지한", { registered: "2026-06-25", paymentName: "한글(2회)+수학(3회)", tuition: 270000, paidAmount: 270000, paymentDate: "2026-06-27", paymentMethod: "망고페이" }),
  paymentRecord("장민서", { registered: "2026-06-25", paymentName: "미래엔 영어", tuition: 222000, paidAmount: 222000, paymentDate: "2026-06-30", paymentMethod: "제로페이" }),
  paymentRecord("천다솜", { registered: "2026-06-25", paymentName: "미래엔 영어", tuition: 202000, paidAmount: 202000, paymentDate: "2026-06-19", paymentMethod: "카드결제" }),
  paymentRecord("천다온", { registered: "2026-06-25", paymentName: "미래엔 영어+수학", tuition: 370000, paidAmount: 370000, paymentDate: "2026-06-26", paymentMethod: "카드결제" }),
  paymentRecord("장명승", { registered: "2026-06-25", paymentName: "미래엔 수학+영어", tuition: 390000, paidAmount: 390000, paymentDate: "2026-06-26", paymentMethod: "제로페이" }),
  paymentRecord("홍아영", { registered: "2026-06-25", paymentName: "미래엔 수학", tuition: 190000, paidAmount: 190000, paymentDate: "2026-06-26", paymentMethod: "망고페이" }),
  paymentRecord("황아진", { registered: "2026-06-25", paymentName: "미래엔 수학3+문해력 수업2", tuition: 330000, paidAmount: 330000, paymentDate: "2026-06-26", paymentMethod: "제로페이" }),
  paymentRecord("김채원", { registered: "2026-06-25", paymentName: "공필왕 사회과학", tuition: 200000, paidAmount: 200000, paymentDate: "2026-06-27", paymentMethod: "카드결제" }),
  paymentRecord("정예나", { registered: "2026-06-25", paymentName: "미래엔 수학", tuition: 180000, paidAmount: 180000, paymentDate: "2026-06-26", paymentMethod: "제로페이" }),
  paymentRecord("이서현", { registered: "2026-06-25", paymentName: "미래엔 수학", tuition: 170000, paidAmount: 170000, paymentDate: "2026-06-25", paymentMethod: "계좌입금" }),
  paymentRecord("손윤우", {
    registered: "2026-06-25",
    paymentName: "미래엔 영어+리딩하이",
    tuition: 382000,
    paidAmount: 382000,
    paymentDate: "2026-06-25",
    paymentMethod: "복합결제",
    paymentParts: [
      { date: "2026-06-25", method: "제로페이", amount: 100000 },
      { date: "2026-06-25", method: "카드결제", amount: 282000 },
    ],
  }),
  paymentRecord("김민준", { registered: "2026-06-25", paymentName: "중등 미래엔 수학영어", tuition: 482000, paidAmount: 482000, paymentDate: "2026-06-26", paymentMethod: "망고페이" }),
  paymentRecord("박지훈", { registered: "2026-06-25", paymentName: "미래엔 수학+영어", tuition: 412000, paidAmount: 412000, paymentDate: "2026-06-29", paymentMethod: "카드결제" }),
  paymentRecord("전시우", { registered: "2026-06-25", paymentName: "미래엔 수학+문해력 수업1", tuition: 330000, paidAmount: 330000, paymentDate: "2026-06-29", paymentMethod: "망고페이" }),
  paymentRecord("김예겸", { registered: "2026-06-25", paymentName: "미래엔 영어", tuition: 222000, paidAmount: 222000, paymentDate: "2026-06-29", paymentMethod: "계좌입금" }),
  paymentRecord("윤수비", { registered: "2026-06-25", paymentName: "문해력 수업 주2회", tuition: 160000, paidAmount: 160000, paymentDate: "2026-06-26", paymentMethod: "망고페이" }),
  paymentRecord("장유주", { registered: "2026-06-25", paymentName: "미래엔 수학 3일 영어 5일", tuition: 406000, paidAmount: 406000, paymentDate: "2026-06-25", paymentMethod: "망고페이" }),
  paymentRecord("박진현", { registered: "2026-06-25", paymentName: "수학3회+문해력2회", tuition: 330000, paidAmount: 330000, paymentDate: "2026-06-25", paymentMethod: "계좌입금" }),
  paymentRecord("김지율", { registered: "2026-06-25", paymentName: "중등 미래엔 수학", tuition: 220000, paidAmount: 220000, paymentDate: "2026-06-26", paymentMethod: "카드결제" }),
  paymentRecord("최지원", { registered: "2026-06-25", paymentName: "문해력 수업 주2회", tuition: 160000, paidAmount: 160000, paymentDate: "2026-05-18", paymentMethod: "카드결제" }),
  paymentRecord("문시영", { registered: "2026-06-25", paymentName: "수학5회+문해력2회", tuition: 350000, paidAmount: 350000, paymentDate: "2026-05-21", paymentMethod: "제로페이" }),
  paymentRecord("조수아", { registered: "2026-06-25", paymentName: "한글+수학", tuition: 180000, paidAmount: 180000, paymentDate: "2026-06-29", paymentMethod: "카드결제" }),
  paymentRecord("박찬", { registered: "2026-06-25", paymentName: "한글떼기+요리수연산", tuition: 180000, paidAmount: 180000, paymentDate: "2026-06-25", paymentMethod: "망고페이" }),
  paymentRecord("유해강", { registered: "2026-06-25", paymentName: "수학+영어+문해력 수업", tuition: 544000, paidAmount: 544000, paymentDate: "2026-06-28", paymentMethod: "계좌입금" }),
  paymentRecord("변세윤", { registered: "2026-06-25", paymentName: "미래엔 수학+영어+리딩하이", tuition: 450000, paidAmount: 450000, paymentDate: "2026-06-26", paymentMethod: "카드결제" }),
  paymentRecord("정서윤", { registered: "2026-06-25", paymentName: "미래엔 수학", tuition: 180000, paidAmount: 180000, paymentDate: "2026-06-22", paymentMethod: "계좌입금" }),
  paymentRecord("주현영", { registered: "2026-06-25", paymentName: "수학+영어+문해력", tuition: 640000, paidAmount: 640000, paymentDate: "2026-06-25", paymentMethod: "제로페이" }),
  paymentRecord("오경훈", { registered: "2026-06-25", paymentName: "수학5회+세계사+과학", tuition: 430000, paidAmount: 430000, paymentDate: "2026-06-30", paymentMethod: "카드결제" }),
  paymentRecord("유하랑", { registered: "2026-06-25", paymentName: "수학+영어", tuition: 362000, paidAmount: 362000, paymentDate: "2026-06-29", paymentMethod: "현금결제" }),
  paymentRecord("양지혁", { registered: "2026-06-24", paymentName: "분납2", tuition: 70000, discount: -5000, paidAmount: 65000, paymentDate: "2026-06-24", paymentMethod: "카드결제" }),
  paymentRecord("이승우", { registered: "2026-06-19", paymentName: "문해력 수업 주2회", tuition: 160000, paidAmount: 160000, paymentDate: "2026-06-30", paymentMethod: "제로페이" }),
  paymentRecord("김예준", { registered: "2026-06-18", paymentName: "미래엔 수학 주5회", tuition: 85500, discount: -10000, paidAmount: 75500, paymentDate: "2026-06-18", paymentMethod: "카드결제" }),
  paymentRecord("김예람", { registered: "2026-06-18", paymentName: "미래엔 수학 주5회", tuition: 85500, paidAmount: 85500, paymentDate: "2026-06-18", paymentMethod: "카드결제" }),
  paymentRecord("이로운", { registered: "2026-06-10", paymentName: "소한이 주1회", tuition: 100000, paidAmount: 100000, paymentDate: "2026-06-10", paymentMethod: "제로페이" }),
  paymentRecord("이윤겸", { registered: "2026-06-04", paymentName: "소한이 한글+연산", tuition: 200000, paidAmount: 200000, paymentDate: "2026-06-04", paymentMethod: "제로페이" }),
  paymentRecord("김다은", { registered: "2026-06-01", paymentName: "미래엔 수학+영어", tuition: 412000, paidAmount: 412000, paymentDate: "2026-06-01", paymentMethod: "카드결제" }),
  paymentRecord("전은결", { registered: "2026-06-01", paymentName: "[수강권] 소한이 한글 주1회", tuition: 100000, paidAmount: 100000, paymentDate: "2026-06-01", paymentMethod: "제로페이" }),
  paymentRecord("송효림", { registered: "2026-06-01", paymentName: "[이월] 20260525 수학+영어+리딩하이", tuition: 460000, paidAmount: 460000, paymentDate: "2026-06-01", paymentMethod: "카드결제" }),
  paymentRecord("오경훈", { registered: "2026-06-01", paymentName: "[이월] 20260525 수학5회+세계사+과학+정독1", tuition: 490000, discount: -23000, paidAmount: 467000, paymentDate: "2026-06-01", paymentMethod: "카드결제" }),
  paymentRecord("양지혁", { registered: "2026-06-01", paymentName: "[이월] 20260525 문해력 수업 주3회", tuition: 120000, paidAmount: 120000, paymentDate: "2026-06-24", paymentMethod: "제로페이" }),
  paymentRecord("홍서현", { registered: "2026-06-01", paymentName: "[이월] 20260525 중등 수학영어+리딩하이+과학+세계사", tuition: 640000, paidAmount: 640000, paymentDate: "2026-06-01", paymentMethod: "카드결제" }),
  paymentRecord("전시우", { registered: "2026-06-01", paymentName: "[이월] 20260525 미래엔 수학+리딩하이", tuition: 330000, discount: -39000, paidAmount: 291000, paymentDate: "2026-06-01", paymentMethod: "망고페이" }),
  paymentRecord("황다인", { registered: "2026-06-01", paymentName: "[이월] 20260525 미래엔 수학3일+영어5일", tuition: 392000, paidAmount: 392000, paymentDate: "2026-06-01", paymentMethod: "망고페이" }),
  paymentRecord("손승현", { registered: "2026-06-01", paymentName: "미래엔 영어 주5회", tuition: 244000, paidAmount: 244000, paymentDate: "2026-06-04", paymentMethod: "제로페이" }),
  paymentRecord("천예진", { registered: "2026-06-01", paymentName: "문해력 수업 주2회", tuition: 160000, paidAmount: 160000, paymentDate: "2026-06-01", paymentMethod: "제로페이" }),
  paymentRecord("이시율", { registered: "2026-06-01", paymentName: "중등 수학영어+문해력1", tuition: 560000, paidAmount: 560000, paymentDate: "2026-06-08", paymentMethod: "제로페이" }),
];

const JULY_2025_PAYMENT_RECORDS = [
  paymentRecord("정서윤", { registered: "2025-07-26", paymentName: "미래엔 수학", tuition: 180000, paidAmount: 180000, paymentDate: "2025-08-26", paymentMethod: "카드결제", memo: "2025년 7월 원본 수납자료" }),
  paymentRecord("박소민", { registered: "2025-07-25", paymentName: "한글+수학", tuition: 270000, paidAmount: 270000, paymentDate: "2025-07-25", paymentMethod: "카드결제", memo: "2025년 7월 원본 수납자료" }),
  paymentRecord("홍서현", { registered: "2025-07-25", paymentName: "책통클럽 주2회", tuition: 180000, paidAmount: 180000, paymentDate: "2025-07-29", paymentMethod: "망고페이", memo: "2025년 7월 원본 수납자료" }),
  paymentRecord("김주희", { registered: "2025-07-25", paymentName: "소한이 주2회", tuition: 200000, paidAmount: 200000, paymentDate: "2025-07-28", paymentMethod: "계좌입금", memo: "2025년 7월 원본 수납자료" }),
  paymentRecord("장지은", { registered: "2025-07-25", paymentName: "정독법2회+수학3회", tuition: 320000, paidAmount: 320000, paymentDate: "2025-07-25", paymentMethod: "계좌입금", memo: "2025년 7월 원본 수납자료" }),
  paymentRecord("문시영", { registered: "2025-07-25", paymentName: "책통클럽 주2회", tuition: 160000, paidAmount: 160000, paymentDate: "2025-07-25", paymentMethod: "제로페이", memo: "2025년 7월 원본 수납자료" }),
  paymentRecord("김효준", { registered: "2025-07-25", paymentName: "책통클럽 주2회", tuition: 160000, paidAmount: 160000, paymentDate: "2025-07-25", paymentMethod: "카드결제", memo: "2025년 7월 원본 수납자료" }),
  paymentRecord("김지우", { registered: "2025-07-25", paymentName: "책통클럽 주2회", tuition: 190000, paidAmount: 190000, paymentDate: "2025-07-25", paymentMethod: "제로페이", memo: "2025년 7월 원본 수납자료" }),
  paymentRecord("배수진", { registered: "2025-07-25", paymentName: "책통클럽 주2회", tuition: 160000, paidAmount: 160000, paymentDate: "2025-07-26", paymentMethod: "카드결제", memo: "2025년 7월 원본 수납자료" }),
  paymentRecord("이승우", { registered: "2025-07-25", paymentName: "책통클럽 주2회", tuition: 160000, paidAmount: 160000, paymentDate: "2025-07-25", paymentMethod: "제로페이", memo: "2025년 7월 원본 수납자료" }),
  paymentRecord("정아인", { registered: "2025-07-25", paymentName: "책통클럽 주2회", tuition: 180000, paidAmount: 180000, paymentDate: "2025-07-25", paymentMethod: "카드결제", memo: "2025년 7월 원본 수납자료" }),
  paymentRecord("한상윤", { registered: "2025-07-25", paymentName: "책통클럽 주2회", tuition: 180000, paidAmount: 180000, paymentDate: "2025-07-26", paymentMethod: "망고페이", memo: "2025년 7월 원본 수납자료" }),
  paymentRecord("최희준", { registered: "2025-07-25", paymentName: "책통클럽 주2회", tuition: 180000, paidAmount: 180000, paymentDate: "2025-07-25", paymentMethod: "계좌입금", memo: "2025년 7월 원본 수납자료" }),
  paymentRecord("박찬", { registered: "2025-07-25", paymentName: "한글떼기+요리수연산", tuition: 180000, paidAmount: 180000, paymentDate: "2025-07-25", paymentMethod: "망고페이", memo: "2025년 7월 원본 수납자료" }),
  paymentRecord("유해강", { registered: "2025-07-25", paymentName: "리딩하이+수학+영어", tuition: 500000, paidAmount: 500000, paymentDate: "2025-07-28", paymentMethod: "현금결제", memo: "2025년 7월 원본 수납자료" }),
  paymentRecord("변세윤", { registered: "2025-07-25", paymentName: "한글중심+요리수연산", tuition: 270000, paidAmount: 270000, paymentDate: "2025-07-25", paymentMethod: "카드결제", memo: "2025년 7월 원본 수납자료" }),
  paymentRecord("주현영", { registered: "2025-07-25", paymentName: "책통클럽 주2회+수달5회", tuition: 640000, paidAmount: 640000, paymentDate: "2025-07-26", paymentMethod: "제로페이", memo: "2025년 7월 원본 수납자료" }),
  paymentRecord("오경훈", { registered: "2025-07-25", paymentName: "수달 주5회+책통 주2회", tuition: 550000, paidAmount: 550000, paymentDate: "2025-07-28", paymentMethod: "카드결제", memo: "2025년 7월 원본 수납자료" }),
  paymentRecord("유하랑", { registered: "2025-07-25", paymentName: "책통2회+전과목3회+요리수", tuition: 280000, paidAmount: 280000, paymentDate: "2025-07-25", paymentMethod: "현금결제", memo: "2025년 7월 원본 수납자료" }),
  paymentRecord("송효림", { registered: "2025-07-25", paymentName: "수학+국어", tuition: 310000, paidAmount: 310000, paymentDate: "2025-07-28", paymentMethod: "카드결제", memo: "2025년 7월 원본 수납자료" }),
  paymentRecord("이준수", { registered: "2025-07-25", paymentName: "미래엔 수학", tuition: 230000, paidAmount: 230000, paymentDate: "2025-07-25", paymentMethod: "제로페이", memo: "2025년 7월 원본 수납자료" }),
  paymentRecord("공지윤", { registered: "2025-07-21", paymentName: "[환불] 20250701 [이월] 20250601 [이월] 20250501 [이월] 2025", tuition: -100000, paidAmount: -100000, paymentDate: "2025-07-21", paymentMethod: "환불", status: "환불", memo: "2025년 7월 원본 수납자료. 이미지에서 수납명이 오른쪽으로 잘려 보임." }),
  paymentRecord("전예준", { registered: "2025-07-03", paymentName: "리딩하이 주2회", tuition: 160000, discount: -5000, paidAmount: 155000, paymentDate: "2025-07-03", paymentMethod: "카드결제", memo: "2025년 7월 원본 수납자료" }),
  paymentRecord("전설아", { registered: "2025-07-03", paymentName: "리딩하이 주2회", tuition: 160000, discount: -5000, paidAmount: 155000, paymentDate: "2025-07-03", paymentMethod: "카드결제", memo: "2025년 7월 원본 수납자료" }),
  paymentRecord("공지윤", { registered: "2025-07-01", paymentName: "[이월] 20250601 [이월] 20250525 소한이 주1회", tuition: 100000, paidAmount: 100000, paymentDate: "2025-07-19", paymentMethod: "계좌입금", memo: "2025년 7월 원본 수납자료" }),
  paymentRecord("공서윤", { registered: "2025-07-01", paymentName: "[이월] 20250601 [이월] 20250501 [이월] 20250425 책통클럽 주2회", tuition: 160000, paidAmount: 160000, paymentDate: "2025-07-15", paymentMethod: "계좌입금", memo: "2025년 7월 원본 수납자료" }),
  paymentRecord("공지윤", { registered: "2025-07-01", paymentName: "[이월] 20250601 [이월] 20250501 [이월] 20250425 소한이 주1회", tuition: 100000, paidAmount: 100000, paymentDate: "2025-07-15", paymentMethod: "계좌입금", memo: "2025년 7월 원본 수납자료" }),
  paymentRecord("장지은", { registered: "2025-07-01", paymentName: "[이월] 20250604 미래엔 수학 주3회", tuition: 160000, paidAmount: 160000, paymentDate: "2025-07-01", paymentMethod: "계좌입금", memo: "2025년 7월 원본 수납자료" }),
  paymentRecord("안서희", { registered: "2025-07-01", paymentName: "미네르바 독서논술 주2회", tuition: 270000, paidAmount: 270000, paymentDate: "2025-07-07", paymentMethod: "카드결제", memo: "2025년 7월 원본 수납자료" }),
  paymentRecord("송효림", { registered: "2025-07-01", paymentName: "[이월] 20250625 수학+국어", tuition: 310000, paidAmount: 310000, paymentDate: "2025-07-01", paymentMethod: "카드결제", memo: "2025년 7월 원본 수납자료" }),
  paymentRecord("조희윤", { registered: "2025-07-01", paymentName: "[이월] 20250625 책통클럽 주2회", tuition: 160000, discount: -60000, paidAmount: 100000, paymentDate: "2025-07-01", paymentMethod: "제로페이", memo: "2025년 7월 원본 수납자료" }),
  paymentRecord("임채민", { registered: "2025-07-01", paymentName: "[이월] 20250625 책통2회 공필왕1회", tuition: 280000, paidAmount: 280000, paymentDate: "2025-07-07", paymentMethod: "망고페이", memo: "2025년 7월 원본 수납자료" }),
  paymentRecord("유해강", { registered: "2025-07-01", paymentName: "[이월] 20250625 책통2회+수달3회", tuition: 322000, paidAmount: 322000, paymentDate: "2025-07-02", paymentMethod: "현금결제", memo: "2025년 7월 원본 수납자료" }),
  paymentRecord("이시율", { registered: "2025-07-01", paymentName: "[이월] 20250625 책통클럽 주2회", tuition: 180000, paidAmount: 180000, paymentDate: "2025-07-05", paymentMethod: "카드결제", memo: "2025년 7월 원본 수납자료" }),
  paymentRecord("김마가희", { registered: "2025-07-01", paymentName: "[이월] 20250625 책통3회 수학3회", tuition: 340000, discount: -56600, paidAmount: 283400, paymentDate: "2025-07-04", paymentMethod: "망고페이", memo: "2025년 7월 원본 수납자료" }),
  paymentRecord("김예슬", { registered: "2025-07-01", paymentName: "[이월] 20250625 책통클럽 주2회", tuition: 160000, paidAmount: 160000, paymentDate: "2025-07-03", paymentMethod: "카드결제", memo: "2025년 7월 원본 수납자료" }),
  paymentRecord("이승우", { registered: "2025-07-01", paymentName: "[이월] 20250625 책통클럽 주2회", tuition: 160000, discount: -20000, paidAmount: 140000, paymentDate: "2025-07-01", paymentMethod: "제로페이", memo: "2025년 7월 원본 수납자료" }),
  paymentRecord("김태하", { registered: "2025-07-01", paymentName: "[이월] 20250625 책통클럽 주2회", tuition: 160000, paidAmount: 160000, paymentDate: "2025-07-03", paymentMethod: "카드결제", memo: "2025년 7월 원본 수납자료" }),
  paymentRecord("홍서현", { registered: "2025-07-01", paymentName: "[이월] 20250625 책통클럽 주2회", tuition: 180000, paidAmount: 180000, paymentDate: "2025-07-04", paymentMethod: "망고페이", memo: "2025년 7월 원본 수납자료" }),
  paymentRecord("황다인", { registered: "2025-07-01", paymentName: "[이월] 20250625 미래엔 수학", tuition: 190000, paidAmount: 190000, paymentDate: "2025-07-04", paymentMethod: "망고페이", memo: "2025년 7월 원본 수납자료" }),
  paymentRecord("천예진", { registered: "2025-07-01", paymentName: "책통클럽 주2회", tuition: 160000, paidAmount: 160000, paymentDate: "2025-07-01", paymentMethod: "제로페이", memo: "2025년 7월 원본 수납자료" }),
];

const JUNE_2025_PAYMENT_RECORDS = [
  paymentRecord("박소민", { registered: "2025-06-25", paymentName: "한글중심 수학", tuition: 270000, paidAmount: 270000, paymentDate: "2025-06-25", paymentMethod: "계좌입금", memo: "2025년 6월 원본 수납자료" }),
  paymentRecord("김주희", { registered: "2025-06-25", paymentName: "소한이 주2회", tuition: 200000, paidAmount: 200000, paymentDate: "2025-06-26", paymentMethod: "계좌입금", memo: "2025년 6월 원본 수납자료" }),
  paymentRecord("장태산", { registered: "2025-06-25", paymentName: "책통2회+수학3회+사과", tuition: 410000, paidAmount: 410000, paymentDate: "2025-06-30", paymentMethod: "계좌입금", memo: "2025년 6월 원본 수납자료" }),
  paymentRecord("장지은", { registered: "2025-06-25", paymentName: "정독법2회+수학3회", tuition: 320000, paidAmount: 320000, paymentDate: "2025-06-25", paymentMethod: "계좌입금", memo: "2025년 6월 원본 수납자료" }),
  paymentRecord("최지원", { registered: "2025-06-25", paymentName: "책통클럽 주2회", tuition: 160000, paidAmount: 160000, paymentDate: "2025-06-28", paymentMethod: "망고페이", memo: "2025년 6월 원본 수납자료" }),
  paymentRecord("문시영", { registered: "2025-06-25", paymentName: "책통클럽 주2회", tuition: 160000, paidAmount: 160000, paymentDate: "2025-06-28", paymentMethod: "계좌입금", memo: "2025년 6월 원본 수납자료" }),
  paymentRecord("김효준", { registered: "2025-06-25", paymentName: "책통클럽 주2회", tuition: 160000, paidAmount: 160000, paymentDate: "2025-06-28", paymentMethod: "카드결제", memo: "2025년 6월 원본 수납자료" }),
  paymentRecord("김지우", { registered: "2025-06-25", paymentName: "책통클럽 주2회", tuition: 160000, discount: -20000, paidAmount: 140000, paymentDate: "2025-06-25", paymentMethod: "제로페이", memo: "2025년 6월 원본 수납자료" }),
  paymentRecord("조수아", { registered: "2025-06-25", paymentName: "소한이 주1회", tuition: 100000, paidAmount: 100000, paymentDate: "2025-06-25", paymentMethod: "카드결제", memo: "2025년 6월 원본 수납자료" }),
  paymentRecord("오주빈", { registered: "2025-06-25", paymentName: "책통클럽 주2회", tuition: 160000, discount: -20000, paidAmount: 140000, paymentDate: "2025-06-26", paymentMethod: "카드결제", memo: "2025년 6월 원본 수납자료" }),
  paymentRecord("배수진", { registered: "2025-06-25", paymentName: "책통클럽 주2회", tuition: 160000, paidAmount: 160000, paymentDate: "2025-06-28", paymentMethod: "계좌입금", memo: "2025년 6월 원본 수납자료" }),
  paymentRecord("정아인", { registered: "2025-06-25", paymentName: "책통클럽 주2회", tuition: 180000, paidAmount: 180000, paymentDate: "2025-06-26", paymentMethod: "제로페이", memo: "2025년 6월 원본 수납자료" }),
  paymentRecord("한상윤", { registered: "2025-06-25", paymentName: "책통클럽 주2회", tuition: 180000, discount: -22500, paidAmount: 157500, paymentDate: "2025-06-27", paymentMethod: "망고페이", memo: "2025년 6월 원본 수납자료" }),
  paymentRecord("최희준", { registered: "2025-06-25", paymentName: "책통클럽 주2회", tuition: 180000, paidAmount: 180000, paymentDate: "2025-06-25", paymentMethod: "계좌입금", memo: "2025년 6월 원본 수납자료" }),
  paymentRecord("박찬", { registered: "2025-06-25", paymentName: "한글떼기+요리수연산", tuition: 180000, paidAmount: 180000, paymentDate: "2025-06-25", paymentMethod: "망고페이", memo: "2025년 6월 원본 수납자료" }),
  paymentRecord("양정원", { registered: "2025-06-25", paymentName: "책통클럽 주2회", tuition: 160000, paidAmount: 160000, paymentDate: "2025-06-25", paymentMethod: "카드결제", memo: "2025년 6월 원본 수납자료" }),
  paymentRecord("양지혁", { registered: "2025-06-25", paymentName: "책통 주3회", tuition: 280000, paidAmount: 280000, paymentDate: "2025-06-28", paymentMethod: "카드결제", memo: "2025년 6월 원본 수납자료" }),
  paymentRecord("변세윤", { registered: "2025-06-25", paymentName: "한글중심+요리수연산", tuition: 270000, discount: -9160, paidAmount: 260840, paymentDate: "2025-06-25", paymentMethod: "카드결제", memo: "2025년 6월 원본 수납자료" }),
  paymentRecord("정서윤", { registered: "2025-06-25", paymentName: "수학의 달인", tuition: 180000, paidAmount: 180000, paymentDate: "2025-06-23", paymentMethod: "계좌입금", memo: "2025년 6월 원본 수납자료" }),
  paymentRecord("주현영", { registered: "2025-06-25", paymentName: "책통클럽 주2회+수달5회", tuition: 510000, paidAmount: 510000, paymentDate: "2025-06-25", paymentMethod: "계좌입금", memo: "2025년 6월 원본 수납자료" }),
  paymentRecord("오경훈", { registered: "2025-06-25", paymentName: "수달 주5회+책통 주2회", tuition: 390000, discount: -10500, paidAmount: 379500, paymentDate: "2025-06-28", paymentMethod: "카드결제", memo: "2025년 6월 원본 수납자료" }),
  paymentRecord("유하랑", { registered: "2025-06-25", paymentName: "책통2회+전과목3회+요리수", tuition: 280000, paidAmount: 280000, paymentDate: "2025-06-25", paymentMethod: "현금결제", memo: "2025년 6월 원본 수납자료" }),
  paymentRecord("이준수", { registered: "2025-06-25", paymentName: "미래엔 수학", tuition: 230000, paidAmount: 230000, paymentDate: "2025-06-28", paymentMethod: "망고페이", memo: "2025년 6월 원본 수납자료" }),
  paymentRecord("황다인", { registered: "2025-06-17", paymentName: "미래엔 수학 주5일", tuition: 95000, paidAmount: 95000, paymentDate: "2025-06-18", paymentMethod: "망고페이", memo: "2025년 6월 원본 수납자료" }),
  paymentRecord("이준수", { registered: "2025-06-10", paymentName: "미래엔 수학", tuition: 195500, paidAmount: 195500, paymentDate: "2025-06-10", paymentMethod: "망고페이", memo: "2025년 6월 원본 수납자료" }),
  paymentRecord("홍서현", { registered: "2025-06-09", paymentName: "정독법 주2회", tuition: 270000, paidAmount: 270000, paymentDate: "2025-06-09", paymentMethod: "카드결제", memo: "2025년 6월 원본 수납자료" }),
  paymentRecord("정아인", { registered: "2025-06-02", paymentName: "리딩하이 주2회", tuition: 180000, paidAmount: 180000, paymentDate: "2025-06-02", paymentMethod: "제로페이", memo: "2025년 6월 원본 수납자료" }),
  paymentRecord("김마가희", { registered: "2025-06-01", paymentName: "[이월] 20250525 책통3회 수학3회", tuition: 340000, paidAmount: 340000, paymentDate: "2025-06-11", paymentMethod: "망고페이", memo: "2025년 6월 원본 수납자료" }),
  paymentRecord("이승우", { registered: "2025-06-01", paymentName: "[이월] 20250525 책통클럽 주2회", tuition: 160000, paidAmount: 160000, paymentDate: "2025-06-02", paymentMethod: "제로페이", memo: "2025년 6월 원본 수납자료" }),
  paymentRecord("천예진", { registered: "2025-06-01", paymentName: "책통클럽 주2회", tuition: 160000, paidAmount: 160000, paymentDate: "2025-06-01", paymentMethod: "제로페이", memo: "2025년 6월 원본 수납자료" }),
  paymentRecord("이시율", { registered: "2025-06-01", paymentName: "책통클럽 주2회", tuition: 180000, paidAmount: 180000, paymentDate: "2025-06-07", paymentMethod: "카드결제", memo: "2025년 6월 원본 수납자료" }),
];

function excelPaymentStatus(status) {
  if (status === "완납") return "납부완료";
  return status || "납부완료";
}

function splitExcelSchoolGrade(value) {
  const text = String(value || "").trim();
  const match = text.match(/^(.+?)\s+(.+)$/);
  return {
    school: match ? match[1].trim() : text,
    grade: match ? match[2].trim() : "",
  };
}

function historicExcelPaymentRecord(record = {}) {
  const schoolGrade = splitExcelSchoolGrade(record.schoolGrade);
  const normalized = paymentRecord(record.studentName || "", {
    registered: record.registered || "",
    paymentType: record.paymentType || "",
    paymentName: record.paymentName || "",
    tuition: record.tuition || 0,
    discount: record.discount || 0,
    paidAmount: record.paidAmount || 0,
    unpaidAmount: record.unpaidAmount || 0,
    paymentDate: record.paymentDate || "",
    paymentMethod: record.paymentMethod || "",
    paymentParts: record.paymentParts || [],
    status: excelPaymentStatus(record.status),
    preservePaymentName: true,
    memo: record.source ? `엑셀 원본 ${record.source} ${record.sourceRow || ""}행` : "",
  });
  return {
    ...normalized,
    school: schoolGrade.school,
    grade: schoolGrade.grade,
    phone: record.phone || "",
    standalone: true,
  };
}

const HISTORIC_PAYMENT_RECORDS = (window.EXCEL_PAYMENT_HISTORY_DATA || []).map(historicExcelPaymentRecord);

const SEEDED_PAYMENT_RECORDS = [...JULY_PAYMENT_RECORDS, ...JUNE_PAYMENT_RECORDS];

function rosterStudent({ name, school, age, phone, guardian1 = "", guardian2 = "", studentContact = "", paymentDay, tuition, days, join }) {
  const payment = paymentUpdates[name];
  const memo = [
    guardian1 ? `보호자1: ${guardian1}` : "",
    guardian2 ? `보호자2: ${guardian2}` : "",
    studentContact ? `학생전화번호주소: ${studentContact}` : "",
  ].filter(Boolean).join("\n");

  return {
    ...blankStudent(),
    studentName: name,
    school,
    grade: gradeFromAge(age, school),
    studentPhone: studentContact,
    parentPhone: phone,
    parentPhone2: guardian1,
    parentPhone3: guardian2,
    tuition: payment?.tuition ?? tuition,
    attendanceDays: parseRosterDays(days),
    joinDate: parseRosterDate(join),
    enrollmentStatus: "재원",
    paymentStatus: payment?.status ?? "납부완료",
    paymentMethod: payment?.paymentMethod || "미정",
    paymentName: payment?.paymentName ?? "",
    paidAmount: payment?.paidAmount ?? tuition,
    unpaidAmount: payment?.unpaidAmount ?? 0,
    paymentDueDate: currentMonthDueDate(paymentDay),
    paymentDate: payment?.paymentDate ?? "",
    memo,
  };
}

const sampleStudents = [
  rosterStudent({ name: "김다은", school: "화정초", age: 12, phone: "010-8733-4426", paymentDay: 25, tuition: 390000, days: "월, 화, 수", join: "20260601" }),
  rosterStudent({ name: "김마가희", school: "분성중", age: 14, phone: "010-5479-8810", guardian1: "010-5779-8807", paymentDay: 25, tuition: 430000, days: "월, 수, 목", join: "20240531" }),
  rosterStudent({ name: "김민준", school: "삼계중", age: 14, phone: "010-4065-1235", paymentDay: 25, tuition: 460000, days: "월, 화, 수", join: "20260221" }),
  rosterStudent({ name: "김예겸", school: "화정초", age: 10, phone: "010-2998-4662", studentContact: "010-5956-4662", paymentDay: 25, tuition: 200000, days: "월, 화, 수", join: "20260105" }),
  rosterStudent({ name: "김예람", school: "화정초", age: 11, phone: "010-5263-6008", guardian1: "010-4214-4771", paymentDay: 25, tuition: 180000, days: "월, 화, 수", join: "20260617" }),
  rosterStudent({ name: "김예준", school: "화정초", age: 11, phone: "010-5263-6008", guardian1: "010-4214-4771", paymentDay: 25, tuition: 190000, days: "월, 화, 수", join: "20260617" }),
  rosterStudent({ name: "김지율", school: "삼계중", age: 14, phone: "010-2440-2993", paymentDay: 25, tuition: 230000, days: "월, 화, 수", join: "20250828" }),
  rosterStudent({ name: "김채원", school: "임호중", age: 14, phone: "010-9396-0007", paymentDay: 25, tuition: 200000, days: "토", join: "20260228" }),
  rosterStudent({ name: "문시영", school: "삼계초", age: 9, phone: "010-9085-3043", paymentDay: 25, tuition: 350000, days: "월, 화, 수", join: "20250318" }),
  rosterStudent({ name: "박이준", school: "유치원", age: 7, phone: "010-2770-9118", paymentDay: 25, tuition: 100000, days: "수, 토", join: "20260703" }),
  rosterStudent({ name: "박지훈", school: "화정초", age: 11, phone: "010-5430-9381", paymentDay: 25, tuition: 390000, days: "월, 화, 수", join: "20260129" }),
  rosterStudent({ name: "박진현", school: "화정초", age: 12, phone: "010-9396-7489", paymentDay: 25, tuition: 330000, days: "월, 화, 수", join: "20251023" }),
  rosterStudent({ name: "박찬", school: "삼계초", age: 9, phone: "010-5257-8717", guardian1: "010-5349-8717", paymentDay: 25, tuition: 180000, days: "월, 화, 수", join: "20240401" }),
  rosterStudent({ name: "백시율", school: "삼계초", age: 8, phone: "010-2309-5676", guardian1: "010-2430-9051", guardian2: "010-7751-0905", paymentDay: 25, tuition: 510000, days: "월, 화, 수", join: "20260509" }),
  rosterStudent({ name: "백시후", school: "삼계초", age: 10, phone: "010-2309-5676", guardian1: "010-7751-0905", guardian2: "010-2430-9051", paymentDay: 25, tuition: 490000, days: "월, 화, 수", join: "20260509" }),
  rosterStudent({ name: "변세윤", school: "분성초", age: 10, phone: "010-4766-8367", paymentDay: 25, tuition: 450000, days: "월, 화, 수", join: "20231030" }),
  rosterStudent({ name: "손승현", school: "화정초", age: 11, phone: "010-8181-3301", paymentDay: 1, tuition: 200000, days: "월, 화, 수", join: "20241113" }),
  rosterStudent({ name: "손윤우", school: "화정초", age: 11, phone: "010-4553-9686", paymentDay: 25, tuition: 360000, days: "월, 화, 수", join: "20260223" }),
  rosterStudent({ name: "손지원", school: "화정초", age: 12, phone: "010-5806-7815", paymentDay: 25, tuition: 160000, days: "수, 금", join: "20260107" }),
  rosterStudent({ name: "송효림", school: "화정초", age: 11, phone: "010-8687-1225", studentContact: "010-8312-1225", paymentDay: 25, tuition: 390000, days: "월, 화, 수", join: "20220307" }),
  rosterStudent({ name: "안서희", school: "분성중", age: 15, phone: "010-5124-6594", paymentDay: 0, tuition: 460000, days: "월, 수, 금", join: "20231117" }),
  rosterStudent({ name: "양지혁", school: "구지초", age: 10, phone: "010-5621-9259", paymentDay: 25, tuition: 190000, days: "화, 금, 토", join: "20240116" }),
  rosterStudent({ name: "오경훈", school: "구산중", age: 16, phone: "010-7979-9388", studentContact: "010-9205-9213", paymentDay: 25, tuition: 430000, days: "월, 수, 금", join: "20230102" }),
  rosterStudent({ name: "오주빈", school: "화정초", age: 10, phone: "010-5440-1356", paymentDay: 25, tuition: 340000, days: "월, 화, 수", join: "20250207" }),
  rosterStudent({ name: "유하랑", school: "삼계초", age: 11, phone: "010-5552-2422", guardian1: "010-8861-4604", paymentDay: 25, tuition: 340000, days: "월, 화, 수", join: "20220324" }),
  rosterStudent({ name: "유해강", school: "화정초", age: 11, phone: "010-7480-1234", studentContact: "010-8344-1727", paymentDay: 25, tuition: 500000, days: "월, 화, 수", join: "20240104" }),
  rosterStudent({ name: "윤수비", school: "화정초", age: 11, phone: "010-9516-2341", paymentDay: 25, tuition: 160000, days: "화, 목", join: "20260105" }),
  rosterStudent({ name: "이로운", school: "가정학습", age: 5, phone: "010-4483-0131", paymentDay: 0, tuition: 100000, days: "화", join: "20260511" }),
  rosterStudent({ name: "이서윤", school: "삼계중", age: 14, phone: "010-9552-8572", paymentDay: 25, tuition: 460000, days: "월, 화, 수", join: "20260601" }),
  rosterStudent({ name: "이서현", school: "구지초", age: 10, phone: "010-9221-4481", paymentDay: 25, tuition: 170000, days: "월, 화, 수", join: "20260224" }),
  rosterStudent({ name: "이승우", school: "생림초", age: 10, phone: "010-7221-1020", paymentDay: 25, tuition: 160000, days: "화, 목", join: "20250108" }),
  rosterStudent({ name: "이시율", school: "구산중", age: 15, phone: "010-4854-8970", paymentDay: 1, tuition: 560000, days: "월, 화, 수", join: "20240401" }),
  rosterStudent({ name: "이윤겸", school: "신명초", age: 8, phone: "010-7589-0510", paymentDay: 1, tuition: 200000, days: "목, 금", join: "20251010" }),
  rosterStudent({ name: "이지한", school: "화정초", age: 9, phone: "010-4225-0079", paymentDay: 25, tuition: 270000, days: "월, 화, 수", join: "20260418" }),
  rosterStudent({ name: "장명승", school: "삼계초", age: 13, phone: "010-9569-7090", paymentDay: 25, tuition: 390000, days: "월, 화, 수", join: "20260402" }),
  rosterStudent({ name: "장민서", school: "화정초", age: 13, phone: "010-8010-1282", paymentDay: 25, tuition: 200000, days: "월, 화, 수", join: "20260408" }),
  rosterStudent({ name: "장유주", school: "화정초", age: 11, phone: "010-2870-0142", paymentDay: 25, tuition: 370000, days: "월, 화, 수", join: "20251201" }),
  rosterStudent({ name: "전시우", school: "안명초", age: 12, phone: "010-7622-2725", paymentDay: 25, tuition: 330000, days: "화, 목, 금", join: "20260126" }),
  rosterStudent({ name: "전은결", school: "양지유치원", age: 7, phone: "010-8599-6698", paymentDay: 0, tuition: 100000, days: "수", join: "20260601" }),
  rosterStudent({ name: "정서윤", school: "화정초", age: 12, phone: "010-7381-4407", paymentDay: 25, tuition: 180000, days: "월, 화, 수", join: "20230501" }),
  rosterStudent({ name: "정예나", school: "화정초", age: 11, phone: "010-6787-0628", studentContact: "010-8224-8130", paymentDay: 25, tuition: 180000, days: "월, 수, 목", join: "20260225" }),
  rosterStudent({ name: "조수아", school: "화정초", age: 8, phone: "010-9212-8389", paymentDay: 25, tuition: 180000, days: "화, 수, 목", join: "20250224" }),
  rosterStudent({ name: "조윤하", school: "글로벌창의", age: 7, phone: "010-2054-1766", guardian1: "010-3077-1766", paymentDay: 25, tuition: 200000, days: "월, 화, 수", join: "20260227" }),
  rosterStudent({ name: "주현영", school: "삼계중", age: 15, phone: "010-6791-3117", studentContact: "010-2615-5059", paymentDay: 25, tuition: 640000, days: "월, 화, 수", join: "20230302" }),
  rosterStudent({ name: "천다솜", school: "화정초", age: 9, phone: "010-2856-9294", studentContact: "010-2852-9294", paymentDay: 25, tuition: 180000, days: "월, 화, 수", join: "20260406" }),
  rosterStudent({ name: "천다온", school: "화정초", age: 10, phone: "010-2856-9294", studentContact: "010-2730-7753", paymentDay: 25, tuition: 370000, days: "월, 화, 수", join: "20260406" }),
  rosterStudent({ name: "천예진", school: "이작초", age: 10, phone: "010-8632-1204", paymentDay: 1, tuition: 160000, days: "화, 토", join: "20240413" }),
  rosterStudent({ name: "최지원", school: "삼계초", age: 10, phone: "010-9404-9628", paymentDay: 25, tuition: 330000, days: "월, 금", join: "20250319" }),
  rosterStudent({ name: "홍서현", school: "구산중", age: 15, phone: "010-9474-8752", guardian1: "010-8490-0222", paymentDay: 25, tuition: 640000, days: "월, 화, 수", join: "20250604" }),
  rosterStudent({ name: "홍아영", school: "화정초", age: 13, phone: "010-4653-8649", paymentDay: 25, tuition: 190000, days: "월, 화, 수", join: "20260306" }),
  rosterStudent({ name: "황다인", school: "화정초", age: 13, phone: "010-5096-2022", paymentDay: 25, tuition: 370000, days: "월, 화, 수", join: "20250617" }),
  rosterStudent({ name: "황아진", school: "화정초", age: 10, phone: "010-9697-0957", paymentDay: 25, tuition: 330000, days: "월, 화, 수", join: "20260228" }),
];

const OFFICIAL_JOIN_DATES_BY_NAME = new Map(
  sampleStudents.map((student) => [canonicalStudentName(student.studentName), student.joinDate])
);

let students = loadStudents();
let standalonePaymentRecords = loadStandalonePaymentRecords();
let notices = loadNotices();
let financeRecords = loadFinanceRecords();
let fixedExpenseTemplates = loadFixedExpenseTemplates();
let tuitionRates = loadTuitionRates();
let bookFeeRates = loadBookFeeRates();
let financeSubjectFilter = { subject: "", type: "" };
let bookCatalog = loadBookCatalog();
let bookStockRecords = loadBookStockRecords();
let changeLogs = loadChangeLogs();
let userAccounts = loadUserAccounts();
let kakaoSettings = loadKakaoSettings();
let kakaoMessageLogs = loadKakaoMessageLogs();
let currentUser = loadCurrentUser();
let currentRoleMode = localStorage.getItem(ROLE_MODE_KEY) || "director";
let selectedId = "";
let expandedAttendanceId = "";
let attendanceTodayOnly = false;
let attendanceListMode = "all";
let selectedAttendanceDate = currentDateText();
let checkinMode = "arrive";
let checkinCodeValue = "";
let checkinResultMessage = "";
let checkinResultTone = "";
let checkinAutoTimer = null;
let studentListMode = "all";
let studentSummaryGrade = "";
let feedbackPhotoData = "";
let feedbackPhotoName = "";
let activeView = "dashboard";
let courseHistoryDraft = [];

const $ = (id) => document.getElementById(id);

const formFields = [
  "studentId",
  "studentName",
  "school",
  "grade",
  "studentPhone",
  "parentPhone",
  "parentPhone2",
  "parentPhone3",
  "parentPhone4",
  "teacher",
  "weeklySubjectSchedule",
  "joinDate",
  "leaveDate",
  "enrollmentStatus",
  "currentBooks",
  "completedBooks",
  "counselingRecords",
  "makeupDateRecords",
  "memo",
];

const parentContactFields = ["parentPhone2", "parentPhone3", "parentPhone4"];

function loadStudents() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed)) {
        const roster = parsed.map((student) => normalizeStudent(student, {
          applySubjectAssignments: false,
          includeSeedPayments: false,
        }));
        localStorage.setItem(STORAGE_KEY, JSON.stringify(roster));
        localStorage.setItem(ROSTER_VERSION_KEY, ROSTER_VERSION);
        return roster;
      }
    } catch {
      // 저장된 자료가 깨진 경우에만 아래 기본 명단으로 복구합니다.
    }
  }

  const roster = sampleStudents.map((student) => normalizeStudent(student, {
    applySubjectAssignments: true,
    includeSeedPayments: true,
  }));
  localStorage.setItem(STORAGE_KEY, JSON.stringify(roster));
  localStorage.setItem(ROSTER_VERSION_KEY, ROSTER_VERSION);
  return roster;
}

function loadStandalonePaymentRecords() {
  const saved = localStorage.getItem(PAYMENT_RECORDS_KEY);
  if (!saved) return uniquePaymentRecords(HISTORIC_PAYMENT_RECORDS.map((record) => ({ ...record, standalone: true })));
  try {
    const parsed = JSON.parse(saved);
    if (!Array.isArray(parsed)) return uniquePaymentRecords(HISTORIC_PAYMENT_RECORDS.map((record) => ({ ...record, standalone: true })));
    return uniquePaymentRecords([
      ...HISTORIC_PAYMENT_RECORDS,
      ...parsed,
    ].map((record) => ({ ...record, standalone: true })));
  } catch {
    return uniquePaymentRecords(HISTORIC_PAYMENT_RECORDS.map((record) => ({ ...record, standalone: true })));
  }
}

function normalizeFinanceRecord(record = {}) {
  const type = record.type === "expense" ? "expense" : "income";
  const categories = FINANCE_CATEGORIES[type];
  return {
    id: record.id || createId(),
    date: record.date || currentDateText(),
    type,
    category: record.category || categories[0],
    title: String(record.title || ""),
    amount: Number(record.amount || 0),
    method: String(record.method || ""),
    memo: String(record.memo || ""),
    fixedTemplateId: record.fixedTemplateId || "",
    fixedMonth: record.fixedMonth || "",
    confirmed: record.confirmed !== false,
  };
}

function loadFinanceRecords() {
  const saved = localStorage.getItem(FINANCE_RECORDS_KEY);
  if (!saved) return [];
  try {
    const parsed = JSON.parse(saved);
    if (!Array.isArray(parsed)) return [];
    return parsed.map(normalizeFinanceRecord).sort((a, b) => (b.date || "").localeCompare(a.date || ""));
  } catch {
    return [];
  }
}

function normalizeFixedExpenseTemplate(template = {}) {
  return {
    id: template.id || createId(),
    day: template.day || "1",
    category: template.category || FINANCE_CATEGORIES.expense[0],
    title: String(template.title || ""),
    amount: Number(template.amount || 0),
    method: String(template.method || ""),
    memo: String(template.memo || ""),
  };
}

function loadFixedExpenseTemplates() {
  const saved = localStorage.getItem(FIXED_EXPENSE_TEMPLATES_KEY);
  if (!saved) return [];
  try {
    const parsed = JSON.parse(saved);
    if (!Array.isArray(parsed)) return [];
    return parsed.map(normalizeFixedExpenseTemplate);
  } catch {
    return [];
  }
}

function normalizeTuitionRate(rate = {}) {
  const normalizedSubject = normalizeSubjectName(rate.subject, []);
  const subject = SUBJECTS.includes(normalizedSubject) ? normalizedSubject : (normalizedSubject || SUBJECTS[0]);
  return {
    id: rate.id || createId(),
    subject,
    courseName: String(rate.courseName || "").trim(),
    sessions: String(rate.sessions || "").trim(),
    amount: Number(rate.amount || 0),
    effectiveFrom: rate.effectiveFrom || currentDateText(),
    memo: String(rate.memo || "").trim(),
  };
}

function loadTuitionRates() {
  const saved = localStorage.getItem(TUITION_RATES_KEY);
  if (!saved) return [];
  try {
    const parsed = JSON.parse(saved);
    if (!Array.isArray(parsed)) return [];
    return parsed.map(normalizeTuitionRate).sort((a, b) => {
      const subjectCompare = String(a.subject || "").localeCompare(String(b.subject || ""), "ko");
      if (subjectCompare) return subjectCompare;
      const courseCompare = String(a.courseName || "").localeCompare(String(b.courseName || ""), "ko");
      if (courseCompare) return courseCompare;
      return String(b.effectiveFrom || "").localeCompare(String(a.effectiveFrom || ""));
    });
  } catch {
    return [];
  }
}

function normalizeBookFeeRate(rate = {}) {
  const normalizedSubject = normalizeSubjectName(rate.subject, []);
  const subject = SUBJECTS.includes(normalizedSubject) ? normalizedSubject : (normalizedSubject || SUBJECTS[0]);
  const inferredProgram = String(rate.id || "").startsWith("minerva-") ? "미네르바 독서논술" : "";
  return {
    id: rate.id || createId(),
    subject,
    program: String(rate.program || rate.series || inferredProgram).trim(),
    title: String(rate.title || "").trim(),
    level: String(rate.level || "").trim(),
    salePrice: Number(rate.salePrice || rate.amount || 0),
    purchasePrice: Number(rate.purchasePrice || 0),
    effectiveFrom: rate.effectiveFrom || currentDateText(),
    memo: String(rate.memo || "").trim(),
  };
}

function minervaBookFeeRate(subject, program, title, level, salePrice, memo = "") {
  const safeId = [subject, program, title, level]
    .join("-")
    .replaceAll(" ", "-")
    .replace(/[^\w가-힣-]/g, "")
    .toLowerCase();
  return normalizeBookFeeRate({
    id: `minerva-${safeId}`,
    subject,
    program,
    title,
    level,
    salePrice,
    purchasePrice: 0,
    effectiveFrom: "2026-07-10",
    memo,
  });
}

function defaultMinervaBookFeeRates() {
  const program = "미네르바 독서논술";
  return [
    minervaBookFeeRate("문해력", program, "리딩하이 정독교재", "1~3단계 전체", 15000, "1-1~3-10"),
    minervaBookFeeRate("문해력", program, "리딩하이 정독교재", "4단계 전체", 18000, "4-1~4-10"),
    minervaBookFeeRate("문해력", program, "리딩하이 정독교재", "S단계 전체", 18000, "S-1~S-10"),
    minervaBookFeeRate("문해력", program, "쓰기왕 갈래별 글쓰기", "기본/심화/갈래별", 15000, "일기 생활문, 편지 자기소개서, 독서감상문 기행문, 설명문 주장하는 글, 시"),
    minervaBookFeeRate("문해력", program, "만점 사과도", "3~6학년 전체", 15000, "사회·과학·도덕 개념어, 3-1~6-3"),
    minervaBookFeeRate("문해력", program, "스토리 한국사", "전체", 15000, "~초4 정도"),
    minervaBookFeeRate("문해력", program, "메타한국사", "전체", 18000, "초고~중등"),
    minervaBookFeeRate("문해력", program, "세미클래식", "전체", 15000, "초6~중등"),
    minervaBookFeeRate("문해력", program, "클래식", "전체", 15000, "중고등"),
    minervaBookFeeRate("문해력", program, "안상헌 글답", "1~6학년 전체", 15000, "초등 논술, 1-1~6-12"),
  ];
}

function bookFeeRateSignature(rate = {}) {
  return [rate.subject, rate.program, rate.title, rate.level].map((value) => String(value || "").trim()).join("|");
}

function loadBookFeeRates() {
  const saved = localStorage.getItem(BOOK_FEE_RATES_KEY);
  const alreadySeeded = localStorage.getItem(BOOK_FEE_RATES_SEED_KEY) === MINERVA_BOOK_FEE_SEED_VERSION;
  if (!saved && alreadySeeded) return [];
  try {
    const parsed = saved ? JSON.parse(saved) : [];
    if (!Array.isArray(parsed)) return [];
    let rates = parsed.map(normalizeBookFeeRate);
    if (!alreadySeeded) {
      rates = rates.filter((rate) => !String(rate.id || "").startsWith("minerva-"));
      const signatures = new Set(rates.map(bookFeeRateSignature));
      const defaults = defaultMinervaBookFeeRates().filter((rate) => !signatures.has(bookFeeRateSignature(rate)));
      rates = [...rates, ...defaults];
      localStorage.setItem(BOOK_FEE_RATES_KEY, JSON.stringify(rates));
      localStorage.setItem(BOOK_FEE_RATES_SEED_KEY, MINERVA_BOOK_FEE_SEED_VERSION);
    }
    return rates.sort((a, b) => {
      const subjectCompare = String(a.subject || "").localeCompare(String(b.subject || ""), "ko");
      if (subjectCompare) return subjectCompare;
      const titleCompare = String(a.title || "").localeCompare(String(b.title || ""), "ko");
      if (titleCompare) return titleCompare;
      return String(b.effectiveFrom || "").localeCompare(String(a.effectiveFrom || ""));
    });
  } catch {
    return [];
  }
}

function normalizeBook(book = {}) {
  return {
    id: book.id || createId(),
    subject: book.subject || SUBJECTS[0],
    title: String(book.title || ""),
    level: String(book.level || ""),
    volume: String(book.volume || ""),
    publisher: String(book.publisher || ""),
    purchasePrice: Number(book.purchasePrice || 0),
    salePrice: Number(book.salePrice || 0),
    memo: String(book.memo || ""),
  };
}

function loadBookCatalog() {
  const saved = localStorage.getItem(BOOK_CATALOG_KEY);
  if (!saved) return [];
  try {
    const parsed = JSON.parse(saved);
    if (!Array.isArray(parsed)) return [];
    return parsed.map(normalizeBook).sort((a, b) => bookDisplayName(a).localeCompare(bookDisplayName(b), "ko"));
  } catch {
    return [];
  }
}

function normalizeBookStockRecord(record = {}) {
  return {
    id: record.id || createId(),
    bookId: record.bookId || "",
    date: record.date || currentDateText(),
    type: record.type === "out" ? "out" : "in",
    quantity: Math.max(1, Number(record.quantity || 1)),
    unitPrice: Number(record.unitPrice || 0),
    partner: String(record.partner || ""),
    memo: String(record.memo || ""),
    financeRecordId: record.financeRecordId || "",
  };
}

function loadBookStockRecords() {
  const saved = localStorage.getItem(BOOK_STOCK_RECORDS_KEY);
  if (!saved) return [];
  try {
    const parsed = JSON.parse(saved);
    if (!Array.isArray(parsed)) return [];
    return parsed.map(normalizeBookStockRecord).sort((a, b) => (b.date || "").localeCompare(a.date || ""));
  } catch {
    return [];
  }
}

function normalizeStaffWorkRecord(record = {}) {
  return {
    id: record.id || createId(),
    date: record.date || currentDateText(),
    startTime: record.startTime || "",
    endTime: record.endTime || "",
    memo: String(record.memo || ""),
  };
}

function normalizeUserAccount(account = {}) {
  const role = ["director", "teacher", "desk"].includes(account.role) ? account.role : "teacher";
  const displayName = role === "teacher" && String(account.name || "").trim() === "강사"
    ? "선생님"
    : String(account.name || roleLabel(role)).trim();
  return {
    id: account.id || createId(),
    name: displayName,
    displayName: String(account.displayName || "").trim(),
    role,
    password: String(account.password || ""),
    workRecords: Array.isArray(account.workRecords)
      ? account.workRecords.map(normalizeStaffWorkRecord).sort((a, b) => (b.date || "").localeCompare(a.date || ""))
      : [],
  };
}

function loadUserAccounts() {
  const saved = localStorage.getItem(USER_ACCOUNTS_KEY);
  try {
    const parsed = saved ? JSON.parse(saved) : [];
    const parsedAccounts = Array.isArray(parsed) ? parsed.map(normalizeUserAccount) : [];
    const accounts = parsedAccounts.length ? parsedAccounts : DEFAULT_USER_ACCOUNTS.map(normalizeUserAccount);
    if (!accounts.some((account) => account.role === "director")) {
      accounts.unshift(normalizeUserAccount(DEFAULT_USER_ACCOUNTS[0]));
    }
    localStorage.setItem(USER_ACCOUNTS_KEY, JSON.stringify(accounts));
    return accounts;
  } catch {
    const accounts = DEFAULT_USER_ACCOUNTS.map(normalizeUserAccount);
    localStorage.setItem(USER_ACCOUNTS_KEY, JSON.stringify(accounts));
    return accounts;
  }
}

function saveUserAccounts() {
  try {
    localStorage.setItem(USER_ACCOUNTS_KEY, JSON.stringify(userAccounts));
  } catch {
    alert("직원 계정 저장공간이 부족합니다. 오래된 자료를 백업 후 정리해주세요.");
  }
}

function normalizeKakaoSettings(settings = {}) {
  return {
    ...DEFAULT_KAKAO_SETTINGS,
    ...settings,
    enabled: Boolean(settings.enabled),
    provider: String(settings.provider || ""),
    channelName: String(settings.channelName || DEFAULT_KAKAO_SETTINGS.channelName),
    arriveTemplateCode: String(settings.arriveTemplateCode || ""),
    leaveTemplateCode: String(settings.leaveTemplateCode || ""),
    arriveMessage: String(settings.arriveMessage || DEFAULT_KAKAO_SETTINGS.arriveMessage),
    leaveMessage: String(settings.leaveMessage || DEFAULT_KAKAO_SETTINGS.leaveMessage),
  };
}

function loadKakaoSettings() {
  const saved = localStorage.getItem(KAKAO_SETTINGS_KEY);
  try {
    return normalizeKakaoSettings(saved ? JSON.parse(saved) : DEFAULT_KAKAO_SETTINGS);
  } catch {
    return normalizeKakaoSettings(DEFAULT_KAKAO_SETTINGS);
  }
}

function saveKakaoSettingsToStorage() {
  try {
    localStorage.setItem(KAKAO_SETTINGS_KEY, JSON.stringify(kakaoSettings));
  } catch {
    alert("알림톡 설정을 저장할 공간이 부족합니다.");
  }
}

function normalizeKakaoMessageLog(log = {}) {
  return {
    id: log.id || createId(),
    createdAt: log.createdAt || new Date().toISOString(),
    date: log.date || currentDateText(),
    action: log.action === "leave" ? "leave" : "arrive",
    status: log.status || "발송대기",
    studentId: log.studentId || "",
    studentName: String(log.studentName || ""),
    phone: String(log.phone || ""),
    templateCode: String(log.templateCode || ""),
    message: String(log.message || ""),
    actorName: String(log.actorName || ""),
    resultMemo: String(log.resultMemo || ""),
  };
}

function loadKakaoMessageLogs() {
  const saved = localStorage.getItem(KAKAO_MESSAGE_LOGS_KEY);
  try {
    const parsed = saved ? JSON.parse(saved) : [];
    return Array.isArray(parsed) ? parsed.map(normalizeKakaoMessageLog) : [];
  } catch {
    return [];
  }
}

function saveKakaoMessageLogs() {
  try {
    localStorage.setItem(KAKAO_MESSAGE_LOGS_KEY, JSON.stringify(kakaoMessageLogs.slice(0, 1000)));
  } catch {
    alert("알림톡 기록 저장공간이 부족합니다. 오래된 기록을 백업 후 정리해주세요.");
  }
}

function loadCurrentUser() {
  const userId = localStorage.getItem(CURRENT_USER_KEY);
  return userAccounts?.find((account) => account.id === userId) || null;
}

function normalizeNotice(notice) {
  const checkedBy = Array.isArray(notice.checkedBy) ? notice.checkedBy : [];
  const comments = Array.isArray(notice.comments) ? notice.comments : [];
  return {
    id: notice.id || createId(),
    date: notice.date || new Date().toISOString().slice(0, 10),
    title: String(notice.title || "").trim(),
    text: String(notice.text || "").trim(),
    checkedBy: checkedBy
      .map((item) => ({
        id: item.id || createId(),
        name: String(item.name || "").trim(),
        checkedAt: item.checkedAt || new Date().toISOString().slice(0, 10),
      }))
      .filter((item) => item.name),
    comments: comments
      .map((item) => ({
        id: item.id || createId(),
        name: String(item.name || "").trim(),
        text: String(item.text || "").trim(),
        date: item.date || new Date().toISOString().slice(0, 10),
      }))
      .filter((item) => item.name || item.text),
  };
}

function loadNotices() {
  const saved = localStorage.getItem(NOTICE_STORAGE_KEY);
  if (!saved) return [];
  try {
    const parsed = JSON.parse(saved);
    if (!Array.isArray(parsed)) return [];
    return parsed
      .map(normalizeNotice)
      .filter((notice) => notice.title || notice.text)
      .sort((a, b) => (b.date || "").localeCompare(a.date || ""));
  } catch {
    return [];
  }
}

function loadChangeLogs() {
  const saved = localStorage.getItem(CHANGE_LOG_KEY);
  if (!saved) return [];
  try {
    const parsed = JSON.parse(saved);
    if (!Array.isArray(parsed)) return [];
    return parsed.map((log) => ({
      id: log.id || createId(),
      date: log.date || new Date().toISOString(),
      area: log.area || "기타",
      title: log.title || "변경사항",
      detail: log.detail || "",
      userId: log.userId || "",
      userName: log.userName || "기록 없음",
      userRole: log.userRole || "",
    }));
  } catch {
    return [];
  }
}

function currentDateText() {
  return formatDateText(new Date());
}

function formatDateText(date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

function nextDateText(value) {
  const date = dateFromText(value);
  if (!date) return currentDateText();
  date.setDate(date.getDate() + 1);
  return formatDateText(date);
}

function currentTimeText() {
  const now = new Date();
  return `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
}

function normalizeAttendanceRecord(record = {}) {
  const status = record.status === "결석" ? "결석" : "등원";
  return {
    id: record.id || createId(),
    date: record.date || "",
    status,
    arrivalTime: record.arrivalTime || "",
    departureTime: record.departureTime || "",
    absentReason: String(record.absentReason || "").trim(),
  };
}

function uniqueValues(values) {
  return [...new Set(values.filter(Boolean))];
}

function canonicalStudentName(name) {
  const trimmed = String(name || "").trim();
  return STUDENT_NAME_CORRECTIONS[trimmed] || trimmed;
}

function assignedSubjectsForStudent(name) {
  const canonicalName = canonicalStudentName(name);
  return Object.entries(SUBJECT_ASSIGNMENTS)
    .filter(([, names]) => names.includes(canonicalName))
    .map(([subject]) => subject);
}

function subjectStartRecordsForStudent(name) {
  const canonicalName = canonicalStudentName(name);
  return SUBJECT_START_RECORDS
    .filter((record) => canonicalStudentName(record.studentName) === canonicalName)
    .map((record) => ({
      id: `seed-${canonicalName}-${record.subject}-${record.startDate}`,
      date: record.startDate,
      subject: record.subject,
      action: record.action || "추가",
      memo: record.memo || "",
    }));
}

function normalizeCourseHistoryRecord(record = {}) {
  const action = ["시작", "추가", "중단"].includes(record.action) ? record.action : "시작";
  const subject = normalizeSubjectName(record.subject || "", []);
  return {
    id: record.id || createId(),
    date: String(record.date || record.startDate || "").trim(),
    action,
    subject: SUBJECTS.includes(subject) ? subject : String(record.subject || "").trim(),
    memo: String(record.memo || "").trim(),
  };
}

function courseHistoryDedupeKey(record = {}) {
  return [
    record.date || "",
    record.action || "",
    record.subject || "",
    normalizeCourseText(record.memo || ""),
  ].join("|");
}

function uniqueCourseHistoryRecords(records = []) {
  const byKey = new Map();
  records
    .map(normalizeCourseHistoryRecord)
    .filter((record) => record.date && record.subject)
    .forEach((record) => {
      byKey.set(courseHistoryDedupeKey(record), record);
    });
  return [...byKey.values()].sort((a, b) => (b.date || "").localeCompare(a.date || ""));
}

function normalizeSubjectName(subject, gongpilSubjects) {
  const normalizedSubject = String(subject || "")
    .trim()
    .replaceAll("리딩하이", "문해력")
    .replaceAll("독서논술", "문해력");

  if (!normalizedSubject) return "";
  if (normalizedSubject === "영어") return "미래엔 영어";
  if (normalizedSubject === "수학") return "미래엔 수학";
  if (normalizedSubject === "중등 수학" || normalizedSubject === "중등수학" || normalizedSubject === "중고등 수학" || normalizedSubject === "중고등수학") return "중등 수학";
  if (normalizedSubject === "고등 수학" || normalizedSubject === "고등수학") return "고등 수학";
  if (normalizedSubject === "한글" || normalizedSubject === "빠른한글" || normalizedSubject === "소한이") return "소한이 한글";

  if (GONGPIL_SUBJECTS.includes(normalizedSubject)) {
    gongpilSubjects.push(normalizedSubject);
    return "공필왕";
  }

  return normalizedSubject;
}

function normalizeCourseText(value) {
  let text = String(value || "")
    .replace(/\breading\s*high\b/gi, "문해력")
    .replace(/\breading\b/gi, "문해력")
    .replace(/\benglish\b/gi, "영어")
    .replace(/\bmath\b/gi, "수학")
    .replace(/\bhangul\b/gi, "한글")
    .replaceAll("리딩하이", "문해력")
    .replaceAll("독서논술", "문해력")
    .replaceAll("빠른한글 소한이", "소한이 한글")
    .replaceAll("빠른한글", "소한이 한글");

  text = text
    .replaceAll("미래엔 수학", "__FUTURE_MATH__")
    .replaceAll("미래엔 영어", "__FUTURE_ENGLISH__")
    .replaceAll("중고등 수학", "__MIDDLE_MATH__")
    .replaceAll("소한이 한글", "__SOHANI_HANGUL__")
    .replaceAll("중등 수학", "__MIDDLE_MATH__")
    .replaceAll("중등수학", "__MIDDLE_MATH__")
    .replaceAll("고등 수학", "__HIGH_MATH__")
    .replaceAll("고등수학", "__HIGH_MATH__")
    .replaceAll("__MIDDLE_MATH__영어", "__MIDDLE_MATH__+영어")
    .replaceAll("__HIGH_MATH__영어", "__HIGH_MATH__+영어")
    .replaceAll("영어", "미래엔 영어")
    .replaceAll("수학", "미래엔 수학")
    .replaceAll("한글", "소한이 한글");

  return text
    .replaceAll("__FUTURE_MATH__", "미래엔 수학")
    .replaceAll("__FUTURE_ENGLISH__", "미래엔 영어")
    .replaceAll("__MIDDLE_MATH__", "중등 수학")
    .replaceAll("__HIGH_MATH__", "고등 수학")
    .replaceAll("__SOHANI_HANGUL__", "소한이 한글");
}

function normalizeKoreanCourseInput(input) {
  if (!input || !("value" in input)) return;
  input.value = normalizeCourseText(input.value);
}

function normalizePaymentRecord(record) {
  const normalized = paymentRecord(record.studentName || "", {
    registered: record.registered || "",
    paymentName: record.paymentName || "",
    baseTuition: record.baseTuition ?? record.tuition ?? 0,
    tuition: record.tuition || 0,
    discount: record.discount || 0,
    paidAmount: record.paidAmount || 0,
    unpaidAmount: record.unpaidAmount || 0,
    paymentDate: record.paymentDate || "",
    paymentMethod: record.paymentMethod || "",
    cashReceiptDate: record.cashReceiptDate || "",
    memo: record.memo || "",
    bookFeeTitle: record.bookFeeTitle || "",
    bookFeeCount: record.bookFeeCount || "",
    bookFeeAmount: record.bookFeeAmount || 0,
    bookFees: record.bookFees || [],
    subjectAllocations: record.subjectAllocations || [],
    paymentParts: record.paymentParts || [],
    status: record.status || (Number(record.unpaidAmount || 0) > 0 ? "미납" : "납부완료"),
    preservePaymentName: Boolean(record.preservePaymentName),
  });
  return {
    ...normalized,
    id: record.autoDue ? (record.id || normalized.id) : normalized.id,
    school: String(record.school || "").trim(),
    grade: String(record.grade || "").trim(),
    phone: String(record.phone || "").trim(),
    studentId: String(record.studentId || "").trim(),
    autoDue: Boolean(record.autoDue),
    standalone: Boolean(record.standalone),
  };
}

function seedPaymentRecordsForStudent(studentName) {
  const canonicalName = canonicalStudentName(studentName);
  return SEEDED_PAYMENT_RECORDS.filter((record) => record.studentName === canonicalName);
}

function paymentRecordDedupeKey(record = {}) {
  return [
    canonicalStudentName(record.studentName),
    record.registered || "",
    record.paymentDate || "",
    normalizeCourseText(record.paymentName || ""),
  ].join("|");
}

function preferPaymentRecord(current, next) {
  if (!current) return next;
  if (current.autoDue && !next.autoDue) return next;
  if (next.autoDue && !current.autoDue) return current;
  if (Number(next.paidAmount || 0) > 0 && Number(current.paidAmount || 0) <= 0) return next;
  const currentHasMemo = Boolean(current.memo);
  const nextHasMemo = Boolean(next.memo);
  const currentHasBooks = bookFeeItems(current).length > 0;
  const nextHasBooks = bookFeeItems(next).length > 0;

  if (next.standalone && !current.standalone) return next;
  if (nextHasBooks && !currentHasBooks) return next;
  if (nextHasMemo && !currentHasMemo) return next;
  if (String(next.id || "").length > String(current.id || "").length) return next;
  return current;
}

function uniquePaymentRecords(records = []) {
  const byKey = new Map();
  records
    .map(normalizePaymentRecord)
    .forEach((record) => {
      if (!record.studentName) return;
      const key = paymentRecordDedupeKey(record);
      byKey.set(key, preferPaymentRecord(byKey.get(key), record));
    });
  return [...byKey.values()].sort((a, b) => (b.paymentDate || b.registered || "").localeCompare(a.paymentDate || a.registered || ""));
}

function normalizeStudent(student, options = {}) {
  const { applySubjectAssignments = false, includeSeedPayments = false } = options;
  const normalized = { ...blankStudent(), ...student };
  normalized.studentName = canonicalStudentName(normalized.studentName);
  normalized.studentPhone = normalized.studentPhone || extractMemoValue(normalized.memo, "학생전화번호주소");
  normalized.parentName = String(normalized.parentName || "");
  normalized.parentPhone2 = String(normalized.parentPhone2 || extractMemoValue(normalized.memo, "보호자1"));
  normalized.parentPhone3 = String(normalized.parentPhone3 || extractMemoValue(normalized.memo, "보호자2"));
  normalized.parentPhone4 = String(normalized.parentPhone4 || "");
  if (normalized.paymentMethod === "자동이체") normalized.paymentMethod = "제로페이";
  if (normalized.paymentStatus === "부분납") normalized.paymentStatus = "미납";
  if (normalized.enrollmentStatus === "휴무") normalized.enrollmentStatus = "재원";
  if (!Array.isArray(normalized.subjects)) normalized.subjects = [];
  if (!Array.isArray(normalized.gongpilSubjects)) normalized.gongpilSubjects = [];
  const gongpilSubjects = [...normalized.gongpilSubjects].filter((subject) => GONGPIL_SUBJECTS.includes(subject));
  normalized.subjects = uniqueValues(normalized.subjects.map((subject) => normalizeSubjectName(subject, gongpilSubjects)))
    .filter((subject) => SUBJECTS.includes(subject));
  const assignedSubjects = assignedSubjectsForStudent(normalized.studentName);
  if (applySubjectAssignments && assignedSubjects.length) {
    normalized.subjects = uniqueValues([
      ...normalized.subjects.filter((subject) => !["미래엔 수학", "중등 수학", "고등 수학", "문해력"].includes(subject)),
      ...assignedSubjects,
    ]);
  }
  normalized.gongpilSubjects = uniqueValues(gongpilSubjects).filter((subject) => GONGPIL_SUBJECTS.includes(subject));
  if (normalized.gongpilSubjects.length && !normalized.subjects.includes("공필왕")) {
    normalized.subjects.push("공필왕");
  }
  normalized.paymentName = normalizeCourseText(normalized.paymentName);
  normalized.currentBooks = normalizeCourseText(normalized.currentBooks);
  normalized.completedBooks = normalizeCourseText(normalized.completedBooks);
  normalized.weeklySubjectSchedule = normalizeCourseText(normalized.weeklySubjectSchedule);
  normalized.paymentDueDate = normalized.paymentDueDate || currentMonthDueDate(extractPaymentDayFromMemo(normalized.memo));
  normalized.paymentMemo = String(normalized.paymentMemo || "");
  normalized.paymentDiscount = Number(normalized.paymentDiscount || 0);
  normalized.bookFeeTitle = String(normalized.bookFeeTitle || "");
  normalized.bookFeeCount = String(normalized.bookFeeCount || "");
  normalized.bookFeeAmount = Number(normalized.bookFeeAmount || 0);
  normalized.subjectAllocations = normalizeSubjectAllocations(normalized.subjectAllocations);
  normalized.courseHistory = uniqueCourseHistoryRecords([
    ...(Array.isArray(student.courseHistory) ? student.courseHistory : subjectStartRecordsForStudent(normalized.studentName)),
  ]);
  if (normalized.attendanceStatus === "출석") normalized.attendanceStatus = "등원";
  normalized.memo = cleanLearningMemo(normalized.memo);
  normalized.paymentRecords = uniquePaymentRecords([
    ...(Array.isArray(normalized.paymentRecords) ? normalized.paymentRecords : []),
    ...(includeSeedPayments ? seedPaymentRecordsForStudent(normalized.studentName) : []),
  ]);
  if (!Array.isArray(normalized.attendanceDays)) normalized.attendanceDays = [];
  normalized.attendanceDays = normalized.attendanceDays
    .map(Number)
    .filter((day) => WEEKDAYS.some((weekday) => weekday.value === day));
  if (!Array.isArray(normalized.feedbackRecords)) normalized.feedbackRecords = [];
  normalized.feedbackRecords = normalized.feedbackRecords.map((record) => ({
    id: record.id || createId(),
    date: record.date || "",
    subject: record.subject || "",
    unit: record.unit || "",
    understanding: record.understanding || "",
    attitude: record.attitude || "",
    homework: record.homework || "",
    text: record.text || "",
    photoData: record.photoData || "",
    photoName: record.photoName || "",
  }));
  if (!Array.isArray(normalized.attendanceRecords)) normalized.attendanceRecords = [];
  normalized.attendanceRecords = normalized.attendanceRecords
    .map(normalizeAttendanceRecord)
    .filter((record) => record.date)
    .sort((a, b) => (b.date || "").localeCompare(a.date || ""));
  return normalized;
}

function saveStudents() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(students));
  } catch {
    alert("저장 공간이 부족합니다. 피드백 사진을 줄이거나 오래된 사진 기록을 정리해주세요.");
  }
}

function saveStandalonePaymentRecords() {
  try {
    localStorage.setItem(PAYMENT_RECORDS_KEY, JSON.stringify(standalonePaymentRecords));
  } catch {
    alert("수납자료 저장 공간이 부족합니다. 먼저 수납자료 백업을 저장한 뒤 오래된 사진 기록을 정리해주세요.");
  }
}

function saveFinanceRecords() {
  try {
    localStorage.setItem(FINANCE_RECORDS_KEY, JSON.stringify(financeRecords));
  } catch {
    alert("매출관리 저장 공간이 부족합니다. 전체 백업을 먼저 저장한 뒤 오래된 자료를 정리해주세요.");
  }
}

function saveFixedExpenseTemplates() {
  try {
    localStorage.setItem(FIXED_EXPENSE_TEMPLATES_KEY, JSON.stringify(fixedExpenseTemplates));
  } catch {
    alert("고정지출 템플릿 저장 공간이 부족합니다. 전체 백업을 먼저 저장한 뒤 다시 시도해주세요.");
  }
}

function saveTuitionRates() {
  try {
    localStorage.setItem(TUITION_RATES_KEY, JSON.stringify(tuitionRates));
  } catch {
    alert("교육비 기준표 저장 공간이 부족합니다. 전체 백업을 먼저 저장한 뒤 오래된 자료를 정리해주세요.");
  }
}

function saveBookFeeRates() {
  try {
    localStorage.setItem(BOOK_FEE_RATES_KEY, JSON.stringify(bookFeeRates));
  } catch {
    alert("교재비 기준표 저장 공간이 부족합니다. 전체 백업을 먼저 저장한 뒤 오래된 자료를 정리해주세요.");
  }
}

function saveBookCatalog() {
  try {
    localStorage.setItem(BOOK_CATALOG_KEY, JSON.stringify(bookCatalog));
  } catch {
    alert("교재목록 저장 공간이 부족합니다. 전체 백업을 먼저 저장한 뒤 다시 시도해주세요.");
  }
}

function saveBookStockRecords() {
  try {
    localStorage.setItem(BOOK_STOCK_RECORDS_KEY, JSON.stringify(bookStockRecords));
  } catch {
    alert("교재 입출고 기록 저장 공간이 부족합니다. 전체 백업을 먼저 저장한 뒤 다시 시도해주세요.");
  }
}

function cleanupDuplicatePaymentRecords() {
  let changed = false;
  students = students.map((student) => {
    const officialJoinDate = OFFICIAL_JOIN_DATES_BY_NAME.get(canonicalStudentName(student.studentName));
    const before = JSON.stringify(student.paymentRecords || []);
    const paymentRecords = uniquePaymentRecords(student.paymentRecords || []);
    if (before !== JSON.stringify(paymentRecords)) changed = true;
    if (officialJoinDate && student.joinDate !== officialJoinDate) changed = true;
    return {
      ...student,
      joinDate: officialJoinDate || student.joinDate,
      paymentRecords,
    };
  });

  const standaloneBefore = JSON.stringify(standalonePaymentRecords || []);
  standalonePaymentRecords = uniquePaymentRecords((standalonePaymentRecords || [])
    .map((record) => ({ ...record, standalone: true })));
  if (standaloneBefore !== JSON.stringify(standalonePaymentRecords)) changed = true;

  if (changed) {
    saveStudents();
    saveStandalonePaymentRecords();
  }
}

function saveNotices() {
  try {
    localStorage.setItem(NOTICE_STORAGE_KEY, JSON.stringify(notices));
  } catch {
    alert("공지사항 저장 공간이 부족합니다. 오래된 사진 기록을 정리한 뒤 다시 저장해주세요.");
  }
}

function saveChangeLogs() {
  try {
    localStorage.setItem(CHANGE_LOG_KEY, JSON.stringify(changeLogs.slice(0, 500)));
  } catch {
    // 변경이력 저장 실패가 주요 업무 저장을 막지 않도록 조용히 넘어갑니다.
  }
}

function addChangeLog(area, title, detail = "") {
  const actor = currentActor();
  changeLogs = [
    {
      id: createId(),
      date: new Date().toISOString(),
      area,
      title,
      detail,
      userId: actor.id,
      userName: actor.name,
      userRole: actor.role,
    },
    ...changeLogs,
  ].slice(0, 500);
  saveChangeLogs();
  renderArchive();
}

function roleLabel(role) {
  if (role === "director") return "원장";
  if (role === "desk") return "데스크";
  if (role === "guest") return "미로그인";
  if (!role) return "권한 없음";
  return "선생님";
}

function currentActor() {
  return currentUser || { id: "anonymous", name: "미로그인", role: "guest" };
}

function staffPublicName(account = {}) {
  return String(account.displayName || account.name || roleLabel(account.role) || "이름 없음").trim();
}

function requireLogin() {
  if (currentUser) return true;
  showLoginScreen();
  return false;
}

function isDirector() {
  return currentUser?.role === "director";
}

function canDeleteData() {
  return isDirector();
}

function requireDeletePermission() {
  if (canDeleteData()) return true;
  alert("삭제는 원장 권한에서만 가능합니다. 필요한 경우 원장 계정으로 로그인해주세요.");
  addChangeLog("권한 차단", "삭제 시도 차단", `${currentActor().name} 계정에서 삭제를 시도했습니다.`);
  return false;
}

function renderLoginOptions() {
  const select = $("loginUserSelect");
  if (!select) return;
  select.innerHTML = userAccounts.map((account) => `
    <option value="${escapeHtml(account.id)}">${escapeHtml(staffPublicName(account))} (${roleLabel(account.role)})</option>
  `).join("");
}

function showLoginScreen() {
  renderLoginOptions();
  $("loginScreen")?.classList.remove("hidden");
  $("loginPassword")?.focus();
}

function hideLoginScreen() {
  $("loginScreen")?.classList.add("hidden");
  if ($("loginPassword")) $("loginPassword").value = "";
}

function applyUserSession() {
  const actor = currentActor();
  if ($("currentUserChip")) {
    $("currentUserChip").textContent = currentUser
      ? `${staffPublicName(actor)} · ${roleLabel(actor.role)}`
      : "미로그인";
  }
  if (currentUser) {
    currentRoleMode = currentUser.role === "director"
      ? (["director", "teacher", "desk"].includes(currentRoleMode) ? currentRoleMode : "director")
      : currentUser.role;
    if ($("roleModeSelect")) {
      $("roleModeSelect").value = currentRoleMode;
      $("roleModeSelect").disabled = currentUser.role !== "director";
    }
    hideLoginScreen();
  } else {
    if ($("roleModeSelect")) $("roleModeSelect").disabled = true;
    showLoginScreen();
  }
  applyRoleMode();
}

function login() {
  const account = userAccounts.find((item) => item.id === $("loginUserSelect")?.value);
  const password = $("loginPassword")?.value || "";
  if (!account || account.password !== password) {
    alert("비밀번호가 맞지 않습니다.");
    $("loginPassword")?.focus();
    return;
  }
  currentUser = account;
  localStorage.setItem(CURRENT_USER_KEY, account.id);
  currentRoleMode = account.role;
  localStorage.setItem(ROLE_MODE_KEY, currentRoleMode);
  addChangeLog("로그인", "로그인", `${account.name} (${roleLabel(account.role)})`);
  applyUserSession();
}

function logout() {
  if (currentUser) addChangeLog("로그인", "로그아웃", `${currentUser.name} (${roleLabel(currentUser.role)})`);
  currentUser = null;
  localStorage.removeItem(CURRENT_USER_KEY);
  applyUserSession();
}

function staffAccountById(id) {
  return userAccounts.find((account) => account.id === id);
}

function currentStaffAccount() {
  return currentUser ? staffAccountById(currentUser.id) : null;
}

function staffTodayRecord(account) {
  return (account?.workRecords || []).find((record) => record.date === currentDateText());
}

function staffRecordsForMonth(account, month = currentMonthText()) {
  return [...(account?.workRecords || [])]
    .filter((record) => String(record.date || "").slice(0, 7) === month)
    .sort((a, b) => `${b.date || ""} ${b.startTime || ""}`.localeCompare(`${a.date || ""} ${a.startTime || ""}`));
}

function upsertStaffWorkRecord(account, record) {
  const normalized = normalizeStaffWorkRecord(record);
  const records = (account.workRecords || []).filter((item) => item.date !== normalized.date);
  account.workRecords = [normalized, ...records]
    .filter((item) => item.date)
    .sort((a, b) => (b.date || "").localeCompare(a.date || ""));
}

function staffStatusText(account) {
  const record = staffTodayRecord(account);
  if (!record) return "오늘 기록 없음";
  return `출근 ${record.startTime || "-"} · 퇴근 ${record.endTime || "-"}`;
}

function attendanceActionLabel(action) {
  return action === "leave" ? "하원" : "등원";
}

function kakaoTemplateCodeForAction(action) {
  return action === "leave" ? kakaoSettings.leaveTemplateCode : kakaoSettings.arriveTemplateCode;
}

function kakaoMessageTemplateForAction(action) {
  return action === "leave" ? kakaoSettings.leaveMessage : kakaoSettings.arriveMessage;
}

function fillKakaoTemplate(template, student, timeText) {
  return String(template || "")
    .replaceAll("#{학생명}", student.studentName || "학생")
    .replaceAll("#{시간}", timeText || currentTimeText())
    .replaceAll("#{학원명}", kakaoSettings.channelName || "미래엔 에듀 영수학원");
}

function queueKakaoAttendanceMessage(student, action, timeText, dateText) {
  if (!kakaoSettings.enabled) return false;
  const phone = student.parentPhone || student.parentPhone2 || student.parentPhone3 || student.parentPhone4 || "";
  if (!phone) return false;
  const nextLog = normalizeKakaoMessageLog({
    id: `kakao:${dateText}:${action}:${student.id}`,
    createdAt: new Date().toISOString(),
    date: dateText,
    action,
    status: "발송대기",
    studentId: student.id,
    studentName: student.studentName,
    phone,
    templateCode: kakaoTemplateCodeForAction(action),
    message: fillKakaoTemplate(kakaoMessageTemplateForAction(action), student, timeText),
    actorName: currentActor().name,
    resultMemo: "API 연동 전 준비기록",
  });
  kakaoMessageLogs = [
    nextLog,
    ...kakaoMessageLogs.filter((log) => log.id !== nextLog.id),
  ].slice(0, 1000);
  saveKakaoMessageLogs();
  return true;
}

function clearStaffAccountForm() {
  if ($("staffAccountId")) $("staffAccountId").value = "";
  if ($("staffNameInput")) $("staffNameInput").value = "";
  if ($("staffDisplayNameInput")) $("staffDisplayNameInput").value = "";
  if ($("staffRoleInput")) $("staffRoleInput").value = "teacher";
  if ($("staffPasswordInput")) $("staffPasswordInput").value = "";
}

function saveStaffAccount() {
  if (!isDirector()) {
    alert("직원 계정 등록은 원장 계정에서만 가능합니다.");
    return;
  }
  const id = $("staffAccountId")?.value || createId();
  const name = ($("staffNameInput")?.value || "").trim();
  const displayName = ($("staffDisplayNameInput")?.value || "").trim();
  const role = ["director", "teacher", "desk"].includes($("staffRoleInput")?.value) ? $("staffRoleInput").value : "teacher";
  const password = ($("staffPasswordInput")?.value || "").trim();
  if (!name) {
    alert("직원 이름을 입력해주세요.");
    $("staffNameInput")?.focus();
    return;
  }
  if (!password) {
    alert("비밀번호를 입력해주세요.");
    $("staffPasswordInput")?.focus();
    return;
  }

  const existing = staffAccountById(id);
  if (existing?.role === "director" && role !== "director") {
    const directorCount = userAccounts.filter((account) => account.role === "director").length;
    if (directorCount <= 1) {
      alert("원장 계정은 최소 1개가 필요합니다.");
      return;
    }
  }
  const nextAccount = normalizeUserAccount({
    id,
    name,
    displayName,
    role,
    password,
    workRecords: existing?.workRecords || [],
  });
  userAccounts = [
    nextAccount,
    ...userAccounts.filter((account) => account.id !== id),
  ];
  saveUserAccounts();
  if (currentUser?.id === id) currentUser = nextAccount;
  renderLoginOptions();
  clearStaffAccountForm();
  addChangeLog("직원관리", existing ? "직원 계정 수정" : "직원 계정 등록", `${nextAccount.name} · ${roleLabel(nextAccount.role)}`);
  renderAll();
}

function editStaffAccount(id) {
  if (!isDirector()) return;
  const account = staffAccountById(id);
  if (!account) return;
  $("staffAccountId").value = account.id;
  $("staffNameInput").value = account.name || "";
  $("staffDisplayNameInput").value = account.displayName || "";
  $("staffRoleInput").value = account.role || "teacher";
  $("staffPasswordInput").value = account.password || "";
  $("staffNameInput").focus();
}

function deleteStaffAccount(id) {
  if (!requireDeletePermission()) return;
  const account = staffAccountById(id);
  if (!account) return;
  if (account.id === currentUser?.id) {
    alert("현재 로그인 중인 계정은 삭제할 수 없습니다.");
    return;
  }
  const directorCount = userAccounts.filter((item) => item.role === "director").length;
  if (account.role === "director" && directorCount <= 1) {
    alert("원장 계정은 최소 1개가 필요합니다.");
    return;
  }
  if (!confirm(`${account.name || "선택한 직원"} 계정을 삭제할까요? 근태기록도 함께 삭제됩니다.`)) return;
  userAccounts = userAccounts.filter((item) => item.id !== id);
  saveUserAccounts();
  renderLoginOptions();
  clearStaffAccountForm();
  addChangeLog("직원관리", "직원 계정 삭제", `${account.name || "이름 없음"} · ${roleLabel(account.role)}`);
  renderAll();
}

function clockStaff(action) {
  const account = currentStaffAccount();
  if (!account) {
    showLoginScreen();
    return;
  }
  const now = currentTimeText();
  const today = currentDateText();
  const existing = staffTodayRecord(account) || { id: createId(), date: today, startTime: "", endTime: "", memo: "" };
  const nextRecord = {
    ...existing,
    date: today,
    startTime: action === "start" ? (existing.startTime || now) : (existing.startTime || now),
    endTime: action === "end" ? now : existing.endTime,
  };
  upsertStaffWorkRecord(account, nextRecord);
  saveUserAccounts();
  currentUser = account;
  addChangeLog("근태관리", action === "start" ? "출근 기록" : "퇴근 기록", `${account.name} · ${today} ${now}`);
  renderAll();
}

function renderStaffAccounts() {
  const root = $("staffAccountList");
  if (!root) return;
  root.innerHTML = userAccounts.length
    ? userAccounts.map((account) => `
      <article class="staff-account-item">
        <div>
          <strong>${escapeHtml(account.name || "이름 없음")}</strong>
          <span>${escapeHtml(roleLabel(account.role))} · 표시 ${escapeHtml(staffPublicName(account))} · 비밀번호 ${account.password ? "등록됨" : "미등록"}</span>
          <p>이번 달 근태 ${staffRecordsForMonth(account).length}건</p>
        </div>
        <div class="row-actions">
          <button class="mini-button" type="button" data-staff-edit="${escapeHtml(account.id)}">수정</button>
          <button class="mini-danger-button" type="button" data-staff-delete="${escapeHtml(account.id)}">삭제</button>
        </div>
      </article>
    `).join("")
    : `<p class="empty-feedback">등록된 직원 계정이 없습니다.</p>`;
}

function renderStaffAttendance() {
  const root = $("staffAttendanceList");
  if (!root) return;
  const month = $("staffMonthFilter")?.value || currentMonthText();
  const query = ($("staffSearchInput")?.value || "").trim().toLowerCase();
  const visibleAccounts = isDirector() ? userAccounts : userAccounts.filter((account) => account.id === currentUser?.id);
  const records = visibleAccounts.flatMap((account) => staffRecordsForMonth(account, month).map((record) => ({ account, record })))
    .filter(({ account, record }) => {
      const target = [account.name, staffPublicName(account), roleLabel(account.role), record.date, record.startTime, record.endTime, record.memo].join(" ").toLowerCase();
      return !query || target.includes(query);
    });

  root.innerHTML = records.length
    ? records.map(({ account, record }) => `
      <article class="staff-attendance-item">
        <div>
          <strong>${escapeHtml(staffPublicName(account))} · ${escapeHtml(compactDate(record.date))}</strong>
          <span>${escapeHtml(roleLabel(account.role))} · 출근 ${escapeHtml(record.startTime || "-")} · 퇴근 ${escapeHtml(record.endTime || "-")}</span>
          ${record.memo ? `<p>${escapeHtml(record.memo)}</p>` : ""}
        </div>
      </article>
    `).join("")
    : `<p class="empty-feedback">선택한 달의 근태기록이 없습니다.</p>`;
}

function renderStaffManagement() {
  if (!$("staffView")) return;
  const account = currentStaffAccount();
  $("staffAccountPanel")?.classList.toggle("hidden", !isDirector());
  if ($("staffClockLabel")) $("staffClockLabel").textContent = formatTodayLabel();
  if ($("staffCurrentUserName")) $("staffCurrentUserName").textContent = account ? `${staffPublicName(account)} · ${roleLabel(account.role)}` : "로그인 사용자";
  if ($("staffTodayStatus")) $("staffTodayStatus").textContent = account ? staffStatusText(account) : "로그인 후 사용할 수 있습니다.";
  renderStaffAccounts();
  renderStaffAttendance();
}

function renderKakaoSettings() {
  if (!$("kakaoView")) return;
  if ($("kakaoEnabled")) $("kakaoEnabled").checked = Boolean(kakaoSettings.enabled);
  if ($("kakaoProvider")) $("kakaoProvider").value = kakaoSettings.provider || "";
  if ($("kakaoChannelName")) $("kakaoChannelName").value = kakaoSettings.channelName || "";
  if ($("kakaoArriveTemplate")) $("kakaoArriveTemplate").value = kakaoSettings.arriveTemplateCode || "";
  if ($("kakaoLeaveTemplate")) $("kakaoLeaveTemplate").value = kakaoSettings.leaveTemplateCode || "";
  if ($("kakaoArriveMessage")) $("kakaoArriveMessage").value = kakaoSettings.arriveMessage || "";
  if ($("kakaoLeaveMessage")) $("kakaoLeaveMessage").value = kakaoSettings.leaveMessage || "";
  renderKakaoLogs();
}

function saveKakaoSettings() {
  if (!isDirector()) {
    alert("알림톡 설정은 원장 계정에서만 변경할 수 있습니다.");
    return;
  }
  kakaoSettings = normalizeKakaoSettings({
    enabled: $("kakaoEnabled")?.checked,
    provider: $("kakaoProvider")?.value.trim(),
    channelName: $("kakaoChannelName")?.value.trim(),
    arriveTemplateCode: $("kakaoArriveTemplate")?.value.trim(),
    leaveTemplateCode: $("kakaoLeaveTemplate")?.value.trim(),
    arriveMessage: $("kakaoArriveMessage")?.value.trim(),
    leaveMessage: $("kakaoLeaveMessage")?.value.trim(),
  });
  saveKakaoSettingsToStorage();
  addChangeLog("알림톡", "알림톡 설정 저장", kakaoSettings.enabled ? "출석체크 알림톡 발송대기 사용" : "알림톡 발송대기 미사용");
  renderKakaoSettings();
  alert("알림톡 설정을 저장했습니다.");
}

function resetKakaoPreviewMessages() {
  if ($("kakaoArriveMessage")) $("kakaoArriveMessage").value = DEFAULT_KAKAO_SETTINGS.arriveMessage;
  if ($("kakaoLeaveMessage")) $("kakaoLeaveMessage").value = DEFAULT_KAKAO_SETTINGS.leaveMessage;
}

function renderKakaoLogs() {
  const root = $("kakaoLogList");
  if (!root) return;
  const month = $("kakaoMonthFilter")?.value || currentMonthText();
  const query = ($("kakaoSearchInput")?.value || "").trim().toLowerCase();
  const records = kakaoMessageLogs
    .filter((log) => String(log.date || "").slice(0, 7) === month)
    .filter((log) => {
      const target = [log.studentName, log.phone, log.status, log.message, attendanceActionLabel(log.action)].join(" ").toLowerCase();
      return !query || target.includes(query);
    })
    .sort((a, b) => (b.createdAt || "").localeCompare(a.createdAt || ""));

  root.innerHTML = records.length
    ? records.map((log) => `
      <article class="kakao-log-item">
        <div>
          <strong>${escapeHtml(log.studentName || "이름 없음")} · ${attendanceActionLabel(log.action)}</strong>
          <span>${escapeHtml(compactDate(log.date))} · ${escapeHtml(compactPhone(log.phone))} · 템플릿 ${escapeHtml(log.templateCode || "미입력")}</span>
          <p>${escapeHtml(log.message || "")}</p>
        </div>
        <span class="kakao-log-status">${escapeHtml(log.status || "발송대기")}</span>
      </article>
    `).join("")
    : `<p class="empty-feedback">선택한 달의 알림톡 준비기록이 없습니다.</p>`;
}

function clearKakaoLogs() {
  if (!requireDeletePermission()) return;
  const month = $("kakaoMonthFilter")?.value || currentMonthText();
  if (!confirm(`${month} 알림톡 준비기록을 정리할까요?`)) return;
  kakaoMessageLogs = kakaoMessageLogs.filter((log) => String(log.date || "").slice(0, 7) !== month);
  saveKakaoMessageLogs();
  addChangeLog("알림톡", "알림톡 준비기록 정리", `${month} 기록 정리`);
  renderKakaoLogs();
}

function money(value) {
  return `${Number(value || 0).toLocaleString("ko-KR")}원`;
}

function compactPhone(value) {
  const phone = String(value || "").trim();
  return phone.replace(/^010-?/, "") || "-";
}

function compactDate(value) {
  const text = String(value || "").trim();
  return text.replace(/^2026-/, "") || "-";
}

function currentMonthRange() {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const monthText = String(month + 1).padStart(2, "0");
  const lastDate = new Date(year, month + 1, 0).getDate();
  return {
    start: `${year}-${monthText}-01`,
    end: `${year}-${monthText}-${String(lastDate).padStart(2, "0")}`,
  };
}

function isDateInRange(dateText, start, end) {
  return Boolean(dateText) && dateText >= start && dateText <= end;
}

function monthlyTuitionTotal() {
  const { start, end } = currentMonthRange();
  return allPaymentRecords()
    .reduce((sum, record) => sum + paymentPaidAmountForRange(record, start, end), 0);
}

function paymentRecordStatus(record = {}) {
  return record.status === "미납" || Number(record.unpaidAmount || 0) > 0 || (record.autoDue && record.status !== "납부완료")
    ? "미납"
    : "납부완료";
}

function recordMonthText(record = {}) {
  return String(record.registered || record.paymentDate || "").slice(0, 7);
}

function currentMonthUnpaidPaymentRecords() {
  const month = currentMonthText();
  return allPaymentRecords().filter((record) => (
    recordMonthText(record) === month &&
    paymentRecordStatus(record) === "미납"
  ));
}

function initOptions() {
  $("grade").innerHTML = GRADES.map((grade) => `<option>${grade}</option>`).join("");
  $("gradeFilter").innerHTML += GRADE_FILTER_OPTIONS.map((grade) => `<option>${grade}</option>`).join("");
  $("subjectFilter").innerHTML += SUBJECTS.map((subject) => `<option>${subject}</option>`).join("");
  $("paymentMonthFilter").value = currentMonthText();
  $("ledgerMonthFilter").value = currentMonthText();
  $("attendanceMonthFilter").value = currentMonthText();
  if ($("staffMonthFilter")) $("staffMonthFilter").value = currentMonthText();
  if ($("kakaoMonthFilter")) $("kakaoMonthFilter").value = currentMonthText();
  if ($("financeMonthFilter")) $("financeMonthFilter").value = currentMonthText();
  if ($("financeDate")) $("financeDate").value = currentDateText();
  if ($("tuitionEffectiveFrom")) $("tuitionEffectiveFrom").value = currentDateText();
  if ($("tuitionSubject")) $("tuitionSubject").innerHTML = SUBJECTS.map((subject) => `<option>${subject}</option>`).join("");
  if ($("bookFeeEffectiveFrom")) $("bookFeeEffectiveFrom").value = currentDateText();
  if ($("bookFeeSubject")) $("bookFeeSubject").innerHTML = SUBJECTS.map((subject) => `<option>${subject}</option>`).join("");
  if ($("courseHistorySubject")) $("courseHistorySubject").innerHTML = SUBJECTS.map((subject) => `<option>${subject}</option>`).join("");
  if ($("courseHistoryDate")) $("courseHistoryDate").value = currentDateText();
  if ($("bookStockDate")) $("bookStockDate").value = currentDateText();
  if ($("archiveMonthFilter")) $("archiveMonthFilter").value = currentMonthText();
  setLearningReportRange();
  if ($("roleModeSelect")) $("roleModeSelect").value = currentRoleMode;
  renderFinanceCategoryOptions();
  renderFixedExpenseOptions();
  renderBookOptions();
  $("subjectChecks").innerHTML = SUBJECTS.map(
    (subject) => `
      <label class="check-pill">
        <input type="checkbox" name="subjects" value="${subject}" />
        ${subject}
      </label>
    `,
  ).join("");
  $("gongpilSubjectChecks").innerHTML = GONGPIL_SUBJECTS.map(
    (subject) => `
      <label class="check-pill">
        <input type="checkbox" name="gongpilSubjects" value="${subject}" />
        ${subject}
      </label>
    `,
  ).join("");
  $("attendanceDayChecks").innerHTML = WEEKDAYS.map(
    (day) => `
      <label class="check-pill">
        <input type="checkbox" name="attendanceDays" value="${day.value}" />
        ${day.label}
      </label>
    `,
  ).join("");
  toggleGongpilSubjects();
  syncFeedbackSubjectOptions();
  fillPaymentEntryDefaults();
  clearNoticeEditor();
}

function paymentBadge(status) {
  const tone = status === "납부완료" ? "good" : "bad";
  return `<span class="badge ${tone}">${status}</span>`;
}

function attendanceBadge(status) {
  const display = status === "출석" ? "등원" : status;
  const tone = display === "등원" || display === "보강" ? "good" : display === "지각" ? "warn" : "bad";
  return `<span class="badge ${tone}">${display}</span>`;
}

function checkinCodeFromParentPhone(phone) {
  const digits = String(phone || "").replace(/\D/g, "");
  return digits.length >= 4 ? digits.slice(-4) : "";
}

function getFilteredStudents() {
  const query = $("searchInput").value.trim().toLowerCase();
  const grade = $("gradeFilter").value;
  const subject = $("subjectFilter").value;
  const summaryGrade = studentSummaryGrade;

  return students.filter((student) => {
    const searchTarget = [
      student.studentName,
      student.school,
      student.grade,
      student.studentPhone,
      student.parentPhone,
      checkinCodeFromParentPhone(student.parentPhone),
      student.parentPhone2,
      student.parentPhone3,
      student.parentPhone4,
      student.teacher,
      student.weeklySubjectSchedule,
      student.currentBooks,
      student.completedBooks,
      student.counselingRecords,
      student.makeupDateRecords,
      student.feedbackRecords.map((record) => `${record.date} ${record.text} ${record.photoName}`).join(" "),
      (student.courseHistory || []).map((record) => `${record.date} ${record.action} ${record.subject} ${record.memo}`).join(" "),
      student.subjects.join(" "),
      student.gongpilSubjects.join(" "),
    ].join(" ").toLowerCase();

    return (
      studentMatchesListMode(student) &&
      (!query || searchTarget.includes(query)) &&
      (!summaryGrade || student.grade === summaryGrade) &&
      (!grade || student.grade === grade) &&
      (!subject || student.subjects.includes(subject))
    );
  });
}

function studentMatchesListMode(student) {
  if (studentListMode === "active") {
    return student.enrollmentStatus === "재원";
  }
  if (studentListMode === "monthlyNew") {
    return String(student.joinDate || "").slice(0, 7) === currentMonthText();
  }
  if (studentListMode === "monthlyNewSubject") {
    return monthlyNewSubjectStudentIds().has(student.id);
  }
  if (studentListMode === "paused") {
    return getTodayOffStudents().some((item) => item.id === student.id);
  }
  if (studentListMode === "waiting") {
    return getTodayWaitingStudents().some((item) => item.id === student.id);
  }
  return true;
}

function formatSubjectNames(student) {
  return (student.subjects || []).map((subject) => {
    if (subject !== "공필왕") return subject;
    const detail = (student.gongpilSubjects || []).join(", ");
    return detail ? `공필왕(${detail})` : "공필왕";
  });
}

function monthlyNewStudents(month = currentMonthText()) {
  return students.filter((student) => (
    student.enrollmentStatus === "재원" &&
    String(student.joinDate || "").slice(0, 7) === month
  ));
}

function dashboardSubjectLabel(subject) {
  if (subject === "유치초저") return "소한이 한글";
  return subject;
}

function subjectsFromPaymentRecord(record = {}) {
  const savedAllocations = normalizeSubjectAllocations(record.subjectAllocations || [])
    .map((item) => item.subject)
    .filter((subject) => !["기타", "배분 필요"].includes(subject));
  if (savedAllocations.length) return uniqueValues(savedAllocations.map(dashboardSubjectLabel));

  const student = studentForPaymentRecord(record) || record;
  const text = [record.paymentName, record.memo, record.studentName, record.school, record.grade].join(" ");
  return subjectFinanceGroupsForText(text, student)
    .filter((subject) => !["기타", "배분 필요"].includes(subject))
    .map(dashboardSubjectLabel);
}

function monthlyNewSubjectItems(month = currentMonthText()) {
  const items = new Map();
  const addItem = (studentName, subject, date, source, studentId = "") => {
    const cleanName = canonicalStudentName(studentName);
    const cleanSubject = dashboardSubjectLabel(subject);
    if (!cleanName || !cleanSubject) return;
    const key = `${cleanName}|${cleanSubject}`;
    if (!items.has(key)) {
      const student = students.find((item) => canonicalStudentName(item.studentName) === cleanName);
      items.set(key, {
        studentName: cleanName,
        subject: cleanSubject,
        date,
        source,
        studentId: studentId || student?.id || "",
      });
    }
  };

  monthlyNewStudents(month).forEach((student) => {
    (student.subjects || []).forEach((subject) => {
      addItem(student.studentName, subject, student.joinDate, "신규원생", student.id);
    });
  });

  students.forEach((student) => {
    (student.courseHistory || [])
      .filter((record) => String(record.date || "").slice(0, 7) === month && record.action !== "중단")
      .forEach((record) => {
        addItem(student.studentName, record.subject, record.date, `수강${record.action}`, student.id);
      });
    });

  allPaymentRecords()
    .filter((record) => {
      const text = `${record.paymentType || ""} ${record.paymentName || ""} ${record.memo || ""}`;
      return recordMonthText(record) === month && /추가|신규과목|과목추가/.test(text);
    })
    .forEach((record) => {
      subjectsFromPaymentRecord(record).forEach((subject) => {
        addItem(record.studentName, subject, record.registered || record.paymentDate || "", "추가수강", record.studentId || "");
      });
    });

  return [...items.values()];
}

function monthlyNewSubjectStudentIds(month = currentMonthText()) {
  return new Set(monthlyNewSubjectItems(month).map((item) => item.studentId).filter(Boolean));
}

function formatSubjectPills(student) {
  return formatSubjectNames(student)
    .map((subject) => `<span class="pill">${escapeHtml(subject)}</span>`)
    .join("");
}

function renderRows() {
  const tbody = $("studentRows");
  const filtered = getFilteredStudents();

  if (filtered.length === 0) {
    tbody.innerHTML = `<tr><td colspan="6" class="empty-state">표시할 학생이 없습니다.</td></tr>`;
    return;
  }

  tbody.innerHTML = filtered.map((student) => `
    <tr class="${student.id === selectedId ? "selected" : ""}" data-id="${student.id}">
      <td class="name-cell">
        <strong>${escapeHtml(student.studentName || "이름 없음")}</strong>
        <span>${escapeHtml(student.school || "-")} · ${escapeHtml(student.parentPhone || "-")}</span>
      </td>
      <td>${escapeHtml(student.grade)}</td>
      <td>
        <div class="pills">
          ${formatSubjectPills(student) || `<span class="small-text">-</span>`}
        </div>
      </td>
      <td>${escapeHtml(student.teacher || "-")}</td>
      <td><span class="checkin-code">${escapeHtml(checkinCodeFromParentPhone(student.parentPhone) || "-")}</span></td>
      <td>
        <div class="row-actions">
          <button class="mini-button" type="button" data-action="edit" data-id="${student.id}">수정</button>
          <button class="mini-danger-button" type="button" data-action="delete" data-id="${student.id}">삭제</button>
        </div>
      </td>
    </tr>
  `).join("");

  tbody.querySelectorAll("tr[data-id]").forEach((row) => {
    row.addEventListener("click", () => selectStudent(row.dataset.id));
  });
  tbody.querySelectorAll("button[data-action]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      if (button.dataset.action === "edit") {
        switchView("students");
        selectStudent(button.dataset.id);
        switchStudentTab("profile");
        $("studentName").focus();
      } else {
        deleteStudent(button.dataset.id);
      }
    });
  });
}

function renderStats() {
  const active = students.filter((student) => student.enrollmentStatus === "재원");
  const monthlyUnpaidCount = currentMonthUnpaidPaymentRecords().length;
  const monthlyNewCount = monthlyNewStudents().length;
  const monthlyNewSubjectCount = monthlyNewSubjectItems().length;
  const currentMonthNumber = Number(currentMonthText().slice(5, 7));
  const scheduledToday = getTodayScheduledStudents().length;
  const todayAbsentCount = getTodayAbsentStudents().length;
  const pausedCount = getTodayOffStudents().length;
  const waitingCount = getTodayWaitingStudents().length;
  updateTodayDateLabel();
  $("activeCount").textContent = active.length;
  $("presentCount").textContent = scheduledToday;
  $("monthlyNewLabel").textContent = `${currentMonthNumber}월 신규원생`;
  $("monthlyNewCount").textContent = monthlyNewCount;
  if ($("monthlyNewSubjectLabel")) $("monthlyNewSubjectLabel").textContent = `${currentMonthNumber}월 신규과목`;
  if ($("monthlyNewSubjectCount")) $("monthlyNewSubjectCount").textContent = monthlyNewSubjectCount;
  $("monthlyTuition").textContent = `${monthlyUnpaidCount}건`;
  if ($("monthlyRevenueLabel")) $("monthlyRevenueLabel").textContent = `${currentMonthNumber}월 총매출`;
  if ($("monthlyRevenueAmount")) $("monthlyRevenueAmount").textContent = money(monthlyTuitionTotal());
  $("todayAbsentCount").textContent = todayAbsentCount;
  $("pausedCount").textContent = pausedCount;
  $("waitingCount").textContent = waitingCount;
}

function getTodayScheduledStudents() {
  const today = new Date().getDay();
  return students.filter((student) => (
    student.enrollmentStatus === "재원" &&
    Array.isArray(student.attendanceDays) &&
    student.attendanceDays.map(Number).includes(today)
  ));
}

function getTodayAbsentStudents() {
  return students.filter((student) => todayAttendanceRecord(student)?.status === "결석");
}

function getTodayOffStudents() {
  const scheduledIds = new Set(getTodayScheduledStudents().map((student) => student.id));
  return students.filter((student) => student.enrollmentStatus === "재원" && !scheduledIds.has(student.id));
}

function getTodayWaitingStudents() {
  return getTodayScheduledStudents().filter((student) => !todayAttendanceRecord(student));
}

function isStudentScheduledOnDate(student, dateText) {
  const date = dateFromText(dateText);
  if (!date || student.enrollmentStatus !== "재원") return false;
  if (student.joinDate && dateText < student.joinDate) return false;
  if (student.leaveDate && dateText > student.leaveDate) return false;
  return (student.attendanceDays || []).map(Number).includes(date.getDay());
}

function autoMarkPastUnrecordedAbsences() {
  const today = currentDateText();
  let cursor = localStorage.getItem(AUTO_ABSENCE_LAST_DATE_KEY);
  if (!dateFromText(cursor)) {
    localStorage.setItem(AUTO_ABSENCE_LAST_DATE_KEY, today);
    return false;
  }
  if (cursor >= today) return false;

  let changed = false;
  while (cursor < today) {
    students.forEach((student) => {
      if (!isStudentScheduledOnDate(student, cursor)) return;
      if ((student.attendanceRecords || []).some((record) => record.date === cursor)) return;
      upsertAttendanceRecord(student, {
        date: cursor,
        status: "결석",
        absentReason: "자동 결석(미등원)",
      });
      changed = true;
    });
    cursor = nextDateText(cursor);
  }

  localStorage.setItem(AUTO_ABSENCE_LAST_DATE_KEY, today);
  if (changed) saveStudents();
  return changed;
}

function formatTodayLabel() {
  const now = new Date();
  const weekdays = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
  const time = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
  return `${now.getMonth() + 1}월 ${now.getDate()}일 ${weekdays[now.getDay()]} ${time}`;
}

function updateTodayDateLabel() {
  const label = $("todayDateLabel");
  if (label) label.textContent = formatTodayLabel();
  updateCheckinClock();
  if ($("staffClockLabel")) $("staffClockLabel").textContent = formatTodayLabel();
}

function updateCheckinClock() {
  const label = $("checkinClock");
  if (label) label.textContent = formatTodayLabel();
}

function runAutoAbsenceCheck() {
  if (autoMarkPastUnrecordedAbsences()) renderAll();
}

function selectStudent(id) {
  selectedId = id;
  const student = students.find((item) => item.id === id) || blankStudent();
  fillForm(student);
  renderRows();
  renderLearningOverview();
}

function gradeSortValue(grade) {
  const value = String(grade || "미입력");
  const orderedGrades = ["5세", "6세", "7세", "예비초", ...GRADES, "성인", "미입력"];
  const index = orderedGrades.indexOf(value);
  if (index >= 0) return index;

  const elementary = value.match(/초\s*(\d)/);
  if (elementary) return 10 + Number(elementary[1]);
  const middle = value.match(/중\s*(\d)/);
  if (middle) return 30 + Number(middle[1]);
  const high = value.match(/고\s*(\d)/);
  if (high) return 40 + Number(high[1]);
  return 100;
}

function renderGradeSummary() {
  const grid = $("gradeSummaryGrid");
  const total = $("gradeSummaryTotal");
  if (!grid || !total) return;

  const activeStudents = students.filter((student) => student.enrollmentStatus === "재원");
  const counts = new Map();
  activeStudents.forEach((student) => {
    const grade = student.grade || "미입력";
    counts.set(grade, (counts.get(grade) || 0) + 1);
  });

  total.textContent = `${activeStudents.length}명`;

  const gradeRows = [...counts.entries()]
    .sort(([gradeA], [gradeB]) => {
      const sortA = gradeSortValue(gradeA);
      const sortB = gradeSortValue(gradeB);
      if (sortA !== sortB) return sortA - sortB;
      return gradeA.localeCompare(gradeB, "ko");
    });

  if (gradeRows.length === 0) {
    grid.innerHTML = `<div class="grade-summary-empty">표시할 재원생이 없습니다.</div>`;
    return;
  }

  grid.innerHTML = gradeRows.map(([grade, count]) => `
    <button class="grade-summary-card" type="button" data-grade="${escapeHtml(grade)}">
      <span>${escapeHtml(grade)}</span>
      <strong>${count}명</strong>
    </button>
  `).join("");

  grid.querySelectorAll("[data-grade]").forEach((button) => {
    button.addEventListener("click", () => openGradeStudents(button.dataset.grade));
  });
}

function openGradeStudents(grade) {
  studentListMode = "active";
  studentSummaryGrade = grade;
  $("searchInput").value = "";
  $("subjectFilter").value = "";

  const gradeFilter = $("gradeFilter");
  const hasGradeOption = [...gradeFilter.options].some((option) => option.value === grade);
  gradeFilter.value = hasGradeOption ? grade : "";

  clearStudentDetail();
  switchView("students");
  renderRows();
}

function showStudentDetail(show) {
  $("studentDetailEmpty")?.classList.toggle("hidden", show);
  $("studentDetailFields")?.classList.toggle("hidden", !show);
  $("leaveBtn")?.classList.toggle("hidden", !show);
  if (!show) renderGradeSummary();
}

function clearStudentDetail() {
  selectedId = "";
  $("formTitle").textContent = "학년별 현황";
  $("studentId").value = "";
  courseHistoryDraft = [];
  renderCourseHistoryList();
  showStudentDetail(false);
  clearFeedbackEditor();
  clearLearningReportText();
  renderRows();
}

function fillForm(student) {
  $("formTitle").textContent = student.studentName ? student.studentName : "신규 등록";
  if ($("learningTitle")) $("learningTitle").textContent = student.studentName ? `${student.studentName} 학습관리` : "신규 학생 학습관리";
  showStudentDetail(true);
  $("studentId").value = student.id;
  formFields.forEach((field) => {
    const element = $(field);
    if (!element || field === "studentId") return;
    element.value = student[field] ?? "";
  });
  document.querySelectorAll("input[name='subjects']").forEach((check) => {
    check.checked = student.subjects.includes(check.value);
  });
  document.querySelectorAll("input[name='gongpilSubjects']").forEach((check) => {
    check.checked = (student.gongpilSubjects || []).includes(check.value);
  });
  toggleGongpilSubjects();
  syncParentContactFields(student);
  document.querySelectorAll("input[name='attendanceDays']").forEach((check) => {
    check.checked = (student.attendanceDays || []).map(Number).includes(Number(check.value));
  });
  $("leaveBtn").disabled = !students.some((item) => item.id === student.id);
  syncFeedbackSubjectOptions(student.subjects);
  clearFeedbackEditor();
  clearLearningReportText();
  courseHistoryDraft = uniqueCourseHistoryRecords(student.courseHistory || []);
  clearCourseHistoryEditor();
  renderCourseHistoryList();
  renderFeedbackList(student);
}

function clearCourseHistoryEditor() {
  if (!$("courseHistoryId")) return;
  $("courseHistoryId").value = "";
  $("courseHistoryDate").value = currentDateText();
  $("courseHistoryAction").value = "추가";
  $("courseHistorySubject").value = SUBJECTS[0];
  $("courseHistoryMemo").value = "";
}

function renderCourseHistoryList() {
  const list = $("courseHistoryList");
  if (!list) return;
  const records = uniqueCourseHistoryRecords(courseHistoryDraft);
  courseHistoryDraft = records;
  if (!records.length) {
    list.innerHTML = `<p class="empty-feedback">저장된 수강이력이 없습니다.</p>`;
    return;
  }

  list.innerHTML = records.map((record) => `
    <div class="course-history-item ${record.action === "중단" ? "stopped" : ""}">
      <div>
        <strong>${escapeHtml(record.subject)}</strong>
        <span>${escapeHtml(record.date)} · ${escapeHtml(record.action)}</span>
        ${record.memo ? `<p>${escapeHtml(record.memo)}</p>` : ""}
      </div>
      <div class="row-actions">
        <button class="mini-button" type="button" data-course-history-edit="${escapeHtml(record.id)}">수정</button>
        <button class="mini-danger-button" type="button" data-course-history-delete="${escapeHtml(record.id)}">삭제</button>
      </div>
    </div>
  `).join("");

  list.querySelectorAll("[data-course-history-edit]").forEach((button) => {
    button.addEventListener("click", () => editCourseHistoryRecord(button.dataset.courseHistoryEdit));
  });
  list.querySelectorAll("[data-course-history-delete]").forEach((button) => {
    button.addEventListener("click", () => deleteCourseHistoryRecord(button.dataset.courseHistoryDelete));
  });
}

function addCourseHistoryRecord() {
  if (!$("courseHistorySubject")) return;
  const record = normalizeCourseHistoryRecord({
    id: $("courseHistoryId").value || createId(),
    date: $("courseHistoryDate").value || currentDateText(),
    action: $("courseHistoryAction").value || "추가",
    subject: $("courseHistorySubject").value || SUBJECTS[0],
    memo: $("courseHistoryMemo").value || "",
  });
  if (!record.date || !record.subject) {
    alert("수강이력의 날짜와 과목을 확인해주세요.");
    return;
  }

  const index = courseHistoryDraft.findIndex((item) => item.id === record.id);
  if (index >= 0) courseHistoryDraft[index] = record;
  else courseHistoryDraft.unshift(record);
  courseHistoryDraft = uniqueCourseHistoryRecords(courseHistoryDraft);
  clearCourseHistoryEditor();
  renderCourseHistoryList();
}

function editCourseHistoryRecord(id) {
  const record = courseHistoryDraft.find((item) => item.id === id);
  if (!record) return;
  $("courseHistoryId").value = record.id;
  $("courseHistoryDate").value = record.date || currentDateText();
  $("courseHistoryAction").value = record.action || "추가";
  $("courseHistorySubject").value = SUBJECTS.includes(record.subject) ? record.subject : SUBJECTS[0];
  $("courseHistoryMemo").value = record.memo || "";
  $("courseHistoryDate").focus();
}

function deleteCourseHistoryRecord(id) {
  courseHistoryDraft = courseHistoryDraft.filter((record) => record.id !== id);
  clearCourseHistoryEditor();
  renderCourseHistoryList();
}

function syncParentContactFields(student = readForm()) {
  let visibleCount = 0;
  parentContactFields.forEach((field, index) => {
    if (String(student[field] || "").trim()) visibleCount = index + 1;
  });
  document.querySelectorAll(".parent-contact-extra").forEach((label, index) => {
    label.classList.toggle("hidden", index >= visibleCount);
  });
  $("addParentContactBtn").classList.toggle("hidden", visibleCount >= parentContactFields.length);
}

function addParentContactField() {
  const hiddenFields = Array.from(document.querySelectorAll(".parent-contact-extra.hidden"));
  if (hiddenFields.length === 0) return;
  hiddenFields[0].classList.remove("hidden");
  const input = hiddenFields[0].querySelector("input");
  input?.focus();
  const remainingHidden = document.querySelectorAll(".parent-contact-extra.hidden").length;
  $("addParentContactBtn").classList.toggle("hidden", remainingHidden === 0);
}

function readForm() {
  const currentId = $("studentId").value || createId();
  const data = { ...blankStudent(), id: currentId };

  formFields.forEach((field) => {
    if (field === "studentId") return;
    const element = $(field);
    data[field] = field === "tuition"
      ? Number(element.value || 0)
      : element.value.trim();
  });

  data.subjects = Array.from(document.querySelectorAll("input[name='subjects']:checked")).map((check) => check.value);
  data.gongpilSubjects = data.subjects.includes("공필왕")
    ? Array.from(document.querySelectorAll("input[name='gongpilSubjects']:checked")).map((check) => check.value)
    : [];
  data.attendanceDays = Array.from(document.querySelectorAll("input[name='attendanceDays']:checked")).map((check) => Number(check.value));
  data.courseHistory = uniqueCourseHistoryRecords(courseHistoryDraft);
  return data;
}

function resetForm() {
  const fresh = blankStudent();
  selectedId = fresh.id;
  fillForm(fresh);
  renderRows();
  renderLearningOverview();
}

function upsertStudent(event) {
  event.preventDefault();
  const data = readFormWithExistingFeedback();
  saveStudentData(data);
}

function readFormWithExistingFeedback(options = {}) {
  const { preserveStudentSetup = false } = options;
  const data = readForm();
  const existing = students.find((student) => student.id === data.id);
  if (preserveStudentSetup && existing) {
    data.subjects = existing.subjects || [];
    data.gongpilSubjects = existing.gongpilSubjects || [];
    data.attendanceDays = existing.attendanceDays || [];
    data.weeklySubjectSchedule = existing.weeklySubjectSchedule || "";
    data.courseHistory = existing.courseHistory || [];
  }
  data.feedbackRecords = existing?.feedbackRecords ?? [];
  data.attendanceStatus = existing?.attendanceStatus ?? data.attendanceStatus;
  data.presentDays = existing?.presentDays ?? data.presentDays;
  data.absentDays = existing?.absentDays ?? data.absentDays;
  data.attendanceRecords = existing?.attendanceRecords ?? data.attendanceRecords;
  data.paymentStatus = existing?.paymentStatus ?? data.paymentStatus;
  data.paymentMethod = existing?.paymentMethod ?? data.paymentMethod;
  data.paymentDiscount = existing?.paymentDiscount ?? data.paymentDiscount;
  data.paidAmount = existing?.paidAmount ?? data.paidAmount;
  data.unpaidAmount = existing?.unpaidAmount ?? data.unpaidAmount;
  data.paymentDueDate = data.paymentDueDate || existing?.paymentDueDate || "";
  data.paymentDate = existing?.paymentDate ?? data.paymentDate;
  data.paymentMemo = existing?.paymentMemo ?? data.paymentMemo;
  data.paymentRecords = existing?.paymentRecords ?? [];
  return data;
}

function saveStudentData(data) {
  const index = students.findIndex((student) => student.id === data.id);
  const isNew = index < 0;

  if (index >= 0) {
    students[index] = data;
  } else {
    students.unshift(data);
  }

  selectedId = data.id;
  saveStudents();
  addChangeLog("학생관리", isNew ? "학생 신규 등록" : "학생정보 수정", `${data.studentName || "이름 없음"} · ${data.school || ""} ${data.grade || ""}`);
  renderAll();
  fillForm(data);
}

function deleteSelected() {
  deleteStudent(selectedId);
}

function withdrawSelected() {
  if (!requireDeletePermission()) return;
  const student = students.find((item) => item.id === selectedId);
  if (!student) return;
  if (!confirm(`${student.studentName || "선택한 학생"}을(를) 퇴회 처리할까요?`)) return;

  student.enrollmentStatus = "퇴회";
  student.leaveDate = student.leaveDate || new Date().toISOString().slice(0, 10);
  saveStudents();
  addChangeLog("학생관리", "퇴회 처리", `${student.studentName || "이름 없음"} · 퇴회일 ${student.leaveDate}`);
  renderAll();
  clearStudentDetail();
}

function deleteStudent(id) {
  if (!requireDeletePermission()) return;
  if (!id || !students.some((student) => student.id === id)) return;
  const selected = students.find((student) => student.id === id);
  if (!confirm(`${selected.studentName || "선택한 학생"} 정보를 삭제할까요?`)) return;

  students = students.filter((student) => student.id !== id);
  selectedId = "";
  saveStudents();
  addChangeLog("학생관리", "학생정보 삭제", selected.studentName || "이름 없음");
  renderAll();
  clearStudentDetail();
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function renderAll() {
  renderStats();
  renderRows();
  if (!selectedId) renderGradeSummary();
  renderDashboard();
  renderLearningOverview();
  renderPaymentStudentOptions();
  renderPaymentOverview();
  renderPaymentLedger();
  renderFinanceOverview();
  renderTuitionRates();
  renderBookFeeRates();
  renderBooksOverview();
  renderAttendanceOverview();
  renderCheckinScreen();
  renderStaffManagement();
  renderKakaoSettings();
  renderArchive();
  applyRoleMode();
}

function applyRoleMode() {
  const role = currentRoleMode || currentUser?.role || "director";
  const hiddenViews = ROLE_VIEW_LIMITS[role] || [];
  const isTeacher = role === "teacher";
  const isDesk = role === "desk";
  document.body.classList.toggle("teacher-mode", isTeacher);
  document.body.classList.toggle("desk-mode", isDesk);
  document.querySelectorAll(".side-nav button[data-view]").forEach((button) => {
    button.classList.toggle("hidden", hiddenViews.includes(button.dataset.view));
  });
  $("monthlyUnpaidCard")?.classList.toggle("hidden", role !== "director");
  if (hiddenViews.includes(activeView)) {
    switchView("dashboard");
  }
}

function changeRoleMode(value) {
  if (!isDirector()) {
    $("roleModeSelect").value = currentRoleMode;
    alert("보기 권한 변경은 원장 계정에서만 가능합니다.");
    return;
  }
  currentRoleMode = ["director", "teacher", "desk"].includes(value) ? value : "director";
  localStorage.setItem(ROLE_MODE_KEY, currentRoleMode);
  addChangeLog("보기 권한", `${roleLabel(currentRoleMode)} 보기로 전환`);
  applyRoleMode();
}

function switchView(view) {
  activeView = view;
  document.querySelectorAll("[data-view-section]").forEach((section) => {
    section.classList.toggle("active", section.dataset.viewSection === view);
  });
  document.querySelectorAll(".side-nav button[data-view]").forEach((button) => {
    button.classList.toggle("active", button.dataset.view === view);
  });

  const titles = {
    dashboard: "",
    students: "학생관리",
    learning: "학습관리",
    payments: "납부관리",
    finance: "매출관리",
    tuition: "교육비 기준표",
    books: "교재관리",
    attendance: "등원관리",
    checkin: "출석체크",
    staff: "직원관리",
    kakao: "알림톡",
    archive: "자료보관",
  };
  $("pageTitle").textContent = titles[view] ?? "";
  if ($("newStudentBtn")) {
    $("newStudentBtn").textContent = view === "payments" ? "수납 학생 입력" : "학생 등록";
    $("newStudentBtn").classList.toggle("hidden", view === "attendance" || view === "checkin" || view === "staff" || view === "kakao" || view === "finance" || view === "tuition" || view === "books" || view === "archive");
  }
  if (view === "checkin") {
    renderCheckinScreen();
    setTimeout(() => $("checkinCodeInput")?.focus(), 0);
  }
  if (view === "staff") renderStaffManagement();
  if (view === "tuition") renderTuitionRates();
  if (view === "tuition") renderBookFeeRates();
  if (view === "kakao") renderKakaoSettings();
}

function openCurrentMonthUnpaidPayments() {
  $("paymentMonthFilter").value = currentMonthText();
  $("paymentStatusFilter").value = "미납";
  $("paymentSearchInput").value = "";
  switchView("payments");
  renderPaymentOverview();
}

function openCurrentMonthPaidPayments() {
  $("paymentMonthFilter").value = currentMonthText();
  $("paymentStatusFilter").value = "납부완료";
  $("paymentSearchInput").value = "";
  switchView("payments");
  renderPaymentOverview();
}

function resetPaymentOverviewFilters() {
  if ($("paymentMonthFilter")) $("paymentMonthFilter").value = currentMonthText();
  if ($("paymentStatusFilter")) $("paymentStatusFilter").value = "";
  if ($("paymentSearchInput")) $("paymentSearchInput").value = "";
}

function openPaymentRecordDetail(recordId) {
  const record = allPaymentRecords().find((item) => item.id === recordId);
  if (!record) return;
  if ($("paymentMonthFilter")) $("paymentMonthFilter").value = recordMonthText(record) || currentMonthText();
  if ($("paymentStatusFilter")) $("paymentStatusFilter").value = "";
  if ($("paymentSearchInput")) $("paymentSearchInput").value = "";
  switchView("payments");
  renderPaymentOverview();

  const detail = Array.from($("paymentOverview")?.querySelectorAll("[data-payment-detail-id]") || [])
    .find((row) => row.dataset.paymentDetailId === recordId);
  const button = Array.from($("paymentOverview")?.querySelectorAll("[data-payment-toggle]") || [])
    .find((item) => item.dataset.paymentToggle === recordId);
  if (!detail) return;
  detail.classList.remove("hidden");
  if (button) button.textContent = "접기";
  const target = detail.querySelector("[data-subject-allocation-editor]") || detail;
  target.scrollIntoView({ behavior: "smooth", block: "center" });
  target.querySelector("[data-subject-allocation-amount]")?.focus();
}

function openTodayScheduledAttendance() {
  attendanceTodayOnly = true;
  attendanceListMode = "todayScheduled";
  selectedAttendanceDate = currentDateText();
  $("attendanceMonthFilter").value = currentMonthText();
  $("attendanceSearchInput").value = "";
  switchView("attendance");
  renderAttendanceOverview();
}

function clearStudentListFilters() {
  studentSummaryGrade = "";
  $("searchInput").value = "";
  $("gradeFilter").value = "";
  $("subjectFilter").value = "";
}

function openActiveStudents() {
  studentListMode = "active";
  clearStudentListFilters();
  clearStudentDetail();
  switchView("students");
  renderRows();
}

function openAllActiveStudentsFromSummary() {
  studentListMode = "active";
  studentSummaryGrade = "";
  $("searchInput").value = "";
  $("gradeFilter").value = "";
  $("subjectFilter").value = "";
  clearStudentDetail();
  switchView("students");
  renderRows();
}

function openMonthlyNewStudents() {
  studentListMode = "monthlyNew";
  clearStudentListFilters();
  clearStudentDetail();
  switchView("students");
  renderRows();
}

function openMonthlyNewSubjects() {
  studentListMode = "monthlyNewSubject";
  clearStudentListFilters();
  clearStudentDetail();
  switchView("students");
  renderRows();
}

function openSubjectStudents(subject, gongpilSubject = "") {
  studentListMode = "active";
  studentSummaryGrade = "";
  $("searchInput").value = gongpilSubject || "";
  $("gradeFilter").value = "";
  $("subjectFilter").value = SUBJECTS.includes(subject) ? subject : "";
  clearStudentDetail();
  switchView("students");
  renderRows();
}

function openPausedStudents() {
  studentListMode = "paused";
  clearStudentListFilters();
  clearStudentDetail();
  switchView("students");
  renderRows();
}

function openWaitingStudents() {
  attendanceTodayOnly = false;
  attendanceListMode = "todayWaiting";
  selectedAttendanceDate = currentDateText();
  expandedAttendanceId = "";
  $("attendanceMonthFilter").value = currentMonthText();
  $("attendanceSearchInput").value = "";
  switchView("attendance");
  renderAttendanceOverview();
}

function openTodayAbsentAttendance() {
  attendanceTodayOnly = false;
  attendanceListMode = "todayAbsent";
  selectedAttendanceDate = currentDateText();
  expandedAttendanceId = "";
  $("attendanceMonthFilter").value = currentMonthText();
  $("attendanceSearchInput").value = "";
  switchView("attendance");
  renderAttendanceOverview();
}

function latestFeedback(student) {
  return [...(student.feedbackRecords || [])].sort((a, b) => (b.date || "").localeCompare(a.date || ""))[0];
}

function noticeTone(date) {
  const today = new Date().toISOString().slice(0, 10);
  if (date === today) return "오늘";
  if (date > today) return "예정";
  return "지난공지";
}

function sortNotices() {
  const today = new Date().toISOString().slice(0, 10);
  notices.sort((a, b) => {
    const aFuture = (a.date || "") >= today;
    const bFuture = (b.date || "") >= today;
    if (aFuture !== bFuture) return aFuture ? -1 : 1;
    return aFuture
      ? (a.date || "").localeCompare(b.date || "")
      : (b.date || "").localeCompare(a.date || "");
  });
}

function renderNotices() {
  sortNotices();
  const today = currentDateText();
  const activeNotices = notices.filter((notice) => !notice.date || notice.date >= today);
  const pastNotices = notices.filter((notice) => notice.date && notice.date < today);
  const activeNoticeHtml = activeNotices.length
    ? activeNotices.map(noticeItemHtml).join("")
    : `<p class="empty-feedback">오늘 확인할 공지사항이 없습니다.</p>`;
  const pastNoticeHtml = pastNotices.length
    ? `
      <details class="notice-archive">
        <summary>
          <span>지난 공지내용</span>
          <strong>${pastNotices.length}건</strong>
        </summary>
        <div class="notice-archive-list">
          ${pastNotices.map(noticeItemHtml).join("")}
        </div>
      </details>
    `
    : "";

  $("dashboardStudentList").innerHTML = notices.length
    ? `${activeNoticeHtml}${pastNoticeHtml}`
    : `<p class="empty-feedback">등록된 공지사항이 없습니다.</p>`;

  $("dashboardStudentList").querySelectorAll("[data-notice-edit]").forEach((button) => {
    button.addEventListener("click", () => editNotice(button.dataset.noticeEdit));
  });
  $("dashboardStudentList").querySelectorAll("[data-notice-delete]").forEach((button) => {
    button.addEventListener("click", () => deleteNotice(button.dataset.noticeDelete));
  });
  $("dashboardStudentList").querySelectorAll("[data-notice-check]").forEach((button) => {
    button.addEventListener("click", () => addNoticeCheck(button.dataset.noticeCheck));
  });
  $("dashboardStudentList").querySelectorAll("[data-notice-comment]").forEach((button) => {
    button.addEventListener("click", () => addNoticeComment(button.dataset.noticeComment));
  });
  $("dashboardStudentList").querySelectorAll("[data-notice-comment-delete]").forEach((button) => {
    button.addEventListener("click", () => deleteNoticeComment(button.dataset.noticeCommentDelete, button.dataset.commentId));
  });
}

function noticeItemHtml(notice) {
  return `
      <article class="notice-item">
        <div>
          <strong>${escapeHtml(notice.title || "제목 없음")}</strong>
          <span>${escapeHtml(notice.date || "날짜 없음")} · ${noticeTone(notice.date || "")}</span>
          ${notice.text ? `<p>${escapeHtml(notice.text)}</p>` : ""}
          <div class="notice-checks">
            <strong>확인</strong>
            <div class="notice-chip-list">
              ${(notice.checkedBy || []).length
                ? notice.checkedBy.map((item) => `<span class="notice-reaction-chip"><b>✓</b>${escapeHtml(item.name)} ${escapeHtml(item.checkedAt || "")}</span>`).join("")
                : `<small>아직 확인 없음</small>`}
            </div>
            <div class="notice-reaction-form">
              <input data-notice-check-name="${escapeHtml(notice.id)}" type="text" placeholder="이름" />
              <button class="notice-check-button" type="button" data-notice-check="${escapeHtml(notice.id)}" aria-label="공지 확인">✓</button>
            </div>
          </div>
          <div class="notice-comments">
            <strong>문의/댓글</strong>
            ${(notice.comments || []).length
              ? notice.comments.map((comment) => `
                <div class="notice-comment">
                  <span>${escapeHtml(comment.name || "이름 없음")} · ${escapeHtml(comment.date || "")}</span>
                  <p>${escapeHtml(comment.text || "")}</p>
                  <button class="mini-danger-button" type="button" data-notice-comment-delete="${escapeHtml(notice.id)}" data-comment-id="${escapeHtml(comment.id)}">삭제</button>
                </div>
              `).join("")
              : `<small>등록된 문의가 없습니다.</small>`}
            <div class="notice-comment-form">
              <input data-notice-comment-name="${escapeHtml(notice.id)}" type="text" placeholder="이름" />
              <input data-notice-comment-text="${escapeHtml(notice.id)}" type="text" placeholder="문의나 댓글 입력" />
              <button class="mini-button" type="button" data-notice-comment="${escapeHtml(notice.id)}">등록</button>
            </div>
          </div>
        </div>
        <div class="notice-row-actions">
          <button class="mini-button" type="button" data-notice-edit="${escapeHtml(notice.id)}">수정</button>
          <button class="mini-danger-button" type="button" data-notice-delete="${escapeHtml(notice.id)}">삭제</button>
        </div>
      </article>
    `;
}

function clearNoticeEditor() {
  $("noticeId").value = "";
  $("noticeDate").value = new Date().toISOString().slice(0, 10);
  $("noticeTitle").value = "";
  $("noticeText").value = "";
}

function saveNotice() {
  const notice = normalizeNotice({
    id: $("noticeId").value || createId(),
    date: $("noticeDate").value,
    title: $("noticeTitle").value,
    text: $("noticeText").value,
  });
  if (!notice.title && !notice.text) {
    alert("공지 제목이나 내용을 입력해주세요.");
    $("noticeTitle").focus();
    return;
  }

  const index = notices.findIndex((item) => item.id === notice.id);
  if (index >= 0) {
    notices[index] = {
      ...notice,
      checkedBy: notices[index].checkedBy || [],
      comments: notices[index].comments || [],
    };
  }
  else notices.unshift(notice);
  saveNotices();
  addChangeLog("공지사항", index >= 0 ? "공지 수정" : "공지 등록", `${notice.date || ""} · ${notice.title || "제목 없음"}`);
  clearNoticeEditor();
  renderDashboard();
}

function editNotice(id) {
  const notice = notices.find((item) => item.id === id);
  if (!notice) return;
  $("noticeId").value = notice.id;
  $("noticeDate").value = notice.date || new Date().toISOString().slice(0, 10);
  $("noticeTitle").value = notice.title || "";
  $("noticeText").value = notice.text || "";
  $("noticeTitle").focus();
}

function deleteNotice(id) {
  if (!requireDeletePermission()) return;
  const notice = notices.find((item) => item.id === id);
  if (!notice) return;
  if (!confirm(`${notice.title || "선택한 공지"}를 삭제할까요?`)) return;
  notices = notices.filter((item) => item.id !== id);
  saveNotices();
  addChangeLog("공지사항", "공지 삭제", notice.title || "제목 없음");
  renderDashboard();
}

function addNoticeCheck(id) {
  const notice = notices.find((item) => item.id === id);
  const input = Array.from(document.querySelectorAll("[data-notice-check-name]"))
    .find((item) => item.dataset.noticeCheckName === id);
  const fallbackName = currentUser ? staffPublicName(currentActor()) : "";
  const name = input?.value?.trim() || fallbackName;
  if (!notice) return;
  if (!name) {
    alert("확인한 선생님 이름을 입력해주세요.");
    input?.focus();
    return;
  }

  const today = new Date().toISOString().slice(0, 10);
  notice.checkedBy = [
    ...(notice.checkedBy || []).filter((item) => item.name !== name),
    { id: createId(), name, checkedAt: today },
  ];
  saveNotices();
  renderDashboard();
}

function addNoticeComment(id) {
  const notice = notices.find((item) => item.id === id);
  const nameInput = Array.from(document.querySelectorAll("[data-notice-comment-name]"))
    .find((item) => item.dataset.noticeCommentName === id);
  const textInput = Array.from(document.querySelectorAll("[data-notice-comment-text]"))
    .find((item) => item.dataset.noticeCommentText === id);
  const name = nameInput?.value?.trim() || "";
  const text = textInput?.value?.trim() || "";
  if (!notice) return;
  if (!name || !text) {
    alert("이름과 문의 내용을 함께 입력해주세요.");
    (!name ? nameInput : textInput)?.focus();
    return;
  }

  notice.comments = [
    ...(notice.comments || []),
    {
      id: createId(),
      name,
      text,
      date: new Date().toISOString().slice(0, 10),
    },
  ];
  saveNotices();
  renderDashboard();
}

function deleteNoticeComment(noticeId, commentId) {
  if (!requireDeletePermission()) return;
  const notice = notices.find((item) => item.id === noticeId);
  if (!notice) return;
  notice.comments = (notice.comments || []).filter((comment) => comment.id !== commentId);
  saveNotices();
  renderDashboard();
}

function renderDashboard() {
  renderNotices();

  const feedbackRecords = students
    .flatMap((student) => (student.feedbackRecords || []).map((record) => ({ ...record, student })))
    .sort((a, b) => (b.date || "").localeCompare(a.date || ""))
    .slice(0, 5);
  $("dashboardFeedbackList").innerHTML = feedbackRecords.length
    ? feedbackRecords.map((record) => `
      <button class="dashboard-row" type="button" data-open-learning="${record.student.id}">
        <strong>${escapeHtml(record.student.studentName || "이름 없음")}</strong>
        <span>${escapeHtml(record.date || "날짜 없음")} · ${escapeHtml(record.text || "피드백 기록").slice(0, 56)}</span>
      </button>
    `).join("")
    : "";
  renderDashboardCheckinStatus();

  bindOpenStudentButtons($("dashboardView"));
}

function renderDashboardCheckinStatus() {
  const root = $("dashboardFeedbackList");
  if (!root) return;

  const today = currentDateText();
  const checkinItems = activeCheckinStudents()
    .map((student) => ({ student, record: attendanceRecordOnDate(student, today) }))
    .filter(({ record }) => record && record.status === "등원" && (record.arrivalTime || record.departureTime))
    .flatMap(({ student, record }) => {
      const items = [];
      if (record.departureTime) {
        items.push({
          student,
          action: "leave",
          time: record.departureTime,
          message: fillKakaoTemplate(kakaoMessageTemplateForAction("leave"), student, record.departureTime),
        });
      }
      if (record.arrivalTime) {
        items.push({
          student,
          action: "arrive",
          time: record.arrivalTime,
          message: fillKakaoTemplate(kakaoMessageTemplateForAction("arrive"), student, record.arrivalTime),
        });
      }
      return items;
    })
    .sort((a, b) => (b.time || "").localeCompare(a.time || ""))
    .slice(0, 8);

  root.innerHTML = checkinItems.length
    ? checkinItems.map((item) => `
      <button class="dashboard-row checkin-dashboard-row" type="button" data-open-attendance="${escapeHtml(item.student.id)}">
        <strong>${escapeHtml(item.student.studentName || "이름 없음")} · ${escapeHtml(item.action === "leave" ? "하원" : "등원")} ${escapeHtml(item.time || "-")}</strong>
        <span>${escapeHtml(item.message || "").replaceAll("\n", "<br>")}</span>
      </button>
    `).join("")
    : `<p class="empty-feedback">오늘 저장된 등하원 기록이 없습니다.</p>`;
}

function dashboardStudentItem(student) {
  const feedback = latestFeedback(student);
  const needsAttention = student.paymentStatus !== "납부완료" || ["결석", "지각"].includes(student.attendanceStatus);
  return `
    <button class="dashboard-row" type="button" data-open-student="${student.id}">
      <strong>${escapeHtml(student.studentName || "이름 없음")}</strong>
      <span>${escapeHtml(student.grade)} · ${escapeHtml(formatSubjectNames(student).join(", ") || "과목 없음")} · ${needsAttention ? "확인 필요" : "정상"}</span>
      ${feedback ? `<small>최근 피드백 ${escapeHtml(feedback.date || "")}</small>` : ""}
    </button>
  `;
}

function renderLearningOverview() {
  const list = $("learningStudentList");
  if (!list) return;
  const query = ($("learningSearchInput")?.value || "").trim().toLowerCase();
  const visibleStudents = students
    .filter((student) => {
      if (!query) return true;
      return [
        student.studentName,
        student.school,
        student.grade,
        formatSubjectNames(student).join(" "),
        formatAttendanceDays(student.attendanceDays),
      ].join(" ").toLowerCase().includes(query);
    })
    .sort((a, b) => (a.studentName || "").localeCompare(b.studentName || "", "ko-KR"));

  const groups = [
    ["유치부", visibleStudents.filter((student) => learningDivision(student) === "유치부")],
    ["초등부", visibleStudents.filter((student) => learningDivision(student) === "초등부")],
    ["중등부", visibleStudents.filter((student) => learningDivision(student) === "중등부")],
    ["고등부", visibleStudents.filter((student) => learningDivision(student) === "고등부")],
  ];

  list.innerHTML = visibleStudents.length
    ? groups
      .filter(([, groupStudents]) => groupStudents.length)
      .map(([label, groupStudents]) => `
        <section class="learning-division">
          <div class="learning-division-title">
            <strong>${label}</strong>
            <span>${groupStudents.length}명</span>
          </div>
          <div class="learning-division-grid">
            ${groupStudents.map(learningStudentButtonHtml).join("")}
          </div>
        </section>
      `).join("")
    : `<p class="empty-feedback">검색된 학생이 없습니다.</p>`;

  list.querySelectorAll("[data-learning-student]").forEach((button) => {
    button.addEventListener("click", () => {
      selectStudent(button.dataset.learningStudent);
      switchView("learning");
    });
  });
}

function learningDivision(student) {
  const text = `${student.school || ""} ${student.grade || ""}`;
  if (/유치|5세|6세|7세/.test(text)) return "유치부";
  if (/고|고등/.test(text)) return "고등부";
  if (/중|중등/.test(text)) return "중등부";
  return "초등부";
}

function compactLearningStudentLabel(student) {
  const school = String(student.school || "").trim();
  const grade = String(student.grade || "").trim();
  if (!school && !grade) return "";
  let compactGrade = grade
    .replace(/\s+/g, "")
    .replace("학년", "")
    .replace("등", "");
  if (school.endsWith("초") && compactGrade.startsWith("초")) compactGrade = compactGrade.slice(1);
  if (school.endsWith("중") && compactGrade.startsWith("중")) compactGrade = compactGrade.slice(1);
  if (school.endsWith("고") && compactGrade.startsWith("고")) compactGrade = compactGrade.slice(1);
  return `${school}${compactGrade}`;
}

function learningStudentButtonHtml(student) {
  const active = student.id === selectedId ? "active" : "";
  const label = compactLearningStudentLabel(student);
  return `
    <button class="dashboard-row learning-student-row ${active}" type="button" data-learning-student="${student.id}">
      ${label ? `<span class="learning-student-school">${escapeHtml(label)}</span>` : ""}
      <strong>${escapeHtml(student.studentName || "이름 없음")}</strong>
    </button>
  `;
}

function paymentHistoryHtml(student) {
  const records = [...(student.paymentRecords || [])]
    .sort((a, b) => (b.paymentDate || "").localeCompare(a.paymentDate || ""))
    .slice(0, 4);

  if (!records.length) return "";

  return `
    <div class="payment-history wide">
      <strong>최근 수납기록</strong>
      ${records.map((record) => `
        <p>
          <span>${escapeHtml(record.paymentDate ? compactDate(record.paymentDate) : "입금일 없음")}</span>
          <span>${escapeHtml(record.paymentName || "수납명 없음")}</span>
          <span>${money(record.paidAmount)}</span>
          <span>${escapeHtml(record.paymentMethod || "-")}</span>
        </p>
      `).join("")}
    </div>
  `;
}

function currentMonthText() {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
}

function dateFromText(value) {
  if (!value) return null;
  const [year, month, day] = String(value).split("-").map(Number);
  if (!year || !month || !day) return null;
  return new Date(year, month - 1, day);
}

function daysUntilDate(value) {
  const target = dateFromText(value);
  const today = dateFromText(currentDateText());
  if (!target || !today) return null;
  return Math.round((target.getTime() - today.getTime()) / 86400000);
}

function hasPaymentRecordInMonth(student, month) {
  const studentName = canonicalStudentName(student.studentName);
  const ownRecords = Array.isArray(student.paymentRecords) ? student.paymentRecords : [];
  const standaloneRecords = standalonePaymentRecords.filter((record) => canonicalStudentName(record.studentName) === studentName);
  return [...ownRecords, ...standaloneRecords].some((record) => {
    const recordMonth = String(record.registered || record.paymentDate || "").slice(0, 7);
    return recordMonth === month;
  });
}

function upcomingPaymentRecords() {
  return students
    .filter((student) => student.enrollmentStatus === "재원" && student.paymentDueDate)
    .filter((student) => {
      const dueMonth = String(student.paymentDueDate).slice(0, 7);
      const daysLeft = daysUntilDate(student.paymentDueDate);
      return dueMonth === currentMonthText() &&
        daysLeft !== null &&
        daysLeft <= 2 &&
        !hasPaymentRecordInMonth(student, dueMonth);
    })
    .map((student) => {
      const baseTuition = paymentBaseTuitionFromStudent(student);
      return {
        ...paymentRecord(student.studentName, {
          registered: student.paymentDueDate,
          paymentName: paymentNameFromStudent(student),
          baseTuition,
          tuition: baseTuition,
          discount: 0,
          paidAmount: 0,
          unpaidAmount: baseTuition,
          paymentDate: "",
          paymentMethod: "",
          memo: "자동 생성된 납부예정 기록",
          status: "미납",
        }),
        id: `auto-due|${student.id}|${student.paymentDueDate}`,
        studentId: student.id,
        studentName: student.studentName,
        grade: student.grade,
        school: student.school,
        phone: student.parentPhone,
        standalone: false,
        autoDue: true,
      };
    });
}

function allPaymentRecords() {
  const studentRecords = students.flatMap((student) => (student.paymentRecords || []).map((record) => ({
    ...record,
    studentId: student.id,
    studentName: student.studentName,
    grade: student.grade,
    school: student.school,
    phone: student.parentPhone,
    standalone: false,
  })));
  const paymentOnlyRecords = standalonePaymentRecords.map((record) => ({
    ...record,
    studentId: "",
    studentName: record.studentName,
    grade: record.grade || "",
    school: record.school || "",
    phone: record.phone || "",
    standalone: true,
  }));
  return uniquePaymentRecords([...upcomingPaymentRecords(), ...studentRecords, ...paymentOnlyRecords])
    .sort((a, b) => (b.paymentDate || b.registered || "").localeCompare(a.paymentDate || a.registered || ""));
}

function filteredPaymentRecords() {
  const month = $("paymentMonthFilter")?.value || "";
  const status = $("paymentStatusFilter")?.value || "";
  const query = ($("paymentSearchInput")?.value || "").trim().toLowerCase();
  return allPaymentRecords().filter((record) => {
    const recordMonth = recordMonthText(record);
    const recordStatus = paymentRecordStatus(record);
    const targetText = [
      recordStatus,
      record.studentName,
      record.school,
      record.grade,
      record.phone,
      record.paymentType,
      record.paymentName,
      record.paymentMethod,
      paymentPartSummary(record),
      record.cashReceiptDate,
      record.bookFeeTitle,
      record.bookFeeCount,
      bookFeeSummary(record),
      subjectAllocationSummary(record),
      visiblePaymentMemo(record.memo),
    ].join(" ").toLowerCase();
    return (!month || recordMonth === month) &&
      (!status || recordStatus === status) &&
      (!query || targetText.includes(query));
  });
}

function filteredLedgerRecords() {
  const month = $("ledgerMonthFilter")?.value || "";
  const query = ($("ledgerSearchInput")?.value || "").trim().toLowerCase();
  return allPaymentRecords().filter((record) => {
    const recordMonth = String(record.registered || record.paymentDate || "").slice(0, 7);
    const targetText = [
      record.status,
      record.studentName,
      record.school,
      record.grade,
      record.paymentType,
      record.paymentName,
      record.paymentMethod,
      paymentPartSummary(record),
      record.bookFeeTitle,
      bookFeeSummary(record),
      subjectAllocationSummary(record),
      visiblePaymentMemo(record.memo),
    ].join(" ").toLowerCase();
    return (!month || recordMonth === month) && (!query || targetText.includes(query));
  });
}

function bookFeeItems(record = {}) {
  return normalizeBookFees(record.bookFees || [], record.bookFeeTitle || "", record.bookFeeAmount || 0);
}

function bookFeeSummary(record = {}) {
  return bookFeeItems(record)
    .map((item) => [item.title, item.amount ? money(item.amount) : ""].filter(Boolean).join(" "))
    .join(" / ");
}

function subjectAllocationSummary(record = {}) {
  return normalizeSubjectAllocations(record.subjectAllocations || [])
    .map((item) => [item.subject, item.amount ? money(item.amount) : "", item.memo ? `(${item.memo})` : ""].filter(Boolean).join(" "))
    .join(" / ");
}

function bookFeeTotal(record = {}) {
  return bookFeeItems(record).reduce((sum, item) => sum + Number(item.amount || 0), 0);
}

function paymentPartItems(record = {}) {
  const saved = normalizePaymentParts(record.paymentParts || []);
  if (saved.length) return saved;
  if (Number(record.paidAmount || 0) || record.paymentDate || record.paymentMethod) {
    return normalizePaymentParts([{
      date: record.paymentDate || "",
      method: record.paymentMethod || "",
      amount: Number(record.paidAmount || 0),
      cashReceiptDate: record.cashReceiptDate || "",
      memo: "",
    }]);
  }
  return [];
}

function paymentPartSummary(record = {}) {
  const parts = paymentPartItems(record);
  if (!parts.length) return "";
  if (parts.length === 1) {
    const item = parts[0];
    return [compactDate(item.date), item.method, money(item.amount)].filter(Boolean).join(" ");
  }
  return parts
    .map((item) => [compactDate(item.date), item.method, money(item.amount)].filter(Boolean).join(" "))
    .join(" / ");
}

function paymentDateSummary(record = {}) {
  const dates = uniqueValues(paymentPartItems(record).map((item) => item.date).filter(Boolean));
  if (!dates.length) return compactDate(record.paymentDate);
  return dates.length === 1 ? compactDate(dates[0]) : `${compactDate(dates[0])} 외 ${dates.length - 1}`;
}

function paymentMethodSummary(record = {}) {
  const parts = paymentPartItems(record);
  if (parts.length > 1) return "복합결제";
  return parts[0]?.method || record.paymentMethod || "-";
}

function baseTuitionAmount(record = {}) {
  return Number(record.baseTuition ?? record.tuition ?? 0);
}

function paymentMethodOptionHtml(selected = "") {
  const value = String(selected || "").trim();
  const options = value && !PAYMENT_METHOD_OPTIONS.includes(value)
    ? ["", ...PAYMENT_METHOD_OPTIONS, value]
    : ["", ...PAYMENT_METHOD_OPTIONS];
  return options.map((option) => `
    <option value="${escapeHtml(option)}" ${option === value ? "selected" : ""}>${escapeHtml(option || "선택")}</option>
  `).join("");
}

function paymentTypeOptionHtml(selected = "") {
  const value = normalizePaymentType(selected);
  return PAYMENT_TYPE_OPTIONS.map((option) => `
    <option value="${escapeHtml(option)}" ${option === value ? "selected" : ""}>${escapeHtml(option)}</option>
  `).join("");
}

function isBankTransferMethod(method = "") {
  return String(method || "").includes("계좌");
}

function syncStandaloneCashReceiptField() {
  const wrap = $("payCashReceiptDateWrap");
  if (!wrap) return;
  wrap.classList.toggle("hidden", !isBankTransferMethod($("payPaymentMethod")?.value));
}

function syncPaymentDetailCashReceiptField(detail) {
  if (!detail) return;
  const method = detail.querySelector("[data-payment-field='paymentMethod']")?.value || "";
  const wrap = detail.querySelector("[data-cash-receipt-wrap]");
  if (wrap) wrap.classList.toggle("hidden", !isBankTransferMethod(method));
}

function bookFeeRowHtml(item = {}) {
  return `
    <div class="book-fee-row">
      <label>
        교재
        <input data-book-title type="text" value="${escapeHtml(item.title || "")}" />
      </label>
      <label>
        금액
        <input data-book-amount type="number" step="1000" min="0" value="${Number(item.amount || 0) || ""}" />
      </label>
      <button class="mini-danger-button" type="button" data-book-fee-remove>삭제</button>
    </div>
  `;
}

function bookFeeEditorHtml(record = {}) {
  const items = bookFeeItems(record);
  return `
    <div class="book-fee-editor wide" data-book-fee-editor>
      <div class="book-fee-head">
        <button class="mini-button" type="button" data-book-fee-add>교재 추가</button>
        <strong>교재비</strong>
        <span>합계 <b data-book-fee-total>${money(bookFeeTotal(record))}</b></span>
      </div>
      <div class="book-fee-list" data-book-fee-list>
        ${(items.length ? items : [{}]).map((item) => bookFeeRowHtml(item)).join("")}
      </div>
    </div>
  `;
}

function paymentPartRowHtml(item = {}) {
  return `
    <div class="payment-part-row">
      <label>
        납부일
        <input data-payment-part-date type="date" value="${escapeHtml(item.date || "")}" />
      </label>
      <label>
        방법
        <select data-payment-part-method>
          ${paymentMethodOptionHtml(item.method || "")}
        </select>
      </label>
      <label>
        금액
        <input data-payment-part-amount type="number" step="1000" min="0" value="${Number(item.amount || 0) || ""}" />
      </label>
      <label>
        영수증일
        <input data-payment-part-cash-receipt type="date" value="${escapeHtml(item.cashReceiptDate || "")}" />
      </label>
      <label>
        메모
        <input data-payment-part-memo type="text" value="${escapeHtml(item.memo || "")}" placeholder="예: 1차, 잔액" />
      </label>
      <button class="mini-danger-button" type="button" data-payment-part-remove>삭제</button>
    </div>
  `;
}

function paymentPartEditorHtml(record = {}) {
  const items = normalizePaymentParts(record.paymentParts || []);
  const fallbackItems = items.length ? items : [];
  return `
    <div class="payment-part-editor wide" data-payment-part-editor>
      <div class="payment-part-head">
        <button class="mini-button" type="button" data-payment-part-add>부분납부 추가</button>
        <strong>부분납부</strong>
        <span>합계 <b data-payment-part-total>${money(paymentPartsTotal(fallbackItems))}</b></span>
      </div>
      <div class="payment-part-list" data-payment-part-list>
        ${(fallbackItems.length ? fallbackItems : [{}]).map((item) => paymentPartRowHtml(item)).join("")}
      </div>
      <p class="subject-allocation-note">여러 결제수단으로 나누어 납부한 경우에만 입력하세요. 입력한 합계가 납부금액으로 자동 반영됩니다.</p>
    </div>
  `;
}

function subjectAllocationItems(record = {}) {
  const saved = normalizeSubjectAllocations(record.subjectAllocations || []);
  if (saved.length) return saved;
  if (record.paymentType === "교재비") return [];
  const student = studentForPaymentRecord(record) || record;
  const groups = subjectFinanceGroupsForText([record.paymentName, record.studentName, record.school, record.grade].join(" "), student)
    .filter((group) => !["기타", "배분 필요"].includes(group));
  const amount = Number(record.paidAmount || 0);
  return groups.map((subject) => ({
    subject,
    amount: groups.length === 1 ? amount : 0,
    memo: "",
  }));
}

function subjectAllocationTotal(record = {}) {
  return normalizeSubjectAllocations(record.subjectAllocations || [])
    .reduce((sum, item) => sum + Number(item.amount || 0), 0);
}

function subjectAllocationRowHtml(item = {}) {
  return `
    <div class="subject-allocation-row">
      <label>
        과목
        <select data-subject-allocation-subject>
          ${SUBJECT_FINANCE_GROUPS.filter((subject) => !["기타", "배분 필요"].includes(subject)).map((subject) => (
            `<option value="${escapeHtml(subject)}" ${item.subject === subject ? "selected" : ""}>${escapeHtml(subject)}</option>`
          )).join("")}
        </select>
      </label>
      <label>
        금액
        <input data-subject-allocation-amount type="number" step="1000" min="0" value="${Number(item.amount || 0) || ""}" />
      </label>
      <label>
        메모
        <input data-subject-allocation-memo type="text" value="${escapeHtml(item.memo || "")}" placeholder="예: 장기생 금액" />
      </label>
      <button class="mini-danger-button" type="button" data-subject-allocation-remove>삭제</button>
    </div>
  `;
}

function subjectAllocationEditorHtml(record = {}) {
  const items = subjectAllocationItems(record);
  const displayTotal = normalizeSubjectAllocations(items).reduce((sum, item) => sum + Number(item.amount || 0), 0);
  return `
    <div class="subject-allocation-editor wide" data-subject-allocation-editor>
      <div class="subject-allocation-head">
        <button class="mini-button" type="button" data-subject-allocation-add>과목 추가</button>
        <strong>이번 수납의 과목별 배분</strong>
        <span>배분 <b data-subject-allocation-total>${money(displayTotal)}</b> / 납부 <b data-subject-allocation-paid>${money(record.paidAmount || 0)}</b></span>
      </div>
      <div class="subject-allocation-list" data-subject-allocation-list>
        ${(items.length ? items : [{}]).map((item) => subjectAllocationRowHtml(item)).join("")}
      </div>
      <p class="subject-allocation-note" data-subject-allocation-note>입력한 금액만 과목별 매출에 반영됩니다. 차액은 과목별 매출에서 제외됩니다.</p>
    </div>
  `;
}

function collectBookFees(root) {
  return Array.from(root.querySelectorAll(".book-fee-row"))
    .map((row) => ({
      title: normalizeCourseText(row.querySelector("[data-book-title]")?.value || "").trim(),
      amount: Number(row.querySelector("[data-book-amount]")?.value || 0),
    }))
    .filter((item) => item.title || item.amount);
}

function collectPaymentParts(root) {
  return normalizePaymentParts(Array.from(root.querySelectorAll(".payment-part-row"))
    .map((row) => ({
      date: row.querySelector("[data-payment-part-date]")?.value || "",
      method: row.querySelector("[data-payment-part-method]")?.value || "",
      amount: Number(row.querySelector("[data-payment-part-amount]")?.value || 0),
      cashReceiptDate: row.querySelector("[data-payment-part-cash-receipt]")?.value || "",
      memo: row.querySelector("[data-payment-part-memo]")?.value?.trim() || "",
    })));
}

function collectSubjectAllocations(root) {
  return normalizeSubjectAllocations(Array.from(root.querySelectorAll(".subject-allocation-row"))
    .map((row) => ({
      subject: row.querySelector("[data-subject-allocation-subject]")?.value || "",
      amount: Number(row.querySelector("[data-subject-allocation-amount]")?.value || 0),
      memo: row.querySelector("[data-subject-allocation-memo]")?.value?.trim() || "",
    })));
}

function updateBookFeeTotal(editor) {
  if (!editor) return;
  const total = collectBookFees(editor).reduce((sum, item) => sum + Number(item.amount || 0), 0);
  const target = editor.querySelector("[data-book-fee-total]");
  if (target) target.textContent = money(total);
}

function updatePaymentPartTotal(editor) {
  if (!editor) return;
  const total = paymentPartsTotal(collectPaymentParts(editor));
  const target = editor.querySelector("[data-payment-part-total]");
  if (target) target.textContent = money(total);
}

function updateSubjectAllocationTotal(editor) {
  if (!editor) return;
  const detail = editor.closest("[data-payment-detail-id]");
  const total = collectSubjectAllocations(editor).reduce((sum, item) => sum + Number(item.amount || 0), 0);
  const paid = Number(detail?.querySelector("[data-payment-field='paidAmount']")?.value || 0);
  const totalTarget = editor.querySelector("[data-subject-allocation-total]");
  const paidTarget = editor.querySelector("[data-subject-allocation-paid]");
  const note = editor.querySelector("[data-subject-allocation-note]");
  if (totalTarget) totalTarget.textContent = money(total);
  if (paidTarget) paidTarget.textContent = money(paid);
  if (note) {
    note.textContent = total && total !== paid
      ? `차액 ${money(Math.abs(paid - total))}은 과목별 매출에 반영하지 않습니다.`
      : "입력한 금액만 과목별 매출에 반영됩니다. 차액은 과목별 매출에서 제외됩니다.";
    note.classList.toggle("warning", Boolean(total && total !== paid));
  }
}

function calculatePaymentTotal(baseAmount, bookFees) {
  return Number(baseAmount || 0) + bookFees.reduce((sum, item) => sum + Number(item.amount || 0), 0);
}

function bookFeeAmountSum(bookFees = []) {
  return bookFees.reduce((sum, item) => sum + Number(item.amount || 0), 0);
}

function updatePaymentDetailTotals(detail) {
  if (!detail) return;
  const editor = detail.querySelector("[data-book-fee-editor]");
  const bookFees = collectBookFees(editor || detail);
  const baseInput = detail.querySelector("[data-payment-field='baseTuition']");
  const totalInput = detail.querySelector("[data-payment-field='tuition']");
  const discountInput = detail.querySelector("[data-payment-field='discount']");
  const paidInput = detail.querySelector("[data-payment-field='paidAmount']");
  const unpaidInput = detail.querySelector("[data-payment-field='unpaidAmount']");
  const paymentPartEditor = detail.querySelector("[data-payment-part-editor]");
  const paymentParts = collectPaymentParts(paymentPartEditor || detail);
  const paymentPartsAmount = paymentPartsTotal(paymentParts);
  const autoTotal = calculatePaymentTotal(Number(baseInput?.value || 0), bookFees);
  const totalWasEdited = totalInput?.dataset.userEditedTotal === "true";
  const total = totalWasEdited ? (Number(totalInput?.value || 0) || autoTotal) : autoTotal;
  const discount = Number(discountInput?.value || 0);
  const selectedStatus = detail.querySelector("[data-payment-field='status']")?.value || "미납";
  const payableAmount = Math.max(0, total + discount);

  updateBookFeeTotal(editor);
  updatePaymentPartTotal(paymentPartEditor);
  if (paidInput && paymentPartsAmount > 0) {
    paidInput.value = paymentPartsAmount;
  }
  updateSubjectAllocationTotal(detail.querySelector("[data-subject-allocation-editor]"));
  if (totalInput && !totalWasEdited) totalInput.value = autoTotal;
  if (paidInput && selectedStatus === "납부완료" && Number(paidInput.value || 0) <= 0) {
    paidInput.value = payableAmount;
  }
  if (unpaidInput) unpaidInput.value = selectedStatus === "납부완료"
    ? 0
    : Math.max(0, payableAmount - Number(paidInput?.value || 0));
}

function updateStandalonePaymentTotals() {
  const editor = document.querySelector("[data-book-fee-editor='standalone']");
  const bookFees = collectBookFees(editor || document);
  const total = calculatePaymentTotal(Number($("payTuition")?.value || 0), bookFees);
  const discount = Number($("payDiscount")?.value || 0);
  const paidInput = $("payPaidAmount");
  const totalText = $("payCalculatedTotal");

  updateBookFeeTotal(editor);
  if (totalText) totalText.textContent = money(total);
  if (paidInput && !paidInput.value && $("payStatus")?.value !== "미납") {
    paidInput.value = Math.max(0, total + discount) || "";
  }
}

function bindBookFeeEditorEvents(root = document) {
  root.querySelectorAll("[data-book-fee-add]").forEach((button) => {
    if (button.dataset.bound === "true") return;
    button.dataset.bound = "true";
    button.addEventListener("click", () => {
      const editor = button.closest("[data-book-fee-editor]");
      const list = editor?.querySelector("[data-book-fee-list]");
      if (!list) return;
      list.insertAdjacentHTML("beforeend", bookFeeRowHtml());
      bindBookFeeEditorEvents(editor);
      updateBookFeeTotal(editor);
      updatePaymentDetailTotals(button.closest("[data-payment-detail-id]"));
      updateStandalonePaymentTotals();
      list.querySelector(".book-fee-row:last-child [data-book-title]")?.focus();
    });
  });

  root.querySelectorAll("[data-book-amount], [data-book-title]").forEach((input) => {
    if (input.dataset.bound === "true") return;
    input.dataset.bound = "true";
    if (input.matches("[data-book-title]")) {
      input.addEventListener("blur", () => normalizeKoreanCourseInput(input));
    }
    input.addEventListener("input", () => {
      const editor = input.closest("[data-book-fee-editor]");
      updateBookFeeTotal(editor);
      updatePaymentDetailTotals(input.closest("[data-payment-detail-id]"));
      updateStandalonePaymentTotals();
    });
  });

  root.querySelectorAll("[data-book-fee-remove]").forEach((button) => {
    if (button.dataset.bound === "true") return;
    button.dataset.bound = "true";
    button.addEventListener("click", () => {
      const list = button.closest("[data-book-fee-list]");
      const row = button.closest(".book-fee-row");
      if (!list || !row) return;
      if (list.querySelectorAll(".book-fee-row").length <= 1) {
        row.querySelectorAll("input").forEach((input) => { input.value = ""; });
        updateBookFeeTotal(button.closest("[data-book-fee-editor]"));
        updatePaymentDetailTotals(button.closest("[data-payment-detail-id]"));
        updateStandalonePaymentTotals();
        return;
      }
      row.remove();
      updateBookFeeTotal(button.closest("[data-book-fee-editor]"));
      updatePaymentDetailTotals(button.closest("[data-payment-detail-id]"));
      updateStandalonePaymentTotals();
    });
  });
}

function bindPaymentPartEditorEvents(root = document) {
  root.querySelectorAll("[data-payment-part-add]").forEach((button) => {
    if (button.dataset.bound === "true") return;
    button.dataset.bound = "true";
    button.addEventListener("click", () => {
      const editor = button.closest("[data-payment-part-editor]");
      const list = editor?.querySelector("[data-payment-part-list]");
      if (!list) return;
      list.insertAdjacentHTML("beforeend", paymentPartRowHtml());
      bindPaymentPartEditorEvents(editor);
      updatePaymentPartTotal(editor);
      updatePaymentDetailTotals(button.closest("[data-payment-detail-id]"));
      list.querySelector(".payment-part-row:last-child [data-payment-part-date]")?.focus();
    });
  });

  root.querySelectorAll("[data-payment-part-date], [data-payment-part-method], [data-payment-part-amount], [data-payment-part-cash-receipt], [data-payment-part-memo]").forEach((input) => {
    if (input.dataset.bound === "true") return;
    input.dataset.bound = "true";
    input.addEventListener("input", () => updatePaymentDetailTotals(input.closest("[data-payment-detail-id]")));
    input.addEventListener("change", () => updatePaymentDetailTotals(input.closest("[data-payment-detail-id]")));
  });

  root.querySelectorAll("[data-payment-part-remove]").forEach((button) => {
    if (button.dataset.bound === "true") return;
    button.dataset.bound = "true";
    button.addEventListener("click", () => {
      const list = button.closest("[data-payment-part-list]");
      const row = button.closest(".payment-part-row");
      if (!list || !row) return;
      if (list.querySelectorAll(".payment-part-row").length <= 1) {
        row.querySelectorAll("input").forEach((input) => { input.value = ""; });
        const select = row.querySelector("select");
        if (select) select.value = "";
      } else {
        row.remove();
      }
      const editor = button.closest("[data-payment-part-editor]");
      updatePaymentPartTotal(editor);
      updatePaymentDetailTotals(button.closest("[data-payment-detail-id]"));
    });
  });
}

function bindSubjectAllocationEditorEvents(root = document) {
  root.querySelectorAll("[data-subject-allocation-add]").forEach((button) => {
    if (button.dataset.bound === "true") return;
    button.dataset.bound = "true";
    button.addEventListener("click", () => {
      const editor = button.closest("[data-subject-allocation-editor]");
      const list = editor?.querySelector("[data-subject-allocation-list]");
      if (!list) return;
      list.insertAdjacentHTML("beforeend", subjectAllocationRowHtml());
      bindSubjectAllocationEditorEvents(editor);
      updateSubjectAllocationTotal(editor);
      list.querySelector(".subject-allocation-row:last-child [data-subject-allocation-subject]")?.focus();
    });
  });

  root.querySelectorAll("[data-subject-allocation-subject], [data-subject-allocation-amount], [data-subject-allocation-memo]").forEach((input) => {
    if (input.dataset.bound === "true") return;
    input.dataset.bound = "true";
    input.addEventListener("input", () => updateSubjectAllocationTotal(input.closest("[data-subject-allocation-editor]")));
    input.addEventListener("change", () => updateSubjectAllocationTotal(input.closest("[data-subject-allocation-editor]")));
  });

  root.querySelectorAll("[data-subject-allocation-remove]").forEach((button) => {
    if (button.dataset.bound === "true") return;
    button.dataset.bound = "true";
    button.addEventListener("click", () => {
      const list = button.closest("[data-subject-allocation-list]");
      const row = button.closest(".subject-allocation-row");
      if (!list || !row) return;
      if (list.querySelectorAll(".subject-allocation-row").length <= 1) {
        row.querySelectorAll("input").forEach((input) => { input.value = ""; });
        updateSubjectAllocationTotal(button.closest("[data-subject-allocation-editor]"));
        return;
      }
      row.remove();
      updateSubjectAllocationTotal(button.closest("[data-subject-allocation-editor]"));
    });
  });
}

function renderPaymentLedger() {
  const root = $("paymentLedger");
  if (!root) return;
  const records = filteredLedgerRecords();
  const recent = records.slice(0, 120);
  const totalPaid = records.reduce((sum, record) => sum + Number(record.paidAmount || 0), 0);

  root.innerHTML = `
    <div class="ledger-summary">
      <span>${$("ledgerMonthFilter")?.value || "전체"} 수납이력 ${records.length}건</span>
      <strong>총 납부금액 ${money(totalPaid)}</strong>
    </div>
    <div class="ledger-table-wrap">
      <table class="ledger-table">
        <thead>
          <tr>
            <th>입금일</th>
            <th>원생명</th>
            <th>학년</th>
            <th>수납명</th>
            <th>수납금액</th>
            <th>할인</th>
            <th>납부금액</th>
            <th>납부방법</th>
            <th>현금영수증</th>
            <th>교재명</th>
            <th>교재비</th>
            <th>메모</th>
          </tr>
        </thead>
        <tbody>
          ${recent.map((record) => `
            <tr>
              <td>${escapeHtml(paymentDateSummary(record))}</td>
              <td>${escapeHtml(record.studentName || "-")}</td>
              <td>${escapeHtml(record.grade || "-")}</td>
              <td>${escapeHtml(record.paymentName || "-")}</td>
              <td>${money(record.tuition)}</td>
              <td>${money(record.discount)}</td>
              <td>${money(record.paidAmount)}</td>
              <td>${escapeHtml(paymentPartSummary(record) || paymentMethodSummary(record))}</td>
              <td>${escapeHtml(compactDate(record.cashReceiptDate) || "-")}</td>
              <td>${escapeHtml(bookFeeSummary(record) || "-")}</td>
              <td>${money(bookFeeTotal(record))}</td>
              <td>${escapeHtml(visiblePaymentMemo(record.memo) || "-")}</td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    </div>
  `;
}

function renderPaymentOverview() {
  const records = filteredPaymentRecords();
  const totalTuition = records.reduce((sum, record) => sum + Number(record.tuition || 0), 0);
  const totalDiscount = records.reduce((sum, record) => sum + Number(record.discount || 0), 0);
  const totalPaid = records.reduce((sum, record) => sum + Number(record.paidAmount || 0), 0);

  $("paymentOverview").innerHTML = records.length
    ? `
      <div class="payment-ledger-table-wrap">
        <table class="payment-ledger-table">
          <thead>
            <tr>
              <th><input id="paymentSelectAll" type="checkbox" aria-label="수납기록 전체 선택" /></th>
              <th>No</th>
              <th>상태</th>
              <th>등록일</th>
              <th>이름</th>
              <th>학교 학년</th>
              <th>연락처</th>
              <th>수납내용</th>
              <th>수납금액</th>
              <th>할인</th>
              <th>납부금액</th>
              <th>입금일</th>
              <th>납부방법</th>
              <th>상세</th>
            </tr>
          </thead>
          <tbody>
            ${records.map((record, index) => paymentRecordRows(record, index + 1)).join("")}
          </tbody>
          <tfoot>
            <tr>
              <td colspan="8">합계</td>
              <td>${money(totalTuition)}</td>
              <td>${money(totalDiscount)}</td>
              <td>${money(totalPaid)}</td>
              <td colspan="3"></td>
            </tr>
          </tfoot>
        </table>
      </div>
    `
    : `<p class="empty-feedback">표시할 수납기록이 없습니다.</p>`;

  bindPaymentOverviewEvents();
}

function paymentRecordRows(record, rowNumber) {
  const status = paymentRecordStatus(record);
  const isRefund = record.status === "환불" || Number(record.paidAmount || 0) < 0;
  const isCanceled = record.status === "취소";
  const statusLabel = isRefund ? "환불" : isCanceled ? "취소" : record.autoDue ? "예정" : (status === "납부완료" ? "완납" : "미납");
  const statusClass = isRefund || isCanceled ? "refund" : status === "납부완료" ? "complete" : "unpaid";
  const standaloneAttr = record.standalone ? "true" : "false";
  const managedStudentFields = record.standalone ? "" : "disabled";
  const baseTuition = baseTuitionAmount(record);
  return `
    <tr class="payment-ledger-row" data-payment-student-id="${escapeHtml(record.studentId)}" data-payment-record-id="${escapeHtml(record.id)}">
      <td>${record.autoDue ? "" : `<input class="payment-select" type="checkbox" data-payment-select="${escapeHtml(record.id)}" aria-label="${escapeHtml(record.studentName || "수납기록")} 선택" />`}</td>
      <td>${rowNumber}</td>
      <td><span class="payment-status-chip ${statusClass}">${statusLabel}</span></td>
      <td>${escapeHtml(compactDate(record.registered))}</td>
      <td><strong>${escapeHtml(record.studentName || "-")}</strong></td>
      <td>${escapeHtml([record.school, record.grade].filter(Boolean).join(" ") || "-")}</td>
      <td>${escapeHtml(compactPhone(record.phone))}</td>
      <td class="payment-name-cell" title="${escapeHtml(record.paymentName || "")}">${escapeHtml(record.paymentName || "-")}</td>
      <td>${money(record.tuition)}</td>
      <td>${money(record.discount)}</td>
      <td class="paid-cell">${money(record.paidAmount)}</td>
      <td>${escapeHtml(paymentDateSummary(record))}</td>
      <td>
        ${escapeHtml(paymentMethodSummary(record))}
        ${paymentPartItems(record).length > 1 ? `<small>${escapeHtml(paymentPartSummary(record))}</small>` : ""}
        ${record.cashReceiptDate ? `<small>현금영수증 ${escapeHtml(compactDate(record.cashReceiptDate))}</small>` : ""}
      </td>
      <td>
        <div class="payment-row-actions">
          <button class="mini-button" type="button" data-payment-toggle="${escapeHtml(record.id)}">상세</button>
          ${record.autoDue ? "" : `<button class="mini-danger-button" type="button" data-payment-delete="${escapeHtml(record.id)}">삭제</button>`}
        </div>
      </td>
    </tr>
    <tr class="payment-detail-row hidden" data-payment-detail-id="${escapeHtml(record.id)}" data-payment-detail-student-id="${escapeHtml(record.studentId)}" data-payment-standalone="${standaloneAttr}">
      <td colspan="14">
        <div class="payment-editor payment-details-table">
          <label>
            원생명
            <input data-payment-field="studentName" value="${escapeHtml(record.studentName || "")}" ${managedStudentFields} />
          </label>
          <label>
            학교
            <input data-payment-field="school" value="${escapeHtml(record.school || "")}" ${managedStudentFields} />
          </label>
          <label>
            학년
            <input data-payment-field="grade" value="${escapeHtml(record.grade || "")}" ${managedStudentFields} />
          </label>
          <label>
            연락처
            <input data-payment-field="phone" value="${escapeHtml(record.phone || "")}" ${managedStudentFields} />
          </label>
          <label class="payment-detail-spacer" aria-hidden="true"></label>
          <label>
            등록일
            <input data-payment-field="registered" type="date" value="${escapeHtml(record.registered || "")}" />
          </label>
          <label>
            수납유형
            <select data-payment-field="paymentType">
              ${paymentTypeOptionHtml(record.paymentType || "")}
            </select>
          </label>
          <label>
            상태
            <select data-payment-field="status">
              <option ${status === "납부완료" ? "selected" : ""}>납부완료</option>
              <option ${status === "미납" ? "selected" : ""}>미납</option>
            </select>
          </label>
          <label>
            납부방법
            <select data-payment-field="paymentMethod">
              ${paymentMethodOptionHtml(record.paymentMethod || "")}
            </select>
          </label>
          <label>
            납부금액
            <input data-payment-field="paidAmount" type="number" step="1000" value="${Number(record.paidAmount || 0)}" />
          </label>
          <label>
            입금일
            <input data-payment-field="paymentDate" type="date" value="${escapeHtml(record.paymentDate || "")}" />
          </label>
          <label>
            수납명
            <input data-payment-field="paymentName" value="${escapeHtml(record.paymentName || "")}" />
          </label>
          <label>
            기본 교육비
            <input data-payment-field="baseTuition" type="number" step="1000" value="${baseTuition}" />
          </label>
          <label>
            할인
            <input data-payment-field="discount" type="number" step="1000" value="${Number(record.discount || 0)}" />
          </label>
          <label>
            합계 수납금액
            <input data-payment-field="tuition" type="number" step="1000" value="${Number(record.tuition || 0)}" />
          </label>
          <label class="${isBankTransferMethod(record.paymentMethod) ? "" : "hidden"}" data-cash-receipt-wrap>
            현금영수증 발행일
            <input data-payment-field="cashReceiptDate" type="date" value="${escapeHtml(record.cashReceiptDate || "")}" />
          </label>
          ${paymentPartEditorHtml(record)}
          ${bookFeeEditorHtml(record)}
          ${subjectAllocationEditorHtml(record)}
          <label class="wide">
            메모
            <textarea data-payment-field="memo" rows="2">${escapeHtml(visiblePaymentMemo(record.memo))}</textarea>
          </label>
          <div class="payment-save-row wide">
            <button class="primary-button" type="button" data-payment-record-save="${escapeHtml(record.id)}">수납기록 저장</button>
          </div>
        </div>
      </td>
    </tr>
  `;
}

function bindPaymentOverviewEvents() {
  bindBookFeeEditorEvents($("paymentOverview"));
  bindPaymentPartEditorEvents($("paymentOverview"));
  bindSubjectAllocationEditorEvents($("paymentOverview"));

  const togglePaymentDetail = (recordId) => {
    const detail = Array.from($("paymentOverview").querySelectorAll("[data-payment-detail-id]"))
      .find((row) => row.dataset.paymentDetailId === recordId);
    const button = Array.from($("paymentOverview").querySelectorAll("[data-payment-toggle]"))
      .find((item) => item.dataset.paymentToggle === recordId);
    if (!detail) return;
    const hidden = detail.classList.toggle("hidden");
    if (button) button.textContent = hidden ? "상세" : "접기";
  };

  $("paymentOverview").querySelectorAll("[data-payment-record-id]").forEach((row) => {
    row.addEventListener("click", (event) => {
      if (event.target.closest("button, input, select, textarea, a, label")) return;
      togglePaymentDetail(row.dataset.paymentRecordId);
    });
  });

  $("paymentSelectAll")?.addEventListener("change", (event) => {
    $("paymentOverview").querySelectorAll("[data-payment-select]").forEach((check) => {
      check.checked = event.target.checked;
    });
  });

  $("paymentOverview").querySelectorAll("[data-payment-select]").forEach((check) => {
    check.addEventListener("click", (event) => event.stopPropagation());
  });

  $("paymentOverview").querySelectorAll("[data-payment-toggle]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      togglePaymentDetail(button.dataset.paymentToggle);
    });
  });

  $("paymentOverview").querySelectorAll("[data-payment-delete]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      deletePaymentRecord(button.dataset.paymentDelete);
    });
  });

  $("paymentOverview").querySelectorAll("[data-payment-record-save]").forEach((button) => {
    button.addEventListener("click", () => savePaymentRecordInfo(button.dataset.paymentRecordSave));
  });

  $("paymentOverview").querySelectorAll("[data-payment-detail-id]").forEach((detail) => {
    detail.querySelectorAll("[data-payment-field='baseTuition'], [data-payment-field='discount'], [data-payment-field='paidAmount'], [data-payment-field='status']").forEach((input) => {
      input.addEventListener("input", () => {
        if (input.matches("[data-payment-field='baseTuition']")) {
          delete detail.querySelector("[data-payment-field='tuition']")?.dataset.userEditedTotal;
        }
        updatePaymentDetailTotals(detail);
      });
      input.addEventListener("change", () => {
        if (input.matches("[data-payment-field='baseTuition']")) {
          delete detail.querySelector("[data-payment-field='tuition']")?.dataset.userEditedTotal;
        }
        updatePaymentDetailTotals(detail);
      });
    });
    detail.querySelector("[data-payment-field='tuition']")?.addEventListener("input", (event) => {
      event.currentTarget.dataset.userEditedTotal = "true";
      updatePaymentDetailTotals(detail);
    });
    detail.querySelector("[data-payment-field='paymentMethod']")?.addEventListener("change", () => syncPaymentDetailCashReceiptField(detail));
    syncPaymentDetailCashReceiptField(detail);
    updatePaymentDetailTotals(detail);
  });
}

function savePaymentInfo(id) {
  const card = Array.from($("paymentOverview").querySelectorAll("[data-payment-id]"))
    .find((item) => item.dataset.paymentId === id);
  const student = students.find((item) => item.id === id);
  if (!card || !student) return;

  const paymentName = card.querySelector("[data-payment-field='paymentName']").value.trim();
  const tuition = Number(card.querySelector("[data-payment-field='tuition']").value || 0);
  const paymentDiscount = Number(card.querySelector("[data-payment-field='paymentDiscount']").value || 0);
  const paidInput = Number(card.querySelector("[data-payment-field='paidAmount']").value || 0);
  const paymentDueDate = card.querySelector("[data-payment-field='paymentDueDate']").value;
  const paymentDate = card.querySelector("[data-payment-field='paymentDate']").value;
  const paymentMethod = card.querySelector("[data-payment-field='paymentMethod']").value.trim();
  const bookFeeTitle = card.querySelector("[data-payment-field='bookFeeTitle']").value.trim();
  const bookFeeCount = card.querySelector("[data-payment-field='bookFeeCount']").value.trim();
  const bookFeeAmount = Number(card.querySelector("[data-payment-field='bookFeeAmount']").value || 0);
  const bookFees = normalizeBookFees([], bookFeeTitle, bookFeeAmount);
  const totalTuition = calculatePaymentTotal(tuition, bookFees);
  const paymentMemo = card.querySelector("[data-payment-field='paymentMemo']").value.trim();
  const paymentStatus = card.dataset.paymentStatus === "납부완료" ? "납부완료" : "미납";
  const paidAmount = paymentStatus === "납부완료" ? paidInput : 0;

  student.paymentName = paymentName;
  student.baseTuition = tuition;
  student.tuition = totalTuition;
  student.paymentDiscount = paymentDiscount;
  student.paymentDueDate = paymentDueDate;
  student.paymentDate = paymentDate;
  student.paymentMethod = paymentMethod;
  student.bookFeeTitle = bookFeeTitle;
  student.bookFeeCount = bookFeeCount;
  student.bookFeeAmount = bookFeeAmount;
  student.paymentMemo = paymentMemo;
  student.paymentStatus = paymentStatus;
  student.paidAmount = paidAmount;
  student.unpaidAmount = Math.max(0, totalTuition + paymentDiscount - paidAmount);
  student.paymentRecords = uniquePaymentRecords([
    ...(student.paymentRecords || []),
    paymentRecord(student.studentName, {
      registered: paymentDueDate,
      paymentName,
      baseTuition: tuition,
      tuition: totalTuition,
      discount: paymentDiscount,
      paidAmount,
      unpaidAmount: student.unpaidAmount,
      paymentDate,
      paymentMethod,
      memo: paymentMemo,
      bookFees,
      status: paymentStatus,
    }),
  ]);

  saveStudents();
  renderAll();
}

function savePaymentRecordInfo(recordId) {
  const detail = Array.from($("paymentOverview").querySelectorAll("[data-payment-detail-id]"))
    .find((row) => row.dataset.paymentDetailId === recordId);
  if (!detail) return;

  const student = students.find((item) => item.id === detail.dataset.paymentDetailStudentId);
  const existingRecord = allPaymentRecords().find((record) => record.id === recordId);
  if (!student && detail.dataset.paymentStandalone !== "true") return;
  const fieldValue = (field) => detail.querySelector(`[data-payment-field='${field}']`)?.value?.trim() || "";
  const recordStudentName = student?.studentName || fieldValue("studentName") || existingRecord?.studentName || "";
  const bookFees = collectBookFees(detail);
  const paymentParts = collectPaymentParts(detail);
  const subjectAllocations = collectSubjectAllocations(detail);
  const rawBaseTuition = Number(fieldValue("baseTuition") || fieldValue("tuition") || 0);
  const autoTuition = calculatePaymentTotal(rawBaseTuition, bookFees);
  const totalInput = detail.querySelector("[data-payment-field='tuition']");
  const manualTuition = totalInput?.dataset.userEditedTotal === "true" ? Number(fieldValue("tuition") || 0) : 0;
  const tuition = manualTuition > 0 ? manualTuition : autoTuition;
  const baseTuition = manualTuition > 0 ? Math.max(0, tuition - bookFeeAmountSum(bookFees)) : rawBaseTuition;
  const discount = Number(fieldValue("discount") || 0);
  const selectedStatus = fieldValue("status") || "미납";
  const payableAmount = Math.max(0, tuition + discount);
  const enteredPaidAmount = paymentPartsTotal(paymentParts) || Number(fieldValue("paidAmount") || 0);
  const paidAmount = selectedStatus === "납부완료" && enteredPaidAmount <= 0
    ? payableAmount
    : enteredPaidAmount;
  const typedUnpaid = fieldValue("unpaidAmount");
  const unpaidAmount = selectedStatus === "납부완료"
    ? 0
    : typedUnpaid === "" ? Math.max(0, payableAmount - paidAmount) : Number(typedUnpaid || 0);
  const paymentMethod = fieldValue("paymentMethod");

  const nextRecord = paymentRecord(recordStudentName, {
    registered: fieldValue("registered"),
    paymentType: fieldValue("paymentType"),
    paymentName: fieldValue("paymentName"),
    baseTuition,
    tuition,
    discount,
    paidAmount,
    unpaidAmount,
    paymentDate: fieldValue("paymentDate"),
    paymentMethod,
    cashReceiptDate: isBankTransferMethod(paymentMethod) ? fieldValue("cashReceiptDate") : "",
    memo: mergeVisibleAndHiddenPaymentMemo(fieldValue("memo"), existingRecord?.memo || ""),
    bookFees,
    subjectAllocations,
    paymentParts,
    status: selectedStatus,
  });
  const matchesSameInvoice = (record = {}) => (
    record.id === recordId ||
    (
      canonicalStudentName(record.studentName) === canonicalStudentName(recordStudentName) &&
      String(record.registered || "") === String(nextRecord.registered || "") &&
      normalizeCourseText(record.paymentName || "") === normalizeCourseText(nextRecord.paymentName || "") &&
      (
        record.autoDue ||
        paymentRecordStatus(record) === "미납" ||
        Number(record.paidAmount || 0) <= 0 ||
        !record.paymentDate
      )
    )
  );

  if (!student) {
    standalonePaymentRecords = uniquePaymentRecords([
      ...standalonePaymentRecords.filter((record) => !matchesSameInvoice(record)),
      {
        ...nextRecord,
        school: fieldValue("school"),
        grade: fieldValue("grade"),
        phone: fieldValue("phone"),
        standalone: true,
      },
    ]);
    saveStandalonePaymentRecords();
    renderAll();
    return;
  }

  student.paymentRecords = uniquePaymentRecords([
    ...(student.paymentRecords || []).filter((record) => !matchesSameInvoice(record)),
    nextRecord,
  ]);
  student.paymentName = nextRecord.paymentName;
  student.baseTuition = nextRecord.baseTuition;
  student.tuition = nextRecord.tuition;
  student.paymentDiscount = nextRecord.discount;
  student.paidAmount = nextRecord.paidAmount;
  student.unpaidAmount = nextRecord.unpaidAmount;
  student.paymentDate = nextRecord.paymentDate;
  student.paymentMethod = nextRecord.paymentMethod;
  student.paymentMemo = nextRecord.memo;
  student.bookFeeTitle = nextRecord.bookFeeTitle;
  student.bookFeeCount = nextRecord.bookFeeCount;
  student.bookFeeAmount = nextRecord.bookFeeAmount;
  student.paymentStatus = nextRecord.status;

  saveStudents();
  renderAll();
}

function syncStudentLatestPayment(student) {
  const latest = [...(student.paymentRecords || [])]
    .sort((a, b) => (b.paymentDate || b.registered || "").localeCompare(a.paymentDate || a.registered || ""))[0];
  if (!latest) {
    student.paymentName = "";
    student.baseTuition = 0;
    student.tuition = 0;
    student.paymentDiscount = 0;
    student.paidAmount = 0;
    student.unpaidAmount = 0;
    student.paymentDate = "";
    student.paymentMethod = "";
    student.paymentMemo = "";
    student.bookFeeTitle = "";
    student.bookFeeCount = "";
    student.bookFeeAmount = 0;
    student.paymentStatus = "납부완료";
    return;
  }

  student.paymentName = latest.paymentName;
  student.baseTuition = latest.baseTuition;
  student.tuition = latest.tuition;
  student.paymentDiscount = latest.discount;
  student.paidAmount = latest.paidAmount;
  student.unpaidAmount = latest.unpaidAmount;
  student.paymentDate = latest.paymentDate;
  student.paymentMethod = latest.paymentMethod;
  student.paymentMemo = latest.memo;
  student.bookFeeTitle = latest.bookFeeTitle;
  student.bookFeeCount = latest.bookFeeCount;
  student.bookFeeAmount = latest.bookFeeAmount;
  student.paymentStatus = latest.status;
}

function deletePaymentRecord(recordId) {
  if (!requireDeletePermission()) return;
  const record = allPaymentRecords().find((item) => item.id === recordId);
  if (!record) return;
  if (!confirm(`${record.studentName || "선택한 학생"}의 수납기록 1건을 삭제할까요? 학생관리 명단은 삭제되지 않습니다.`)) return;
  removePaymentRecordById(recordId);
  addChangeLog("납부관리", "수납기록 삭제", `${record.studentName || "이름 없음"} · ${record.paymentName || ""}`);
  renderAll();
}

function removePaymentRecordById(recordId) {
  const record = allPaymentRecords().find((item) => item.id === recordId);
  if (!record) return false;
  if (record.standalone || !record.studentId) {
    standalonePaymentRecords = standalonePaymentRecords.filter((item) => item.id !== recordId);
    saveStandalonePaymentRecords();
    return true;
  }

  const student = students.find((item) => item.id === record.studentId);
  if (!student) return false;
  student.paymentRecords = (student.paymentRecords || []).filter((item) => item.id !== recordId);
  syncStudentLatestPayment(student);
  saveStudents();
  return true;
}

function deleteSelectedPaymentRecords() {
  if (!requireDeletePermission()) return;
  const selectedIds = Array.from(document.querySelectorAll("[data-payment-select]:checked"))
    .map((check) => check.dataset.paymentSelect);
  if (!selectedIds.length) {
    alert("삭제할 수납기록을 선택해주세요.");
    return;
  }
  if (!confirm(`선택한 수납기록 ${selectedIds.length}건을 삭제할까요? 학생관리 명단은 삭제되지 않습니다.`)) return;

  let removedCount = 0;
  selectedIds.forEach((id) => {
    if (removePaymentRecordById(id)) removedCount += 1;
  });
  addChangeLog("납부관리", "선택 수납기록 삭제", `${removedCount}건 삭제`);
  renderAll();
  alert(`${removedCount}건을 삭제했습니다.`);
}

function downloadTextFile(filename, content, type = "application/json;charset=utf-8") {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function exportPaymentBackup() {
  const today = new Date().toISOString().slice(0, 10);
  const payload = {
    app: "미래엔 에듀 영수학원 관리",
    type: "payment-backup",
    exportedAt: new Date().toISOString(),
    retentionNote: "교육비 수납자료 보관용 백업입니다. 교육지원청 점검 대비를 위해 월 1회 이상 별도 저장 권장.",
    students,
    standalonePaymentRecords,
    paymentRecords: allPaymentRecords(),
  };
  downloadTextFile(`미래엔에듀_수납자료백업_${today}.json`, JSON.stringify(payload, null, 2));
}

function csvCell(value) {
  return `"${String(value ?? "").replaceAll('"', '""')}"`;
}

function exportPaymentLedger() {
  const today = new Date().toISOString().slice(0, 10);
  const headers = ["상태", "이름", "학교", "학년", "연락처", "등록일", "수납유형", "수납명", "수납금액", "할인", "납부금액", "입금일", "납부방법", "현금영수증 발행일", "교재명", "교재비", "과목별 배분", "메모"];
  const rows = allPaymentRecords().map((record) => [
    record.status || "",
    record.studentName || "",
    record.school || "",
    record.grade || "",
    record.phone || "",
    record.registered || "",
    record.paymentType || "",
    record.paymentName || "",
    record.tuition || 0,
    record.discount || 0,
    record.paidAmount || 0,
    record.paymentDate || "",
    record.paymentMethod || "",
    record.cashReceiptDate || "",
    bookFeeSummary(record) || "",
    bookFeeTotal(record) || 0,
    subjectAllocationSummary(record) || "",
    visiblePaymentMemo(record.memo) || "",
  ]);
  const csv = [headers, ...rows].map((row) => row.map(csvCell).join(",")).join("\n");
  downloadTextFile(`미래엔에듀_점검용_수납대장_${today}.csv`, `\uFEFF${csv}`, "text/csv;charset=utf-8");
}

function importPaymentBackup(file) {
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const payload = JSON.parse(String(reader.result || ""));
      if (!Array.isArray(payload.students)) throw new Error("students 없음");
      if (!confirm("현재 사이트의 학생/수납자료를 백업 파일 내용으로 바꿀까요?")) return;
      students = payload.students.map((student) => normalizeStudent(student, { applySubjectAssignments: false }));
      const importedStandaloneRecords = payload.standalonePaymentRecords ||
        (payload.paymentRecords || []).filter((record) => record.standalone && !record.studentId);
      standalonePaymentRecords = uniquePaymentRecords(importedStandaloneRecords
        .map((record) => ({ ...record, standalone: true })));
      selectedId = "";
      saveStudents();
      saveStandalonePaymentRecords();
      renderAll();
      clearStudentDetail();
      alert("백업 자료를 불러왔습니다.");
    } catch {
      alert("백업 파일을 읽을 수 없습니다. 수납자료 백업 파일인지 확인해주세요.");
    } finally {
      $("paymentBackupFile").value = "";
    }
  };
  reader.readAsText(file, "utf-8");
}

function allBackupPayload() {
  return {
    app: "미래엔 에듀 영수학원 관리",
    type: APP_BACKUP_VERSION,
    exportedAt: new Date().toISOString(),
    retentionNote: "학생, 납부, 매출, 교재, 출결, 공지, 변경이력을 함께 보관하는 전체 백업입니다.",
    students,
    standalonePaymentRecords,
    financeRecords,
    fixedExpenseTemplates,
    tuitionRates,
    bookFeeRates,
    bookCatalog,
    bookStockRecords,
    userAccounts,
    kakaoSettings,
    kakaoMessageLogs,
    notices,
    changeLogs,
  };
}

function exportAllBackup() {
  const today = currentDateText();
  addChangeLog("자료보관", "전체 백업 저장", `${today} 기준 전체 자료 백업 파일을 저장했습니다.`);
  downloadTextFile(`미래엔에듀_전체백업_${today}.json`, JSON.stringify(allBackupPayload(), null, 2));
}

function importAllBackup(file) {
  if (!requireDeletePermission()) return;
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const payload = JSON.parse(String(reader.result || ""));
      if (!Array.isArray(payload.students)) throw new Error("students 없음");
      if (!confirm("현재 사이트의 전체 자료를 백업 파일 내용으로 바꿀까요? 먼저 현재 자료를 백업해두는 것을 권장합니다.")) return;

      students = payload.students.map((student) => normalizeStudent(student, { applySubjectAssignments: false }));
      standalonePaymentRecords = Array.isArray(payload.standalonePaymentRecords)
        ? uniquePaymentRecords(payload.standalonePaymentRecords.map((record) => ({ ...record, standalone: true })))
        : [];
      financeRecords = Array.isArray(payload.financeRecords) ? payload.financeRecords.map(normalizeFinanceRecord) : [];
      fixedExpenseTemplates = Array.isArray(payload.fixedExpenseTemplates) ? payload.fixedExpenseTemplates.map(normalizeFixedExpenseTemplate) : [];
      tuitionRates = Array.isArray(payload.tuitionRates) ? payload.tuitionRates.map(normalizeTuitionRate) : [];
      bookFeeRates = Array.isArray(payload.bookFeeRates) ? payload.bookFeeRates.map(normalizeBookFeeRate) : [];
      bookCatalog = Array.isArray(payload.bookCatalog) ? payload.bookCatalog.map(normalizeBook) : [];
      bookStockRecords = Array.isArray(payload.bookStockRecords) ? payload.bookStockRecords.map(normalizeBookStockRecord) : [];
      userAccounts = Array.isArray(payload.userAccounts) ? payload.userAccounts.map(normalizeUserAccount) : userAccounts;
      kakaoSettings = payload.kakaoSettings ? normalizeKakaoSettings(payload.kakaoSettings) : kakaoSettings;
      kakaoMessageLogs = Array.isArray(payload.kakaoMessageLogs) ? payload.kakaoMessageLogs.map(normalizeKakaoMessageLog) : kakaoMessageLogs;
      if (currentUser) currentUser = staffAccountById(currentUser.id) || null;
      notices = Array.isArray(payload.notices) ? payload.notices.map(normalizeNotice) : [];
      changeLogs = Array.isArray(payload.changeLogs) ? payload.changeLogs : [];
      addChangeLog("자료보관", "전체 백업 복원", file.name || "백업 파일");

      selectedId = "";
      saveStudents();
      saveStandalonePaymentRecords();
      saveFinanceRecords();
      saveFixedExpenseTemplates();
      saveTuitionRates();
      saveBookFeeRates();
      saveBookCatalog();
      saveBookStockRecords();
      saveUserAccounts();
      saveKakaoSettingsToStorage();
      saveKakaoMessageLogs();
      saveNotices();
      saveChangeLogs();
      renderAll();
      clearStudentDetail();
      alert("전체 백업 자료를 불러왔습니다.");
    } catch {
      alert("전체 백업 파일을 읽을 수 없습니다. 파일을 다시 확인해주세요.");
    } finally {
      $("allBackupFile").value = "";
    }
  };
  reader.readAsText(file, "utf-8");
}

function monthRange(month) {
  const [year, monthNumber] = String(month || currentMonthText()).split("-").map(Number);
  const safeYear = year || new Date().getFullYear();
  const safeMonth = monthNumber || (new Date().getMonth() + 1);
  const start = `${safeYear}-${String(safeMonth).padStart(2, "0")}-01`;
  const lastDate = new Date(safeYear, safeMonth, 0).getDate();
  const end = `${safeYear}-${String(safeMonth).padStart(2, "0")}-${String(lastDate).padStart(2, "0")}`;
  return { start, end };
}

function monthlyCloseData(month = currentMonthText()) {
  const { start, end } = monthRange(month);
  const monthPayments = allPaymentRecords().filter((record) => recordMonthText(record) === month);
  const paidInMonthAmount = allPaymentRecords().reduce((sum, record) => sum + paymentPaidAmountForRange(record, start, end), 0);
  const monthFinanceRecords = financeRecordsForMonth(month);
  const otherIncome = monthFinanceRecords.filter((record) => record.type === "income").reduce((sum, record) => sum + Number(record.amount || 0), 0);
  const expense = monthFinanceRecords.filter((record) => record.type === "expense").reduce((sum, record) => sum + Number(record.amount || 0), 0);
  const monthBookStockRecords = bookStockRecords.filter((record) => String(record.date || "").slice(0, 7) === month);
  const bookPurchaseQuantity = monthBookStockRecords.filter((record) => record.type === "in").reduce((sum, record) => sum + Number(record.quantity || 0), 0);
  const bookPurchaseAmount = monthBookStockRecords.filter((record) => record.type === "in").reduce((sum, record) => sum + bookStockTotalAmount(record), 0);
  const attendanceRecords = students.flatMap((student) => (student.attendanceRecords || []).map((record) => ({
    ...record,
    studentName: student.studentName,
  }))).filter((record) => String(record.date || "").slice(0, 7) === month);

  return {
    month,
    activeStudents: students.filter((student) => student.enrollmentStatus === "재원").length,
    newStudents: students.filter((student) => String(student.joinDate || "").slice(0, 7) === month).length,
    leftStudents: students.filter((student) => String(student.leaveDate || "").slice(0, 7) === month).length,
    paymentRecords: monthPayments.length,
    paidCount: monthPayments.filter((record) => paymentRecordStatus(record) === "납부완료").length,
    unpaidCount: monthPayments.filter((record) => paymentRecordStatus(record) === "미납").length,
    paidAmount: paidInMonthAmount,
    otherIncome,
    expense,
    netIncome: paidInMonthAmount + otherIncome - expense,
    bookPurchaseQuantity,
    bookPurchaseAmount,
    tuitionAmount: monthPayments.reduce((sum, record) => sum + Number(record.tuition || 0), 0),
    tuitionRates: sortedTuitionRates(),
    bookFeeRates: sortedBookFeeRates(),
    attendancePresent: attendanceRecords.filter((record) => record.status === "등원").length,
    attendanceAbsent: attendanceRecords.filter((record) => record.status === "결석").length,
  };
}

function renderArchive() {
  const monthInput = $("archiveMonthFilter");
  const summary = $("monthlyCloseSummary");
  const list = $("changeLogList");
  if (!summary || !list) return;

  const month = monthInput?.value || currentMonthText();
  const data = monthlyCloseData(month);
  summary.innerHTML = [
    ["재원생", `${data.activeStudents}명`],
    ["신규", `${data.newStudents}명`],
    ["퇴회", `${data.leftStudents}명`],
    ["수납 총액", money(data.paidAmount)],
    ["기타 수입", money(data.otherIncome)],
    ["지출", money(data.expense)],
    ["남는 금액", money(data.netIncome)],
    ["교재 입고", `${data.bookPurchaseQuantity}권`],
    ["수납건", `${data.paidCount}건`],
    ["미납", `${data.unpaidCount}건`],
    ["등원기록", `${data.attendancePresent}건`],
    ["결석기록", `${data.attendanceAbsent}건`],
  ].map(([label, value]) => `
    <div class="archive-summary-card">
      <span>${label}</span>
      <strong>${value}</strong>
    </div>
  `).join("");

  list.innerHTML = changeLogs.length
    ? changeLogs.slice(0, 80).map((log) => `
      <article class="change-log-item">
        <strong>${escapeHtml(log.title)}</strong>
        <span>${escapeHtml(log.area)} · ${escapeHtml(log.userName || "기록 없음")} ${log.userRole ? `(${escapeHtml(roleLabel(log.userRole))})` : ""} · ${escapeHtml(compactDate(String(log.date).slice(0, 10)))} ${escapeHtml(String(log.date).slice(11, 16))}</span>
        ${log.detail ? `<p>${escapeHtml(log.detail)}</p>` : ""}
      </article>
    `).join("")
    : `<p class="empty-feedback">아직 저장된 변경이력이 없습니다.</p>`;
}

function exportMonthlyClose() {
  const month = $("archiveMonthFilter")?.value || currentMonthText();
  const data = monthlyCloseData(month);
  const payload = {
    app: "미래엔 에듀 영수학원 관리",
    type: "monthly-close",
    exportedAt: new Date().toISOString(),
    month,
    summary: data,
    paymentRecords: allPaymentRecords().filter((record) => recordMonthText(record) === month),
    financeRecords: financeRecordsForMonth(month),
    bookCatalog,
    bookStockRecords: bookStockRecords.filter((record) => String(record.date || "").slice(0, 7) === month),
    attendanceRecords: students.flatMap((student) => (student.attendanceRecords || []).map((record) => ({
      studentName: student.studentName,
      school: student.school,
      grade: student.grade,
      ...record,
    }))).filter((record) => String(record.date || "").slice(0, 7) === month),
    staffWorkRecords: userAccounts.flatMap((account) => staffRecordsForMonth(account, month).map((record) => ({
      staffName: account.name,
      staffDisplayName: staffPublicName(account),
      staffRole: account.role,
      ...record,
    }))),
    kakaoMessageLogs: kakaoMessageLogs.filter((log) => String(log.date || "").slice(0, 7) === month),
  };
  addChangeLog("월별 마감자료", `${month} 마감자료 저장`, `수납총액 ${money(data.paidAmount)}, 미납 ${data.unpaidCount}건`);
  downloadTextFile(`미래엔에듀_월별마감자료_${month}.json`, JSON.stringify(payload, null, 2));
}

function financeRecordsForMonth(month = currentMonthText()) {
  return financeRecords
    .filter((record) => String(record.date || "").slice(0, 7) === month)
    .sort((a, b) => (b.date || "").localeCompare(a.date || ""));
}

function paymentPaidAmountForRange(record = {}, start = "", end = "") {
  const parts = normalizePaymentParts(record.paymentParts || []);
  if (parts.length) {
    return parts
      .filter((item) => isDateInRange(item.date, start, end))
      .reduce((sum, item) => sum + Number(item.amount || 0), 0);
  }
  return isDateInRange(record.paymentDate, start, end) ? Number(record.paidAmount || 0) : 0;
}

function paymentBookFeeIncomeAmount(record = {}, paidAmountOverride = null) {
  const paidAmount = paidAmountOverride === null ? Number(record.paidAmount || 0) : Number(paidAmountOverride || 0);
  if (paidAmount <= 0) return 0;
  if (record.paymentType === "교재비") return paidAmount;
  return Math.min(paidAmount, Math.max(0, bookFeeTotal(record)));
}

function paymentIncomeForMonth(month = currentMonthText()) {
  const { start, end } = monthRange(month);
  return allPaymentRecords()
    .reduce((sum, record) => {
      const paidAmount = paymentPaidAmountForRange(record, start, end);
      return sum + paidAmount - paymentBookFeeIncomeAmount(record, paidAmount);
    }, 0);
}

function paymentBookFeeIncomeForMonth(month = currentMonthText()) {
  const { start, end } = monthRange(month);
  return allPaymentRecords()
    .reduce((sum, record) => {
      const paidAmount = paymentPaidAmountForRange(record, start, end);
      return sum + paymentBookFeeIncomeAmount(record, paidAmount);
    }, 0);
}

function textIncludesAny(text, words) {
  return words.some((word) => text.includes(word));
}

function isLowerGradeStudent(student = {}) {
  const text = `${student.school || ""} ${student.grade || ""}`;
  return /유치|5세|6세|7세|초\s?[1-2]|초등\s?[1-2]|1학년|2학년/.test(text);
}

function studentForPaymentRecord(record = {}) {
  const name = canonicalStudentName(record.studentName);
  return students.find((student) => canonicalStudentName(student.studentName) === name) || null;
}

function subjectFinanceGroupsForText(rawText, student = {}) {
  const text = String(rawText || "").replace(/\s+/g, "").toLowerCase();
  const groups = [];
  const lowerStudent = isLowerGradeStudent(student);
  const schoolGradeText = `${student.school || ""} ${student.grade || ""}`;
  const middleStudent = /중|중등/.test(schoolGradeText);
  const highStudent = /고|고등/.test(schoolGradeText);

  if (textIncludesAny(text, ["영어", "english"])) groups.push("미래엔 영어");
  if (textIncludesAny(text, ["문해력", "리딩하이", "정독"])) groups.push("문해력");
  if (textIncludesAny(text, ["공필왕", "국어", "사회", "과학", "한국사", "세계사"])) groups.push("공필왕");

  const hasMath = textIncludesAny(text, ["수학", "요리수", "연산"]);
  const hasEarlyKeyword = textIncludesAny(text, ["소한이", "한글", "빠른한글", "요리수", "연산"]);
  const hasHighMath = textIncludesAny(text, ["고등수학", "고등미래엔수학"]) || (highStudent && hasMath);
  const hasMiddleMath = textIncludesAny(text, ["중등수학", "중고등수학", "중등미래엔수학"]) || (middleStudent && hasMath);

  if (hasHighMath) groups.push("고등 수학");
  else if (hasMiddleMath) groups.push("중등 수학");
  else if (hasEarlyKeyword || (lowerStudent && hasMath)) groups.push("유치초저");
  else if (hasMath || text.includes("미래엔수학")) groups.push("미래엔 수학");

  return uniqueValues(groups).filter((group) => SUBJECT_FINANCE_GROUPS.includes(group));
}

function emptySubjectFinanceMap() {
  return new Map(SUBJECT_FINANCE_GROUPS.map((group) => [group, { income: 0, expense: 0, incomeCount: 0, expenseCount: 0 }]));
}

function addSubjectFinanceAmount(map, groups, type, amount) {
  const targetGroups = groups.length ? groups : ["기타"];
  const splitAmount = Number(amount || 0) / targetGroups.length;
  targetGroups.forEach((group) => {
    const item = map.get(group) || { income: 0, expense: 0, incomeCount: 0, expenseCount: 0 };
    item[type] += splitAmount;
    item[`${type}Count`] += 1;
    map.set(group, item);
  });
}

function addSubjectFinanceDirectAmount(map, group, type, amount) {
  const targetGroup = SUBJECT_FINANCE_GROUPS.includes(group) ? group : "기타";
  const item = map.get(targetGroup) || { income: 0, expense: 0, incomeCount: 0, expenseCount: 0 };
  item[type] += Number(amount || 0);
  item[`${type}Count`] += 1;
  map.set(targetGroup, item);
}

function paymentSubjectFinanceAllocations(record = {}) {
  const saved = normalizeSubjectAllocations(record.subjectAllocations || []);
  if (saved.length) return saved;
  if (record.paymentType === "교재비") return [];
  const subjectIncomeAmount = Number(record.paidAmount || 0) - paymentBookFeeIncomeAmount(record);
  if (subjectIncomeAmount <= 0) return [];
  const student = studentForPaymentRecord(record) || record;
  const text = [record.paymentName, record.studentName, record.school, record.grade].join(" ");
  const groups = subjectFinanceGroupsForText(text, student).filter((group) => !["기타", "배분 필요"].includes(group));
  if (groups.length === 1) {
    return [{ subject: groups[0], amount: subjectIncomeAmount, memo: "자동분류" }];
  }
  if (groups.length > 1) {
    return [{ subject: "배분 필요", amount: subjectIncomeAmount, memo: groups.join(", ") }];
  }
  return [{ subject: "기타", amount: subjectIncomeAmount, memo: "" }];
}

function paymentSubjectFinanceAllocationsForAmount(record = {}, paidAmount = 0) {
  const subjectIncomeAmount = Number(paidAmount || 0) - paymentBookFeeIncomeAmount(record, paidAmount);
  if (subjectIncomeAmount <= 0 || record.paymentType === "교재비") return [];
  const saved = normalizeSubjectAllocations(record.subjectAllocations || []);
  if (saved.length) {
    const savedTotal = saved.reduce((sum, item) => sum + Number(item.amount || 0), 0);
    if (savedTotal > 0) {
      return saved.map((item) => ({
        ...item,
        amount: Math.round((Number(item.amount || 0) / savedTotal) * subjectIncomeAmount),
      }));
    }
  }
  return paymentSubjectFinanceAllocations({
    ...record,
    paidAmount,
    subjectAllocations: [],
  });
}

function subjectFinanceData(month = currentMonthText()) {
  const { start, end } = monthRange(month);
  const map = emptySubjectFinanceMap();

  allPaymentRecords()
    .forEach((record) => {
      const paidAmount = paymentPaidAmountForRange(record, start, end);
      if (paidAmount <= 0) return;
      paymentSubjectFinanceAllocationsForAmount(record, paidAmount).forEach((item) => {
        addSubjectFinanceDirectAmount(map, item.subject, "income", item.amount);
      });
    });

  financeRecordsForMonth(month).forEach((record) => {
    if (record.confirmed === false) return;
    const text = [record.category, record.title, record.memo].join(" ");
    const type = record.type === "expense" ? "expense" : "income";
    addSubjectFinanceAmount(map, subjectFinanceGroupsForText(text), type, record.amount);
  });

  return [...map.entries()]
    .map(([name, value]) => ({ name, ...value, net: value.income - value.expense }))
    .filter((item) => item.income || item.expense || item.name !== "기타")
    .sort((a, b) => {
      if (a.name === "기타") return 1;
      if (b.name === "기타") return -1;
      return b.income - a.income;
    });
}

function paymentRecordSubjectGroups(record = {}) {
  return uniqueValues(paymentSubjectFinanceAllocations(record).map((item) => item.subject));
}

function financeRecordSubjectGroups(record = {}) {
  const text = [record.category, record.title, record.memo].join(" ");
  return subjectFinanceGroupsForText(text);
}

function subjectFinanceRecordEntries(month = currentMonthText()) {
  const { start, end } = monthRange(month);
  const paymentEntries = allPaymentRecords()
    .flatMap((record) => {
      const paidAmount = paymentPaidAmountForRange(record, start, end);
      if (!paidAmount) return [];
      const allocationEntries = paymentSubjectFinanceAllocationsForAmount(record, paidAmount).map((allocation, index) => ({
        id: `payment:${record.id}:${index}`,
        source: "payment",
        type: "income",
        date: record.paymentDate,
        title: allocation.subject === "배분 필요"
          ? `${record.paymentName || "교육비 수납"} · 배분 필요`
          : `${record.paymentName || "교육비 수납"} · ${allocation.subject}`,
        amount: Number(allocation.amount || 0),
        category: "교육비",
        method: record.paymentMethod || "",
        paymentRecordId: record.id,
        memo: [
          record.studentName,
          record.school,
          record.grade,
          record.paymentType,
          allocation.memo,
        ].filter(Boolean).join(" · "),
        subjectGroups: [allocation.subject],
      }));
      const bookFeeIncome = paymentBookFeeIncomeAmount(record, paidAmount);
      if (bookFeeIncome > 0) {
        allocationEntries.push({
          id: `payment-book:${record.id}`,
          source: "payment",
          type: "income",
          date: record.paymentDate,
          title: `${record.paymentName || "교육비 수납"} · 교재비 수입`,
          amount: bookFeeIncome,
          category: "교재비",
          method: record.paymentMethod || "",
          paymentRecordId: record.id,
          memo: [record.studentName, record.school, record.grade, bookFeeSummary(record)].filter(Boolean).join(" · "),
          subjectGroups: [],
        });
      }
      return allocationEntries;
    });

  const financeEntries = financeRecordsForMonth(month).map((record) => ({
    id: `finance:${record.id}`,
    source: "finance",
    type: record.type === "expense" ? "expense" : "income",
    date: record.date,
    title: record.title || record.category,
    amount: Number(record.amount || 0),
    category: record.category || "",
    method: record.method || "",
    memo: record.memo || "",
    financeId: record.id,
    confirmed: record.confirmed !== false,
    subjectGroups: financeRecordSubjectGroups(record),
  }));

  return [...paymentEntries, ...financeEntries].sort((a, b) => (b.date || "").localeCompare(a.date || ""));
}

function filteredSubjectFinanceEntries(month = currentMonthText()) {
  const typeFilter = $("financeTypeFilter")?.value || "";
  const query = ($("financeSearchInput")?.value || "").trim().toLowerCase();
  const subject = financeSubjectFilter.subject || "";
  const type = financeSubjectFilter.type || "";

  return subjectFinanceRecordEntries(month).filter((entry) => {
    const target = [
      entry.type,
      entry.category,
      entry.title,
      entry.method,
      entry.memo,
      entry.subjectGroups.join(" "),
    ].join(" ").toLowerCase();
    return (!typeFilter || entry.type === typeFilter) &&
      (!type || entry.type === type) &&
      (!subject || entry.subjectGroups.includes(subject)) &&
      (!query || target.includes(query));
  });
}

function setFinanceSubjectFilter(subject = "", type = "") {
  financeSubjectFilter = { subject, type };
  const typeSelect = $("financeTypeFilter");
  if (typeSelect && type) typeSelect.value = type;
  if (typeSelect && !type) typeSelect.value = "";
  $("financeHistoryPanel")?.setAttribute("open", "");
  renderFinanceOverview();
  $("financeHistoryPanel")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function clearFinanceSubjectFilter() {
  financeSubjectFilter = { subject: "", type: "" };
  if ($("financeTypeFilter")) $("financeTypeFilter").value = "";
  renderFinanceOverview();
}

function renderSubjectFinanceOverview(month = currentMonthText()) {
  const root = $("subjectFinanceOverview");
  if (!root) return;
  const data = subjectFinanceData(month);
  const subjectCountHtml = subjectEnrollmentRatioCardHtml();
  root.innerHTML = data.length || subjectCountHtml
    ? `${data.map((item) => `
      <article class="subject-finance-card ${financeSubjectFilter.subject === item.name ? "active" : ""}">
        <div class="subject-finance-card-head">
          <div>
            <button class="subject-finance-title" type="button" data-subject-finance-filter="${escapeHtml(item.name)}" data-subject-finance-type="">
              ${escapeHtml(item.name)}
            </button>
            <span>${item.incomeCount}건 수입 · ${item.expenseCount}건 지출</span>
          </div>
          <button class="subject-finance-view-button" type="button" data-subject-finance-filter="${escapeHtml(item.name)}" data-subject-finance-type="">조회</button>
        </div>
        <dl>
          <button type="button" data-subject-finance-filter="${escapeHtml(item.name)}" data-subject-finance-type="income">
            <dt>수입</dt><dd>${money(Math.round(item.income))}</dd>
          </button>
          <button type="button" data-subject-finance-filter="${escapeHtml(item.name)}" data-subject-finance-type="expense">
            <dt>지출</dt><dd>${money(Math.round(item.expense))}</dd>
          </button>
          <button class="${item.net < 0 ? "negative" : "positive"}" type="button" data-subject-finance-filter="${escapeHtml(item.name)}" data-subject-finance-type="">
            <dt>차액</dt><dd>${money(Math.round(item.net))}</dd>
          </button>
        </dl>
      </article>
    `).join("")}${data.length ? subjectFinanceRatioCardHtml(data) : ""}${subjectCountHtml}`
    : `<p class="empty-feedback">과목별로 표시할 수입/지출 기록이 없습니다.</p>`;

  root.querySelectorAll("[data-subject-finance-filter]").forEach((button) => {
    button.addEventListener("click", () => {
      setFinanceSubjectFilter(button.dataset.subjectFinanceFilter || "", button.dataset.subjectFinanceType || "");
    });
  });
  root.querySelectorAll("[data-open-subject-count]").forEach((button) => {
    button.addEventListener("click", () => {
      openSubjectStudents(button.dataset.openSubjectCount || "", button.dataset.openGongpilCount || "");
    });
  });
}

function subjectEnrollmentData() {
  const counts = new Map();
  const addCount = (key, item) => {
    const current = counts.get(key) || { ...item, count: 0 };
    current.count += 1;
    counts.set(key, current);
  };

  students
    .filter((student) => student.enrollmentStatus === "재원")
    .forEach((student) => {
      uniqueValues(student.subjects || [])
        .filter((subject) => SUBJECTS.includes(subject))
        .forEach((subject) => {
          if (subject === "공필왕") {
            const details = uniqueValues(student.gongpilSubjects || []).filter((item) => GONGPIL_SUBJECTS.includes(item));
            if (details.length) {
              details.forEach((detail) => {
                addCount(`공필왕-${detail}`, {
                  label: `공필왕 ${detail}`,
                  subject: "공필왕",
                  gongpilSubject: detail,
                });
              });
            } else {
              addCount("공필왕", { label: "공필왕", subject: "공필왕", gongpilSubject: "" });
            }
          } else {
            addCount(subject, { label: subject, subject, gongpilSubject: "" });
          }
        });
    });
  return [...counts.values()]
    .filter((item) => item.count > 0)
    .sort((a, b) => b.count - a.count || a.label.localeCompare(b.label, "ko"));
}

function subjectEnrollmentRatioCardHtml() {
  const data = subjectEnrollmentData();
  const total = data.reduce((sum, item) => sum + item.count, 0);
  if (!total) return "";

  return `
    <article class="subject-finance-card subject-count-ratio-card">
      <div>
        <strong>수강 과목수 비율</strong>
        <span>재원생 현재 과목 기준 · 총 ${total}건</span>
      </div>
      <div class="subject-count-bars">
        ${data.map((item) => {
          const percent = Math.round((item.count / total) * 100);
          return `
            <button type="button" data-open-subject-count="${escapeHtml(item.subject)}" data-open-gongpil-count="${escapeHtml(item.gongpilSubject || "")}">
              <span>${escapeHtml(item.label)}</span>
              <b>${item.count}건 · ${percent}%</b>
              <i style="--subject-count-pct: ${percent}%;"></i>
            </button>
          `;
        }).join("")}
      </div>
    </article>
  `;
}

function subjectFinanceRatioCardHtml(data = []) {
  const income = data.reduce((sum, item) => sum + Number(item.income || 0), 0);
  const expense = data.reduce((sum, item) => sum + Number(item.expense || 0), 0);
  const total = income + expense;
  const incomePct = total ? Math.round((income / total) * 100) : 0;
  const expensePct = total ? 100 - incomePct : 0;

  return `
    <article class="subject-finance-card subject-finance-ratio-card">
      <div>
        <strong>매출 / 지출 비율</strong>
        <span>이번 달 전체 기준</span>
      </div>
      <div class="finance-ratio-body">
        <div class="finance-ratio-donut" style="--income-pct: ${incomePct}%;">
          <strong>${incomePct}%</strong>
        </div>
        <div class="finance-ratio-legend">
          <p><b class="income-dot"></b><span>매출 ${incomePct}%</span><strong>${money(Math.round(income))}</strong></p>
          <p><b class="expense-dot"></b><span>지출 ${expensePct}%</span><strong>${money(Math.round(expense))}</strong></p>
        </div>
      </div>
    </article>
  `;
}

function renderFinanceCategoryOptions() {
  const type = $("financeType")?.value === "expense" ? "expense" : "income";
  const select = $("financeCategory");
  if (!select) return;
  const previous = select.value;
  const options = FINANCE_CATEGORIES[type];
  select.innerHTML = options.map((category) => `<option value="${escapeHtml(category)}">${escapeHtml(category)}</option>`).join("");
  select.value = options.includes(previous) ? previous : options[0];
}

function renderFixedExpenseOptions() {
  const daySelect = $("fixedExpenseDay");
  const categorySelect = $("fixedExpenseCategory");
  if (daySelect && !daySelect.options.length) {
    daySelect.innerHTML = [
      ...Array.from({ length: 31 }, (_, index) => `<option value="${index + 1}">${index + 1}일</option>`),
      `<option value="last">말일</option>`,
    ].join("");
  }
  if (categorySelect) {
    const previous = categorySelect.value;
    categorySelect.innerHTML = FINANCE_CATEGORIES.expense
      .map((category) => `<option value="${escapeHtml(category)}">${escapeHtml(category)}</option>`)
      .join("");
    categorySelect.value = FINANCE_CATEGORIES.expense.includes(previous) ? previous : FINANCE_CATEGORIES.expense[0];
  }
}

function financeTypeLabel(type) {
  return type === "expense" ? "지출" : "수입";
}

function fixedExpenseDayLabel(day) {
  return day === "last" ? "말일" : `${Number(day || 1)}일`;
}

function fixedExpenseDateForMonth(template, month) {
  const { start } = monthRange(month);
  const [year, monthNumber] = start.split("-").map(Number);
  const lastDate = new Date(year, monthNumber, 0).getDate();
  const day = template.day === "last" ? lastDate : Math.min(Math.max(Number(template.day || 1), 1), lastDate);
  return `${year}-${String(monthNumber).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

function renderFixedExpenseTemplates() {
  const root = $("fixedExpenseList");
  if (!root) return;
  root.innerHTML = fixedExpenseTemplates.length
    ? fixedExpenseTemplates.map((template) => `
      <article class="fixed-expense-item">
        <div>
          <strong>${escapeHtml(template.title || "이름 없음")}</strong>
          <span>${fixedExpenseDayLabel(template.day)} · ${escapeHtml(template.category)} · ${money(template.amount)}${template.method ? ` · ${escapeHtml(template.method)}` : ""}</span>
          ${template.memo ? `<p>${escapeHtml(template.memo)}</p>` : ""}
        </div>
        <div class="row-actions">
          <button class="mini-button" type="button" data-fixed-expense-edit="${escapeHtml(template.id)}">수정</button>
          <button class="mini-danger-button" type="button" data-fixed-expense-delete="${escapeHtml(template.id)}">삭제</button>
        </div>
      </article>
    `).join("")
    : `<p class="empty-feedback">등록된 고정지출이 없습니다.</p>`;

  root.querySelectorAll("[data-fixed-expense-edit]").forEach((button) => {
    button.addEventListener("click", () => editFixedExpenseTemplate(button.dataset.fixedExpenseEdit));
  });
  root.querySelectorAll("[data-fixed-expense-delete]").forEach((button) => {
    button.addEventListener("click", () => deleteFixedExpenseTemplate(button.dataset.fixedExpenseDelete));
  });
}

function renderFinanceOverview() {
  const root = $("financeOverview");
  if (!root) return;
  const month = $("financeMonthFilter")?.value || currentMonthText();
  if (financeSubjectFilter.subject) {
    financeSubjectFilter = { ...financeSubjectFilter, type: $("financeTypeFilter")?.value || "" };
  }
  const monthRecords = financeRecordsForMonth(month);
  const filtered = filteredSubjectFinanceEntries(month);
  const detailSummary = $("financeHistorySummary");
  const tuitionIncome = paymentIncomeForMonth(month);
  const bookFeeIncome = paymentBookFeeIncomeForMonth(month);
  const otherIncome = monthRecords.filter((record) => record.type === "income").reduce((sum, record) => sum + Number(record.amount || 0), 0);
  const expense = monthRecords
    .filter((record) => record.type === "expense" && record.confirmed !== false)
    .reduce((sum, record) => sum + Number(record.amount || 0), 0);

  $("financeTuitionIncome").textContent = money(tuitionIncome);
  $("financeBookFeeIncome").textContent = money(bookFeeIncome);
  $("financeOtherIncome").textContent = money(otherIncome);
  $("financeExpense").textContent = money(expense);
  $("financeNetIncome").textContent = money(tuitionIncome + bookFeeIncome + otherIncome - expense);
  if (detailSummary) {
    const label = financeSubjectFilter.subject
      ? `${financeSubjectFilter.subject} ${filtered.length}건`
      : `${filtered.length}건`;
    detailSummary.textContent = label;
  }
  renderSubjectFinanceOverview(month);

  const activeFilterHtml = financeSubjectFilter.subject ? `
    <div class="finance-active-filter">
      <span>${escapeHtml(financeSubjectFilter.subject)} ${financeSubjectFilter.type ? financeTypeLabel(financeSubjectFilter.type) : "전체"} 내역</span>
      <button class="mini-button" type="button" id="clearFinanceSubjectFilterBtn">전체 보기</button>
    </div>
  ` : "";

  root.innerHTML = filtered.length
    ? `
      ${activeFilterHtml}
      ${filtered.map((record) => `
      <article class="finance-item ${record.type} ${record.source === "payment" ? "payment-source" : ""} ${record.confirmed === false ? "pending" : ""} ${record.paymentRecordId ? "linked-payment" : ""}" ${record.paymentRecordId ? `data-open-payment-record="${escapeHtml(record.paymentRecordId)}"` : ""}>
        <div>
          <strong>${escapeHtml(record.title || record.category)}</strong>
          <span>${escapeHtml(compactDate(record.date))} · ${financeTypeLabel(record.type)} · ${escapeHtml(record.category)}${record.method ? ` · ${escapeHtml(record.method)}` : ""}${record.confirmed === false ? " · 예정" : ""}</span>
          ${visiblePaymentMemo(record.memo) ? `<p>${escapeHtml(visiblePaymentMemo(record.memo))}</p>` : ""}
          ${record.subjectGroups?.length ? `<small>${escapeHtml(record.subjectGroups.join(", "))}</small>` : ""}
        </div>
        <div class="finance-item-amount">
          <strong>${record.type === "expense" ? "-" : "+"}${money(record.amount)}</strong>
          ${record.source === "finance" ? `
            <div class="row-actions">
              ${record.confirmed === false ? `<button class="mini-button confirm-button" type="button" data-finance-confirm="${escapeHtml(record.financeId)}">확정</button>` : ""}
              <button class="mini-button" type="button" data-finance-edit="${escapeHtml(record.financeId)}">수정</button>
              <button class="mini-danger-button" type="button" data-finance-delete="${escapeHtml(record.financeId)}">삭제</button>
            </div>
          ` : `<span class="finance-source-label">교육비 수납</span>`}
        </div>
      </article>
    `).join("")}
    `
    : `${activeFilterHtml}<p class="empty-feedback">해당 조건에 맞는 수입/지출 기록이 없습니다.</p>`;

  $("clearFinanceSubjectFilterBtn")?.addEventListener("click", clearFinanceSubjectFilter);
  root.querySelectorAll("[data-finance-confirm]").forEach((button) => {
    button.addEventListener("click", () => confirmFinanceRecord(button.dataset.financeConfirm));
  });
  root.querySelectorAll("[data-finance-edit]").forEach((button) => {
    button.addEventListener("click", () => editFinanceRecord(button.dataset.financeEdit));
  });
  root.querySelectorAll("[data-finance-delete]").forEach((button) => {
    button.addEventListener("click", () => deleteFinanceRecord(button.dataset.financeDelete));
  });
  root.querySelectorAll("[data-open-payment-record]").forEach((item) => {
    item.addEventListener("click", () => openPaymentRecordDetail(item.dataset.openPaymentRecord));
  });
  renderFixedExpenseTemplates();
}

function clearFinanceForm() {
  $("financeRecordId").value = "";
  $("financeDate").value = currentDateText();
  $("financeType").value = "income";
  renderFinanceCategoryOptions();
  $("financeTitle").value = "";
  $("financeAmount").value = "";
  $("financeMethod").value = "";
  $("financeMemo").value = "";
}

function clearFixedExpenseForm() {
  $("fixedExpenseId").value = "";
  $("fixedExpenseDay").value = "1";
  renderFixedExpenseOptions();
  $("fixedExpenseTitle").value = "";
  $("fixedExpenseAmount").value = "";
  $("fixedExpenseMethod").value = "";
  $("fixedExpenseMemo").value = "";
}

function readFixedExpenseForm() {
  return normalizeFixedExpenseTemplate({
    id: $("fixedExpenseId").value || createId(),
    day: $("fixedExpenseDay").value || "1",
    category: $("fixedExpenseCategory").value,
    title: $("fixedExpenseTitle").value.trim(),
    amount: Number($("fixedExpenseAmount").value || 0),
    method: $("fixedExpenseMethod").value.trim(),
    memo: $("fixedExpenseMemo").value.trim(),
  });
}

function saveFixedExpenseTemplate() {
  const template = readFixedExpenseForm();
  if (!template.title) {
    alert("고정지출 항목명을 입력해주세요.");
    $("fixedExpenseTitle").focus();
    return;
  }
  if (template.amount <= 0) {
    alert("고정지출 금액을 입력해주세요.");
    $("fixedExpenseAmount").focus();
    return;
  }

  const exists = fixedExpenseTemplates.some((item) => item.id === template.id);
  fixedExpenseTemplates = [
    template,
    ...fixedExpenseTemplates.filter((item) => item.id !== template.id),
  ];
  saveFixedExpenseTemplates();
  addChangeLog("매출관리", exists ? "고정지출 수정" : "고정지출 등록", `${template.title} · ${fixedExpenseDayLabel(template.day)} · ${money(template.amount)}`);
  clearFixedExpenseForm();
  renderFixedExpenseTemplates();
}

function editFixedExpenseTemplate(id) {
  const template = fixedExpenseTemplates.find((item) => item.id === id);
  if (!template) return;
  $("fixedExpenseId").value = template.id;
  $("fixedExpenseDay").value = template.day || "1";
  renderFixedExpenseOptions();
  $("fixedExpenseCategory").value = template.category || FINANCE_CATEGORIES.expense[0];
  $("fixedExpenseTitle").value = template.title || "";
  $("fixedExpenseAmount").value = template.amount || "";
  $("fixedExpenseMethod").value = template.method || "";
  $("fixedExpenseMemo").value = template.memo || "";
  document.querySelector(".fixed-expense-panel")?.setAttribute("open", "");
  $("fixedExpenseTitle").focus();
}

function deleteFixedExpenseTemplate(id) {
  if (!requireDeletePermission()) return;
  const template = fixedExpenseTemplates.find((item) => item.id === id);
  if (!template) return;
  if (!confirm(`${template.title || "선택한 고정지출"}을 삭제할까요? 이미 생성된 지출기록은 삭제되지 않습니다.`)) return;
  fixedExpenseTemplates = fixedExpenseTemplates.filter((item) => item.id !== id);
  saveFixedExpenseTemplates();
  addChangeLog("매출관리", "고정지출 삭제", template.title || "이름 없음");
  renderFixedExpenseTemplates();
}

function applyFixedExpensesForMonth() {
  const month = $("financeMonthFilter")?.value || currentMonthText();
  if (!fixedExpenseTemplates.length) {
    alert("먼저 고정지출을 등록해주세요.");
    return;
  }

  let addedCount = 0;
  const nextRecords = [...financeRecords];
  fixedExpenseTemplates.forEach((template) => {
    const exists = nextRecords.some((record) => (
      record.fixedTemplateId === template.id &&
      record.fixedMonth === month
    ));
    if (exists) return;

    nextRecords.unshift(normalizeFinanceRecord({
      id: `fixed:${template.id}:${month}`,
      date: fixedExpenseDateForMonth(template, month),
      type: "expense",
      category: template.category,
      title: template.title,
      amount: template.amount,
      method: template.method,
      memo: template.memo ? `[고정지출] ${template.memo}` : "[고정지출]",
      fixedTemplateId: template.id,
      fixedMonth: month,
      confirmed: false,
    }));
    addedCount += 1;
  });

  if (!addedCount) {
    alert("이번달 고정지출은 이미 모두 불러와져 있습니다.");
    return;
  }

  financeRecords = nextRecords.sort((a, b) => (b.date || "").localeCompare(a.date || ""));
  saveFinanceRecords();
  addChangeLog("매출관리", `${month} 고정지출 불러오기`, `${addedCount}건 예정 생성`);
  renderFinanceOverview();
  renderArchive();
  alert(`${addedCount}건의 고정지출 예정기록을 만들었습니다. 실제 지출 후 확정 버튼을 눌러주세요.`);
}

function saveFinanceRecord() {
  const recordId = $("financeRecordId").value || createId();
  const existing = financeRecords.find((item) => item.id === recordId);
  const record = normalizeFinanceRecord({
    id: recordId,
    date: $("financeDate").value || currentDateText(),
    type: $("financeType").value,
    category: $("financeCategory").value,
    title: $("financeTitle").value.trim(),
    amount: Number($("financeAmount").value || 0),
    method: $("financeMethod").value.trim(),
    memo: $("financeMemo").value.trim(),
    fixedTemplateId: existing?.fixedTemplateId || "",
    fixedMonth: existing?.fixedMonth || "",
    confirmed: existing?.confirmed ?? true,
  });

  if (!record.title) {
    alert("항목명을 입력해주세요.");
    $("financeTitle").focus();
    return;
  }
  if (record.amount <= 0) {
    alert("금액을 입력해주세요.");
    $("financeAmount").focus();
    return;
  }

  const exists = financeRecords.some((item) => item.id === record.id);
  financeRecords = [
    record,
    ...financeRecords.filter((item) => item.id !== record.id),
  ].sort((a, b) => (b.date || "").localeCompare(a.date || ""));
  saveFinanceRecords();
  addChangeLog("매출관리", exists ? "수입/지출 수정" : "수입/지출 저장", `${financeTypeLabel(record.type)} · ${record.title} · ${money(record.amount)}`);
  clearFinanceForm();
  renderFinanceOverview();
  renderArchive();
}

function confirmFinanceRecord(id) {
  const record = financeRecords.find((item) => item.id === id);
  if (!record) return;
  record.confirmed = true;
  saveFinanceRecords();
  addChangeLog("매출관리", "고정지출 확정", `${record.title || record.category} · ${compactDate(record.date)} · ${money(record.amount)}`);
  renderFinanceOverview();
  renderArchive();
}

function editFinanceRecord(id) {
  const record = financeRecords.find((item) => item.id === id);
  if (!record) return;
  $("financeRecordId").value = record.id;
  $("financeDate").value = record.date || currentDateText();
  $("financeType").value = record.type || "income";
  renderFinanceCategoryOptions();
  $("financeCategory").value = record.category || FINANCE_CATEGORIES[record.type || "income"][0];
  $("financeTitle").value = record.title || "";
  $("financeAmount").value = record.amount || "";
  $("financeMethod").value = record.method || "";
  $("financeMemo").value = record.memo || "";
  document.querySelector(".finance-entry-panel")?.setAttribute("open", "");
  $("financeTitle").focus();
}

function deleteFinanceRecord(id) {
  if (!requireDeletePermission()) return;
  const record = financeRecords.find((item) => item.id === id);
  if (!record) return;
  if (!confirm(`${record.title || "선택한 기록"}을 삭제할까요?`)) return;
  financeRecords = financeRecords.filter((item) => item.id !== id);
  saveFinanceRecords();
  addChangeLog("매출관리", "수입/지출 삭제", `${financeTypeLabel(record.type)} · ${record.title} · ${money(record.amount)}`);
  renderFinanceOverview();
  renderArchive();
}

function sortedTuitionRates() {
  return [...tuitionRates].sort((a, b) => {
    const subjectCompare = String(a.subject || "").localeCompare(String(b.subject || ""), "ko");
    if (subjectCompare) return subjectCompare;
    const courseCompare = String(a.courseName || "").localeCompare(String(b.courseName || ""), "ko");
    if (courseCompare) return courseCompare;
    return String(b.effectiveFrom || "").localeCompare(String(a.effectiveFrom || ""));
  });
}

function renderTuitionRates() {
  const root = $("tuitionRateList");
  if (!root) return;
  const rates = sortedTuitionRates();
  if ($("tuitionRateCount")) $("tuitionRateCount").textContent = `${rates.length}건`;
  root.innerHTML = rates.length
    ? `
      <div class="compact-rate-table-wrap">
        <table class="compact-rate-table tuition-rate-table">
          <thead>
            <tr>
              <th>수업명</th>
              <th>과목</th>
              <th>회차</th>
              <th>교육비</th>
              <th>시작일</th>
              <th>메모</th>
              <th>관리</th>
            </tr>
          </thead>
          <tbody>
            ${rates.map((rate) => `
              <tr>
                <td><strong>${escapeHtml(rate.courseName || "수업명 없음")}</strong></td>
                <td>${escapeHtml(rate.subject || "-")}</td>
                <td>${escapeHtml(rate.sessions || "-")}</td>
                <td>${money(rate.amount)}</td>
                <td>${escapeHtml(compactDate(rate.effectiveFrom))}</td>
                <td class="compact-rate-memo">${escapeHtml(rate.memo || "-")}</td>
                <td>
                  <div class="compact-row-actions">
                    <button class="mini-button" type="button" data-tuition-edit="${escapeHtml(rate.id)}">수정</button>
                    <button class="mini-danger-button" type="button" data-tuition-delete="${escapeHtml(rate.id)}">삭제</button>
                  </div>
                </td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    `
    : `<p class="empty-feedback">등록된 교육비 기준이 없습니다. 과목과 회차별 기본 교육비를 하나씩 저장해두세요.</p>`;

  root.querySelectorAll("[data-tuition-edit]").forEach((button) => {
    button.addEventListener("click", () => editTuitionRate(button.dataset.tuitionEdit));
  });
  root.querySelectorAll("[data-tuition-delete]").forEach((button) => {
    button.addEventListener("click", () => deleteTuitionRate(button.dataset.tuitionDelete));
  });
}

function clearTuitionRateForm() {
  if (!$("tuitionRateId")) return;
  $("tuitionRateId").value = "";
  $("tuitionSubject").value = SUBJECTS[0];
  $("tuitionCourseName").value = "";
  $("tuitionSessions").value = "";
  $("tuitionAmount").value = "";
  $("tuitionEffectiveFrom").value = currentDateText();
  $("tuitionMemo").value = "";
}

function saveTuitionRate() {
  const id = $("tuitionRateId")?.value || "";
  const courseName = ($("tuitionCourseName")?.value || "").trim();
  if (!courseName) {
    alert("수업명을 입력해주세요.");
    $("tuitionCourseName")?.focus();
    return;
  }
  const nextRate = normalizeTuitionRate({
    id: id || createId(),
    subject: $("tuitionSubject")?.value || SUBJECTS[0],
    courseName,
    sessions: $("tuitionSessions")?.value || "",
    amount: $("tuitionAmount")?.value || 0,
    effectiveFrom: $("tuitionEffectiveFrom")?.value || currentDateText(),
    memo: $("tuitionMemo")?.value || "",
  });
  const exists = tuitionRates.some((rate) => rate.id === id);
  tuitionRates = exists
    ? tuitionRates.map((rate) => (rate.id === id ? nextRate : rate))
    : [...tuitionRates, nextRate];
  saveTuitionRates();
  addChangeLog("교육비 기준표", exists ? "기준 수정" : "기준 저장", `${nextRate.subject} · ${nextRate.courseName} · ${money(nextRate.amount)}`);
  renderTuitionRates();
  clearTuitionRateForm();
}

function editTuitionRate(id) {
  const rate = tuitionRates.find((item) => item.id === id);
  if (!rate) return;
  $("tuitionRateEntryPanel")?.setAttribute("open", "");
  $("tuitionRateId").value = rate.id;
  $("tuitionSubject").value = SUBJECTS.includes(rate.subject) ? rate.subject : SUBJECTS[0];
  $("tuitionCourseName").value = rate.courseName || "";
  $("tuitionSessions").value = rate.sessions || "";
  $("tuitionAmount").value = rate.amount || "";
  $("tuitionEffectiveFrom").value = rate.effectiveFrom || currentDateText();
  $("tuitionMemo").value = rate.memo || "";
  $("tuitionCourseName").focus();
}

function deleteTuitionRate(id) {
  if (!requireDeletePermission()) return;
  const rate = tuitionRates.find((item) => item.id === id);
  if (!rate) return;
  if (!confirm(`${rate.courseName || "선택한 기준"}을 삭제할까요?`)) return;
  tuitionRates = tuitionRates.filter((item) => item.id !== id);
  saveTuitionRates();
  addChangeLog("교육비 기준표", "기준 삭제", `${rate.subject} · ${rate.courseName}`);
  renderTuitionRates();
  clearTuitionRateForm();
}

function sortedBookFeeRates() {
  return [...bookFeeRates].sort((a, b) => {
    const subjectCompare = String(a.subject || "").localeCompare(String(b.subject || ""), "ko");
    if (subjectCompare) return subjectCompare;
    const programCompare = String(a.program || "").localeCompare(String(b.program || ""), "ko");
    if (programCompare) return programCompare;
    const titleCompare = String(a.title || "").localeCompare(String(b.title || ""), "ko");
    if (titleCompare) return titleCompare;
    return String(b.effectiveFrom || "").localeCompare(String(a.effectiveFrom || ""));
  });
}

function renderBookFeeRates() {
  const root = $("bookFeeRateList");
  if (!root) return;
  const rates = sortedBookFeeRates();
  if ($("bookFeeRateCount")) $("bookFeeRateCount").textContent = `${rates.length}건`;
  root.innerHTML = rates.length
    ? `
      <div class="compact-rate-table-wrap">
        <table class="compact-rate-table book-fee-rate-table">
          <thead>
            <tr>
              <th>과목</th>
              <th>교재군</th>
              <th>교재명</th>
              <th>단계</th>
              <th>납부</th>
              <th>매입</th>
              <th>메모</th>
              <th>관리</th>
            </tr>
          </thead>
          <tbody>
            ${rates.map((rate) => `
              <tr>
                <td>${escapeHtml(rate.subject || "-")}</td>
                <td>${escapeHtml(rate.program || "-")}</td>
                <td><strong>${escapeHtml(rate.title || "교재명 없음")}</strong></td>
                <td>${escapeHtml(rate.level || "-")}</td>
                <td>${money(rate.salePrice)}</td>
                <td>${money(rate.purchasePrice)}</td>
                <td class="compact-rate-memo">${escapeHtml(rate.memo || "")}</td>
                <td>
                  <div class="row-actions compact-row-actions">
                    <button class="mini-button" type="button" data-book-fee-rate-edit="${escapeHtml(rate.id)}">수정</button>
                    <button class="mini-danger-button" type="button" data-book-fee-rate-delete="${escapeHtml(rate.id)}">삭제</button>
                  </div>
                </td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    `
    : `<p class="empty-feedback">등록된 교재비 기준이 없습니다. 자주 사용하는 교재의 납부금액과 매입가를 저장해두세요.</p>`;

  root.querySelectorAll("[data-book-fee-rate-edit]").forEach((button) => {
    button.addEventListener("click", () => editBookFeeRate(button.dataset.bookFeeRateEdit));
  });
  root.querySelectorAll("[data-book-fee-rate-delete]").forEach((button) => {
    button.addEventListener("click", () => deleteBookFeeRate(button.dataset.bookFeeRateDelete));
  });
}

function clearBookFeeRateForm() {
  if (!$("bookFeeRateId")) return;
  $("bookFeeRateId").value = "";
  $("bookFeeSubject").value = SUBJECTS[0];
  $("bookFeeProgram").value = "";
  $("bookFeeTitle").value = "";
  $("bookFeeLevel").value = "";
  $("bookFeeSalePrice").value = "";
  $("bookFeePurchasePrice").value = "";
  $("bookFeeEffectiveFrom").value = currentDateText();
  $("bookFeeMemo").value = "";
}

function saveBookFeeRate() {
  const id = $("bookFeeRateId")?.value || "";
  const title = ($("bookFeeTitle")?.value || "").trim();
  if (!title) {
    alert("교재명을 입력해주세요.");
    $("bookFeeTitle")?.focus();
    return;
  }
  const nextRate = normalizeBookFeeRate({
    id: id || createId(),
    subject: $("bookFeeSubject")?.value || SUBJECTS[0],
    program: $("bookFeeProgram")?.value || "",
    title,
    level: $("bookFeeLevel")?.value || "",
    salePrice: $("bookFeeSalePrice")?.value || 0,
    purchasePrice: $("bookFeePurchasePrice")?.value || 0,
    effectiveFrom: $("bookFeeEffectiveFrom")?.value || currentDateText(),
    memo: $("bookFeeMemo")?.value || "",
  });
  const exists = bookFeeRates.some((rate) => rate.id === id);
  bookFeeRates = exists
    ? bookFeeRates.map((rate) => (rate.id === id ? nextRate : rate))
    : [...bookFeeRates, nextRate];
  saveBookFeeRates();
  addChangeLog("교육비 기준표", exists ? "교재비 기준 수정" : "교재비 기준 저장", `${nextRate.subject} · ${nextRate.title} · ${money(nextRate.salePrice)}`);
  renderBookFeeRates();
  clearBookFeeRateForm();
}

function editBookFeeRate(id) {
  const rate = bookFeeRates.find((item) => item.id === id);
  if (!rate) return;
  $("bookFeeRateEntryPanel")?.setAttribute("open", "");
  $("bookFeeRateId").value = rate.id;
  $("bookFeeSubject").value = SUBJECTS.includes(rate.subject) ? rate.subject : SUBJECTS[0];
  $("bookFeeProgram").value = rate.program || "";
  $("bookFeeTitle").value = rate.title || "";
  $("bookFeeLevel").value = rate.level || "";
  $("bookFeeSalePrice").value = rate.salePrice || "";
  $("bookFeePurchasePrice").value = rate.purchasePrice || "";
  $("bookFeeEffectiveFrom").value = rate.effectiveFrom || currentDateText();
  $("bookFeeMemo").value = rate.memo || "";
  $("bookFeeTitle").focus();
}

function deleteBookFeeRate(id) {
  if (!requireDeletePermission()) return;
  const rate = bookFeeRates.find((item) => item.id === id);
  if (!rate) return;
  if (!confirm(`${rate.title || "선택한 교재비 기준"}을 삭제할까요?`)) return;
  bookFeeRates = bookFeeRates.filter((item) => item.id !== id);
  saveBookFeeRates();
  addChangeLog("교육비 기준표", "교재비 기준 삭제", `${rate.subject} · ${rate.title}`);
  renderBookFeeRates();
  clearBookFeeRateForm();
}

function bookDisplayName(book = {}) {
  return [book.subject, book.title, book.level, book.volume].filter(Boolean).join(" · ") || "이름 없는 교재";
}

function bookById(id) {
  return bookCatalog.find((book) => book.id === id);
}

function bookStockCount(bookId, excludeRecordId = "") {
  return bookStockRecords
    .filter((record) => record.bookId === bookId && record.id !== excludeRecordId)
    .reduce((sum, record) => sum + (record.type === "out" ? -Number(record.quantity || 0) : Number(record.quantity || 0)), 0);
}

function bookStockTotalAmount(record = {}) {
  return Number(record.quantity || 0) * Number(record.unitPrice || 0);
}

function renderBookOptions() {
  const subjectSelect = $("bookSubject");
  const filterSelect = $("bookSubjectFilter");
  if (subjectSelect) {
    const previous = subjectSelect.value;
    subjectSelect.innerHTML = SUBJECTS.map((subject) => `<option value="${escapeHtml(subject)}">${escapeHtml(subject)}</option>`).join("");
    subjectSelect.value = SUBJECTS.includes(previous) ? previous : SUBJECTS[0];
  }
  if (filterSelect && filterSelect.options.length <= 1) {
    filterSelect.innerHTML += SUBJECTS.map((subject) => `<option value="${escapeHtml(subject)}">${escapeHtml(subject)}</option>`).join("");
  }

  const stockSelect = $("bookStockBook");
  if (stockSelect) {
    const previous = stockSelect.value;
    const sortedBooks = [...bookCatalog].sort((a, b) => bookDisplayName(a).localeCompare(bookDisplayName(b), "ko"));
    stockSelect.innerHTML = sortedBooks.length
      ? sortedBooks.map((book) => `<option value="${escapeHtml(book.id)}">${escapeHtml(bookDisplayName(book))}</option>`).join("")
      : `<option value="">먼저 교재를 등록해주세요</option>`;
    stockSelect.value = sortedBooks.some((book) => book.id === previous) ? previous : (sortedBooks[0]?.id || "");
  }
  updateBookStockUnitPrice(false);
}

function updateBookStockUnitPrice(force = false) {
  const book = bookById($("bookStockBook")?.value);
  const priceInput = $("bookStockUnitPrice");
  const type = $("bookStockType")?.value || "in";
  if (!book || !priceInput) return;
  if (!force && priceInput.value) return;
  priceInput.value = type === "out" ? (book.salePrice || "") : (book.purchasePrice || "");
}

function renderBooksOverview() {
  const inventory = $("bookInventory");
  const history = $("bookStockHistory");
  if (!inventory || !history) return;

  const subject = $("bookSubjectFilter")?.value || "";
  const query = ($("bookSearchInput")?.value || "").trim().toLowerCase();
  const filteredBooks = [...bookCatalog]
    .filter((book) => {
      const target = [book.subject, book.title, book.level, book.volume, book.publisher, book.memo].join(" ").toLowerCase();
      return (!subject || book.subject === subject) && (!query || target.includes(query));
    })
    .sort((a, b) => bookDisplayName(a).localeCompare(bookDisplayName(b), "ko"));

  const stockValues = bookCatalog.map((book) => bookStockCount(book.id));
  $("bookCatalogCount").textContent = `${bookCatalog.length}종`;
  $("bookTotalStock").textContent = `${stockValues.reduce((sum, value) => sum + value, 0)}권`;
  $("bookLowStockCount").textContent = `${stockValues.filter((value) => value <= 2).length}종`;

  inventory.innerHTML = filteredBooks.length
    ? filteredBooks.map((book) => {
      const stock = bookStockCount(book.id);
      const incoming = bookStockRecords.filter((record) => record.bookId === book.id && record.type === "in").reduce((sum, record) => sum + Number(record.quantity || 0), 0);
      const used = bookStockRecords.filter((record) => record.bookId === book.id && record.type === "out").reduce((sum, record) => sum + Number(record.quantity || 0), 0);
      return `
        <article class="book-item ${stock <= 2 ? "low" : ""}">
          <div>
            <strong>${escapeHtml(bookDisplayName(book))}</strong>
            <span>${escapeHtml(book.publisher || "출판사 미입력")} · 매입 ${money(book.purchasePrice)} · 판매 ${money(book.salePrice)}</span>
            ${book.memo ? `<p>${escapeHtml(book.memo)}</p>` : ""}
          </div>
          <div class="book-stock-box">
            <strong>${stock}권</strong>
            <span>입고 ${incoming} · 사용 ${used}</span>
            <div class="row-actions">
              <button class="mini-button" type="button" data-book-edit="${escapeHtml(book.id)}">수정</button>
              <button class="mini-button" type="button" data-book-stock="${escapeHtml(book.id)}">입출고</button>
              <button class="mini-danger-button" type="button" data-book-delete="${escapeHtml(book.id)}">삭제</button>
            </div>
          </div>
        </article>
      `;
    }).join("")
    : `<p class="empty-feedback">등록된 교재가 없습니다.</p>`;

  history.innerHTML = bookStockRecords.length
    ? bookStockRecords.slice(0, 80).map((record) => {
      const book = bookById(record.bookId);
      return `
        <article class="book-history-item ${record.type}">
          <div>
            <strong>${record.type === "out" ? "사용" : "입고"} · ${escapeHtml(bookDisplayName(book))}</strong>
            <span>${escapeHtml(compactDate(record.date))} · ${record.quantity}권 · 단가 ${money(record.unitPrice)} · 합계 ${money(bookStockTotalAmount(record))}</span>
            ${record.partner ? `<span>${escapeHtml(record.partner)}</span>` : ""}
            ${record.memo ? `<p>${escapeHtml(record.memo)}</p>` : ""}
          </div>
          <div class="row-actions">
            <button class="mini-button" type="button" data-book-stock-edit="${escapeHtml(record.id)}">수정</button>
            <button class="mini-danger-button" type="button" data-book-stock-delete="${escapeHtml(record.id)}">삭제</button>
          </div>
        </article>
      `;
    }).join("")
    : `<p class="empty-feedback">입고/사용 기록이 없습니다.</p>`;

  inventory.querySelectorAll("[data-book-edit]").forEach((button) => button.addEventListener("click", () => editBook(button.dataset.bookEdit)));
  inventory.querySelectorAll("[data-book-stock]").forEach((button) => button.addEventListener("click", () => prepareBookStock(button.dataset.bookStock)));
  inventory.querySelectorAll("[data-book-delete]").forEach((button) => button.addEventListener("click", () => deleteBook(button.dataset.bookDelete)));
  history.querySelectorAll("[data-book-stock-edit]").forEach((button) => button.addEventListener("click", () => editBookStockRecord(button.dataset.bookStockEdit)));
  history.querySelectorAll("[data-book-stock-delete]").forEach((button) => button.addEventListener("click", () => deleteBookStockRecord(button.dataset.bookStockDelete)));
}

function clearBookForm() {
  $("bookId").value = "";
  $("bookSubject").value = SUBJECTS[0];
  $("bookTitle").value = "";
  $("bookLevel").value = "";
  $("bookVolume").value = "";
  $("bookPublisher").value = "";
  $("bookPurchasePrice").value = "";
  $("bookSalePrice").value = "";
  $("bookMemo").value = "";
}

function readBookForm() {
  return normalizeBook({
    id: $("bookId").value || createId(),
    subject: $("bookSubject").value,
    title: normalizeCourseText($("bookTitle").value).trim(),
    level: $("bookLevel").value.trim(),
    volume: $("bookVolume").value.trim(),
    publisher: $("bookPublisher").value.trim(),
    purchasePrice: Number($("bookPurchasePrice").value || 0),
    salePrice: Number($("bookSalePrice").value || 0),
    memo: $("bookMemo").value.trim(),
  });
}

function saveBook() {
  const book = readBookForm();
  if (!book.title) {
    alert("교재명을 입력해주세요.");
    $("bookTitle").focus();
    return;
  }
  const exists = bookCatalog.some((item) => item.id === book.id);
  bookCatalog = [
    book,
    ...bookCatalog.filter((item) => item.id !== book.id),
  ].sort((a, b) => bookDisplayName(a).localeCompare(bookDisplayName(b), "ko"));
  saveBookCatalog();
  addChangeLog("교재관리", exists ? "교재정보 수정" : "교재 등록", bookDisplayName(book));
  clearBookForm();
  renderBookOptions();
  renderBooksOverview();
}

function editBook(id) {
  const book = bookById(id);
  if (!book) return;
  $("bookId").value = book.id;
  $("bookSubject").value = book.subject || SUBJECTS[0];
  $("bookTitle").value = book.title || "";
  $("bookLevel").value = book.level || "";
  $("bookVolume").value = book.volume || "";
  $("bookPublisher").value = book.publisher || "";
  $("bookPurchasePrice").value = book.purchasePrice || "";
  $("bookSalePrice").value = book.salePrice || "";
  $("bookMemo").value = book.memo || "";
  document.querySelector(".book-entry-panel")?.setAttribute("open", "");
  $("bookTitle").focus();
}

function deleteBook(id) {
  if (!requireDeletePermission()) return;
  const book = bookById(id);
  if (!book) return;
  if (bookStockRecords.some((record) => record.bookId === id)) {
    alert("입고/사용 기록이 있는 교재는 삭제하지 않고 보관하는 것을 권장합니다.");
    return;
  }
  if (!confirm(`${bookDisplayName(book)} 교재를 삭제할까요?`)) return;
  bookCatalog = bookCatalog.filter((item) => item.id !== id);
  saveBookCatalog();
  addChangeLog("교재관리", "교재 삭제", bookDisplayName(book));
  renderBookOptions();
  renderBooksOverview();
}

function clearBookStockForm() {
  $("bookStockRecordId").value = "";
  $("bookStockDate").value = currentDateText();
  $("bookStockType").value = "in";
  $("bookStockQuantity").value = "1";
  $("bookStockUnitPrice").value = "";
  $("bookStockPartner").value = "";
  $("bookStockMemo").value = "";
  $("bookStockCreateExpense").checked = true;
  updateBookStockUnitPrice(true);
}

function prepareBookStock(bookId) {
  clearBookStockForm();
  $("bookStockBook").value = bookId;
  updateBookStockUnitPrice(true);
  document.querySelectorAll(".book-entry-panel")[1]?.setAttribute("open", "");
  $("bookStockQuantity").focus();
}

function readBookStockForm() {
  const existing = bookStockRecords.find((record) => record.id === $("bookStockRecordId").value);
  return normalizeBookStockRecord({
    id: $("bookStockRecordId").value || createId(),
    bookId: $("bookStockBook").value,
    date: $("bookStockDate").value || currentDateText(),
    type: $("bookStockType").value,
    quantity: Number($("bookStockQuantity").value || 1),
    unitPrice: Number($("bookStockUnitPrice").value || 0),
    partner: $("bookStockPartner").value.trim(),
    memo: $("bookStockMemo").value.trim(),
    financeRecordId: existing?.financeRecordId || "",
  });
}

function upsertBookStockExpense(record) {
  const book = bookById(record.bookId);
  if (record.type !== "in" || !$("bookStockCreateExpense").checked) {
    if (record.financeRecordId) {
      financeRecords = financeRecords.filter((item) => item.id !== record.financeRecordId);
      record.financeRecordId = "";
      saveFinanceRecords();
    }
    return record;
  }

  const financeRecordId = record.financeRecordId || `book-stock-expense:${record.id}`;
  const expense = normalizeFinanceRecord({
    id: financeRecordId,
    date: record.date,
    type: "expense",
    category: "교재 구입",
    title: `교재 매입 - ${bookDisplayName(book)}`,
    amount: bookStockTotalAmount(record),
    method: "",
    memo: [record.partner, record.memo].filter(Boolean).join(" · "),
  });
  financeRecords = [
    expense,
    ...financeRecords.filter((item) => item.id !== financeRecordId),
  ].sort((a, b) => (b.date || "").localeCompare(a.date || ""));
  saveFinanceRecords();
  return { ...record, financeRecordId };
}

function saveBookStockRecord() {
  let record = readBookStockForm();
  const book = bookById(record.bookId);
  if (!book) {
    alert("교재를 선택해주세요.");
    return;
  }
  if (record.quantity <= 0) {
    alert("수량을 입력해주세요.");
    $("bookStockQuantity").focus();
    return;
  }
  if (record.type === "out" && record.quantity > bookStockCount(record.bookId, record.id)) {
    alert("현재 재고보다 많은 수량을 사용할 수 없습니다.");
    return;
  }

  const exists = bookStockRecords.some((item) => item.id === record.id);
  record = upsertBookStockExpense(record);
  bookStockRecords = [
    record,
    ...bookStockRecords.filter((item) => item.id !== record.id),
  ].sort((a, b) => (b.date || "").localeCompare(a.date || ""));
  saveBookStockRecords();
  addChangeLog("교재관리", exists ? "교재 입출고 수정" : "교재 입출고 저장", `${record.type === "out" ? "사용" : "입고"} · ${bookDisplayName(book)} · ${record.quantity}권`);
  clearBookStockForm();
  renderAll();
}

function editBookStockRecord(id) {
  const record = bookStockRecords.find((item) => item.id === id);
  if (!record) return;
  $("bookStockRecordId").value = record.id;
  $("bookStockDate").value = record.date || currentDateText();
  $("bookStockBook").value = record.bookId;
  $("bookStockType").value = record.type || "in";
  $("bookStockQuantity").value = record.quantity || 1;
  $("bookStockUnitPrice").value = record.unitPrice || "";
  $("bookStockPartner").value = record.partner || "";
  $("bookStockMemo").value = record.memo || "";
  $("bookStockCreateExpense").checked = Boolean(record.financeRecordId);
  document.querySelectorAll(".book-entry-panel")[1]?.setAttribute("open", "");
  $("bookStockQuantity").focus();
}

function deleteBookStockRecord(id) {
  if (!requireDeletePermission()) return;
  const record = bookStockRecords.find((item) => item.id === id);
  if (!record) return;
  const book = bookById(record.bookId);
  if (!confirm(`${bookDisplayName(book)} ${record.type === "out" ? "사용" : "입고"} 기록을 삭제할까요?`)) return;
  bookStockRecords = bookStockRecords.filter((item) => item.id !== id);
  if (record.financeRecordId) {
    financeRecords = financeRecords.filter((item) => item.id !== record.financeRecordId);
    saveFinanceRecords();
  }
  saveBookStockRecords();
  addChangeLog("교재관리", "교재 입출고 삭제", `${bookDisplayName(book)} · ${record.quantity}권`);
  renderAll();
}

function showPaymentLedger() {
  document.querySelector(".payment-ledger-panel")?.classList.remove("hidden");
  renderPaymentLedger();
}

function hidePaymentLedger() {
  document.querySelector(".payment-ledger-panel")?.classList.add("hidden");
}

function paymentEntryValue(id) {
  return $(id)?.value?.trim() || "";
}

function paymentNameFromStudent(student) {
  return normalizeCourseText(student.paymentName || formatSubjectNames(student).join("+"));
}

function paymentBaseTuitionFromStudent(student) {
  return Number(student.baseTuition || 0) || Number(student.tuition || 0);
}

function findPaymentEntryStudent(name) {
  const canonicalName = canonicalStudentName(name);
  return students.find((student) => student.studentName === canonicalName);
}

function renderPaymentStudentOptions() {
  const list = $("paymentStudentOptions");
  if (!list) return;
  list.innerHTML = [...students]
    .filter((student) => student.studentName && student.enrollmentStatus !== "퇴회")
    .sort((a, b) => a.studentName.localeCompare(b.studentName, "ko"))
    .map((student) => `
      <option value="${escapeHtml(student.studentName)}" label="${escapeHtml([student.school, student.grade, paymentNameFromStudent(student)].filter(Boolean).join(" · "))}"></option>
    `)
    .join("");
}

function applyStudentToPaymentEntry() {
  const student = findPaymentEntryStudent(paymentEntryValue("payStudentName"));
  if (!student) return;
  const baseTuition = paymentBaseTuitionFromStudent(student);
  const paymentName = paymentNameFromStudent(student);

  $("payStudentName").value = student.studentName;
  $("paySchool").value = student.school || "";
  $("payGrade").value = student.grade || "";
  $("payPhone").value = student.parentPhone || student.studentPhone || "";
  $("payPaymentName").value = paymentName || "";
  $("payTuition").value = baseTuition || "";
  $("payPaidAmount").value = "";
  updateStandalonePaymentTotals();
}

function fillPaymentEntryDefaults() {
  const today = new Date().toISOString().slice(0, 10);
  if ($("payRegistered") && !$("payRegistered").value) $("payRegistered").value = today;
  if ($("payPaymentDate") && !$("payPaymentDate").value) $("payPaymentDate").value = today;
  if ($("payStatus")) $("payStatus").value = "미납";
  if ($("payPaymentType") && !$("payPaymentType").value) $("payPaymentType").value = "정규 교육비";
}

function clearStandalonePaymentForm() {
  [
    "payStudentName",
    "paySchool",
    "payGrade",
    "payPhone",
    "payPaymentType",
    "payPaymentName",
    "payTuition",
    "payDiscount",
    "payPaidAmount",
    "payPaymentMethod",
    "payCashReceiptDate",
    "payMemo",
  ].forEach((id) => {
    if ($(id)) $(id).value = "";
  });
  const standaloneBookList = document.querySelector("[data-book-fee-editor='standalone'] [data-book-fee-list]");
  if (standaloneBookList) {
    standaloneBookList.innerHTML = bookFeeRowHtml();
    bindBookFeeEditorEvents(standaloneBookList);
  }
  if ($("payRegistered")) $("payRegistered").value = "";
  if ($("payPaymentDate")) $("payPaymentDate").value = "";
  fillPaymentEntryDefaults();
  syncStandaloneCashReceiptField();
  updateStandalonePaymentTotals();
}

function saveStandalonePayment() {
  const studentName = paymentEntryValue("payStudentName");
  if (!studentName) {
    alert("원생명을 입력해주세요.");
    $("payStudentName")?.focus();
    return;
  }

  const bookFees = collectBookFees(document.querySelector("[data-book-fee-editor='standalone']") || document);
  const baseTuition = Number(paymentEntryValue("payTuition") || 0);
  const tuition = calculatePaymentTotal(baseTuition, bookFees);
  const discount = Number(paymentEntryValue("payDiscount") || 0);
  const status = paymentEntryValue("payStatus") || "미납";
  const paymentMethod = paymentEntryValue("payPaymentMethod");
  const payableAmount = Math.max(0, tuition + discount);
  const enteredPaidAmount = Number(paymentEntryValue("payPaidAmount") || 0);
  const paidAmount = status === "납부완료" && enteredPaidAmount <= 0 ? payableAmount : enteredPaidAmount;
  const unpaidAmount = status === "납부완료" ? 0 : Math.max(0, payableAmount - paidAmount);
  const nextRecord = paymentRecord(studentName, {
    registered: paymentEntryValue("payRegistered"),
    paymentType: paymentEntryValue("payPaymentType"),
    paymentName: normalizeCourseText(paymentEntryValue("payPaymentName")),
    baseTuition,
    tuition,
    discount,
    paidAmount,
    unpaidAmount,
    paymentDate: paymentEntryValue("payPaymentDate"),
    paymentMethod,
    cashReceiptDate: isBankTransferMethod(paymentMethod) ? paymentEntryValue("payCashReceiptDate") : "",
    memo: paymentEntryValue("payMemo"),
    bookFees,
    status,
  });

  standalonePaymentRecords = uniquePaymentRecords([
    ...standalonePaymentRecords,
    {
      ...nextRecord,
      school: paymentEntryValue("paySchool"),
      grade: paymentEntryValue("payGrade"),
      phone: paymentEntryValue("payPhone"),
      standalone: true,
    },
  ]);
  saveStandalonePaymentRecords();
  addChangeLog("납부관리", "수납기록 저장", `${nextRecord.studentName || "이름 없음"} · ${nextRecord.paymentName || ""} · ${money(nextRecord.paidAmount)}`);
  clearStandalonePaymentForm();
  renderAll();
  alert("수납기록을 저장했습니다. 학생관리 명단에는 추가되지 않습니다.");
}

function readLearningFieldValue(field) {
  return $(field)?.value?.trim() || "";
}

function saveLearningDetails() {
  const existing = students.find((student) => student.id === selectedId);
  if (!existing) {
    alert("먼저 학습관리를 저장할 학생을 선택해주세요.");
    return;
  }

  const data = {
    ...existing,
    currentBooks: readLearningFieldValue("currentBooks"),
    completedBooks: readLearningFieldValue("completedBooks"),
    counselingRecords: readLearningFieldValue("counselingRecords"),
    makeupDateRecords: readLearningFieldValue("makeupDateRecords"),
  };
  const draftRecord = feedbackDraftRecord();
  if (draftRecord) {
    data.feedbackRecords = mergeFeedbackRecords(data.feedbackRecords || [], draftRecord);
  }
  saveStudentData(data);
  switchView("learning");
}

function attendanceRecordsForMonth(student, month = currentMonthText()) {
  return [...(student.attendanceRecords || [])]
    .filter((record) => String(record.date || "").slice(0, 7) === month)
    .sort((a, b) => (b.date || "").localeCompare(a.date || ""));
}

function todayAttendanceRecord(student) {
  return (student.attendanceRecords || []).find((record) => record.date === currentDateText());
}

function attendanceRecordOnDate(student, dateText) {
  return (student.attendanceRecords || []).find((record) => record.date === dateText);
}

function upsertAttendanceRecord(student, nextRecord) {
  const normalized = normalizeAttendanceRecord(nextRecord);
  const records = (student.attendanceRecords || []).filter((record) => record.date !== normalized.date);
  student.attendanceRecords = [normalized, ...records]
    .filter((record) => record.date)
    .sort((a, b) => (b.date || "").localeCompare(a.date || ""));
  student.attendanceStatus = normalized.status;
  student.presentDays = attendanceRecordsForMonth(student).filter((record) => record.status === "등원").length;
  student.absentDays = attendanceRecordsForMonth(student).filter((record) => record.status === "결석").length;
}

function quickAttendance(studentId, action, dateText = currentDateText()) {
  const student = students.find((item) => item.id === studentId);
  if (!student) return;
  const existing = attendanceRecordOnDate(student, dateText) || {};
  const nextRecord = {
    ...existing,
    date: dateText,
    status: action === "absent" ? "결석" : "등원",
    arrivalTime: existing.arrivalTime || "",
    departureTime: existing.departureTime || "",
    absentReason: existing.absentReason || "",
  };
  if (action === "arrive") nextRecord.arrivalTime = nextRecord.arrivalTime || currentTimeText();
  if (action === "leave") {
    nextRecord.arrivalTime = nextRecord.arrivalTime || currentTimeText();
    nextRecord.departureTime = currentTimeText();
  }
  if (action === "absent") {
    nextRecord.arrivalTime = "";
    nextRecord.departureTime = "";
  }

  upsertAttendanceRecord(student, nextRecord);
  selectedAttendanceDate = dateText;
  expandedAttendanceId = studentId;
  saveStudents();
  addChangeLog("등원관리", action === "absent" ? "결석 체크" : action === "leave" ? "하원 체크" : "등원 체크", `${student.studentName || "이름 없음"} · ${dateText}`);
  renderAll();
}

function checkinModeLabel() {
  return checkinMode === "leave" ? "하원" : "등원";
}

function activeCheckinStudents() {
  return students.filter((student) => student.enrollmentStatus === "재원");
}

function checkinMatches(code = checkinCodeValue) {
  const normalized = String(code || "").replace(/\D/g, "");
  if (normalized.length < 4) return [];
  const checkCode = normalized.slice(-4);
  return activeCheckinStudents().filter((student) => checkinCodeFromParentPhone(student.parentPhone) === checkCode);
}

function todayCheckinStatusText(student) {
  const record = todayAttendanceRecord(student);
  if (!record) return "오늘 기록 없음";
  if (record.status === "결석") return `결석 · ${record.absentReason || "사유 없음"}`;
  return `등원 ${record.arrivalTime || "-"} · 하원 ${record.departureTime || "-"}`;
}

function setCheckinResult(message, tone = "") {
  checkinResultMessage = message;
  checkinResultTone = tone;
}

function clearCheckinCode() {
  checkinCodeValue = "";
  if ($("checkinCodeInput")) $("checkinCodeInput").value = "";
}

function scheduleAutoCheckin() {
  clearTimeout(checkinAutoTimer);
  const normalized = String(checkinCodeValue || "").replace(/\D/g, "");
  const matches = checkinMatches();
  if (normalized.length < 4 || matches.length !== 1) return;
  checkinAutoTimer = setTimeout(() => {
    const latestMatches = checkinMatches();
    if (String(checkinCodeValue || "").replace(/\D/g, "").length >= 4 && latestMatches.length === 1) {
      recordTabletCheckin(latestMatches[0].id);
    }
  }, 350);
}

function recordTabletCheckin(studentIds) {
  clearTimeout(checkinAutoTimer);
  const ids = Array.isArray(studentIds) ? studentIds : [studentIds];
  const targets = ids
    .map((id) => students.find((student) => student.id === id))
    .filter(Boolean);
  if (!targets.length) {
    setCheckinResult("일치하는 원생을 찾지 못했습니다.", "bad");
    renderCheckinScreen();
    return;
  }

  const now = currentTimeText();
  const today = currentDateText();
  targets.forEach((student) => {
    const existing = attendanceRecordOnDate(student, today) || {};
    const nextRecord = {
      ...existing,
      date: today,
      status: "등원",
      arrivalTime: existing.arrivalTime || now,
      departureTime: existing.departureTime || "",
      absentReason: "",
    };
    if (checkinMode === "leave") {
      nextRecord.arrivalTime = nextRecord.arrivalTime || now;
      nextRecord.departureTime = now;
    }
    upsertAttendanceRecord(student, nextRecord);
    queueKakaoAttendanceMessage(student, checkinMode, checkinMode === "leave" ? nextRecord.departureTime : nextRecord.arrivalTime, today);
  });

  selectedAttendanceDate = today;
  expandedAttendanceId = targets[0]?.id || "";
  saveStudents();
  const names = targets.map((student) => student.studentName || "이름 없음").join(", ");
  addChangeLog("출석체크", `${checkinModeLabel()} 저장`, `${names} · ${today} ${now}`);
  setCheckinResult(`${names} ${checkinModeLabel()} ${now} 저장`, "good");
  clearCheckinCode();
  renderAll();
}

function submitTabletCheckin() {
  clearTimeout(checkinAutoTimer);
  const matches = checkinMatches();
  if (!checkinCodeValue) {
    setCheckinResult("출첵번호를 입력해주세요.", "bad");
    renderCheckinScreen();
    return;
  }
  if (!matches.length) {
    setCheckinResult("일치하는 원생이 없습니다. 출첵번호를 확인해주세요.", "bad");
    renderCheckinScreen();
    return;
  }
  recordTabletCheckin(matches.map((student) => student.id));
}

function renderCheckinScreen() {
  if (!$("checkinView")) return;
  updateCheckinClock();
  if ($("checkinCodeInput")) $("checkinCodeInput").value = checkinCodeValue;
  $("checkinArriveMode")?.classList.toggle("active", checkinMode === "arrive");
  $("checkinLeaveMode")?.classList.toggle("active", checkinMode === "leave");

  const result = $("checkinResult");
  if (result) {
    result.textContent = checkinResultMessage || "출첵번호 4자리를 입력하면 자동 저장됩니다.";
    result.classList.toggle("good", checkinResultTone === "good");
    result.classList.toggle("bad", checkinResultTone === "bad");
  }

  const matchRoot = $("checkinMatchedStudent");
  if (matchRoot) {
    const matches = checkinMatches();
    if (!checkinCodeValue) {
      matchRoot.innerHTML = "";
    } else if (!matches.length) {
      matchRoot.innerHTML = `<div class="checkin-match-card"><div><strong>일치하는 원생 없음</strong><span>학부모 연락처1 뒷 네 자리와 비교합니다.</span></div></div>`;
    } else {
      matchRoot.innerHTML = `
        ${matches.length > 1 ? `<button class="ghost-button" type="button" data-checkin-all>같은 번호 ${matches.length}명 전체 ${checkinModeLabel()}</button>` : ""}
        ${matches.map((student) => `
          <article class="checkin-match-card">
            <div>
              <strong>${escapeHtml(student.studentName || "이름 없음")}</strong>
              <span>${escapeHtml(student.school || "-")} · ${escapeHtml(student.grade || "-")} · ${escapeHtml(todayCheckinStatusText(student))}</span>
            </div>
            <button class="mini-button" type="button" data-checkin-student="${escapeHtml(student.id)}">${checkinModeLabel()}</button>
          </article>
        `).join("")}
      `;
    }
  }

  const recentRoot = $("checkinRecentList");
  if (recentRoot) {
    const today = currentDateText();
    const recent = activeCheckinStudents()
      .map((student) => ({ student, record: attendanceRecordOnDate(student, today) }))
      .filter((item) => item.record && item.record.status === "등원")
      .sort((a, b) => ((b.record.departureTime || b.record.arrivalTime || "").localeCompare(a.record.departureTime || a.record.arrivalTime || "")))
      .slice(0, 10);
    recentRoot.innerHTML = recent.length
      ? recent.map(({ student, record }) => `
        <div class="checkin-recent-item">
          <strong>${escapeHtml(student.studentName || "이름 없음")}</strong>
          <span>등원 ${escapeHtml(record.arrivalTime || "-")} · 하원 ${escapeHtml(record.departureTime || "-")}</span>
        </div>
      `).join("")
      : `<p class="empty-feedback">오늘 저장된 등하원 기록이 없습니다.</p>`;
  }
}

function saveAttendanceDetail(studentId) {
  const student = students.find((item) => item.id === studentId);
  const panel = document.querySelector(`[data-attendance-detail-id="${studentId}"]`);
  if (!student || !panel) return;
  const status = panel.querySelector("[data-attendance-field='status']").value;
  const arrivalInput = panel.querySelector("[data-attendance-field='arrivalTime']").value;
  const nextRecord = {
    date: panel.querySelector("[data-attendance-field='date']").value,
    status,
    arrivalTime: status === "등원" ? (arrivalInput || currentTimeText()) : "",
    departureTime: status === "등원" ? panel.querySelector("[data-attendance-field='departureTime']").value : "",
    absentReason: status === "결석" ? panel.querySelector("[data-attendance-field='absentReason']").value.trim() : "",
  };
  if (!nextRecord.date) {
    alert("날짜를 선택해주세요.");
    return;
  }
  upsertAttendanceRecord(student, nextRecord);
  selectedAttendanceDate = nextRecord.date;
  expandedAttendanceId = studentId;
  saveStudents();
  addChangeLog("등원관리", "출결 상세 저장", `${student.studentName || "이름 없음"} · ${nextRecord.date}`);
  renderAll();
}

function deleteAttendanceRecord(studentId, date) {
  if (!requireDeletePermission()) return;
  const student = students.find((item) => item.id === studentId);
  if (!student) return;
  student.attendanceRecords = (student.attendanceRecords || []).filter((record) => record.date !== date);
  const latest = student.attendanceRecords[0];
  student.attendanceStatus = latest?.status || "등원";
  student.presentDays = attendanceRecordsForMonth(student).filter((record) => record.status === "등원").length;
  student.absentDays = attendanceRecordsForMonth(student).filter((record) => record.status === "결석").length;
  selectedAttendanceDate = date;
  expandedAttendanceId = studentId;
  saveStudents();
  addChangeLog("등원관리", "출결기록 삭제", `${student.studentName || "이름 없음"} · ${date}`);
  renderAll();
}

function attendanceDetailHtml(student, monthRecords, editDate = selectedAttendanceDate) {
  const selectedRecord = attendanceRecordOnDate(student, editDate) || {};
  const editStatus = selectedRecord.status || "등원";
  return `
    <div class="attendance-detail" data-attendance-detail-id="${escapeHtml(student.id)}">
      <div class="attendance-edit-grid">
        <label>
          날짜
          <input data-attendance-field="date" type="date" value="${escapeHtml(editDate)}" />
        </label>
        <label>
          상태
          <select data-attendance-field="status">
            <option ${editStatus === "등원" ? "selected" : ""}>등원</option>
            <option ${editStatus === "결석" ? "selected" : ""}>결석</option>
          </select>
        </label>
        <label>
          등원시간
          <input data-attendance-field="arrivalTime" type="time" value="${escapeHtml(selectedRecord.arrivalTime || "")}" />
        </label>
        <label>
          하원시간
          <input data-attendance-field="departureTime" type="time" value="${escapeHtml(selectedRecord.departureTime || "")}" />
        </label>
        <label class="wide">
          결석 사유
          <input data-attendance-field="absentReason" type="text" value="${escapeHtml(selectedRecord.absentReason || "")}" placeholder="예: 감기, 가족 일정" />
        </label>
        <div class="attendance-save-row">
          <button class="primary-button" type="button" data-attendance-save="${escapeHtml(student.id)}">기록 저장</button>
        </div>
      </div>
      <div class="attendance-record-list">
        ${monthRecords.length ? monthRecords.map((record) => `
          <div class="attendance-record-row">
            <strong>${escapeHtml(record.date)}</strong>
            <span>${escapeHtml(record.status)}</span>
            <span>등원 ${escapeHtml(record.arrivalTime || "-")}</span>
            <span>하원 ${escapeHtml(record.departureTime || "-")}</span>
            <span>${escapeHtml(record.absentReason || "")}</span>
            <button class="mini-danger-button" type="button" data-attendance-delete="${escapeHtml(student.id)}" data-attendance-date="${escapeHtml(record.date)}">삭제</button>
          </div>
        `).join("") : `<p class="empty-feedback">이번 달 등원기록이 없습니다.</p>`}
      </div>
    </div>
  `;
}

function attendanceDateLabel(dateText) {
  const date = dateFromText(dateText);
  if (!date) return dateText || "날짜 없음";
  const weekdays = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
  return `${date.getMonth() + 1}월 ${date.getDate()}일 ${weekdays[date.getDay()]}`;
}

function ensureSelectedAttendanceDate(month) {
  if (!selectedAttendanceDate || String(selectedAttendanceDate).slice(0, 7) !== month) {
    selectedAttendanceDate = month === currentMonthText() ? currentDateText() : `${month}-01`;
  }
}

function dateTextForMonthDay(month, day) {
  return `${month}-${String(day).padStart(2, "0")}`;
}

function attendanceStudentsForDate(dateText, mode, query = "") {
  const scheduled = students.filter((student) => isStudentScheduledOnDate(student, dateText));
  const scheduledIds = new Set(scheduled.map((student) => student.id));
  const recorded = students.filter((student) => attendanceRecordOnDate(student, dateText));
  const recordedIds = new Set(recorded.map((student) => student.id));
  let visible = students.filter((student) => scheduledIds.has(student.id) || recordedIds.has(student.id));

  if (mode === "todayScheduled") visible = scheduled;
  if (mode === "todayAbsent") visible = students.filter((student) => attendanceRecordOnDate(student, dateText)?.status === "결석");
  if (mode === "todayWaiting") visible = scheduled.filter((student) => !attendanceRecordOnDate(student, dateText));

  const lowerQuery = query.trim().toLowerCase();
  if (lowerQuery) {
    visible = visible.filter((student) => {
      const record = attendanceRecordOnDate(student, dateText);
      return [
        student.studentName,
        student.school,
        student.grade,
        student.teacher,
        formatAttendanceDays(student.attendanceDays),
        student.weeklySubjectSchedule,
        record?.status,
        record?.arrivalTime,
        record?.departureTime,
        record?.absentReason,
      ].join(" ").toLowerCase().includes(lowerQuery);
    });
  }

  return visible.sort((a, b) => {
    const aScheduled = scheduledIds.has(a.id) ? 0 : 1;
    const bScheduled = scheduledIds.has(b.id) ? 0 : 1;
    if (aScheduled !== bScheduled) return aScheduled - bScheduled;
    return (a.studentName || "").localeCompare(b.studentName || "", "ko-KR");
  });
}

function attendanceCountsForDate(dateText) {
  const scheduled = students.filter((student) => isStudentScheduledOnDate(student, dateText));
  const active = students.filter((student) => student.enrollmentStatus === "재원");
  const present = students.filter((student) => attendanceRecordOnDate(student, dateText)?.status === "등원").length;
  const absent = students.filter((student) => attendanceRecordOnDate(student, dateText)?.status === "결석").length;
  const waiting = scheduled.filter((student) => !attendanceRecordOnDate(student, dateText)).length;
  const off = active.filter((student) => !isStudentScheduledOnDate(student, dateText)).length;
  return { scheduled: scheduled.length, present, absent, waiting, off };
}

function attendanceModeLabel() {
  if (attendanceListMode === "todayAbsent") return "결석명단";
  if (attendanceListMode === "todayWaiting") return "대기명단";
  return "등원명단";
}

function renderAttendanceCalendar(month) {
  const root = $("attendanceCalendar");
  if (!root) return;
  const [year, monthNumber] = month.split("-").map(Number);
  const firstDay = new Date(year, monthNumber - 1, 1).getDay();
  const lastDate = new Date(year, monthNumber, 0).getDate();
  const cells = [];

  for (let i = 0; i < firstDay; i += 1) {
    cells.push(`<div class="attendance-calendar-cell muted"></div>`);
  }
  for (let day = 1; day <= lastDate; day += 1) {
    const dateText = dateTextForMonthDay(month, day);
    const counts = attendanceCountsForDate(dateText);
    const date = dateFromText(dateText);
    const isToday = dateText === currentDateText();
    const isSelected = dateText === selectedAttendanceDate;
    cells.push(`
      <button class="attendance-calendar-cell ${isToday ? "today" : ""} ${isSelected ? "selected" : ""}" type="button" data-attendance-date="${dateText}">
        <span class="calendar-day-number ${date?.getDay() === 0 ? "sunday" : ""} ${date?.getDay() === 6 ? "saturday" : ""}">${day}</span>
        <div class="calendar-badges">
          <span class="calendar-badge present">등:${counts.present}</span>
          <span class="calendar-badge absent">결:${counts.absent}</span>
          <span class="calendar-badge waiting">대:${counts.waiting}</span>
          <span class="calendar-badge off">휴:${counts.off}</span>
        </div>
      </button>
    `);
  }
  while (cells.length % 7 !== 0) {
    cells.push(`<div class="attendance-calendar-cell muted"></div>`);
  }

  root.innerHTML = `
    <div class="attendance-calendar-weekdays">
      <span class="sunday">일</span>
      <span>월</span>
      <span>화</span>
      <span>수</span>
      <span>목</span>
      <span>금</span>
      <span class="saturday">토</span>
    </div>
    <div class="attendance-calendar-grid">
      ${cells.join("")}
    </div>
  `;
}

function renderAttendanceOverview() {
  const month = $("attendanceMonthFilter")?.value || currentMonthText();
  ensureSelectedAttendanceDate(month);
  renderAttendanceCalendar(month);
  const query = ($("attendanceSearchInput")?.value || "").trim().toLowerCase();
  const visibleStudents = attendanceStudentsForDate(selectedAttendanceDate, attendanceListMode, query);
  const selectedCounts = attendanceCountsForDate(selectedAttendanceDate);
  $("attendanceSelectedDateTitle").textContent = `${attendanceDateLabel(selectedAttendanceDate)} ${attendanceModeLabel()}`;
  $("attendanceSelectedDateSummary").textContent = `등원 ${selectedCounts.present} · 결석 ${selectedCounts.absent} · 대기 ${selectedCounts.waiting} · 휴무 ${selectedCounts.off}`;

  $("attendanceOverview").innerHTML = visibleStudents.length
    ? visibleStudents.map((student) => {
      const monthRecords = attendanceRecordsForMonth(student, month);
      const selectedRecord = attendanceRecordOnDate(student, selectedAttendanceDate);
      const isOpen = expandedAttendanceId === student.id;
      const presentCount = monthRecords.filter((record) => record.status === "등원").length;
      const absentCount = monthRecords.filter((record) => record.status === "결석").length;
      const todayText = selectedRecord
        ? `${selectedRecord.status} ${selectedRecord.arrivalTime || ""}${selectedRecord.absentReason ? ` · ${selectedRecord.absentReason}` : ""}`
        : "대기";
      return `
        <article class="management-item attendance-item ${isOpen ? "open" : ""}" data-attendance-id="${escapeHtml(student.id)}">
          <div class="attendance-summary">
            <strong>${escapeHtml(student.studentName || "이름 없음")}</strong>
            <span>${escapeHtml(student.grade || "-")} · 담당 ${escapeHtml(student.teacher || "-")} · 등원요일 ${formatAttendanceDays(student.attendanceDays)}</span>
            <p>${month} 등원 ${presentCount}일 · 결석 ${absentCount}일 · 선택일 ${escapeHtml(todayText)}</p>
          </div>
          <div class="attendance-quick-actions">
            <button class="mini-button" type="button" data-attendance-arrive="${escapeHtml(student.id)}" data-attendance-date="${escapeHtml(selectedAttendanceDate)}">등원</button>
            <button class="mini-button" type="button" data-attendance-leave="${escapeHtml(student.id)}" data-attendance-date="${escapeHtml(selectedAttendanceDate)}">하원</button>
            <button class="mini-danger-button" type="button" data-attendance-absent="${escapeHtml(student.id)}" data-attendance-date="${escapeHtml(selectedAttendanceDate)}">결석</button>
          </div>
          ${isOpen ? attendanceDetailHtml(student, monthRecords, selectedAttendanceDate) : ""}
        </article>
      `;
    }).join("")
    : `<p class="empty-feedback">${attendanceEmptyMessage()}</p>`;

  bindAttendanceEvents();
}

function attendanceEmptyMessage() {
  if (attendanceListMode === "todayAbsent") return "선택한 날짜에 결석으로 기록된 학생이 없습니다.";
  if (attendanceListMode === "todayWaiting") return "선택한 날짜에 대기 중인 학생이 없습니다.";
  if (attendanceTodayOnly) return "선택한 날짜에 등원 예정인 학생이 없습니다.";
  return "선택한 날짜에 표시할 학생이 없습니다.";
}

function bindAttendanceEvents() {
  $("attendanceCalendar")?.querySelectorAll("[data-attendance-date]").forEach((button) => {
    button.addEventListener("click", () => {
      selectedAttendanceDate = button.dataset.attendanceDate;
      attendanceTodayOnly = false;
      attendanceListMode = "all";
      expandedAttendanceId = "";
      renderAttendanceOverview();
    });
  });

  $("attendanceOverview").querySelectorAll("[data-attendance-id]").forEach((item) => {
    item.addEventListener("click", (event) => {
      if (event.target.closest("button, input, select, textarea, a")) return;
      expandedAttendanceId = expandedAttendanceId === item.dataset.attendanceId ? "" : item.dataset.attendanceId;
      renderAttendanceOverview();
    });
  });

  $("attendanceOverview").querySelectorAll("[data-attendance-arrive]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      quickAttendance(button.dataset.attendanceArrive, "arrive", button.dataset.attendanceDate || selectedAttendanceDate);
    });
  });

  $("attendanceOverview").querySelectorAll("[data-attendance-leave]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      quickAttendance(button.dataset.attendanceLeave, "leave", button.dataset.attendanceDate || selectedAttendanceDate);
    });
  });

  $("attendanceOverview").querySelectorAll("[data-attendance-absent]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      quickAttendance(button.dataset.attendanceAbsent, "absent", button.dataset.attendanceDate || selectedAttendanceDate);
    });
  });

  $("attendanceOverview").querySelectorAll("[data-attendance-save]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      saveAttendanceDetail(button.dataset.attendanceSave);
    });
  });

  $("attendanceOverview").querySelectorAll("[data-attendance-delete]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      deleteAttendanceRecord(button.dataset.attendanceDelete, button.dataset.attendanceDate);
    });
  });
}

function formatAttendanceDays(days = []) {
  const values = days.map(Number);
  const labels = WEEKDAYS.filter((day) => values.includes(day.value)).map((day) => day.label);
  return labels.length ? labels.join(", ") : "-";
}

function toggleGongpilSubjects() {
  const panel = $("gongpilSubjectPanel");
  if (!panel) return;
  const gongpilChecked = Array.from(document.querySelectorAll("input[name='subjects']")).some(
    (check) => check.value === "공필왕" && check.checked,
  );
  panel.classList.toggle("hidden", !gongpilChecked);
  if (!gongpilChecked) {
    document.querySelectorAll("input[name='gongpilSubjects']").forEach((check) => {
      check.checked = false;
    });
  }
}

function switchStudentTab(tab) {
  document.querySelectorAll("[data-student-tab]").forEach((button) => {
    button.classList.toggle("active", button.dataset.studentTab === tab);
  });
  document.querySelectorAll("[data-student-tab-panel]").forEach((panel) => {
    panel.classList.toggle("active", panel.dataset.studentTabPanel === tab);
  });
}

function bindOpenStudentButtons(root = document) {
  root.querySelectorAll("[data-open-student]").forEach((button) => {
    button.addEventListener("click", () => {
      switchView("students");
      selectStudent(button.dataset.openStudent);
      switchStudentTab("profile");
      $("studentName").focus();
    });
  });

  root.querySelectorAll("[data-open-learning]").forEach((button) => {
    button.addEventListener("click", () => {
      selectStudent(button.dataset.openLearning);
      switchView("learning");
      $("feedbackText").focus();
    });
  });

  root.querySelectorAll("[data-open-attendance]").forEach((button) => {
    button.addEventListener("click", () => {
      selectedAttendanceDate = currentDateText();
      expandedAttendanceId = button.dataset.openAttendance;
      switchView("attendance");
      renderAttendanceOverview();
    });
  });
}

function renderFeedbackList(student) {
  const list = $("feedbackList");
  const records = [...(student.feedbackRecords || [])].sort((a, b) => (b.date || "").localeCompare(a.date || ""));

  if (records.length === 0) {
    list.innerHTML = `<p class="empty-feedback">아직 기록된 학습 피드백이 없습니다.</p>`;
    return;
  }

  list.innerHTML = records.map((record) => `
    <article class="feedback-item">
      <div class="feedback-item-head">
        <strong>${escapeHtml(record.date || "날짜 없음")}</strong>
        <div class="row-actions">
          <button class="mini-button" type="button" data-feedback-action="edit" data-id="${record.id}">수정</button>
          <button class="mini-danger-button" type="button" data-feedback-action="delete" data-id="${record.id}">삭제</button>
        </div>
      </div>
      ${feedbackMetaHtml(record)}
      ${record.photoData ? `<img src="${record.photoData}" alt="${escapeHtml(record.photoName || "학습 사진")}" />` : ""}
      <p>${escapeHtml(record.text || "텍스트 기록 없음").replaceAll("\n", "<br>")}</p>
    </article>
  `).join("");

  list.querySelectorAll("button[data-feedback-action]").forEach((button) => {
    button.addEventListener("click", () => {
      if (button.dataset.feedbackAction === "edit") editFeedbackRecord(button.dataset.id);
      else deleteFeedbackRecord(button.dataset.id);
    });
  });
}

function clearFeedbackEditor() {
  $("feedbackId").value = "";
  $("feedbackDate").value = new Date().toISOString().slice(0, 10);
  if ($("feedbackUnit")) $("feedbackUnit").value = "";
  if ($("feedbackUnderstanding")) $("feedbackUnderstanding").value = "좋음";
  if ($("feedbackAttitude")) $("feedbackAttitude").value = "집중";
  if ($("feedbackHomework")) $("feedbackHomework").value = "";
  $("feedbackText").value = "";
  $("feedbackPhoto").value = "";
  feedbackPhotoData = "";
  feedbackPhotoName = "";
  syncFeedbackSubjectOptions();
  renderFeedbackPreview();
}

function feedbackMetaHtml(record) {
  const items = [
    record.subject ? `과목 ${record.subject}` : "",
    record.unit ? `교재/단원 ${record.unit}` : "",
    record.understanding ? `이해도 ${record.understanding}` : "",
    record.attitude ? `태도 ${record.attitude}` : "",
    record.homework ? `과제 ${record.homework}` : "",
  ].filter(Boolean);
  return items.length
    ? `<div class="feedback-meta">${items.map((item) => `<span>${escapeHtml(item)}</span>`).join("")}</div>`
    : "";
}

function getCheckedSubjects() {
  return Array.from(document.querySelectorAll("input[name='subjects']:checked")).map((check) => check.value);
}

function syncFeedbackSubjectOptions(preferredSubjects = getCheckedSubjects()) {
  const select = $("feedbackSubject");
  if (!select) return;
  const previous = select.value;
  const subjects = preferredSubjects.length > 0 ? preferredSubjects : SUBJECTS;
  select.innerHTML = subjects.map((subject) => `<option>${subject}</option>`).join("");
  if (subjects.includes(previous)) select.value = previous;
}

function recommendFeedbackText() {
  syncFeedbackSubjectOptions();
  const subject = $("feedbackSubject").value || getCheckedSubjects()[0] || SUBJECTS[0];
  const textArea = $("feedbackText");

  if (textArea.value.trim() && !confirm("현재 피드백 내용을 추천 문구로 바꿀까요?")) return;

  const data = readFormWithExistingFeedback();
  const name = data.studentName || "학생";
  const grade = data.grade ? `${data.grade} ` : "";
  const subjectLabel = subject === "공필왕" && data.gongpilSubjects.length
    ? `공필왕(${data.gongpilSubjects.join(", ")})`
    : subject;
  const unit = $("feedbackUnit")?.value.trim();
  const understanding = $("feedbackUnderstanding")?.value || "보통";
  const attitude = $("feedbackAttitude")?.value || "보통";
  const homework = $("feedbackHomework")?.value.trim();
  const intro = unit
    ? `오늘은 ${subjectLabel}에서 ${unit}을(를) 학습했습니다.`
    : `오늘은 ${subjectLabel} 수업을 진행했습니다.`;
  const understandingText = {
    좋음: "학습 내용을 잘 이해하고 문제에 적용하는 모습이 좋았습니다.",
    보통: "큰 흐름은 따라오고 있으며, 세부 내용은 한 번 더 확인하면 더 안정적일 것 같습니다.",
    보완필요: "아직 익숙하지 않은 부분이 있어 다음 수업에서 한 번 더 점검하겠습니다.",
  }[understanding] || "학습 흐름을 확인하며 진행했습니다.";
  const attitudeText = {
    집중: "수업 태도는 안정적이었고 집중해서 참여했습니다.",
    보통: "수업 흐름은 잘 따라왔고, 중간중간 확인하며 진행했습니다.",
    확인필요: "집중이 흔들리는 순간이 있어 짧게 끊어 확인하며 지도했습니다.",
  }[attitude] || "수업 태도를 확인하며 진행했습니다.";
  const homeworkText = homework ? `과제는 ${homework}입니다.` : "별도 과제는 수업 상황에 맞춰 안내하겠습니다.";
  const nextStep = getSubjectNextStep(subject, data);

  textArea.value = `${name} ${grade}${subjectLabel} 피드백\n${intro}\n${understandingText} ${attitudeText}\n${homeworkText}\n${nextStep}`;
  textArea.focus();
}

function getSubjectNextStep(subject, student = {}) {
  const gongpilDetail = student.gongpilSubjects?.length
    ? `${student.gongpilSubjects.join(", ")} 중심으로 `
    : "";
  const nextSteps = {
    "미래엔 영어": "다음 시간에는 어휘 복습과 문장 해석 정확도를 함께 확인하겠습니다.",
    "미래엔 수학": "다음 시간에는 오답 유형을 다시 풀며 풀이 과정을 정리하겠습니다.",
    "중등 수학": "다음 시간에는 개념 확인과 심화 유형 풀이를 함께 이어가겠습니다.",
    "고등 수학": "다음 시간에는 개념 확인과 심화 유형 풀이를 함께 이어가겠습니다.",
    공필왕: `다음 시간에는 ${gongpilDetail}핵심 용어와 문제 근거를 함께 점검하겠습니다.`,
    문해력: "다음 시간에는 근거를 들어 자신의 생각을 쓰는 연습을 이어가겠습니다.",
    "소한이 한글": "다음 시간에는 낱말 읽기와 짧은 문장 읽기를 함께 연습하겠습니다.",
  };
  return nextSteps[subject] || "다음 시간에는 오늘 배운 내용을 다시 확인하며 학습 흐름을 이어가겠습니다.";
}

function renderFeedbackPreview() {
  const preview = $("feedbackPhotoPreview");
  if (!feedbackPhotoData) {
    preview.innerHTML = `<span>선택된 사진 없음</span>`;
    return;
  }

  preview.innerHTML = `
    <img src="${feedbackPhotoData}" alt="${escapeHtml(feedbackPhotoName || "선택한 학습 사진")}" />
    <button class="mini-danger-button" id="removeFeedbackPhotoBtn" type="button">사진 삭제</button>
  `;
  $("removeFeedbackPhotoBtn").addEventListener("click", () => {
    feedbackPhotoData = "";
    feedbackPhotoName = "";
    $("feedbackPhoto").value = "";
    renderFeedbackPreview();
  });
}

function feedbackDraftRecord() {
  const text = $("feedbackText").value.trim();
  const unit = $("feedbackUnit")?.value.trim() || "";
  const homework = $("feedbackHomework")?.value.trim() || "";
  if (!text && !feedbackPhotoData && !unit && !homework) {
    return null;
  }

  const recordId = $("feedbackId").value || createId();
  return {
    id: recordId,
    date: $("feedbackDate").value || new Date().toISOString().slice(0, 10),
    subject: $("feedbackSubject")?.value || "",
    unit,
    understanding: $("feedbackUnderstanding")?.value || "",
    attitude: $("feedbackAttitude")?.value || "",
    homework,
    text,
    photoData: feedbackPhotoData,
    photoName: feedbackPhotoName,
  };
}

function mergeFeedbackRecords(records = [], record) {
  if (!record) return records;
  const nextRecords = [...records];
  const index = nextRecords.findIndex((item) => item.id === record.id);
  if (index >= 0) nextRecords[index] = record;
  else nextRecords.unshift(record);
  return nextRecords;
}

function saveFeedbackRecord() {
  const record = feedbackDraftRecord();
  if (!record) {
    alert("텍스트 피드백 또는 학습 사진을 입력해주세요.");
    return;
  }

  const data = readFormWithExistingFeedback({ preserveStudentSetup: true });
  data.feedbackRecords = mergeFeedbackRecords(data.feedbackRecords || [], record);
  saveStudentData(data);
  clearFeedbackEditor();
  renderFeedbackList(data);
}

function editFeedbackRecord(id) {
  const student = students.find((item) => item.id === selectedId);
  const record = student?.feedbackRecords?.find((item) => item.id === id);
  if (!record) return;

  switchView("learning");
  $("feedbackId").value = record.id;
  $("feedbackDate").value = record.date || new Date().toISOString().slice(0, 10);
  syncFeedbackSubjectOptions();
  if ($("feedbackSubject") && record.subject) $("feedbackSubject").value = record.subject;
  if ($("feedbackUnit")) $("feedbackUnit").value = record.unit || "";
  if ($("feedbackUnderstanding")) $("feedbackUnderstanding").value = record.understanding || "좋음";
  if ($("feedbackAttitude")) $("feedbackAttitude").value = record.attitude || "집중";
  if ($("feedbackHomework")) $("feedbackHomework").value = record.homework || "";
  $("feedbackText").value = record.text || "";
  $("feedbackPhoto").value = "";
  feedbackPhotoData = record.photoData || "";
  feedbackPhotoName = record.photoName || "";
  renderFeedbackPreview();
  $("feedbackText").focus();
}

function deleteFeedbackRecord(id) {
  if (!requireDeletePermission()) return;
  const data = readFormWithExistingFeedback({ preserveStudentSetup: true });
  const record = data.feedbackRecords.find((item) => item.id === id);
  if (!record) return;
  if (!confirm(`${record.date || "선택한 날짜"} 피드백을 삭제할까요?`)) return;

  data.feedbackRecords = data.feedbackRecords.filter((item) => item.id !== id);
  saveStudentData(data);
  clearFeedbackEditor();
  renderFeedbackList(data);
}

function weekRangeFromToday() {
  const today = dateFromText(currentDateText()) || new Date();
  const day = today.getDay();
  const mondayOffset = day === 0 ? -6 : 1 - day;
  const monday = new Date(today);
  monday.setDate(today.getDate() + mondayOffset);
  const saturday = new Date(monday);
  saturday.setDate(monday.getDate() + 5);
  return {
    start: formatDateText(monday),
    end: formatDateText(saturday),
  };
}

function setLearningReportRange(period = $("learningReportPeriod")?.value || "month") {
  if (!$("learningReportStart") || !$("learningReportEnd")) return;
  const range = period === "week" ? weekRangeFromToday() : currentMonthRange();
  if (period !== "custom") {
    $("learningReportStart").value = range.start;
    $("learningReportEnd").value = range.end;
  }
}

function clearLearningReportText() {
  if ($("learningReportText")) $("learningReportText").value = "";
  if ($("learningReportPreview")) $("learningReportPreview").innerHTML = "";
  setLearningReportRange();
}

function recordsForLearningReport(student, start, end) {
  return [...(student.feedbackRecords || [])]
    .filter((record) => isDateInRange(record.date, start, end))
    .sort((a, b) => (a.date || "").localeCompare(b.date || ""));
}

function mostCommonValue(records, key) {
  const counts = new Map();
  records.forEach((record) => {
    const value = String(record[key] || "").trim();
    if (value) counts.set(value, (counts.get(value) || 0) + 1);
  });
  return [...counts.entries()].sort((a, b) => b[1] - a[1])[0]?.[0] || "";
}

function compactText(value, limit = 70) {
  const text = String(value || "").replace(/\s+/g, " ").trim();
  return text.length > limit ? `${text.slice(0, limit)}...` : text;
}

function generateLearningReport() {
  const student = students.find((item) => item.id === selectedId);
  if (!student) {
    alert("먼저 학생을 선택해주세요.");
    return;
  }

  const period = $("learningReportPeriod")?.value || "month";
  setLearningReportRange(period);
  const start = $("learningReportStart")?.value || currentMonthRange().start;
  const end = $("learningReportEnd")?.value || currentMonthRange().end;
  const records = recordsForLearningReport(student, start, end);
  const subjectNames = formatSubjectNames(student).join(", ") || "수강 과목 미기재";
  const name = student.studentName || "학생";
  const grade = student.grade || "";

  if (!records.length) {
    $("learningReportText").value = `${name} ${grade} 학습리포트\n기간: ${start} ~ ${end}\n수강 과목: ${subjectNames}\n\n해당 기간에 저장된 학습 피드백 기록이 없습니다.\n수업 후 교재/단원, 이해도, 태도, 과제를 기록하면 이곳에서 학부모님께 보낼 리포트 초안을 만들 수 있습니다.`;
    return;
  }

  const subjectMap = new Map();
  records.forEach((record) => {
    const subject = record.subject || "과목 미기재";
    if (!subjectMap.has(subject)) subjectMap.set(subject, []);
    subjectMap.get(subject).push(record);
  });

  const subjectSummary = [...subjectMap.entries()].map(([subject, subjectRecords]) => {
    const units = [...new Set(subjectRecords.map((record) => record.unit).filter(Boolean))].slice(0, 4);
    const homework = [...new Set(subjectRecords.map((record) => record.homework).filter(Boolean))].slice(0, 3);
    const understanding = mostCommonValue(subjectRecords, "understanding") || "확인 중";
    const attitude = mostCommonValue(subjectRecords, "attitude") || "확인 중";
    return `- ${subject}: ${subjectRecords.length}회 기록 / ${units.length ? `진도 ${units.join(", ")}` : "진도 기록 없음"} / 이해도 ${understanding} / 태도 ${attitude}${homework.length ? ` / 과제 ${homework.join(", ")}` : ""}`;
  }).join("\n");

  const recentNotes = records
    .slice(-4)
    .map((record) => `- ${record.date}: ${compactText(record.text || record.unit || "학습 내용 기록")}`)
    .join("\n");
  const mainUnderstanding = mostCommonValue(records, "understanding") || "확인 중";
  const mainAttitude = mostCommonValue(records, "attitude") || "확인 중";

  $("learningReportText").value = `${name} ${grade} 학습리포트\n기간: ${start} ~ ${end}\n수강 과목: ${subjectNames}\n\n[학습 요약]\n${subjectSummary}\n\n[최근 학습 흐름]\n${recentNotes}\n\n[종합 의견]\n${name} 학생은 해당 기간 동안 총 ${records.length}개의 학습기록이 저장되었습니다. 전반적인 이해도는 ${mainUnderstanding}, 수업 태도는 ${mainAttitude}로 확인됩니다. 저장된 기록을 바탕으로 부족한 부분은 다음 수업에서 이어서 점검하고, 안정적으로 진행되는 부분은 난이도를 조금씩 높여가겠습니다.\n\n[다음 학습 방향]\n다음 수업에서는 최근 기록된 교재와 단원을 기준으로 복습이 필요한 부분을 먼저 확인한 뒤, 새로운 진도를 이어가겠습니다.`;
}

function copyLearningReport() {
  const text = $("learningReportText")?.value.trim();
  if (!text) {
    alert("복사할 학습리포트가 없습니다.");
    return;
  }
  if (navigator.clipboard?.writeText) {
    navigator.clipboard.writeText(text).then(() => alert("학습리포트를 복사했습니다."));
    return;
  }
  $("learningReportText").select();
  document.execCommand("copy");
  alert("학습리포트를 복사했습니다.");
}

function reportTextToHtml(text) {
  const lines = String(text || "").split("\n");
  const title = lines.shift() || "학습리포트";
  const body = lines.map((line) => {
    const trimmed = line.trim();
    if (!trimmed) return `<div class="report-space"></div>`;
    if (/^\[.+\]$/.test(trimmed)) return `<h4>${escapeHtml(trimmed.replace(/^\[|\]$/g, ""))}</h4>`;
    if (trimmed.startsWith("- ")) return `<p class="report-bullet">${escapeHtml(trimmed.slice(2))}</p>`;
    return `<p>${escapeHtml(trimmed)}</p>`;
  }).join("");
  return `
    <article class="report-preview-card">
      <header>
        <strong>미래엔 에듀 영수학원</strong>
        <h3>${escapeHtml(title)}</h3>
      </header>
      <div>${body}</div>
    </article>
  `;
}

function renderLearningReportPreview() {
  const preview = $("learningReportPreview");
  if (!preview) return;
  const text = $("learningReportText")?.value.trim();
  if (!text) {
    preview.innerHTML = `<p class="empty-feedback">미리볼 학습리포트가 없습니다.</p>`;
    return;
  }
  preview.innerHTML = reportTextToHtml(text);
}

function previewLearningReport() {
  if (!$("learningReportText")?.value.trim()) generateLearningReport();
  renderLearningReportPreview();
}

function printLearningReport() {
  if (!$("learningReportText")?.value.trim()) generateLearningReport();
  const text = $("learningReportText")?.value.trim();
  if (!text) {
    alert("프린트할 학습리포트가 없습니다.");
    return;
  }
  renderLearningReportPreview();
  const printWindow = window.open("", "_blank", "width=820,height=900");
  if (!printWindow) {
    alert("프린트 창을 열 수 없습니다. 브라우저 팝업 허용을 확인해주세요.");
    return;
  }
  printWindow.document.write(`
    <!doctype html>
    <html lang="ko">
      <head>
        <meta charset="utf-8" />
        <title>학습리포트</title>
        <style>
          body { margin: 0; padding: 28px; font-family: "Malgun Gothic", Arial, sans-serif; color: #17201a; background: #fff; }
          .report-preview-card { max-width: 760px; margin: 0 auto; border: 1px solid #dfe7df; border-radius: 8px; padding: 28px; }
          header { border-bottom: 2px solid #1f6b45; padding-bottom: 14px; margin-bottom: 18px; }
          header strong { color: #1f6b45; font-size: 14px; }
          h3 { margin: 8px 0 0; font-size: 24px; }
          h4 { margin: 18px 0 8px; font-size: 16px; color: #1f6b45; }
          p { margin: 7px 0; font-size: 14px; line-height: 1.7; }
          .report-bullet { padding-left: 12px; border-left: 3px solid #dfe7df; }
          .report-space { height: 8px; }
        </style>
      </head>
      <body>${reportTextToHtml(text)}</body>
    </html>
  `);
  printWindow.document.close();
  printWindow.focus();
  setTimeout(() => printWindow.print(), 300);
}

function readFeedbackPhoto(file) {
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    const image = new Image();
    image.onload = () => {
      const maxSide = 1200;
      const scale = Math.min(1, maxSide / Math.max(image.width, image.height));
      const canvas = document.createElement("canvas");
      canvas.width = Math.max(1, Math.round(image.width * scale));
      canvas.height = Math.max(1, Math.round(image.height * scale));
      const context = canvas.getContext("2d");
      context.drawImage(image, 0, 0, canvas.width, canvas.height);
      feedbackPhotoData = canvas.toDataURL("image/jpeg", 0.82);
      feedbackPhotoName = file.name;
      renderFeedbackPreview();
    };
    image.onerror = () => {
      feedbackPhotoData = String(reader.result || "");
      feedbackPhotoName = file.name;
      renderFeedbackPreview();
    };
    image.src = String(reader.result || "");
  };
  reader.readAsDataURL(file);
}

function bindEvents() {
  $("homeButton")?.addEventListener("click", () => switchView("dashboard"));
  $("loginBtn")?.addEventListener("click", login);
  $("loginPassword")?.addEventListener("keydown", (event) => {
    if (event.key === "Enter") login();
  });
  $("logoutBtn")?.addEventListener("click", logout);
  $("studentForm").addEventListener("submit", upsertStudent);
  $("newStudentBtn").addEventListener("click", () => {
    if (activeView === "payments") {
      document.querySelector(".payment-entry-panel")?.setAttribute("open", "");
      $("payStudentName")?.focus();
      return;
    }
    switchView("students");
    resetForm();
    switchStudentTab("profile");
    $("studentName").focus();
  });
  $("resetBtn").addEventListener("click", resetForm);
  $("leaveBtn").addEventListener("click", withdrawSelected);
  $("addParentContactBtn").addEventListener("click", addParentContactField);
  $("addCourseHistoryBtn")?.addEventListener("click", addCourseHistoryRecord);
  $("clearCourseHistoryBtn")?.addEventListener("click", clearCourseHistoryEditor);
  $("saveLearningBtn").addEventListener("click", saveLearningDetails);
  $("saveLearningBtnBottom").addEventListener("click", saveLearningDetails);
  $("saveFeedbackBtn").addEventListener("click", saveFeedbackRecord);
  $("recommendFeedbackBtn").addEventListener("click", recommendFeedbackText);
  $("feedbackPhoto").addEventListener("change", (event) => readFeedbackPhoto(event.target.files[0]));
  $("generateLearningReportBtn")?.addEventListener("click", () => {
    generateLearningReport();
    renderLearningReportPreview();
  });
  $("previewLearningReportBtn")?.addEventListener("click", previewLearningReport);
  $("printLearningReportBtn")?.addEventListener("click", printLearningReport);
  $("copyLearningReportBtn")?.addEventListener("click", copyLearningReport);
  $("learningReportPeriod")?.addEventListener("change", (event) => setLearningReportRange(event.target.value));
  $("exportPaymentBackupBtn").addEventListener("click", exportPaymentBackup);
  $("importPaymentBackupBtn").addEventListener("click", () => $("paymentBackupFile").click());
  $("exportPaymentLedgerBtn").addEventListener("click", exportPaymentLedger);
  $("showPaymentLedgerBtn").addEventListener("click", showPaymentLedger);
  $("closePaymentLedgerBtn").addEventListener("click", hidePaymentLedger);
  $("paymentBackupFile").addEventListener("change", (event) => importPaymentBackup(event.target.files[0]));
  $("deleteSelectedPaymentsBtn").addEventListener("click", deleteSelectedPaymentRecords);
  $("saveStandalonePaymentBtn").addEventListener("click", saveStandalonePayment);
  $("exportAllBackupBtn")?.addEventListener("click", exportAllBackup);
  $("importAllBackupBtn")?.addEventListener("click", () => $("allBackupFile")?.click());
  $("allBackupFile")?.addEventListener("change", (event) => importAllBackup(event.target.files[0]));
  $("archiveMonthFilter")?.addEventListener("input", renderArchive);
  $("exportMonthlyCloseBtn")?.addEventListener("click", exportMonthlyClose);
  $("roleModeSelect")?.addEventListener("change", (event) => changeRoleMode(event.target.value));
  $("saveStaffAccountBtn")?.addEventListener("click", saveStaffAccount);
  $("clearStaffAccountBtn")?.addEventListener("click", clearStaffAccountForm);
  $("staffStartBtn")?.addEventListener("click", () => clockStaff("start"));
  $("staffEndBtn")?.addEventListener("click", () => clockStaff("end"));
  ["staffMonthFilter", "staffSearchInput"].forEach((id) => {
    $(id)?.addEventListener("input", renderStaffManagement);
  });
  $("staffAccountList")?.addEventListener("click", (event) => {
    const editButton = event.target.closest("[data-staff-edit]");
    const deleteButton = event.target.closest("[data-staff-delete]");
    if (editButton) editStaffAccount(editButton.dataset.staffEdit);
    if (deleteButton) deleteStaffAccount(deleteButton.dataset.staffDelete);
  });
  $("saveKakaoSettingsBtn")?.addEventListener("click", saveKakaoSettings);
  $("resetKakaoPreviewBtn")?.addEventListener("click", resetKakaoPreviewMessages);
  $("clearKakaoLogsBtn")?.addEventListener("click", clearKakaoLogs);
  ["kakaoMonthFilter", "kakaoSearchInput"].forEach((id) => {
    $(id)?.addEventListener("input", renderKakaoLogs);
  });
  $("financeType")?.addEventListener("change", renderFinanceCategoryOptions);
  $("saveFinanceBtn")?.addEventListener("click", saveFinanceRecord);
  $("clearFinanceBtn")?.addEventListener("click", clearFinanceForm);
  $("saveFixedExpenseBtn")?.addEventListener("click", saveFixedExpenseTemplate);
  $("clearFixedExpenseBtn")?.addEventListener("click", clearFixedExpenseForm);
  $("applyFixedExpensesBtn")?.addEventListener("click", applyFixedExpensesForMonth);
  ["financeMonthFilter", "financeTypeFilter", "financeSearchInput"].forEach((id) => {
    $(id)?.addEventListener("input", renderFinanceOverview);
  });
  $("saveTuitionRateBtn")?.addEventListener("click", saveTuitionRate);
  $("clearTuitionRateBtn")?.addEventListener("click", clearTuitionRateForm);
  $("saveBookFeeRateBtn")?.addEventListener("click", saveBookFeeRate);
  $("clearBookFeeRateBtn")?.addEventListener("click", clearBookFeeRateForm);
  $("saveBookBtn")?.addEventListener("click", saveBook);
  $("clearBookBtn")?.addEventListener("click", clearBookForm);
  $("saveBookStockBtn")?.addEventListener("click", saveBookStockRecord);
  $("clearBookStockBtn")?.addEventListener("click", clearBookStockForm);
  $("bookStockBook")?.addEventListener("change", () => updateBookStockUnitPrice(true));
  $("bookStockType")?.addEventListener("change", () => updateBookStockUnitPrice(true));
  ["bookSubjectFilter", "bookSearchInput"].forEach((id) => {
    $(id)?.addEventListener("input", renderBooksOverview);
  });
  [
    "weeklySubjectSchedule",
    "payPaymentName",
    "feedbackUnit",
    "currentBooks",
    "completedBooks",
    "bookTitle",
  ].forEach((id) => {
    $(id)?.addEventListener("blur", (event) => normalizeKoreanCourseInput(event.target));
  });
  $("activeStudentsCard").addEventListener("click", openActiveStudents);
  $("gradeSummaryAllButton")?.addEventListener("click", openAllActiveStudentsFromSummary);
  $("monthlyNewCard").addEventListener("click", openMonthlyNewStudents);
  $("monthlyNewSubjectCard")?.addEventListener("click", openMonthlyNewSubjects);
  $("todayAbsentCard").addEventListener("click", openTodayAbsentAttendance);
  $("pausedStudentsCard").addEventListener("click", openPausedStudents);
  $("waitingStudentsCard").addEventListener("click", openWaitingStudents);
  $("monthlyUnpaidCard").addEventListener("click", openCurrentMonthUnpaidPayments);
  $("monthlyRevenueButton").addEventListener("click", openCurrentMonthPaidPayments);
  $("todayAttendanceCard").addEventListener("click", openTodayScheduledAttendance);
  ["payTuition", "payDiscount", "payPaidAmount", "payStatus"].forEach((id) => {
    $(id)?.addEventListener("input", updateStandalonePaymentTotals);
    $(id)?.addEventListener("change", updateStandalonePaymentTotals);
  });
  $("payPaymentMethod")?.addEventListener("change", syncStandaloneCashReceiptField);
  $("payStudentName").addEventListener("change", applyStudentToPaymentEntry);
  $("payStudentName").addEventListener("blur", applyStudentToPaymentEntry);
  $("saveNoticeBtn").addEventListener("click", saveNotice);
  $("clearNoticeBtn")?.addEventListener("click", clearNoticeEditor);
  bindBookFeeEditorEvents(document);
  syncStandaloneCashReceiptField();
  updateStandalonePaymentTotals();
  document.querySelectorAll("input[name='subjects']").forEach((check) => {
    check.addEventListener("change", () => {
      toggleGongpilSubjects();
      syncFeedbackSubjectOptions();
    });
  });
  document.querySelectorAll("input[name='gongpilSubjects']").forEach((check) => {
    check.addEventListener("change", syncFeedbackSubjectOptions);
  });
  document.querySelectorAll("[data-student-tab]").forEach((button) => {
    button.addEventListener("click", () => switchStudentTab(button.dataset.studentTab));
  });
  document.querySelectorAll(".side-nav button[data-view]").forEach((button) => {
    button.addEventListener("click", () => {
      if (button.dataset.view === "students") {
        studentListMode = "all";
        clearStudentListFilters();
        clearStudentDetail();
      }
      if (button.dataset.view === "attendance") {
        attendanceTodayOnly = false;
        attendanceListMode = "all";
      }
      if (button.dataset.view === "payments") {
        resetPaymentOverviewFilters();
      }
      switchView(button.dataset.view);
      if (button.dataset.view === "attendance") renderAttendanceOverview();
      if (button.dataset.view === "checkin") renderCheckinScreen();
    });
  });
  ["searchInput", "gradeFilter", "subjectFilter"].forEach((id) => {
    $(id).addEventListener("input", () => {
      studentSummaryGrade = "";
      renderRows();
    });
  });
  ["paymentMonthFilter", "paymentStatusFilter", "paymentSearchInput"].forEach((id) => {
    $(id).addEventListener("input", renderPaymentOverview);
  });
  ["ledgerMonthFilter", "ledgerSearchInput"].forEach((id) => {
    $(id).addEventListener("input", renderPaymentLedger);
  });
  $("attendanceMonthFilter").addEventListener("input", () => {
    attendanceTodayOnly = false;
    attendanceListMode = "all";
    selectedAttendanceDate = `${$("attendanceMonthFilter").value || currentMonthText()}-01`;
    expandedAttendanceId = "";
    renderAttendanceOverview();
  });
  $("attendanceSearchInput").addEventListener("input", () => {
    renderAttendanceOverview();
  });
  $("checkinCodeInput")?.addEventListener("input", (event) => {
    checkinCodeValue = event.target.value.replace(/\D/g, "").slice(0, 8);
    checkinResultMessage = "";
    checkinResultTone = "";
    renderCheckinScreen();
    scheduleAutoCheckin();
  });
  $("checkinCodeInput")?.addEventListener("keydown", (event) => {
    if (event.key === "Enter") submitTabletCheckin();
  });
  document.querySelectorAll("[data-checkin-key]").forEach((button) => {
    button.addEventListener("click", () => {
      if (checkinCodeValue.length >= 8) return;
      checkinCodeValue = `${checkinCodeValue}${button.dataset.checkinKey}`.slice(0, 8);
      checkinResultMessage = "";
      checkinResultTone = "";
      renderCheckinScreen();
      scheduleAutoCheckin();
      $("checkinCodeInput")?.focus();
    });
  });
  $("checkinBackspaceBtn")?.addEventListener("click", () => {
    clearTimeout(checkinAutoTimer);
    checkinCodeValue = checkinCodeValue.slice(0, -1);
    checkinResultMessage = "";
    checkinResultTone = "";
    renderCheckinScreen();
    $("checkinCodeInput")?.focus();
  });
  $("checkinClearBtn")?.addEventListener("click", () => {
    clearTimeout(checkinAutoTimer);
    clearCheckinCode();
    checkinResultMessage = "";
    checkinResultTone = "";
    renderCheckinScreen();
    $("checkinCodeInput")?.focus();
  });
  $("checkinSubmitBtn")?.addEventListener("click", submitTabletCheckin);
  $("checkinArriveMode")?.addEventListener("click", () => {
    checkinMode = "arrive";
    checkinResultMessage = "";
    checkinResultTone = "";
    renderCheckinScreen();
  });
  $("checkinLeaveMode")?.addEventListener("click", () => {
    checkinMode = "leave";
    checkinResultMessage = "";
    checkinResultTone = "";
    renderCheckinScreen();
  });
  $("checkinMatchedStudent")?.addEventListener("click", (event) => {
    const studentButton = event.target.closest("[data-checkin-student]");
    const allButton = event.target.closest("[data-checkin-all]");
    if (studentButton) recordTabletCheckin(studentButton.dataset.checkinStudent);
    if (allButton) recordTabletCheckin(checkinMatches().map((student) => student.id));
  });
  $("learningSearchInput").addEventListener("input", renderLearningOverview);
}

initOptions();
bindEvents();
cleanupDuplicatePaymentRecords();
runAutoAbsenceCheck();
renderAll();
switchView(activeView);
clearStudentDetail();
applyUserSession();
setInterval(renderStats, 30000);
setInterval(updateCheckinClock, 30000);
setInterval(runAutoAbsenceCheck, 60000);
