// Uses the existing teacher field as a subject-only assignment dropdown.
const LEGACY_TEACHER_SUBJECTS = {
  박지민: "미래엔 영어",
  "영어 박지민": "미래엔 영어",
  박민진: "소한이+요리수",
  "한글 박민진": "소한이+요리수",
  원지영: "중등 수학",
  "중등수학 원지영": "중등 수학",
  박민영: "소한이+요리수",
  "원장 박민영": "소한이+요리수",
  "소한이 한글": "소한이+요리수",
};

const ASSIGNMENT_SUBJECTS = [
  ...SUBJECTS.filter((subject) => subject !== "소한이 한글"),
  "소한이+요리수",
];

function selectedTeacherSubjects() {
  const selected = Array.from(document.querySelectorAll("input[name='subjects']:checked")).map((item) => item.value);
  if (selected.includes("공필왕")) {
    Array.from(document.querySelectorAll("input[name='gongpilSubjects']:checked"))
      .forEach((item) => selected.push(`공필왕 ${item.value}`));
  }
  return uniqueValues(selected);
}

function teacherSubjectsForDropdown(selectedSubjects = []) {
  const normalizedSelectedSubjects = selectedSubjects.map((subject) => (
    subject === "소한이 한글" ? "소한이+요리수" : subject
  ));
  return uniqueValues([
    ...ASSIGNMENT_SUBJECTS,
    ...normalizedSelectedSubjects.filter((subject) => subject.startsWith("공필왕 ")),
  ])
    .sort((a, b) => {
      const aMatched = normalizedSelectedSubjects.includes(a) ? 0 : 1;
      const bMatched = normalizedSelectedSubjects.includes(b) ? 0 : 1;
      return aMatched - bMatched || a.localeCompare(b, "ko");
    });
}

function syncTeacherDropdown(selectedValue = $("teacher")?.value || "") {
  const select = $("teacher");
  if (!select) return;
  const selectedSubjects = selectedTeacherSubjects();
  const options = teacherSubjectsForDropdown(selectedSubjects);
  const normalizedValue = options.includes(selectedValue)
    ? selectedValue
    : LEGACY_TEACHER_SUBJECTS[selectedValue] || "";
  select.innerHTML = [
    `<option value="">선택 안 함</option>`,
    ...options.map((subject) => `<option value="${escapeHtml(subject)}">${escapeHtml(subject)}</option>`),
  ].join("");
  select.value = normalizedValue;
}

const teacherDropdownOriginalFillForm = fillForm;
fillForm = function (student) {
  teacherDropdownOriginalFillForm(student);
  syncTeacherDropdown(student.teacher || "");
};

const teacherDropdownOriginalRenderStaffAccounts = renderStaffAccounts;
renderStaffAccounts = function () {
  teacherDropdownOriginalRenderStaffAccounts();
  syncTeacherDropdown();
};

document.querySelectorAll("input[name='subjects'], input[name='gongpilSubjects']").forEach((input) => {
  input.addEventListener("change", () => syncTeacherDropdown());
});
syncTeacherDropdown();
