// Adds the withdrawal archive without re-uploading the existing roster source.
let selectedWithdrawalArchiveId = "";
if (!formFields.includes("withdrawalReason")) formFields.push("withdrawalReason");
const withdrawalOriginalReadForm = readFormWithExistingFeedback;
const withdrawalOriginalSaveStudent = saveStudentData;
const withdrawalOriginalDeleteStudent = deleteStudent;
const withdrawalOriginalRenderArchive = renderArchive;
const withdrawalOriginalSwitchView = switchView;
const withdrawalOriginalAllBackup = allBackupPayload;
const withdrawalOriginalUserSession = applyUserSession;
$("leaveBtn").removeEventListener("click", withdrawSelected);
$("exportAllBackupBtn").removeEventListener("click", exportAllBackup);

readFormWithExistingFeedback = function (options = {}) {
  const data = withdrawalOriginalReadForm(options);
  data.lastWithdrawalArchiveId = students.find((s) => s.id === data.id)?.lastWithdrawalArchiveId || "";
  return data;
};
saveStudentData = function (data) {
  const previous = students.find((s) => s.id === data.id);
  if (data.enrollmentStatus === "퇴회" && previous?.enrollmentStatus !== "퇴회") {
    if (!isDirector()) { alert("퇴회 처리는 원장 계정에서만 가능합니다."); return; }
    if (!commitStudentWithdrawal(data)) return;
    selectedId = data.id;
    addChangeLog("학생관리", "퇴회 기록 보관", `${data.studentName} · 퇴회일 ${data.leaveDate}`);
    renderAll();
    fillForm(students.find((s) => s.id === data.id));
    return;
  }
  return withdrawalOriginalSaveStudent(data);
};
deleteStudent = function (id) {
  const student = students.find((s) => s.id === id);
  if (isDirector() && student?.enrollmentStatus === "퇴회" && !ensureWithdrawalSaved(student)) return;
  return withdrawalOriginalDeleteStudent(id);
};
renderArchive = function () { withdrawalOriginalRenderArchive(); renderWithdrawalArchive(); };
switchView = function (view) { withdrawalOriginalSwitchView(view); if (view === "archive") renderArchive(); };
allBackupPayload = function () { return { ...withdrawalOriginalAllBackup(), withdrawalRecords: WithdrawalRecords.read(localStorage) }; };
applyUserSession = function () { withdrawalOriginalUserSession(); renderWithdrawalArchive(); };


function withdrawalSnapshot(student, source = "withdrawal") {
  return WithdrawalRecords.capture(student, [...students.filter((s) => s.id !== student.id), student], standalonePaymentRecords, {
    id: createId(), archivedAt: new Date().toISOString(), recordedBy: currentActor().name, source,
  });
}

function commitStudentWithdrawal(data) {
  const next = { ...data, leaveDate: data.leaveDate || currentDateText(), enrollmentStatus: "퇴회" };
  const snapshot = withdrawalSnapshot(next);
  next.lastWithdrawalArchiveId = snapshot.id;
  const exists = students.some((s) => s.id === next.id);
  const nextStudents = exists ? students.map((s) => s.id === next.id ? next : s) : [next, ...students];
  try {
    WithdrawalRecords.commit(localStorage, STORAGE_KEY, nextStudents, [snapshot]);
  } catch (error) {
    alert(`퇴회 기록을 보관하지 못해 퇴회 처리를 완료하지 않았습니다. 기존 자료를 백업하고 저장 공간을 확인해주세요.\n${error.message}`);
    return false;
  }
  students = nextStudents;
  data.leaveDate = next.leaveDate;
  selectedWithdrawalArchiveId = snapshot.id;
  return true;
}

function hasSavedWithdrawal(student, records) {
  return records.some((r) => student.lastWithdrawalArchiveId
    ? r.id === student.lastWithdrawalArchiveId
    : r.studentId === student.id && r.student.leaveDate === student.leaveDate);
}

function ensureWithdrawalSaved(student) {
  try {
    const records = WithdrawalRecords.read(localStorage);
    if (!hasSavedWithdrawal(student, records)) {
      localStorage.setItem(WithdrawalRecords.KEY, JSON.stringify(WithdrawalRecords.merge(records, [withdrawalSnapshot(student, "backfill")])));
    }
    return true;
  } catch (error) {
    alert(`퇴회 기록을 별도로 보관할 수 없어 삭제를 중단했습니다.\n${error.message}`);
    return false;
  }
}

function archiveExistingWithdrawals() {
  if (!isDirector()) return;
  try {
    const records = WithdrawalRecords.read(localStorage);
    const missing = students.filter((s) => s.enrollmentStatus === "퇴회" && !hasSavedWithdrawal(s, records));
    if (!missing.length) { $("withdrawalArchiveStatus").textContent = "추가로 보관할 퇴회 학생이 없습니다."; return; }
    const snapshots = missing.map((s) => withdrawalSnapshot(s, "backfill"));
    localStorage.setItem(WithdrawalRecords.KEY, JSON.stringify(WithdrawalRecords.merge(records, snapshots)));
    addChangeLog("퇴회 기록", "기존 퇴회 기록 보관", `${missing.length}명 · 현재 남아 있는 자료 기준`);
    renderArchive();
    $("withdrawalArchiveStatus").textContent = `${missing.length}명의 현재 남아 있는 자료를 보관했습니다.`;
  } catch (error) { $("withdrawalArchiveStatus").textContent = `보관하지 못했습니다. ${error.message}`; }
}

function renderWithdrawalArchive() {
  const list = $("withdrawalArchiveList");
  if (!list) return;
  if (!isDirector()) { list.innerHTML = ""; $("withdrawalArchiveDetail").innerHTML = ""; return; }
  try {
    const records = WithdrawalRecords.read(localStorage);
    const yearSelect = $("withdrawalYear");
    const previousYear = yearSelect.value;
    const years = [...new Set(records.map((r) => String(r.student.leaveDate || "").slice(0, 4)).filter((y) => /^\d{4}$/.test(y)))].sort().reverse();
    yearSelect.innerHTML = '<option value="">전체 연도</option>' + years.map((y) => `<option value="${y}">${y}년</option>`).join("");
    if (years.includes(previousYear)) yearSelect.value = previousYear;
    const filtered = WithdrawalRecords.filter(records, $("withdrawalSearch").value, yearSelect.value);
    $("withdrawalArchiveCount").textContent = `${filtered.length}건 / 전체 ${records.length}건`;
    const missing = students.filter((s) => s.enrollmentStatus === "퇴회" && !hasSavedWithdrawal(s, records)).length;
    $("archiveExistingWithdrawalsBtn").disabled = !missing;
    $("withdrawalArchiveStatus").textContent = missing ? `아직 별도 보관하지 않은 기존 퇴회 학생이 ${missing}명 있습니다.` : "";
    list.innerHTML = filtered.length ? filtered.map((r) => `<article class="withdrawal-card"><div><h3>${escapeHtml(r.student.studentName || "이름 미기록")}</h3><p>${escapeHtml([r.student.school, r.student.grade].filter(Boolean).join(" · "))}</p><p>입회 ${escapeHtml(r.student.joinDate || "미기록")} → 퇴회 ${escapeHtml(r.student.leaveDate || "미기록")}</p><p>${escapeHtml(r.student.withdrawalReason || "퇴회 사유 미기록")}</p></div><button class="ghost-button" type="button" data-withdrawal-open="${escapeHtml(r.id)}" aria-label="${escapeHtml(r.student.studentName)} ${escapeHtml(r.student.leaveDate || "")} 퇴회 기록 열기">기록 열기</button></article>`).join("")
      : `<p class="empty-feedback">${records.length ? "검색 조건에 맞는 퇴회 기록이 없습니다." : "아직 보관된 퇴회 기록이 없습니다. 학생을 퇴회 처리하면 여기에 자동으로 보관됩니다."}</p>`;
    renderWithdrawalDetail(records);
  } catch (error) {
    $("withdrawalArchiveStatus").textContent = `퇴회 기록을 읽을 수 없습니다. 기존 자료는 유지됩니다. ${error.message}`;
    list.innerHTML = "";
    $("withdrawalArchiveDetail").classList.add("hidden");
  }
}

function renderWithdrawalDetail(records) {
  const detail = $("withdrawalArchiveDetail");
  if (!detail || !isDirector()) return;
  try {
    const record = (records || WithdrawalRecords.read(localStorage)).find((r) => r.id === selectedWithdrawalArchiveId);
    detail.classList.toggle("hidden", !record);
    detail.innerHTML = record ? `<div class="archive-actions"><button type="button" class="ghost-button" data-withdrawal-print>인쇄 / PDF 저장</button><button type="button" class="ghost-button" data-withdrawal-close>기록 닫기</button></div>${WithdrawalRecords.body(record)}` : "";
  } catch (error) { $("withdrawalArchiveStatus").textContent = error.message; }
}

function printWithdrawalRecord() {
  if (!isDirector()) return;
  const record = WithdrawalRecords.read(localStorage).find((r) => r.id === selectedWithdrawalArchiveId);
  if (!record) return;
  const printWindow = window.open("", "_blank", "width=950,height=900");
  if (!printWindow) { alert("인쇄 창을 열 수 없습니다. 이 사이트의 팝업 허용을 확인해주세요."); return; }
  printWindow.document.write(WithdrawalRecords.documentHtml(record));
  printWindow.document.close();
  printWindow.focus();
  Promise.all([...printWindow.document.images].map((img) => img.decode().catch(() => {}))).then(() => printWindow.print());
}

withdrawSelected = function () {
  if (!requireDeletePermission()) return;
  const student = students.find((item) => item.id === selectedId);
  if (!student) return;
  if (student.enrollmentStatus === "퇴회") {
    switchView("archive");
    renderWithdrawalArchive();
    return;
  }
  const leaveDate = $("leaveDate").value || currentDateText();
  if (!confirm(`${student.studentName || "선택한 학생"}을(를) ${leaveDate}에 퇴회 처리하고, 저장된 기록을 자료보관에 남길까요?`)) return;
  const data = { ...student, enrollmentStatus: "퇴회", leaveDate, withdrawalReason: $("withdrawalReason").value.trim() };
  if (!commitStudentWithdrawal(data)) return;
  addChangeLog("학생관리", "퇴회 처리 및 기록 보관", `${student.studentName || "이름 없음"} · 퇴회일 ${leaveDate}`);
  renderAll();
  clearStudentDetail();
};

exportAllBackup = function () {
  const today = currentDateText();
  let payload;
  try { payload = allBackupPayload(); } catch (error) { alert(`백업하지 못했습니다. ${error.message}`); return; }
  addChangeLog("자료보관", "전체 백업 저장", `${today} 기준 전체 자료 백업 파일을 저장했습니다.`);
  downloadTextFile(`미래엔에듀_전체백업_${today}.json`, JSON.stringify(payload, null, 2));
};

importAllBackup = function (file) {
  if (!requireDeletePermission()) return;
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const payload = JSON.parse(String(reader.result || ""));
      if (!Array.isArray(payload.students)) throw new Error("students 없음");
      if (!confirm("현재 사이트의 전체 자료를 백업 파일 내용으로 바꿀까요? 먼저 현재 자료를 백업해두는 것을 권장합니다.")) return;

      // Old backups contain no archive key. Keep existing records, and merge newer backups by immutable ID.
      const restoredWithdrawals = WithdrawalRecords.merge(WithdrawalRecords.read(localStorage), payload.withdrawalRecords || []);
      localStorage.setItem(WithdrawalRecords.KEY, JSON.stringify(restoredWithdrawals));

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
};

$("leaveBtn").addEventListener("click", withdrawSelected);
$("exportAllBackupBtn").addEventListener("click", exportAllBackup);
["withdrawalSearch", "withdrawalYear"].forEach((id) => $(id)?.addEventListener("input", renderWithdrawalArchive));
$("archiveExistingWithdrawalsBtn")?.addEventListener("click", archiveExistingWithdrawals);
$("withdrawalArchiveList")?.addEventListener("click", (event) => {
  const button = event.target.closest("[data-withdrawal-open]");
  if (button) { selectedWithdrawalArchiveId = button.dataset.withdrawalOpen; renderWithdrawalDetail(); $("withdrawalArchiveDetail")?.focus(); }
});
$("withdrawalArchiveDetail")?.addEventListener("click", (event) => {
  if (event.target.closest("[data-withdrawal-close]")) { selectedWithdrawalArchiveId = ""; renderWithdrawalDetail(); }
  if (event.target.closest("[data-withdrawal-print]")) printWithdrawalRecord();
});
renderWithdrawalArchive();
