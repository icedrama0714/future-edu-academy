/* Monthly admissions and withdrawals, including separately archived withdrawals. */
(function (root) {
  "use strict";

  const validDate = (value) => /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/.test(String(value || ""));
  const identity = (student) => String(student.id || [student.studentName, student.school, student.parentPhone].join("|")).trim();

  function collect(roster, archive, eligible) {
    const arrivals = new Map();
    const departures = new Map();
    const add = (map, kind, student, archivedAt = "") => {
      if (!student || !eligible(student)) return;
      const date = kind === "신규" ? student.joinDate : student.leaveDate;
      if (!validDate(date)) return;
      const key = `${identity(student)}|${date}`;
      const previous = map.get(key);
      if (!previous || String(archivedAt) > previous.archivedAt) {
        map.set(key, { kind, date, student, archivedAt: String(archivedAt) });
      }
    };
    (archive || []).forEach((record) => {
      const student = { ...record.student, id: record.studentId || record.student?.id };
      add(arrivals, "신규", student, record.archivedAt);
      add(departures, "퇴회", student, record.archivedAt);
    });
    (roster || []).forEach((student) => {
      // Keep an archived withdrawal snapshot when the live record still exists.
      add(arrivals, "신규", student);
      if (student.enrollmentStatus === "퇴회") add(departures, "퇴회", student);
    });
    return [...arrivals.values(), ...departures.values()];
  }

  root.StudentMovement = { collect };
  if (typeof document === "undefined") return;

  let selectedMonth = currentMonthText();
  const previousRenderAll = renderAll;
  const previousSwitchView = switchView;
  renderAll = function () { previousRenderAll(); renderMovement(); };
  switchView = function (view) { previousSwitchView(view); if (view === "movement") renderMovement(); };

  function renderMovement() {
    if (!$('movementYear')) return;
    if (!isDirector() || currentRoleMode !== "director") return;

    let archive = [];
    let archiveError = "";
    try { archive = WithdrawalRecords.read(localStorage); }
    catch (error) { archiveError = `퇴회 보관 기록을 읽지 못해 현재 학생자료만 표시합니다. ${error.message}`; }
    const events = collect(students, archive, isCountedStudent);
    const yearSelect = $("movementYear");
    const currentYear = currentMonthText().slice(0, 4);
    const previousYear = yearSelect.value || selectedMonth.slice(0, 4) || currentYear;
    const years = [...new Set([currentYear, ...events.map((event) => event.date.slice(0, 4))])].sort().reverse();
    yearSelect.innerHTML = years.map((year) => `<option value="${year}">${year}년</option>`).join("");
    yearSelect.value = years.includes(previousYear) ? previousYear : currentYear;
    const year = yearSelect.value;
    if (!selectedMonth.startsWith(year)) selectedMonth = `${year}-01`;

    const yearEvents = events.filter((event) => event.date.startsWith(year));
    const totalNew = yearEvents.filter((event) => event.kind === "신규").length;
    const totalLeft = yearEvents.length - totalNew;
    const net = totalNew - totalLeft;
    $("movementSummary").innerHTML = [
      ["연간 신규", `${totalNew}명`], ["연간 퇴회", `${totalLeft}명`],
      ["순증감", `${net > 0 ? "+" : ""}${net}명`],
    ].map(([label, value]) => `<div class="archive-summary-card"><span>${label}</span><strong>${value}</strong></div>`).join("");

    $("movementMonthRows").innerHTML = Array.from({ length: 12 }, (_, index) => {
      const month = `${year}-${String(index + 1).padStart(2, "0")}`;
      const monthEvents = yearEvents.filter((event) => event.date.startsWith(month));
      const added = monthEvents.filter((event) => event.kind === "신규").length;
      const left = monthEvents.length - added;
      const difference = added - left;
      return `<tr class="${month === selectedMonth ? "movement-selected" : ""}"><th scope="row">${index + 1}월</th><td>${added}명</td><td>${left}명</td><td>${difference > 0 ? "+" : ""}${difference}명</td><td><button type="button" class="ghost-button" data-movement-month="${month}" aria-label="${year}년 ${index + 1}월 신규 퇴회 상세 보기">상세 보기</button></td></tr>`;
    }).join("");

    const details = yearEvents.filter((event) => event.date.startsWith(selectedMonth))
      .sort((a, b) => a.date.localeCompare(b.date) || a.kind.localeCompare(b.kind, "ko") || String(a.student.studentName || "").localeCompare(String(b.student.studentName || ""), "ko"));
    $("movementDetailTitle").textContent = `${Number(selectedMonth.slice(5, 7))}월 신규·퇴회 명단`;
    $("movementDetailCount").textContent = `신규 ${details.filter((event) => event.kind === "신규").length}명 · 퇴회 ${details.filter((event) => event.kind === "퇴회").length}명`;
    $("movementDetailRows").innerHTML = details.length ? details.map(({ kind, date, student }) => {
      const subjects = Array.isArray(student.subjects) ? student.subjects.filter(Boolean).join(", ") : "";
      const tuition = Number(student.tuition);
      return `<tr><td>${kind}</td><td>${escapeHtml(date)}</td><th scope="row">${escapeHtml(student.studentName || "이름 미입력")}</th><td>${escapeHtml(student.school || "미입력")}</td><td>${escapeHtml(student.grade || "미입력")}</td><td>${escapeHtml(subjects || "미입력")}</td><td>${Number.isFinite(tuition) && tuition > 0 ? escapeHtml(money(tuition)) : "미입력"}</td></tr>`;
    }).join("") : `<tr><td colspan="7" class="movement-empty">선택한 달의 신규·퇴회 기록이 없습니다.</td></tr>`;
    $("movementStatus").textContent = archiveError;
  }

  $("movementYear").addEventListener("change", () => {
    const year = $("movementYear").value;
    let archive = [];
    try { archive = WithdrawalRecords.read(localStorage); } catch (_) { /* The roster remains usable. */ }
    const yearEvents = collect(students, archive, isCountedStudent).filter((event) => event.date.startsWith(year));
    selectedMonth = yearEvents.length ? yearEvents.map((event) => event.date.slice(0, 7)).sort().at(-1) : `${year}-01`;
    renderMovement();
  });
  $("movementMonthRows").addEventListener("click", (event) => {
    const button = event.target.closest("[data-movement-month]");
    if (!button) return;
    selectedMonth = button.dataset.movementMonth;
    renderMovement();
    $("movementDetailTitle").scrollIntoView({ block: "nearest" });
  });
  renderMovement();
})(typeof window === "undefined" ? globalThis : window);
