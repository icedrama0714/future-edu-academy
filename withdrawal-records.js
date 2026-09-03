/* Student withdrawal records: immutable copies, separate from the live roster. */
(function (root) {
  "use strict";
  const KEY = "literacy_academy_withdrawal_records_v1";
  const esc = (value) => String(value ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const clone = (value) => JSON.parse(JSON.stringify(value));
  const phone = (value) => String(value || "").replace(/\D/g, "");
  const name = (value) => String(value || "").trim();

  function validate(records) {
    if (!Array.isArray(records) || records.some((r) => !r || r.schemaVersion !== 1 || typeof r.id !== "string" || !r.id || !r.student || typeof r.student !== "object" || Array.isArray(r.student))) {
      throw new Error("퇴회 기록 형식이 올바르지 않습니다. 기존 자료를 유지했습니다.");
    }
    return records;
  }

  function read(storage) {
    const text = storage.getItem(KEY);
    return text === null ? [] : validate(JSON.parse(text));
  }

  function merge(existing, incoming) {
    validate(existing); validate(incoming);
    // A restore never overwrites an already saved snapshot with the same ID.
    const byId = new Map(existing.map((r) => [r.id, r]));
    incoming.forEach((r) => { if (!byId.has(r.id)) byId.set(r.id, r); });
    return [...byId.values()];
  }

  function matchesPayment(record, student, roster) {
    if (record.studentId) return record.studentId === student.id;
    if (name(record.studentName) !== name(student.studentName)) return false;
    const candidates = roster.filter((s) => {
      if (name(s.studentName) !== name(record.studentName)) return false;
      if (record.school && name(s.school) !== name(record.school)) return false;
      if (record.grade && name(s.grade) !== name(record.grade)) return false;
      if (phone(record.phone) && ![s.parentPhone, s.parentPhone2, s.parentPhone3, s.parentPhone4, s.studentPhone].some((p) => phone(p) === phone(record.phone))) return false;
      return true;
    });
    return candidates.length === 1 && candidates[0].id === student.id;
  }

  function capture(student, roster, payments, meta) {
    const linked = payments.filter((r) => !r.autoDue && matchesPayment(r, student, roster));
    const unlinkedCount = payments.filter((r) => !r.autoDue && !r.studentId && name(r.studentName) === name(student.studentName) && !matchesPayment(r, student, roster)).length;
    return clone({
      schemaVersion: 1, id: meta.id, studentId: student.id,
      archivedAt: meta.archivedAt, recordedBy: meta.recordedBy || "",
      source: meta.source || "withdrawal", student,
      linkedPaymentRecords: linked, unlinkedPaymentCount: unlinkedCount,
    });
  }

  function commit(storage, rosterKey, nextRoster, snapshots) {
    const before = storage.getItem(KEY);
    const records = merge(read(storage), snapshots);
    const archiveText = JSON.stringify(records);
    const rosterText = JSON.stringify(nextRoster);
    storage.setItem(KEY, archiveText);
    try {
      storage.setItem(rosterKey, rosterText);
    } catch (error) {
      // The student stays active if either durable write cannot finish.
      try { if (before === null) storage.removeItem(KEY); else storage.setItem(KEY, before); } catch (_) { /* Keeping an extra snapshot is safer than deleting history. */ }
      throw error;
    }
    return records;
  }

  function filter(records, query = "", year = "") {
    const q = query.trim().toLowerCase();
    return records.filter((r) => {
      const s = r.student;
      const haystack = [s.studentName, s.school, s.grade, s.parentPhone, s.parentPhone2, s.parentPhone3, s.parentPhone4, s.studentPhone, s.withdrawalReason].join(" ").toLowerCase();
      return (!q || haystack.includes(q)) && (!year || String(s.leaveDate || "").slice(0, 4) === year);
    }).sort((a, b) => String(b.student.leaveDate || "").localeCompare(String(a.student.leaveDate || "")) || String(b.archivedAt).localeCompare(String(a.archivedAt)));
  }

  const labels = {
    date: "날짜", status: "상태", subject: "과목", action: "구분", memo: "메모", text: "내용",
    unit: "학습 단원", understanding: "이해도", attitude: "수업 태도", homework: "과제",
    photoName: "첨부 파일명", photoData: "첨부 사진", registered: "등록일", paymentDate: "납부일",
    paymentDueDate: "납부 예정일", paymentName: "수납 항목", paymentMethod: "납부 방법", paymentType: "수납 구분",
    tuition: "교육비", baseTuition: "기본 교육비", paidAmount: "납부 금액", unpaidAmount: "미납 금액", discount: "할인 금액", paymentDiscount: "할인 금액",
    amount: "금액", method: "방법", bookFeeTitle: "교재명", bookFeeCount: "교재 수량", bookFeeAmount: "교재비", bookFees: "교재비 내역",
    subjectAllocations: "과목별 금액", paymentParts: "분납 내역", arriveTime: "등원 시각", leaveTime: "하원 시각",
    checkIn: "등원", checkOut: "하원", checkInTime: "등원 시각", checkOutTime: "하원 시각", time: "시각", minutes: "시간(분)",
    studentName: "학생명", school: "학교", grade: "학년", phone: "연락처", studentId: "학생 식별번호", id: "기록 번호",
    type: "구분", title: "제목", name: "이름", quantity: "수량", price: "단가", count: "수량", note: "참고사항",
    arrivalTime: "등원 시각", departureTime: "하원 시각", absentReason: "결석 사유", classSessions: "과목별 수업 기록", startTime: "수업 시작", endTime: "수업 종료",
    startDate: "휴원 시작일", expectedReturnDate: "복귀 예정일", endDate: "종료일", reason: "휴원 사유", endNote: "종료 참고사항", endedAs: "종료 처리", recordedAt: "기록일시", recordedBy: "기록자", endedAt: "종료 기록일시",
  };
  function detailValue(value, key) {
    if (key === "photoData") {
      return /^data:image\/(png|jpeg|jpg|webp|gif);base64,[A-Za-z0-9+/=\s]+$/.test(String(value))
        ? `<img class="withdrawal-photo" src="${esc(value)}" alt="보관된 학습 사진" />` : "첨부 사진을 표시할 수 없습니다.";
    }
    if (Array.isArray(value)) return value.length ? value.map((v) => detailValue(v, "")).join("<hr>") : "기록 없음";
    if (value && typeof value === "object") return `<dl class="withdrawal-values">${Object.entries(value).filter(([k, v]) => !["standalone", "autoDue", "preservePaymentName"].includes(k) && v !== "" && v !== null && v !== undefined).map(([k, v]) => `<div><dt>${esc(labels[k] || k)}</dt><dd>${detailValue(v, k)}</dd></div>`).join("")}</dl>`;
    return esc(value ?? "미기록");
  }
  function section(title, records) {
    return `<section class="withdrawal-section"><h3>${esc(title)}${Array.isArray(records) ? ` · ${records.length}건` : ""}</h3>${Array.isArray(records) ? (records.length ? records.map((r, i) => `<article class="withdrawal-entry"><h4>기록 ${i + 1}</h4>${detailValue(r, "")}</article>`).join("") : "<p>저장된 기록이 없습니다.</p>") : `<p class="withdrawal-text">${esc(records || "저장된 기록이 없습니다.")}</p>`}</section>`;
  }
  function body(record) {
    const s = record.student;
    const archivedTime = new Date(record.archivedAt).toLocaleString("ko-KR", { timeZone: "Asia/Seoul", hour12: false });
    const days = (s.attendanceDays || []).map((d) => ["일", "월", "화", "수", "목", "금", "토"][Number(d)]).filter(Boolean).join(" · ");
    const basics = [["학생명", s.studentName], ["학교 / 학년", [s.school, s.grade].filter(Boolean).join(" / ")], ["학생 식별번호", s.id], ["입회일", s.joinDate], ["퇴회일", s.leaveDate], ["퇴회 사유 / 참고사항", s.withdrawalReason], ["보호자명", s.parentName], ["학부모 연락처", [s.parentPhone, s.parentPhone2, s.parentPhone3, s.parentPhone4].filter(Boolean).join(" / ")], ["학생 연락처", s.studentPhone], ["담당교사", s.teacher], ["수강과목", [...(s.subjects || []), ...(s.gongpilSubjects || []).map((v) => `공필왕 ${v}`)].join(" · ")], ["등원요일", days], ["요일별 수업과목", s.weeklySubjectSchedule]];
    const payment = [["납부 상태", s.paymentStatus], ["납부 방법", s.paymentMethod], ["수납 항목", s.paymentName], ["교육비", s.tuition], ["납부 금액", s.paidAmount], ["미납 금액", s.unpaidAmount], ["납부 예정일", s.paymentDueDate], ["납부일", s.paymentDate], ["수납 메모", s.paymentMemo]];
    const pairs = (items) => `<dl class="withdrawal-values">${items.map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${esc(v === "" || v === null || v === undefined ? "미기록" : v)}</dd></div>`).join("")}</dl>`;
    return `<header><p>미래엔 에듀 영수학원 · 퇴회 기록</p><h2>${esc(s.studentName || "이름 미기록")} 학생 기록</h2><p>보관일시 ${esc(archivedTime)} (한국시간) · 기록자 ${esc(record.recordedBy || "미기록")}</p><p>${record.source === "backfill" ? "기존 퇴회 학생의 현재 남아 있는 자료를 보관했습니다. 퇴회 당시 원본과 다를 수 있습니다." : "퇴회 처리 시점에 저장된 사본입니다. 이후 수정·재입회 내용은 이 기록에 반영되지 않습니다."}</p></header>
      <section class="withdrawal-section"><h3>기본정보</h3>${pairs(basics)}</section>
      ${section("휴원·복귀 이력", s.pauseHistory || [])}${section("수강이력", s.courseHistory || [])}${section("출결 기록", s.attendanceRecords || [])}
      <section class="withdrawal-section"><h3>보관 시점의 납부정보</h3><p>아래 값은 사이트에 저장된 값이며, 최종 정산 완료 여부를 뜻하지 않습니다.</p>${pairs(payment)}</section>
      ${section("학생별 납부 기록", s.paymentRecords || [])}${section("학생이 확인된 별도 수납 기록", record.linkedPaymentRecords || [])}
      ${record.unlinkedPaymentCount ? `<p class="withdrawal-warning">같은 이름으로 된 별도 수납 ${record.unlinkedPaymentCount}건은 학생을 확정할 수 없거나 다른 학생의 자료여서 포함하지 않았습니다.</p>` : ""}
      ${section("상담 기록", s.counselingRecords)}${section("학습 피드백", s.feedbackRecords || [])}${section("현재 교재", s.currentBooks)}${section("완료 교재", s.completedBooks)}${section("보강 기록", s.makeupDateRecords)}${section("기타 메모", s.memo)}`;
  }
  const printCss = `body{font-family:"Malgun Gothic",sans-serif;color:#233b2c;margin:30px auto;padding:0 20px;max-width:900px;font-size:14px;line-height:1.65}h2{font-size:26px}h3{border-bottom:1px solid #ccd9cd;padding-bottom:8px}h4{margin:0 0 8px}header{border-bottom:2px solid #476c53}.withdrawal-section{margin-top:28px}.withdrawal-values{margin:0}.withdrawal-values>div{display:grid;grid-template-columns:150px minmax(0,1fr);gap:14px;padding:8px 0;border-bottom:1px solid #e8eee8}.withdrawal-values dt{font-weight:bold}.withdrawal-values dd{margin:0;white-space:pre-wrap;overflow-wrap:anywhere;min-width:0}.withdrawal-text{white-space:pre-wrap}.withdrawal-entry{margin:16px 0;padding:14px;background:#f7f9f7;border:1px solid #e2e9e2}.withdrawal-photo{max-width:100%;max-height:500px;object-fit:contain}.withdrawal-warning{padding:12px;background:#fff5db}@page{size:A4;margin:16mm}@media print{body{margin:0;padding:0;max-width:none}h3,h4{break-after:avoid}img{break-inside:avoid}.withdrawal-values>div{break-inside:avoid}}`;
  function documentHtml(record) { return `<!doctype html><html lang="ko"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(record.student.studentName)} 퇴회 기록</title><style>${printCss}</style><body>${body(record)}</body></html>`; }

  root.WithdrawalRecords = { KEY, read, validate, merge, capture, commit, filter, matchesPayment, body, documentHtml, esc };
})(typeof window !== "undefined" ? window : globalThis);
