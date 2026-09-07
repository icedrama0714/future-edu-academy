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

function prepaymentScheduleItemsForMonth(account, month) {
  return (account.schedule || []).filter((item) => (
    item.fromMonth <= month && (!item.toMonth || month <= item.toMonth)
  ));
}

function prepaymentChargeForMonth(account, month) {
  return prepaymentScheduleItemsForMonth(account, month)
    .reduce((sum, item) => sum + Number(item.monthlyAmount || 0), 0);
}

function prepaymentScheduleLabel(account, month) {
  return prepaymentScheduleItemsForMonth(account, month)
    .map((item) => item.label)
    .filter(Boolean)
    .join(" + ") || "교육비";
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

function prepaymentStudentOptions() {
  return students
    .filter((student) => isCountedStudent(student))
    .slice()
    .sort((a, b) => String(a.studentName || "").localeCompare(String(b.studentName || ""), "ko"))
    .map((student) => `
      <option value="${escapeHtml(student.id)}">
        ${escapeHtml([student.studentName, student.school, student.grade].filter(Boolean).join(" · "))}
      </option>
    `).join("");
}

function prepaymentScheduleRow(index, required = false) {
  return `
    <fieldset class="prepayment-schedule-row">
      <legend>차감 구간 ${index}${required ? " (필수)" : " (선택)"}</legend>
      <label>수업/과목명<input id="prepaymentLabel${index}" type="text" placeholder="예: 수학 또는 문해력"></label>
      <label>시작월<input id="prepaymentFromMonth${index}" type="month" ${required ? "required" : ""}></label>
      <label>종료월<input id="prepaymentToMonth${index}" type="month"></label>
      <label>월 차감액<input id="prepaymentMonthlyAmount${index}" type="number" min="0" step="1000" placeholder="190000" ${required ? "required" : ""}></label>
    </fieldset>
  `;
}

function prepaymentScheduleFromForm(index) {
  const label = document.getElementById(`prepaymentLabel${index}`)?.value.trim() || "";
  const fromMonth = document.getElementById(`prepaymentFromMonth${index}`)?.value || "";
  const toMonth = document.getElementById(`prepaymentToMonth${index}`)?.value || "";
  const monthlyAmount = Number(document.getElementById(`prepaymentMonthlyAmount${index}`)?.value || 0);
  if (!label && !fromMonth && !toMonth && !monthlyAmount) return null;
  if (!fromMonth || monthlyAmount <= 0) return { invalid: true };
  if (toMonth && toMonth < fromMonth) return { invalid: true };
  return { label: label || "교육비", fromMonth, toMonth, monthlyAmount };
}

function savePrepaymentFromForm(event) {
  event.preventDefault();
  const studentId = document.getElementById("prepaymentStudentId")?.value || "";
  const student = students.find((item) => item.id === studentId);
  const paymentDate = document.getElementById("prepaymentPaymentDate")?.value || "";
  const paymentMethod = document.getElementById("prepaymentPaymentMethod")?.value || "";
  const originalAmount = Number(document.getElementById("prepaymentOriginalAmount")?.value || 0);
  const startMonth = document.getElementById("prepaymentStartMonth")?.value || "";
  const memo = document.getElementById("prepaymentMemo")?.value.trim() || "";
  const schedule = [prepaymentScheduleFromForm(1), prepaymentScheduleFromForm(2)].filter(Boolean);

  if (!student || !paymentDate || !paymentMethod || originalAmount <= 0 || !startMonth) {
    window.alert("학생, 결제일, 결제수단, 선납 원금, 적용 시작월을 모두 입력해주세요.");
    return;
  }
  if (!schedule.length || schedule.some((item) => item.invalid)) {
    window.alert("차감 구간의 시작월과 월 차감액을 확인해주세요.");
    return;
  }
  if (schedule.some((item) => item.fromMonth < startMonth)) {
    window.alert("차감 구간의 시작월은 선납 적용 시작월보다 빠를 수 없습니다.");
    return;
  }
  const duplicate = prepaymentAccounts.some((account) => (
    account.studentId === student.id && account.paymentDate === paymentDate && Number(account.originalAmount) === originalAmount
  ));
  if (duplicate) {
    window.alert("같은 학생의 동일한 선납 내역이 이미 등록되어 있습니다.");
    return;
  }

  prepaymentAccounts.push({
    id: `prepayment-${Date.now()}`,
    studentId: student.id,
    studentName: student.studentName,
    school: student.school || "",
    grade: student.grade || "",
    paymentDate,
    paymentMethod,
    originalAmount,
    startMonth,
    active: true,
    memo,
    schedule,
  });
  savePrepaymentAccounts();
  addChangeLog("납부관리", "선납금 등록", `${student.studentName} · ${compactDate(paymentDate)} · ${money(originalAmount)}`);
  renderAll();
}

function deletePrepaymentAccount(id) {
  const account = prepaymentAccounts.find((item) => item.id === id);
  if (!account || !window.confirm(`${account.studentName} 학생의 선납금 기록을 삭제할까요?`)) return;
  prepaymentAccounts = prepaymentAccounts.filter((item) => item.id !== id);
  savePrepaymentAccounts();
  addChangeLog("납부관리", "선납금 삭제", `${account.studentName} · ${compactDate(account.paymentDate)}`);
  renderAll();
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
    <details class="prepayment-entry">
      <summary>선납금 등록하기</summary>
      <form id="prepaymentEntryForm">
        <div class="prepayment-form-grid">
          <label>학생
            <select id="prepaymentStudentId" required>
              <option value="">학생 선택</option>
              ${prepaymentStudentOptions()}
            </select>
          </label>
          <label>결제일<input id="prepaymentPaymentDate" type="date" required></label>
          <label>결제수단
            <select id="prepaymentPaymentMethod" required>
              <option value="">결제수단 선택</option>
              <option>카드결제</option>
              <option>제로페이</option>
              <option>계좌이체</option>
              <option>현금</option>
              <option>기타</option>
            </select>
          </label>
          <label>선납 원금<input id="prepaymentOriginalAmount" type="number" min="1" step="1000" required></label>
          <label>적용 시작월<input id="prepaymentStartMonth" type="month" required></label>
        </div>
        <div class="prepayment-schedule-list">
          ${prepaymentScheduleRow(1, true)}
          ${prepaymentScheduleRow(2)}
        </div>
        <label class="prepayment-memo">메모<textarea id="prepaymentMemo" rows="3" placeholder="결제 구성이나 과목 변경 내용을 기록하세요."></textarea></label>
        <div class="prepayment-form-actions">
          <small>이 기록은 현재 브라우저에만 비공개로 저장됩니다.</small>
          <button class="primary" type="submit">선납금 저장</button>
        </div>
      </form>
    </details>
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
            <div class="prepayment-card-actions">
              <span>${escapeHtml(compactDate(account.paymentDate))} ${escapeHtml(account.paymentMethod || "")}</span>
              <button type="button" class="ghost danger" data-prepayment-delete="${escapeHtml(account.id)}">삭제</button>
            </div>
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
  document.getElementById("prepaymentEntryForm")?.addEventListener("submit", savePrepaymentFromForm);
  panel.querySelectorAll("[data-prepayment-delete]").forEach((button) => {
    button.addEventListener("click", () => deletePrepaymentAccount(button.dataset.prepaymentDelete));
  });
}

let prepaymentAccounts = loadPrepaymentAccounts();

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
