// Keeps student-specific discount and fee-waiver promises visible over time.
const BENEFIT_TYPES = ["지인소개 3만원 할인", "형제 3만원 할인", "교재비 면제", "기타 혜택"];
const BENEFIT_APPLICATIONS = ["1회", "기간 지정", "조건 유지 중"];
const BENEFIT_STATUSES = ["적용 예정", "적용 중", "적용 완료", "종료"];
const BENEFIT_DEFAULTS = {
  "지인소개 3만원 할인": { target: "교육비", amount: 30000, application: "1회", status: "적용 예정" },
  "형제 3만원 할인": { target: "교육비", amount: 30000, application: "1회", status: "적용 예정" },
  "교재비 면제": { target: "교재비", amount: 0, application: "조건 유지 중", status: "적용 중" },
  "기타 혜택": { target: "기타", amount: 0, application: "1회", status: "적용 예정" },
};

function benefitTodayText() {
  return typeof currentDateText === "function"
    ? currentDateText()
    : new Date().toISOString().slice(0, 10);
}

function normalizeBenefitRecord(record = {}) {
  const type = BENEFIT_TYPES.includes(record.type) ? record.type : "기타 혜택";
  const defaults = BENEFIT_DEFAULTS[type];
  const application = BENEFIT_APPLICATIONS.includes(record.application)
    ? record.application
    : defaults.application;
  return {
    id: record.id || createId(),
    promisedAt: String(record.promisedAt || record.startDate || benefitTodayText()),
    type,
    target: String(record.target || defaults.target),
    amount: Math.max(0, Number(record.amount ?? defaults.amount) || 0),
    application,
    endDate: String(record.endDate || ""),
    condition: String(record.condition || ""),
    memo: String(record.memo || ""),
    status: BENEFIT_STATUSES.includes(record.status) ? record.status : defaults.status,
  };
}

function normalizeBenefitRecords(records) {
  const byId = new Map();
  (Array.isArray(records) ? records : []).forEach((record) => {
    const normalized = normalizeBenefitRecord(record);
    byId.set(normalized.id, normalized);
  });
  return [...byId.values()].sort((a, b) => (b.promisedAt || "").localeCompare(a.promisedAt || ""));
}

function benefitRecordIsCurrent(record, today = benefitTodayText()) {
  if (["적용 완료", "종료"].includes(record.status)) return false;
  return !record.endDate || record.endDate >= today;
}

function benefitAmountLabel(record) {
  if (record.type === "교재비 면제") return "교재비 면제";
  return record.amount > 0 ? `${money(record.amount)} 할인` : record.target;
}

function ensureBenefitHistoryPanel() {
  if ($("benefitHistoryPanel")) return;
  const coursePanel = document.querySelector(".course-history-panel");
  if (!coursePanel) return;

  const panel = document.createElement("fieldset");
  panel.id = "benefitHistoryPanel";
  panel.className = "benefit-history-panel";
  panel.innerHTML = `
    <legend>혜택·할인 약정 <span id="benefitActiveCount">0건</span></legend>
    <p class="benefit-helper">학생별로 약속한 할인이나 교재비 면제를 기록합니다. 수납금액에는 자동 차감되지 않습니다.</p>
    <div class="benefit-history-editor">
      <input id="benefitRecordId" type="hidden" />
      <label>약정일<input id="benefitPromisedAt" type="date" /></label>
      <label>혜택 종류
        <select id="benefitType">
          ${BENEFIT_TYPES.map((type) => `<option>${type}</option>`).join("")}
        </select>
      </label>
      <label>적용 방식
        <select id="benefitApplication">
          ${BENEFIT_APPLICATIONS.map((application) => `<option>${application}</option>`).join("")}
        </select>
      </label>
      <label>상태
        <select id="benefitStatus">
          ${BENEFIT_STATUSES.map((status) => `<option>${status}</option>`).join("")}
        </select>
      </label>
      <label>적용 대상<input id="benefitTarget" autocomplete="off" placeholder="교육비 또는 교재비" /></label>
      <label>할인 금액<input id="benefitAmount" type="number" min="0" step="1000" placeholder="면제는 0원" /></label>
      <label>종료일<input id="benefitEndDate" type="date" /></label>
      <label class="wide">조건<input id="benefitCondition" autocomplete="off" placeholder="예: 2과목 수강 유지, 형제 동시 재원" /></label>
      <label class="wide">메모<textarea id="benefitMemo" rows="2" placeholder="학부모님과 안내한 내용이나 적용 범위"></textarea></label>
      <div class="benefit-history-actions wide">
        <button class="mini-button" id="saveBenefitRecordBtn" type="button">약정 기록 저장</button>
        <button class="ghost-button" id="clearBenefitRecordBtn" type="button">입력 비우기</button>
      </div>
    </div>
    <div class="benefit-history-list" id="benefitHistoryList"></div>
  `;
  coursePanel.insertAdjacentElement("afterend", panel);

  if (!document.getElementById("benefitRecordStyles")) {
    const style = document.createElement("style");
    style.id = "benefitRecordStyles";
    style.textContent = `
      .benefit-history-panel { margin-top: 16px; }
      .benefit-history-panel legend span { margin-left: 6px; color: var(--accent-dark); font-size: 12px; }
      .benefit-helper { margin: 0 0 12px; color: var(--muted); font-size: 12px; line-height: 1.55; }
      .benefit-history-editor { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 10px; align-items: end; }
      .benefit-history-editor .wide, .benefit-history-actions { grid-column: 1 / -1; }
      .benefit-history-actions { display: flex; flex-wrap: wrap; gap: 8px; }
      .benefit-history-list { display: grid; gap: 8px; margin-top: 12px; }
      .benefit-history-item { display: grid; grid-template-columns: minmax(0, 1fr) auto; gap: 10px; padding: 11px; border: 1px solid var(--line); border-radius: 8px; background: #fbfcfa; }
      .benefit-history-item.ended { background: #f6f6f6; color: var(--muted); }
      .benefit-history-item strong, .benefit-history-item span, .benefit-history-item p { display: block; }
      .benefit-history-item span { margin-top: 3px; color: var(--muted); font-size: 12px; }
      .benefit-history-item p { margin: 6px 0 0; font-size: 13px; line-height: 1.45; }
      .benefit-status { display: inline-flex !important; width: fit-content; margin: 0 0 5px !important; padding: 3px 7px; border-radius: 999px; background: #e8f5eb; color: #24613c !important; font-weight: 700; }
      .benefit-history-item.ended .benefit-status { background: #ececec; color: #666 !important; }
      @media (max-width: 760px) { .benefit-history-editor { grid-template-columns: 1fr; } .benefit-history-editor .wide, .benefit-history-actions { grid-column: auto; } .benefit-history-item { grid-template-columns: 1fr; } }
    `;
    document.head.appendChild(style);
  }

  $("benefitType")?.addEventListener("change", applyBenefitTypeDefaults);
  $("benefitApplication")?.addEventListener("change", syncBenefitStatusDefault);
  $("saveBenefitRecordBtn")?.addEventListener("click", saveBenefitRecord);
  $("clearBenefitRecordBtn")?.addEventListener("click", clearBenefitRecordEditor);
}

function selectedBenefitStudent() {
  const id = $("studentId")?.value || selectedId;
  return students.find((student) => student.id === id);
}

function applyBenefitTypeDefaults() {
  const defaults = BENEFIT_DEFAULTS[$("benefitType")?.value] || BENEFIT_DEFAULTS["기타 혜택"];
  if ($("benefitTarget")) $("benefitTarget").value = defaults.target;
  if ($("benefitAmount")) $("benefitAmount").value = String(defaults.amount || "");
  if ($("benefitApplication")) $("benefitApplication").value = defaults.application;
  if ($("benefitStatus")) $("benefitStatus").value = defaults.status;
}

function syncBenefitStatusDefault() {
  if (!$('benefitStatus')) return;
  $("benefitStatus").value = $("benefitApplication")?.value === "1회" ? "적용 예정" : "적용 중";
}

function clearBenefitRecordEditor() {
  if (!$('benefitRecordId')) return;
  $("benefitRecordId").value = "";
  $("benefitPromisedAt").value = benefitTodayText();
  $("benefitType").value = BENEFIT_TYPES[0];
  $("benefitEndDate").value = "";
  $("benefitCondition").value = "";
  $("benefitMemo").value = "";
  applyBenefitTypeDefaults();
}

function readBenefitRecordEditor() {
  return normalizeBenefitRecord({
    id: $("benefitRecordId")?.value || createId(),
    promisedAt: $("benefitPromisedAt")?.value || benefitTodayText(),
    type: $("benefitType")?.value,
    target: $("benefitTarget")?.value,
    amount: $("benefitAmount")?.value,
    application: $("benefitApplication")?.value,
    endDate: $("benefitEndDate")?.value,
    condition: $("benefitCondition")?.value,
    memo: $("benefitMemo")?.value,
    status: $("benefitStatus")?.value,
  });
}

function saveBenefitRecord() {
  const student = selectedBenefitStudent();
  if (!student) {
    alert("학생 정보를 먼저 저장한 뒤 혜택 약정을 기록해주세요.");
    return;
  }
  const record = readBenefitRecordEditor();
  const records = normalizeBenefitRecords(student.benefitRecords);
  const index = records.findIndex((item) => item.id === record.id);
  if (index >= 0) records[index] = record;
  else records.unshift(record);
  student.benefitRecords = normalizeBenefitRecords(records);
  saveStudents();
  addChangeLog("학생관리", index >= 0 ? "혜택 약정 수정" : "혜택 약정 등록", `${student.studentName} · ${record.type}`);
  clearBenefitRecordEditor();
  renderBenefitRecords(student);
}

function editBenefitRecord(id) {
  const student = selectedBenefitStudent();
  const record = normalizeBenefitRecords(student?.benefitRecords).find((item) => item.id === id);
  if (!record) return;
  $("benefitRecordId").value = record.id;
  $("benefitPromisedAt").value = record.promisedAt;
  $("benefitType").value = record.type;
  $("benefitTarget").value = record.target;
  $("benefitAmount").value = String(record.amount || "");
  $("benefitApplication").value = record.application;
  $("benefitStatus").value = record.status;
  $("benefitEndDate").value = record.endDate;
  $("benefitCondition").value = record.condition;
  $("benefitMemo").value = record.memo;
  $("benefitPromisedAt").focus();
}

function deleteBenefitRecord(id) {
  const student = selectedBenefitStudent();
  const record = normalizeBenefitRecords(student?.benefitRecords).find((item) => item.id === id);
  if (!student || !record || !confirm(`${record.type} 기록을 삭제할까요?`)) return;
  student.benefitRecords = normalizeBenefitRecords(student.benefitRecords).filter((item) => item.id !== id);
  saveStudents();
  addChangeLog("학생관리", "혜택 약정 삭제", `${student.studentName} · ${record.type}`);
  clearBenefitRecordEditor();
  renderBenefitRecords(student);
}

function renderBenefitRecords(student) {
  ensureBenefitHistoryPanel();
  const list = $("benefitHistoryList");
  const count = $("benefitActiveCount");
  if (!list || !count) return;
  const savedStudent = students.find((item) => item.id === student?.id);
  const records = normalizeBenefitRecords(savedStudent?.benefitRecords || student?.benefitRecords);
  const currentCount = records.filter((record) => benefitRecordIsCurrent(record)).length;
  count.textContent = `${currentCount}건 적용 중`;
  if (!savedStudent) {
    list.innerHTML = `<p class="empty-feedback">학생 정보를 먼저 저장하면 혜택 약정을 기록할 수 있습니다.</p>`;
    return;
  }
  if (!records.length) {
    list.innerHTML = `<p class="empty-feedback">저장된 혜택·할인 약정이 없습니다.</p>`;
    return;
  }
  list.innerHTML = records.map((record) => {
    const current = benefitRecordIsCurrent(record);
    const meta = [record.promisedAt, record.application, benefitAmountLabel(record), record.endDate ? `종료일 ${record.endDate}` : ""].filter(Boolean).join(" · ");
    return `
      <article class="benefit-history-item ${current ? "" : "ended"}">
        <div>
          <span class="benefit-status">${escapeHtml(record.status)}</span>
          <strong>${escapeHtml(record.type)}</strong>
          <span>${escapeHtml(meta)}</span>
          ${record.condition ? `<p><b>조건</b> ${escapeHtml(record.condition)}</p>` : ""}
          ${record.memo ? `<p><b>메모</b> ${escapeHtml(record.memo)}</p>` : ""}
        </div>
        <div class="row-actions">
          <button class="mini-button" type="button" data-benefit-edit="${escapeHtml(record.id)}">수정</button>
          <button class="mini-danger-button" type="button" data-benefit-delete="${escapeHtml(record.id)}">삭제</button>
        </div>
      </article>
    `;
  }).join("");
  list.querySelectorAll("[data-benefit-edit]").forEach((button) => {
    button.addEventListener("click", () => editBenefitRecord(button.dataset.benefitEdit));
  });
  list.querySelectorAll("[data-benefit-delete]").forEach((button) => {
    button.addEventListener("click", () => deleteBenefitRecord(button.dataset.benefitDelete));
  });
}

const benefitOriginalNormalizeStudent = normalizeStudent;
normalizeStudent = function (student, options = {}) {
  const normalized = benefitOriginalNormalizeStudent(student, options);
  normalized.benefitRecords = normalizeBenefitRecords(student?.benefitRecords || normalized.benefitRecords);
  return normalized;
};

const benefitOriginalReadFormWithExistingFeedback = readFormWithExistingFeedback;
readFormWithExistingFeedback = function (options = {}) {
  const data = benefitOriginalReadFormWithExistingFeedback(options);
  const existing = students.find((student) => student.id === data.id);
  data.benefitRecords = normalizeBenefitRecords(existing?.benefitRecords || data.benefitRecords);
  return data;
};

const benefitOriginalFillForm = fillForm;
fillForm = function (student) {
  benefitOriginalFillForm(student);
  ensureBenefitHistoryPanel();
  clearBenefitRecordEditor();
  renderBenefitRecords(student);
};

let benefitRecordsMigrated = false;
students.forEach((student) => {
  if (!Array.isArray(student.benefitRecords)) {
    student.benefitRecords = [];
    benefitRecordsMigrated = true;
  } else {
    student.benefitRecords = normalizeBenefitRecords(student.benefitRecords);
  }
});
if (benefitRecordsMigrated) saveStudents();

ensureBenefitHistoryPanel();
clearBenefitRecordEditor();
const currentBenefitStudent = students.find((student) => student.id === selectedId);
if (currentBenefitStudent) renderBenefitRecords(currentBenefitStudent);
