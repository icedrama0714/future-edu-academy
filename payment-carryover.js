// Carries unpaid tuition into each following month until that balance is settled.
const PAYMENT_CARRYOVER_START_MONTH = "2026-09";
const paymentCarryoverOriginalUpcomingRecords = upcomingPaymentRecords;

function paymentMonthShift(month, offset) {
  if (!/^\d{4}-\d{2}$/.test(String(month))) return "";
  const [year, monthNumber] = String(month).split("-").map(Number);
  const shifted = new Date(year, monthNumber - 1 + Number(offset || 0), 1);
  return `${shifted.getFullYear()}-${String(shifted.getMonth() + 1).padStart(2, "0")}`;
}

function paymentMonthsBefore(startMonth, endMonth, limit = 60) {
  const months = [];
  let cursor = startMonth;
  while (cursor && cursor < endMonth && months.length < limit) {
    months.push(cursor);
    cursor = paymentMonthShift(cursor, 1);
  }
  return months;
}

function paymentRecordsForCarryoverStudent(student) {
  const studentName = canonicalStudentName(student.studentName);
  const ownRecords = Array.isArray(student.paymentRecords) ? student.paymentRecords : [];
  const standaloneRecordsForStudent = standalonePaymentRecords.filter(
    (record) => canonicalStudentName(record.studentName) === studentName,
  );
  return [...ownRecords, ...standaloneRecordsForStudent];
}

function carryoverSourceMonth(record = {}) {
  return String(record.memo || "").match(/^(\d{4}-\d{2}) 미납 자동이월/)?.[1] || "";
}

function isCarryoverPaymentRecord(record = {}) {
  return Boolean(carryoverSourceMonth(record));
}

function regularPaymentRecordsInMonth(student, month) {
  return paymentRecordsForCarryoverStudent(student).filter((record) => (
    recordMonthText(record) === month && !isCarryoverPaymentRecord(record)
  ));
}

function carryoverWasSettled(student, sourceMonth) {
  return paymentRecordsForCarryoverStudent(student).some((record) => (
    carryoverSourceMonth(record) === sourceMonth && paymentRecordStatus(record) === "납부완료"
  ));
}

function outstandingPaymentAmount(record = {}) {
  const explicitUnpaid = Number(record.unpaidAmount || 0);
  if (explicitUnpaid > 0) return explicitUnpaid;
  if (paymentRecordStatus(record) !== "미납") return 0;
  return Math.max(
    0,
    Number(record.tuition || 0) + Number(record.discount || 0) - Number(record.paidAmount || 0),
  );
}

function hasRegularPaymentRecordInMonth(student, month) {
  return regularPaymentRecordsInMonth(student, month).length > 0;
}

hasPaymentRecordInMonth = hasRegularPaymentRecordInMonth;

function paymentCarryoverSourceMonths(student, currentMonth) {
  const sourceMonths = new Set();
  const allRecords = paymentRecordsForCarryoverStudent(student);

  allRecords.forEach((record) => {
    const recordMonth = recordMonthText(record);
    if (
      recordMonth &&
      recordMonth < currentMonth &&
      !isCarryoverPaymentRecord(record) &&
      paymentRecordStatus(record) === "미납"
    ) {
      sourceMonths.add(recordMonth);
    }
  });

  if (student.enrollmentStatus === "재원") {
    const joinMonth = /^\d{4}-\d{2}/.test(String(student.joinDate || ""))
      ? String(student.joinDate).slice(0, 7)
      : PAYMENT_CARRYOVER_START_MONTH;
    const startMonth = joinMonth > PAYMENT_CARRYOVER_START_MONTH
      ? joinMonth
      : PAYMENT_CARRYOVER_START_MONTH;
    paymentMonthsBefore(startMonth, currentMonth).forEach((month) => sourceMonths.add(month));
  }

  return [...sourceMonths].sort();
}

function paymentCarryoverRecords() {
  const currentMonth = currentMonthText();
  return students
    .filter((student) => isCountedStudent(student))
    .flatMap((student) => paymentCarryoverSourceMonths(student, currentMonth).map((sourceMonth) => {
      if (carryoverWasSettled(student, sourceMonth)) return null;

      const sourceRecords = regularPaymentRecordsInMonth(student, sourceMonth);
      const unpaidRecords = sourceRecords.filter((record) => paymentRecordStatus(record) === "미납");
      if (sourceRecords.length && !unpaidRecords.length) return null;

      const unpaidAmount = sourceRecords.length
        ? unpaidRecords.reduce((sum, record) => sum + outstandingPaymentAmount(record), 0)
        : paymentBaseTuitionFromStudent(student);
      if (unpaidAmount <= 0) return null;

      const sourcePaymentName = unpaidRecords.map((record) => record.paymentName).filter(Boolean).join("+")
        || paymentNameFromStudent(student)
        || "교육비";
      const sourceLabel = `${Number(sourceMonth.slice(5, 7))}월 미납 이월`;
      return {
        ...paymentRecord(student.studentName, {
          registered: `${currentMonth}-01`,
          paymentType: "이월",
          paymentName: `${sourceLabel} · ${sourcePaymentName}`,
          baseTuition: unpaidAmount,
          tuition: unpaidAmount,
          discount: 0,
          paidAmount: 0,
          unpaidAmount,
          paymentDate: "",
          paymentMethod: "",
          memo: `${sourceMonth} 미납 자동이월`,
          status: "미납",
          preservePaymentName: true,
        }),
        id: `auto-carry|${student.id}|${sourceMonth}|${currentMonth}`,
        studentId: student.id,
        studentName: student.studentName,
        grade: student.grade,
        school: student.school,
        phone: student.parentPhone,
        standalone: false,
        autoDue: true,
      };
    }).filter(Boolean));
}

upcomingPaymentRecords = function () {
  return uniquePaymentRecords([
    ...paymentCarryoverRecords(),
    ...paymentCarryoverOriginalUpcomingRecords(),
  ]);
};

const paymentCarryoverOriginalRecordRows = paymentRecordRows;
paymentRecordRows = function (record, rowNumber) {
  const rows = paymentCarryoverOriginalRecordRows(record, rowNumber);
  return isCarryoverPaymentRecord(record)
    ? rows.replace(">예정</span>", ">이월</span>")
    : rows;
};

renderAll();

if (!document.querySelector("script[data-prepayment-balance]")) {
  const prepaymentBalanceScript = document.createElement("script");
  prepaymentBalanceScript.src = "./prepayment-balance.js?v=20260907-1";
  prepaymentBalanceScript.dataset.prepaymentBalance = "true";
  document.body.appendChild(prepaymentBalanceScript);
}
