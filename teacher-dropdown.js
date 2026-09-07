// Keeps the existing teacher field while showing simple role-based teacher names.
const RESPONSIBLE_TEACHERS = ["원장", "영어선생님", "중등수학선생님", "한글선생님"];

const LEGACY_TEACHER_LABELS = {
  박민영: "원장",
  "원장 박민영": "원장",
  박지민: "영어선생님",
  "영어 박지민": "영어선생님",
  "미래엔 영어": "영어선생님",
  원지영: "중등수학선생님",
  "중등수학 원지영": "중등수학선생님",
  "중등 수학": "중등수학선생님",
  "고등 수학": "중등수학선생님",
  박민진: "한글선생님",
  "한글 박민진": "한글선생님",
  "소한이 한글": "한글선생님",
  "소한이+요리수": "한글선생님",
  "국어+수학": "한글선생님",
};

function normalizeResponsibleTeacher(value = "") {
  const text = String(value || "").trim();
  if (!text || RESPONSIBLE_TEACHERS.includes(text)) return text;
  if (LEGACY_TEACHER_LABELS[text]) return LEGACY_TEACHER_LABELS[text];
  if (text.includes("박민영") || text.includes("원장")) return "원장";
  if (text.includes("박지민") || text.includes("영어")) return "영어선생님";
  if (text.includes("원지영") || text.includes("중등수학") || text.includes("중등 수학")) return "중등수학선생님";
  if (text.includes("박민진") || text.includes("한글") || text.includes("소한이") || text.includes("요리수")) return "한글선생님";
  return text;
}

function syncTeacherDropdown(selectedValue = $("teacher")?.value || "") {
  const select = $("teacher");
  if (!select) return;
  const normalizedValue = normalizeResponsibleTeacher(selectedValue);
  select.innerHTML = [
    `<option value="">선택 안 함</option>`,
    ...RESPONSIBLE_TEACHERS.map((teacherName) => `<option value="${escapeHtml(teacherName)}">${escapeHtml(teacherName)}</option>`),
  ].join("");
  select.value = RESPONSIBLE_TEACHERS.includes(normalizedValue) ? normalizedValue : "";
}

const teacherDropdownOriginalFillForm = fillForm;
fillForm = function (student) {
  teacherDropdownOriginalFillForm(student);
  const assignedTeacher = (student.subjects || []).includes("국어+수학")
    ? "한글선생님"
    : student.teacher || "";
  syncTeacherDropdown(assignedTeacher);
};

function migrateResponsibleTeacherLabels() {
  let changed = false;
  students.forEach((student) => {
    const normalized = (student.subjects || []).includes("국어+수학")
      ? "한글선생님"
      : normalizeResponsibleTeacher(student.teacher);
    if (RESPONSIBLE_TEACHERS.includes(normalized) && normalized !== student.teacher) {
      student.teacher = normalized;
      changed = true;
    }
  });
  if (changed) saveStudents();
  return changed;
}

document.querySelectorAll("input[name='subjects']").forEach((input) => {
  input.addEventListener("change", () => {
    if (input.value === "국어+수학" && input.checked) syncTeacherDropdown("한글선생님");
  });
});

migrateResponsibleTeacherLabels();
renderAll();
syncTeacherDropdown();
