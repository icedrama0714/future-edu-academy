/* User-initiated sharing of a saved learning feedback; this is not an AlimTalk sender. */
(function (root) {
  "use strict";

  function formatMessage(student, record, academyName = "미래엔 에듀 영수학원") {
    const lines = [
      `[${academyName} 학습 피드백]`,
      `학생: ${student.studentName || "이름 미입력"}`,
      `날짜: ${record.date || "미입력"}`,
      record.subject ? `과목: ${record.subject}` : "",
      record.unit ? `교재/단원: ${record.unit}` : "",
      record.understanding ? `이해도: ${record.understanding}` : "",
      record.attitude ? `태도: ${record.attitude}` : "",
      record.homework ? `과제: ${record.homework}` : "",
      "",
      record.text || "",
      record.photoData ? "[학습 사진 있음]" : "",
    ];
    return lines.filter((line, index) => line || index === 8).join("\n").trim();
  }

  root.FeedbackKakaoShare = { formatMessage };
  if (typeof document === "undefined") return;

  const dialog = document.getElementById("feedbackShareDialog");
  if (!dialog) return;
  const byId = (id) => document.getElementById(id);
  const imageData = (value) => /^data:image\/(png|jpeg|webp|gif);base64,/i.test(String(value || ""));
  let current = null;

  function findCurrent() {
    const student = students.find((item) => item.id === current?.studentId);
    const record = student?.feedbackRecords?.find((item) => item.id === current?.recordId);
    return student && record ? { student, record } : null;
  }

  function setStatus(message) { byId("feedbackShareStatus").textContent = message; }

  root.openFeedbackShareDialog = function (recordId) {
    const student = students.find((item) => item.id === selectedId);
    const record = student?.feedbackRecords?.find((item) => item.id === recordId);
    if (!student || !record) {
      alert("저장된 피드백을 찾을 수 없습니다. 다시 저장한 뒤 시도해주세요.");
      return;
    }
    current = { studentId: student.id, recordId: record.id };
    const phones = [...new Set([student.parentPhone, student.parentPhone2, student.parentPhone3, student.parentPhone4].filter(Boolean))];
    byId("feedbackShareStudent").textContent = `${student.studentName || "이름 미입력"} · 보호자 연락처: ${phones.join(", ") || "미등록"}`;
    byId("feedbackShareText").value = formatMessage(student, record, kakaoSettings.channelName);
    const photoBox = byId("feedbackSharePhoto");
    photoBox.replaceChildren();
    const hasPhoto = imageData(record.photoData);
    if (hasPhoto) {
      const image = document.createElement("img");
      image.src = record.photoData;
      image.alt = record.photoName || "학습 사진";
      photoBox.append(image);
    }
    byId("feedbackPhotoDownloadBtn").classList.toggle("hidden", !hasPhoto);
    setStatus(hasPhoto ? "사진은 공유 앱이 지원할 때 함께 전달됩니다. 누락되면 사진 저장 후 카카오톡에 별도로 첨부해주세요." : "");
    dialog.showModal();
  };

  async function copyMessage() {
    const message = byId("feedbackShareText").value.trim();
    if (!message) { setStatus("전달할 내용을 입력해주세요."); return false; }
    try {
      if (!navigator.clipboard?.writeText) throw new Error("Clipboard API unavailable");
      await navigator.clipboard.writeText(message);
    } catch (_) {
      const field = byId("feedbackShareText");
      field.focus();
      field.select();
      if (!document.execCommand("copy")) { setStatus("자동 복사가 되지 않았습니다. 내용을 선택해 직접 복사해주세요."); return false; }
    }
    const photoHint = imageData(findCurrent()?.record.photoData) ? " 사진은 별도로 저장해 첨부해주세요." : "";
    setStatus(`내용을 복사했습니다. 카카오톡에서 학부모님 대화방을 확인한 뒤 붙여넣어 보내주세요.${photoHint}`);
    return true;
  }

  function photoFile(record) {
    if (!imageData(record.photoData)) return null;
    const [header, encoded] = record.photoData.split(",", 2);
    const mime = header.slice(5).split(";")[0];
    const binary = atob(encoded);
    const bytes = Uint8Array.from(binary, (character) => character.charCodeAt(0));
    const extension = mime.split("/")[1]?.replace("jpeg", "jpg") || "jpg";
    const safeName = String(record.photoName || `학습사진.${extension}`).split(/[\\/]/).at(-1);
    return new File([bytes], safeName, { type: mime });
  }

  byId("feedbackNativeShareBtn").addEventListener("click", async () => {
    const found = findCurrent();
    if (!found) { setStatus("피드백을 찾을 수 없습니다. 창을 닫고 다시 시도해주세요."); return; }
    const text = byId("feedbackShareText").value.trim();
    if (!text) { setStatus("전달할 내용을 입력해주세요."); return; }
    if (typeof navigator.share !== "function") {
      await copyMessage();
      return;
    }
    const payload = { title: `${found.student.studentName} 학습 피드백`, text };
    let photoIncluded = false;
    try {
      let file = null;
      try { file = photoFile(found.record); } catch (_) { /* Continue with text sharing. */ }
      if (file && navigator.canShare?.({ files: [file] })) {
        payload.files = [file];
        photoIncluded = true;
      }
      await navigator.share(payload);
      setStatus(photoIncluded
        ? "공유 메뉴로 글과 사진을 전달했습니다. 카카오톡에서 받는 사람과 실제 전송 여부를 확인해주세요."
        : "공유 메뉴로 글을 전달했습니다. 카카오톡에서 받는 사람과 실제 전송 여부를 확인해주세요. 사진은 필요하면 별도로 첨부해주세요.");
    } catch (error) {
      if (error.name !== "AbortError") setStatus("공유 메뉴를 열지 못했습니다. 내용 복사를 이용해주세요.");
    }
  });
  byId("feedbackCopyBtn").addEventListener("click", copyMessage);
  byId("feedbackPhotoDownloadBtn").addEventListener("click", () => {
    const record = findCurrent()?.record;
    if (!record || !imageData(record.photoData)) return;
    const link = document.createElement("a");
    link.href = record.photoData;
    link.download = String(record.photoName || "학습사진.jpg").split(/[\\/]/).at(-1);
    link.click();
    setStatus("사진을 저장했습니다. 카카오톡 대화방에 별도로 첨부할 수 있습니다.");
  });
  byId("feedbackShareCloseBtn").addEventListener("click", () => dialog.close());
  dialog.addEventListener("close", () => { current = null; });
})(typeof window === "undefined" ? globalThis : window);
