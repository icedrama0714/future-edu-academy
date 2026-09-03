// Temporary enrollment pauses; no student data is bundled in this file.
const StudentPause = (() => {
  const copy = (value) => JSON.parse(JSON.stringify(value));
  function history(student) {
    if (student.pauseHistory == null) return [];
    if (!Array.isArray(student.pauseHistory)) throw Error("휴원 이력 형식을 확인해주세요. 기존 기록은 유지됩니다.");
    return copy(student.pauseHistory);
  }
  function validDate(value) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(value || "")) return false;
    const d = new Date(value + "T00:00:00Z");
    return Number.isFinite(d.getTime()) && d.toISOString().slice(0, 10) === value;
  }
  function start(student, input, meta) {
    if (!validDate(input.startDate) || input.startDate > meta.today) throw Error("휴원 시작일은 오늘 또는 이전 날짜로 입력해주세요.");
    if (input.expectedReturnDate && (!validDate(input.expectedReturnDate) || input.expectedReturnDate < input.startDate)) throw Error("복귀 예정일은 휴원 시작일 이후로 입력해주세요.");
    const records = history(student);
    if (records.some((r) => !r.endDate)) throw Error("진행 중인 휴원 기록이 있습니다. 복귀 처리 후 새 휴원을 등록해주세요.");
    if (records.some((r) => r.endDate > input.startDate)) throw Error("이전 휴원 종료일보다 앞선 날짜로 새 휴원을 시작할 수 없습니다.");
    records.push({ id: meta.id, startDate: input.startDate, expectedReturnDate: input.expectedReturnDate || "", endDate: "", reason: input.reason || "", recordedAt: meta.now, recordedBy: meta.actor });
    return { ...student, enrollmentStatus: "휴원", pauseHistory: records };
  }
  function end(student, input, meta) {
    if (!validDate(input.endDate) || input.endDate > meta.today) throw Error("처리일은 오늘 또는 이전 날짜로 입력해주세요.");
    const records = history(student);
    let active = records.findLast((r) => !r.endDate);
    if (active && active.startDate && input.endDate < active.startDate) throw Error("복귀 또는 종료일은 휴원 시작일 이후로 입력해주세요.");
    if (!active) {
      // Older paused students have no start date. Do not invent one.
      active = { id: meta.id, startDate: "", expectedReturnDate: "", endDate: "", reason: "기존 휴원 — 시작일 미기록", recordedAt: meta.now, recordedBy: meta.actor };
      records.push(active);
    }
    active.endDate = input.endDate;
    active.endedAs = input.status;
    active.endNote = input.note || "";
    active.endedAt = meta.now;
    return { ...student, enrollmentStatus: input.status, pauseHistory: records };
  }
  function pausedOn(student, date) {
    return history(student).some((r) => r.startDate && date >= r.startDate && (!r.endDate || date < r.endDate));
  }
  return { history, start, end, pausedOn };
})();

let pendingPauseChange = null;
const pauseOriginalReadForm = readFormWithExistingFeedback;
const pauseOriginalSaveStudent = saveStudentData;
const pauseOriginalFillForm = fillForm;
const pauseOriginalShowDetail = showStudentDetail;
const pauseOriginalRenderRows = renderRows;
const pauseOriginalListMode = studentMatchesListMode;
const pauseOriginalScheduled = isStudentScheduledOnDate;
const pauseOriginalWithdrawal = commitStudentWithdrawal;

function pauseMeta() { return { id: createId(), today: currentDateText(), now: new Date().toISOString(), actor: currentActor().name }; }
readFormWithExistingFeedback = function (options = {}) {
  const data = pauseOriginalReadForm(options);
  data.pauseHistory = StudentPause.history(students.find((s) => s.id === data.id) || data);
  return data;
};
saveStudentData = function (data) {
  const previous = students.find((s) => s.id === data.id);
  data.pauseHistory = StudentPause.history(previous || data);
  if (previous?.enrollmentStatus !== "휴원" && data.enrollmentStatus === "휴원") {
    openPauseStudentDialog(previous, data);
    return;
  }
  if (previous?.enrollmentStatus === "휴원" && data.enrollmentStatus !== "휴원" && data.enrollmentStatus !== "퇴회") {
    if (!isDirector()) { alert("휴원·복귀 처리는 원장 계정에서 가능합니다."); return; }
    try { data = StudentPause.end(data, { endDate: currentDateText(), status: data.enrollmentStatus }, pauseMeta()); }
    catch (error) { alert(error.message); return; }
    persistPauseStudent(data, "휴원 종료");
    return;
  }
  return pauseOriginalSaveStudent(data);
};
commitStudentWithdrawal = function (data) {
  const previous = students.find((s) => s.id === data.id);
  if (previous?.enrollmentStatus === "휴원") {
    try {
      Object.assign(data, StudentPause.end({ ...data, pauseHistory: StudentPause.history(previous) }, { endDate: data.leaveDate || currentDateText(), status: "퇴회", note: "휴원 중 퇴회" }, pauseMeta()));
    } catch (error) { alert(error.message); return false; }
  } else data.pauseHistory = StudentPause.history(previous || data);
  return pauseOriginalWithdrawal(data);
};
fillForm = function (student) { pauseOriginalFillForm(student); renderPauseStudentDetail(student); };
showStudentDetail = function (show) { pauseOriginalShowDetail(show); if (!show) $("pauseStudentBtn")?.classList.add("hidden"); };
studentMatchesListMode = function (student) {
  const status = $("studentStatusFilter")?.value || "";
  return pauseOriginalListMode(student) && (!status || student.enrollmentStatus === status);
};
renderRows = function () {
  if (studentListMode !== "all" && $("studentStatusFilter")) $("studentStatusFilter").value = "";
  pauseOriginalRenderRows();
  $("studentRows")?.querySelectorAll("tr[data-id]").forEach((row) => {
    const student = students.find((s) => s.id === row.dataset.id);
    if (student?.enrollmentStatus !== "휴원") return;
    const badge = document.createElement("span");
    badge.className = "pause-state-badge";
    badge.textContent = "휴원";
    row.querySelector(".name-cell strong")?.appendChild(badge);
  });
};
isStudentScheduledOnDate = function (student, date) { return pauseOriginalScheduled(student, date) && !StudentPause.pausedOn(student, date); };

function renderPauseStudentDetail(student) {
  const button = $("pauseStudentBtn");
  const saved = students.some((s) => s.id === student.id);
  button.classList.toggle("hidden", !saved);
  button.disabled = !isDirector() || !["재원", "휴원"].includes(student.enrollmentStatus);
  button.textContent = student.enrollmentStatus === "휴원" ? "복귀" : "휴원";
  const records = StudentPause.history(student).reverse();
  $("pauseHistoryCount").textContent = `${records.length}건`;
  $("pauseHistoryList").innerHTML = records.length ? records.map((r) => `<article><strong>${escapeHtml(r.startDate || "시작일 미기록")} → ${escapeHtml(r.endDate || "휴원 중")}</strong><p>${r.endDate ? `종료: ${escapeHtml(r.endedAs === "재원" ? "복귀" : r.endedAs || "종료")}` : `복귀 예정: ${escapeHtml(r.expectedReturnDate || "미정")}`}</p><p>${escapeHtml(r.reason || "사유 미기록")}</p>${r.endNote ? `<p>${escapeHtml(r.endNote)}</p>` : ""}</article>`).join("") : '<p class="archive-note">아직 휴원·복귀 이력이 없습니다.</p>';
}

function openPauseStudentDialog(previous, draft) {
  if (!isDirector()) { alert("휴원·복귀 처리는 원장 계정에서 가능합니다."); return; }
  if (previous?.enrollmentStatus === "퇴회") { alert("퇴회 학생은 재입회 처리한 뒤 휴원할 수 있습니다."); return; }
  const data = draft || previous;
  if (!data || !data.studentName?.trim()) { alert("학생정보를 먼저 입력해주세요."); return; }
  const resume = !draft && previous?.enrollmentStatus === "휴원";
  pendingPauseChange = { data, resume, originalStatus: previous?.enrollmentStatus || "" };
  $("pauseDialogTitle").textContent = resume ? "복귀 처리" : "휴원 처리";
  $("pauseDialogStudent").textContent = `${data.studentName} · ${data.school || ""} ${data.grade || ""}`;
  $("pauseActionDateLabel").textContent = resume ? "복귀일" : "휴원 시작일";
  $("pauseActionDate").value = currentDateText();
  $("pauseActionDate").max = currentDateText();
  $("pauseExpectedReturn").value = "";
  $("pauseExpectedReturnLabel").classList.toggle("hidden", resume);
  $("pauseReasonLabel").textContent = resume ? "복귀 참고사항 (선택)" : "휴원 사유 / 참고사항 (선택)";
  $("pauseReason").value = "";
  $("pauseDialogError").textContent = "";
  $("savePauseStudentBtn").textContent = resume ? "복귀 저장" : "휴원 저장";
  $("pauseDialogNote").textContent = resume ? "저장하면 재원 상태로 돌아갑니다. 기존 수강과목과 등원요일을 유지합니다." : "저장하면 휴원 상태로 바뀝니다. 복귀 예정일이 지나도 자동 복귀하지 않으며, 복귀 버튼으로 처리합니다.";
  $("pauseStudentDialog").showModal();
}

function persistPauseStudent(data, title) {
  const exists = students.some((s) => s.id === data.id);
  const next = exists ? students.map((s) => s.id === data.id ? data : s) : [data, ...students];
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); }
  catch (_) { $("pauseDialogError").textContent = "저장하지 못했습니다. 기존 상태와 기록을 유지했습니다. 저장 공간을 확인해주세요."; alert("휴원·복귀 기록을 저장하지 못했습니다. 기존 학생 상태는 유지됩니다."); return false; }
  students = next;
  selectedId = data.id;
  addChangeLog("학생관리", title, `${data.studentName} · ${data.enrollmentStatus}`);
  renderAll();
  fillForm(data);
  return true;
}

function savePauseStudent(event) {
  event.preventDefault();
  if (!pendingPauseChange || !isDirector()) return;
  const pending = pendingPauseChange;
  const current = students.find((s) => s.id === pending.data.id);
  if ((current?.enrollmentStatus || "") !== pending.originalStatus) { $("pauseDialogError").textContent = "학생 상태가 변경되었습니다. 창을 닫고 다시 선택해주세요."; return; }
  try {
    const base = { ...pending.data, pauseHistory: StudentPause.history(current || pending.data) };
    const next = pending.resume
      ? StudentPause.end(base, { endDate: $("pauseActionDate").value, status: "재원", note: $("pauseReason").value.trim() }, pauseMeta())
      : StudentPause.start(base, { startDate: $("pauseActionDate").value, expectedReturnDate: $("pauseExpectedReturn").value, reason: $("pauseReason").value.trim() }, pauseMeta());
    if (!persistPauseStudent(next, pending.resume ? "휴원 후 복귀" : "휴원 처리")) return;
    $("pauseStudentDialog").close();
    pendingPauseChange = null;
  } catch (error) { $("pauseDialogError").textContent = error.message; }
}

$("pauseStudentBtn")?.addEventListener("click", () => openPauseStudentDialog(students.find((s) => s.id === selectedId)));
$("pauseStudentForm")?.addEventListener("submit", savePauseStudent);
$("cancelPauseStudentBtn")?.addEventListener("click", () => { pendingPauseChange = null; $("pauseStudentDialog").close(); });
$("pauseStudentDialog")?.addEventListener("cancel", () => { pendingPauseChange = null; });
$("studentStatusFilter")?.addEventListener("change", () => { studentListMode = "all"; studentSummaryGrade = ""; renderRows(); });
if (selectedId) { const s = students.find((s) => s.id === selectedId); if (s) renderPauseStudentDetail(s); }
renderRows();
