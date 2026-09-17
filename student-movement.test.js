const test = require("node:test");
const assert = require("node:assert/strict");
require("./student-movement.js");

const eligible = (student) => student.recordType !== "staff" && student.studentName !== "test";

test("counts current and archived students without double-counting the same event", () => {
  const withdrawn = { id: "a", studentName: "학생A", joinDate: "2026-04-02", leaveDate: "2026-09-05", enrollmentStatus: "퇴회" };
  const archive = [{ studentId: "a", archivedAt: "2026-09-05T12:00:00Z", student: withdrawn }];
  const events = StudentMovement.collect([withdrawn], archive, eligible);
  assert.equal(events.filter((event) => event.kind === "신규").length, 1);
  assert.equal(events.filter((event) => event.kind === "퇴회").length, 1);
});

test("includes deleted withdrawals, but excludes staff, tests, and missing dates", () => {
  const archive = [{ studentId: "b", archivedAt: "2026-08-12", student: {
    id: "b", studentName: "학생B", joinDate: "2026-01-10", leaveDate: "2026-08-12", tuition: 120000,
  } }];
  const roster = [
    { id: "staff", studentName: "교사", recordType: "staff", joinDate: "2026-01-01" },
    { id: "test", studentName: "test", joinDate: "2026-01-02" },
    { id: "undated", studentName: "학생C", joinDate: "" },
  ];
  const events = StudentMovement.collect(roster, archive, eligible);
  assert.deepEqual(events.map((event) => event.date), ["2026-01-10", "2026-08-12"]);
});

test("keeps an earlier withdrawal when the same student reenrolls", () => {
  const oldRecord = { id: "a", studentName: "학생A", joinDate: "2025-03-01", leaveDate: "2025-12-20" };
  const current = { id: "a", studentName: "학생A", joinDate: "2026-04-01", leaveDate: "", enrollmentStatus: "재원" };
  const events = StudentMovement.collect([current], [{ studentId: "a", archivedAt: "2025-12-20", student: oldRecord }], eligible);
  assert.deepEqual(events.map((event) => `${event.kind}:${event.date}`), [
    "신규:2025-03-01", "신규:2026-04-01", "퇴회:2025-12-20",
  ]);
});
