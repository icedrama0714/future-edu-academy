// Visibility only: original records and financial totals remain in storage/backups.
function visibleRosterStudents() { return students.filter((student) => student.enrollmentStatus !== "퇴회"); }
function isWithdrawnPayment(record) {
  if (record.studentId) return students.some((s) => s.id === record.studentId && s.enrollmentStatus === "퇴회");
  const clean = (v) => String(v || "").replace(/\\s/g, "").toLowerCase();
  const phone = (v) => String(v || "").replace(/\\D/g, "");
  const candidates = students.filter((s) => clean(s.studentName) === clean(record.studentName)
    && (!record.school || clean(s.school) === clean(record.school))
    && (!record.grade || clean(s.grade) === clean(record.grade))
    && (!phone(record.phone) || [s.parentPhone,s.parentPhone2,s.parentPhone3,s.parentPhone4,s.studentPhone].some((p) => phone(p) === phone(record.phone))));
  return candidates.length === 1 && candidates[0].enrollmentStatus === "퇴회";
}
const visibilityOriginalListMode = studentMatchesListMode;
studentMatchesListMode = function(student) { return student.enrollmentStatus !== "퇴회" && visibilityOriginalListMode(student); };
const visibilityOriginalAttendance = attendanceStudentsForDate;
attendanceStudentsForDate = function(...args) { return visibilityOriginalAttendance(...args).filter((s) => s.enrollmentStatus !== "퇴회" && isCountedStudent(s)); };
const visibilityOriginalAbsent = getTodayAbsentStudents;
getTodayAbsentStudents = function() { return visibilityOriginalAbsent().filter((s) => s.enrollmentStatus !== "퇴회"); };
const visibilityOriginalPayments = filteredPaymentRecords;
filteredPaymentRecords = function() { return visibilityOriginalPayments().filter((r) => !isWithdrawnPayment(r)); };
const visibilityOriginalLedger = filteredLedgerRecords;
filteredLedgerRecords = function() { return visibilityOriginalLedger().filter((r) => !isWithdrawnPayment(r)); };
const visibilityOriginalFinance = filteredSubjectFinanceEntries;
filteredSubjectFinanceEntries = function(...args) {
  const hidden = new Set(allPaymentRecords().filter(isWithdrawnPayment).map((r) => r.id));
  return visibilityOriginalFinance(...args).filter((entry) => !hidden.has(entry.paymentRecordId));
};
const visibilityOriginalFindPaymentStudent = findPaymentEntryStudent;
findPaymentEntryStudent = function(name) { const s = visibilityOriginalFindPaymentStudent(name); return s?.enrollmentStatus === "퇴회" ? undefined : s; };
const visibilityOriginalSelectStudent = selectStudent;
selectStudent = function(id) {
  const s = students.find((student) => student.id === id);
  if (s?.enrollmentStatus === "퇴회") { clearStudentDetail(); switchView("archive"); return; }
  return visibilityOriginalSelectStudent(id);
};
function backfillWithdrawalsForArchive() {
  if (!isDirector()) return;
  try {
    const existing = WithdrawalRecords.read(localStorage);
    if (students.some((s) => s.enrollmentStatus === "퇴회" && !hasSavedWithdrawal(s, existing))) archiveExistingWithdrawals();
  } catch (error) {
    if ($("withdrawalArchiveStatus")) $("withdrawalArchiveStatus").textContent = "기존 기록은 유지됩니다. 보관함 저장 상태를 확인해주세요.";
  }
}
const visibilityOriginalSession = applyUserSession;
applyUserSession = function() { visibilityOriginalSession(); backfillWithdrawalsForArchive(); };

const visibilityOriginalLearningOverview = renderLearningOverview;
$("learningSearchInput")?.removeEventListener("input", visibilityOriginalLearningOverview);
renderLearningOverview = function() {
  const list = $("learningStudentList");
  if (!list) return;
  const query = ($("learningSearchInput")?.value || "").trim().toLowerCase();
  const visibleStudents = visibleRosterStudents().filter(isCountedStudent)
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
};

renderDashboard = function() {
  renderNotices();

  const feedbackRecords = visibleRosterStudents()
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
};

renderKakaoLogs = function() {
  const root = $("kakaoLogList");
  if (!root) return;
  const month = $("kakaoMonthFilter")?.value || currentMonthText();
  const query = ($("kakaoSearchInput")?.value || "").trim().toLowerCase();
  const records = kakaoMessageLogs.filter((r) => !isWithdrawnPayment(r))
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
};

$("learningSearchInput")?.addEventListener("input", renderLearningOverview);
backfillWithdrawalsForArchive();
renderAll();
if (selectedId && students.some((s) => s.id === selectedId && s.enrollmentStatus === '퇴회')) clearStudentDetail();
