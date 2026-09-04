// Keeps the saved teacher text compatible while replacing free text with a staff-backed dropdown.
function selectedTeacherSubjects() {
  const selected = Array.from(document.querySelectorAll("input[name='subjects']:checked")).map((item) => item.value);
  if (selected.includes("공필왕")) {
    Array.from(document.querySelectorAll("input[name='gongpilSubjects']:checked"))
      .forEach((item) => selected.push(`공필왕 ${item.value}`));
  }
  return uniqueValues(selected);
}

function teacherAccountsForDropdown(subjects = []) {
  return userAccounts
    .filter((account) => account.role === "teacher")
    .map((account) => ({
      value: staffPublicName(account),
      subject: STAFF_SUBJECTS.includes(account.defaultSubject) ? account.defaultSubject : "",
    }))
    .filter((item, index, items) => item.value && items.findIndex((candidate) => candidate.value === item.value) === index)
    .sort((a, b) => {
      const aMatched = a.subject && subjects.includes(a.subject) ? 0 : 1;
      const bMatched = b.subject && subjects.includes(b.subject) ? 0 : 1;
      return aMatched - bMatched || a.value.localeCompare(b.value, "ko");
    });
}

function syncTeacherDropdown(selectedValue = $("teacher")?.value || "") {
  const select = $("teacher");
  if (!select) return;
  const subjects = selectedTeacherSubjects();
  const options = teacherAccountsForDropdown(subjects);
  if (selectedValue && !options.some((item) => item.value === selectedValue)) {
    options.unshift({ value: selectedValue, subject: "기존 지정" });
  }
  select.innerHTML = [
    `<option value="">선택 안 함</option>`,
    ...options.map((item) => {
      const subject = item.subject || "과목 미지정";
      return `<option value="${escapeHtml(item.value)}">${escapeHtml(subject)} · ${escapeHtml(item.value)}</option>`;
    }),
  ].join("");
  select.value = selectedValue;
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
