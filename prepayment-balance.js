// Tracks advance tuition as a balance so course-price changes do not rewrite the original payment.
const PREPAYMENT_STORAGE_KEY = "literacy_academy_prepayment_accounts_v1";

function loadPrepaymentAccounts() {
  try {
    const parsed = JSON.parse(localStorage.getItem(PREPAYMENT_STORAGE_KEY) || "[]");
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function savePrepaymentAccounts() {
  localStorage.setItem(PREPAYMENT_STORAGE_KEY, JSON.stringify(prepaymentAccounts));
}

function prepaymentMonthShift(month, offset) {
  if (!/^\d{4}-\d{2}$/.test(String(month))) return "";
  const [year, monthNumber] = month.split("-").map(Number);
  const shifted = new Date(year, monthNumber - 1 + Number(offset || 0), 1);
  return `${shifted.getFullYear()}-${String(shifted.getMonth() + 1).padStart(2, "0")}`;
}

function prepaymentChargeForMonth(account, month) {
  const schedule = (account.schedule || []).find((item) => (
    item.fromMonth <= month && (!item.toMonth || month <= item.toMonth)
  ));
  return Number(schedule?.monthlyAmount || 0);
}

function prepaymentScheduleLabel(account, month) {
  return (account.schedule || []).find((item) => (
    item.fromMonth <= month && (!item.toMonth || month <= item.toMonth)
  ))?.label || "교육비";
}

function prepaymentUsageRows(account, throughMonth = currentMonthText()) {
  const rows = [];
  let remaining = Number(account.originalAmount || 0);
  let month = account.startMonth;
  let guard = 0;
  while (month && month <= throughMonth && remaining > 0 && guard < 120) {
    const monthlyCharge = prepaymentChargeForMonth(account, month);
    if (monthlyCharge > 0) {
      const usedAmount = Math.min(remaining, monthlyCharge);
      remaining -= usedAmount;
      rows.push({
        month,
        chargedAmount: monthlyCharge,
        usedAmount,
        remainingAmount: remaining,
        label: prepaymentScheduleLabel(account, month),
      });
    }
    month = prepaymentMonthShift(month, 1);
    guard += 1;
  }
  return rows;
}

function prepaymentUsedThrough(account, month = currentMonthText()) {
  return prepaymentUsageRows(account, month).reduce((sum, row) => sum + row.usedAmount, 0);
}

function prepaymentBalanceThrough(account, month = currentMonthText()) {
  return Math.max(0, Number(account.originalAmount || 0) - prepaymentUsedThrough(account, month));
}

function prepaymentBalanceAtMonthStart(account, month) {
  return prepaymentBalanceThrough(account, prepaymentMonthShift(month, -1));
}

function prepaymentAccountForStudent(student = {}) {
  return prepaymentAccounts.find((account) => (
    account.active !== false && (
      (account.studentId && student.id && account.studentId === student.id) ||
      (
        canonicalStudentName(account.studentName) === canonicalStudentName(student.studentName) &&
        (!account.school || String(student.school || "").includes(account.school))
      )
    )
  )) || null;
}

function prepaymentAccountForRecord(record = {}) {
  const student = students.find((item) => item.id === record.studentId)
    || students.find((item) => (
      canonicalStudentName(item.studentName) === canonicalStudentName(record.studentName) &&
      (!record.school || item.school === record.school)
    ));
  return prepaymentAccountForStudent(student || record);
}

function prepaymentCoversOnlyTuition(record = {}) {
  const text = `${record.paymentType || ""} ${record.paymentName || ""} ${record.memo || ""}`;
  return !/교재|교재비|책/.test(text);
}

function applyPrepaymentToUpcomingRecord(record) {
  if (!prepaymentCoversOnlyTuition(record)) return record;
  const account = prepaymentAccountForRecord(record);
  if (!account) return record;
  const sourceMonth = typeof carryoverSourceMonth === "function" ? carryoverSourceMonth(record) : "";
  const month = sourceMonth || recordMonthText(record);
  const monthlyCharge = prepaymentChargeForMonth(account, month);
  if (monthlyCharge <= 0) return record;
  const available = prepaymentBalanceAtMonthStart(account, month);
  const applied = Math.min(available, monthlyCharge);
  if (applied >= monthlyCharge) return null;
  if (applied <= 0) return record;
  const shortfall = monthlyCharge - applied;
  return {
    ...record,
    baseTuition: shortfall,
    tuition: shortfall,
    paidAmount: 0,
    unpaidAmount: shortfall,
    paymentName: `선납금 ${money(applied)} 적용 · ${record.paymentName || "교육비"}`,
    memo: `${record.memo || ""}\n선납금 부족분 자동계산`.trim(),
  };
}

function seedAnSeoheePrepayment() {
  const existing = prepaymentAccounts.some((account) => (
    canonicalStudentName(account.studentName) === "안서희" && String(account.school || "").includes("분성중")
  ));
  if (!existing) {
    const student = students.find((item) => (
      canonicalStudentName(item.studentName) === "안서희" && String(item.school || "").includes("분성중")
    ));
    prepaymentAccounts.push({
      id: "prepayment-an-seohee-20260225",
      studentId: student?.id || "",
      studentName: "안서희",
      school: "분성중",
      grade: student?.grade || "중2",
      paymentDate: "2026-02-25",
      paymentMethod: "카드결제",
      originalAmount: 10560000,
      startMonth: "2026-03",
      active: true,
      memo: "3월분 교육비 납부일에 1년치 선납. 과목 변경 후 환불 없이 잔액에서 계속 차감.",
      schedule: [
        {
          fromMonth: "2026-03",
          toMonth: "2026-06",
          monthlyAmount: 880000,
          label: "중등 수학 23만 + 중등 영어 23만 + 공필왕 국어·세계사·과학 각 8만 + 문해력 18만",
        },
        {
          fromMonth: "2026-07",
          toMonth: "",
          monthlyAmount: 460000,
          label: "중등 수학 23만 + 중등 영어 23만",
        },
      ],
    });
    savePrepaymentAccounts();
    addChangeLog("납부관리", "선납금 등록", "안서희 · 2026-02-25 카드결제 · 10,560,000원");
  }

  const student = students.find((item) => (
    canonicalStudentName(item.studentName) === "안서희" && String(item.school || "").includes("분성중")
  ));
  if (student && recurringPaymentCycleDayForStudent(student) !== 25) {
    student.paymentCycleDay = 25;
    student.paymentDueDate = recurringPaymentDueDate(student);
    saveStudents();
  }
}

function ensurePrepaymentPanel() {
  if (document.getElementById("prepaymentBalancePanel")) return;
  const paymentOverview = document.getElementById("paymentOverview");
  if (!paymentOverview) return;
  const panel = document.createElement("section");
  panel.id = "prepaymentBalancePanel";
  panel.className = "prepayment-panel";
  panel.setAttribute("aria-label", "선납금 잔액");
  paymentOverview.before(panel);
}

function renderPrepaymentPanel() {
  ensurePrepaymentPanel();
  const panel = document.getElementById("prepaymentBalancePanel");
  if (!panel) return;
  const activeAccounts = prepaymentAccounts.filter((account) => account.active !== false);
  panel.innerHTML = `
    <div class="prepayment-panel-head">
      <div>
        <p class="eyebrow">선납 관리</p>
        <h3>선납금 잔액</h3>
      </div>
      <span class="prepayment-note">교재비 등 별도 비용은 차감하지 않음</span>
    </div>
    ${activeAccounts.length ? activeAccounts.map((account) => {
      const rows = prepaymentUsageRows(account);
      const usedAmount = rows.reduce((sum, row) => sum + row.usedAmount, 0);
      const balance = Math.max(0, Number(account.originalAmount || 0) - usedAmount);
      return `
        <article class="prepayment-card">
          <div class="prepayment-card-title">
            <div>
              <strong>${escapeHtml(account.studentName)}</strong>
              <span>${escapeHtml([account.school, account.grade].filter(Boolean).join(" "))}</span>
            </div>
            <span>${escapeHtml(compactDate(account.paymentDate))} ${escapeHtml(account.paymentMethod || "")}</span>
          </div>
          <div class="prepayment-summary">
            <div><span>선납 원금</span><strong>${money(account.originalAmount)}</strong></div>
            <div><span>${Number(currentMonthText().slice(5, 7))}월까지 사용</span><strong>${money(usedAmount)}</strong></div>
            <div class="balance"><span>남은 선납금</span><strong>${money(balance)}</strong></div>
          </div>
          <details class="prepayment-history">
            <summary>월별 차감 ${rows.length}건 보기</summary>
            <div class="prepayment-history-table">
              ${rows.map((row) => `
                <div>
                  <span>${escapeHtml(row.month)}</span>
                  <span>${escapeHtml(row.label)}</span>
                  <strong>-${money(row.usedAmount)}</strong>
                  <b>${money(row.remainingAmount)}</b>
                </div>
              `).join("")}
            </div>
          </details>
          <p>${escapeHtml(account.memo || "")}</p>
        </article>
      `;
    }).join("") : `<p class="empty-feedback">등록된 선납금이 없습니다.</p>`}
  `;
}

let prepaymentAccounts = loadPrepaymentAccounts();
seedAnSeoheePrepayment();

const prepaymentOriginalUpcomingRecords = upcomingPaymentRecords;
upcomingPaymentRecords = function () {
  return prepaymentOriginalUpcomingRecords()
    .map(applyPrepaymentToUpcomingRecord)
    .filter(Boolean);
};

const prepaymentOriginalRenderAll = renderAll;
renderAll = function () {
  prepaymentOriginalRenderAll();
  renderPrepaymentPanel();
};

renderAll();
