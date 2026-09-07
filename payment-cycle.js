// Repeats each student's tuition due date on the 1st or 25th of every month.
function recurringPaymentCycleDay(value) {
  const day = Number(value);
  return [1, 25].includes(day) ? day : "";
}

function recurringPaymentCycleDayForStudent(student = {}) {
  const explicitDay = recurringPaymentCycleDay(student.paymentCycleDay);
  if (explicitDay) return explicitDay;
  const savedDueDay = recurringPaymentCycleDay(String(student.paymentDueDate || "").slice(8, 10));
  if (savedDueDay) return savedDueDay;
  return recurringPaymentCycleDay(extractPaymentDayFromMemo(student.memo));
}

function recurringPaymentDueDate(student = {}, month = currentMonthText()) {
  const cycleDay = recurringPaymentCycleDayForStudent(student);
  if (!cycleDay || !/^\d{4}-\d{2}$/.test(String(month))) return "";
  const [year, monthNumber] = String(month).split("-").map(Number);
  const lastDay = new Date(year, monthNumber, 0).getDate();
  return `${month}-${String(Math.min(cycleDay, lastDay)).padStart(2, "0")}`;
}

if (!formFields.includes("paymentCycleDay")) {
  const teacherFieldIndex = formFields.indexOf("teacher");
  formFields.splice(teacherFieldIndex + 1, 0, "paymentCycleDay");
}

const recurringPaymentOriginalNormalizeStudent = normalizeStudent;
normalizeStudent = function (student, options = {}) {
  const normalized = recurringPaymentOriginalNormalizeStudent(student, options);
  normalized.paymentCycleDay = recurringPaymentCycleDayForStudent(student);
  normalized.paymentDueDate = recurringPaymentDueDate(normalized);
  return normalized;
};

const recurringPaymentOriginalFillForm = fillForm;
fillForm = function (student) {
  recurringPaymentOriginalFillForm(student);
  if (!document.getElementById("paymentCycleDay")) return;
  const savedStudent = students.some((item) => item.id === student.id);
  const cycleDay = recurringPaymentCycleDayForStudent(student);
  document.getElementById("paymentCycleDay").value = String(cycleDay || (savedStudent ? "" : 25));
};

upcomingPaymentRecords = function () {
  const month = currentMonthText();
  const today = currentDateText();
  return students
    .filter((student) => student.enrollmentStatus === "재원" && isCountedStudent(student))
    .map((student) => ({ student, dueDate: recurringPaymentDueDate(student, month) }))
    .filter(({ student, dueDate }) => (
      dueDate &&
      today >= dueDate &&
      !hasPaymentRecordInMonth(student, month)
    ))
    .map(({ student, dueDate }) => {
      const baseTuition = paymentBaseTuitionFromStudent(student);
      return {
        ...paymentRecord(student.studentName, {
          registered: dueDate,
          paymentName: paymentNameFromStudent(student),
          baseTuition,
          tuition: baseTuition,
          discount: 0,
          paidAmount: 0,
          unpaidAmount: baseTuition,
          paymentDate: "",
          paymentMethod: "",
          memo: "매월 자동 생성된 납부예정 기록",
          status: "미납",
        }),
        id: `auto-due|${student.id}|${dueDate}`,
        studentId: student.id,
        studentName: student.studentName,
        grade: student.grade,
        school: student.school,
        phone: student.parentPhone,
        standalone: false,
        autoDue: true,
      };
    });
};

let recurringPaymentDataChanged = false;
students.forEach((student) => {
  const cycleDay = recurringPaymentCycleDayForStudent(student);
  const dueDate = recurringPaymentDueDate({ ...student, paymentCycleDay: cycleDay });
  if (student.paymentCycleDay !== cycleDay || student.paymentDueDate !== dueDate) {
    student.paymentCycleDay = cycleDay;
    student.paymentDueDate = dueDate;
    recurringPaymentDataChanged = true;
  }
});
if (recurringPaymentDataChanged) saveStudents();

const recurringPaymentOriginalRenderStats = renderStats;
renderStats = function () {
  recurringPaymentOriginalRenderStats();
  const dueCount = document.getElementById("todayPaymentDueCount");
  if (dueCount) dueCount.textContent = upcomingPaymentRecords().length;
};

document.getElementById("todayPaymentDueCard")?.addEventListener("click", openCurrentMonthUnpaidPayments);
renderAll();
