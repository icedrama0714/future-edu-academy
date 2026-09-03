// Headcount patch: no student roster or contact information is included.
function studentRecordType(student = {}) {
  if (["student", "staff", "test"].includes(student.recordType)) return student.recordType;
  const name = String(student.studentName || "").trim().toLowerCase();
  if (["test", "테스트"].includes(name)) return "test";
  // 원장이 확인한 직원 명단. 다른 동명이인은 등록 구분을 '원생'으로 지정할 수 있습니다.
  const staffNames = ["박지민", "박민진", "원지영", "박민영", "영어 박지민", "한글 박민진", "중등수학 원지영", "원장 박민영"];
  if (staffNames.some((staffName) => staffName.replace(/\s/g, "") === name.replace(/\s/g, ""))) return "staff";
  if (["director", "teacher", "desk"].includes(student.role)
    || ["원장", "선생님", "강사", "데스크"].includes(name)
    || (student.staffAccountId && userAccounts.some((account) => account.id === student.staffAccountId))) return "staff";
  return "student";
}

function isCountedStudent(student) {
  return studentRecordType(student) === "student";
}

function countedStudents() {
  return students.filter(isCountedStudent);
}

if (!formFields.includes("recordType")) formFields.push("recordType");
const countsOriginalFillForm = fillForm;
fillForm = function(student) { countsOriginalFillForm(student); if ($("recordType")) $("recordType").value = student.recordType || "auto"; };
const countsOriginalListMode = studentMatchesListMode;
studentMatchesListMode = function(student) { return (studentListMode === "all" || isCountedStudent(student)) && countsOriginalListMode(student); };

monthlyNewStudents = function(month = currentMonthText()) {
  return countedStudents().filter((student) => (
    student.enrollmentStatus === "재원" &&
    String(student.joinDate || "").slice(0, 7) === month
  ));
};

monthlyNewSubjectItems = function(month = currentMonthText()) {
  const items = new Map();
  const addItem = (studentName, subject, date, source, studentId = "") => {
    const cleanName = canonicalStudentName(studentName);
    const cleanSubject = dashboardSubjectLabel(subject);
    if (!cleanName || !cleanSubject) return;
    const owner = students.find((item) => studentId ? item.id === studentId : canonicalStudentName(item.studentName) === cleanName);
    if (!isCountedStudent(owner || { studentName: cleanName })) return;
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
};

renderStats = function() {
  const active = countedStudents().filter((student) => student.enrollmentStatus === "재원");
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
};

getTodayScheduledStudents = function() {
  const today = new Date().getDay();
  return countedStudents().filter((student) => (
    student.enrollmentStatus === "재원" &&
    Array.isArray(student.attendanceDays) &&
    student.attendanceDays.map(Number).includes(today)
  ));
};

getTodayAbsentStudents = function() {
  return countedStudents().filter((student) => todayAttendanceRecord(student)?.status === "결석");
};

getTodayOffStudents = function() {
  const scheduledIds = new Set(getTodayScheduledStudents().map((student) => student.id));
  return countedStudents().filter((student) => student.enrollmentStatus === "재원" && !scheduledIds.has(student.id));
};

renderGradeSummary = function() {
  const grid = $("gradeSummaryGrid");
  const total = $("gradeSummaryTotal");
  if (!grid || !total) return;

  const activeStudents = countedStudents().filter((student) => student.enrollmentStatus === "재원");
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
};

monthlyCloseData = function(month = currentMonthText()) {
  const { start, end } = monthRange(month);
  const monthPayments = allPaymentRecords().filter((record) => recordMonthText(record) === month);
  const paidInMonthAmount = allPaymentRecords().reduce((sum, record) => sum + paymentPaidAmountForRange(record, start, end), 0);
  const monthFinanceRecords = financeRecordsForMonth(month);
  const otherIncome = monthFinanceRecords.filter((record) => record.type === "income").reduce((sum, record) => sum + Number(record.amount || 0), 0);
  const expense = monthFinanceRecords.filter((record) => record.type === "expense").reduce((sum, record) => sum + Number(record.amount || 0), 0);
  const monthBookStockRecords = bookStockRecords.filter((record) => String(record.date || "").slice(0, 7) === month);
  const bookPurchaseQuantity = monthBookStockRecords.filter((record) => record.type === "in").reduce((sum, record) => sum + Number(record.quantity || 0), 0);
  const bookPurchaseAmount = monthBookStockRecords.filter((record) => record.type === "in").reduce((sum, record) => sum + bookStockTotalAmount(record), 0);
  const attendanceRecords = countedStudents().flatMap((student) => (student.attendanceRecords || []).map((record) => ({
    ...record,
    studentName: student.studentName,
  }))).filter((record) => String(record.date || "").slice(0, 7) === month);

  return {
    month,
    activeStudents: countedStudents().filter((student) => student.enrollmentStatus === "재원").length,
    newStudents: countedStudents().filter((student) => String(student.joinDate || "").slice(0, 7) === month).length,
    leftStudents: countedStudents().filter((student) => String(student.leaveDate || "").slice(0, 7) === month).length,
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
};

subjectEnrollmentData = function() {
  const counts = new Map();
  const addCount = (key, item) => {
    const current = counts.get(key) || { ...item, count: 0 };
    current.count += 1;
    counts.set(key, current);
  };

  countedStudents()
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
};

attendanceCountsForDate = function(dateText) {
  const included = countedStudents();
  const scheduled = included.filter((student) => isStudentScheduledOnDate(student, dateText));
  const active = included.filter((student) => student.enrollmentStatus === "재원");
  const present = included.filter((student) => attendanceRecordOnDate(student, dateText)?.status === "등원").length;
  const absent = included.filter((student) => attendanceRecordOnDate(student, dateText)?.status === "결석").length;
  const waiting = scheduled.filter((student) => !attendanceRecordOnDate(student, dateText)).length;
  const off = active.filter((student) => !isStudentScheduledOnDate(student, dateText)).length;
  return { scheduled: scheduled.length, present, absent, waiting, off };
};


// Refresh after the patch has loaded; no stored records are rewritten.
// The original app registered a timer before this additive patch loaded.
// Keep its legacy active-count write from restoring the unfiltered count.
if (typeof MutationObserver !== "undefined" && $("activeCount")) {
  const enforceActiveCount = () => {
    const expected = String(countedStudents().filter((s) => s.enrollmentStatus === "재원").length);
    if ($("activeCount").textContent !== expected) $("activeCount").textContent = expected;
  };
  new MutationObserver(enforceActiveCount).observe($("activeCount"), { childList: true, characterData: true, subtree: true });
}
renderStats();
renderGradeSummary();
