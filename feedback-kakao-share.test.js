const test = require("node:test");
const assert = require("node:assert/strict");
require("./feedback-kakao-share.js");

test("formats a saved feedback without adding the parent's phone to the message", () => {
  const student = { studentName: "학생A", parentPhone: "010-0000-0000" };
  const record = {
    date: "2026-09-18", subject: "문해력", unit: "3단원", understanding: "좋음",
    attitude: "집중", homework: "12쪽 읽기", text: "오늘 내용을 잘 이해했습니다.",
  };
  const message = FeedbackKakaoShare.formatMessage(student, record, "테스트 학원");
  assert.match(message, /학생A/);
  assert.match(message, /문해력/);
  assert.match(message, /오늘 내용을 잘 이해했습니다/);
  assert.doesNotMatch(message, /010-0000-0000/);
});

test("notes that a learning photo is expected", () => {
  const message = FeedbackKakaoShare.formatMessage(
    { studentName: "학생B" },
    { date: "2026-09-18", photoData: "data:image/jpeg;base64,AA==" },
  );
  assert.match(message, /학습 사진 있음/);
});
