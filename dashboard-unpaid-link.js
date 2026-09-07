// Keeps the dashboard unpaid shortcut independent from the larger form event setup.
function openDashboardUnpaidList() {
  const monthFilter = document.getElementById("paymentMonthFilter");
  const statusFilter = document.getElementById("paymentStatusFilter");
  const searchInput = document.getElementById("paymentSearchInput");
  const filterTools = document.querySelector(".payment-table-tools");

  if (monthFilter && typeof currentMonthText === "function") monthFilter.value = currentMonthText();
  if (statusFilter) statusFilter.value = "미납";
  if (searchInput) searchInput.value = "";
  if (filterTools) {
    filterTools.classList.remove("hidden");
    filterTools.setAttribute("aria-hidden", "false");
  }
  if (typeof switchView === "function") switchView("payments");
  if (typeof renderPaymentOverview === "function") renderPaymentOverview();

  window.requestAnimationFrame(() => {
    document.getElementById("paymentOverview")?.scrollIntoView({ block: "start" });
  });
}

const dashboardUnpaidCard = document.getElementById("monthlyUnpaidCard");
if (dashboardUnpaidCard) {
  dashboardUnpaidCard.setAttribute("aria-label", "이번 달 미납 목록 보기");
  dashboardUnpaidCard.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopImmediatePropagation();
    openDashboardUnpaidList();
  }, true);
}
