// Application State
let currentUser = null;
let currentPage = "dashboard";

// DOM Elements
const loginContainer = document.getElementById("login-container");
const mainApp = document.getElementById("main-app");
const loginForm = document.getElementById("login-form");
const loginBtn = document.getElementById("login-btn");
const errorMessage = document.getElementById("error-message");
const logoutBtn = document.getElementById("logout-btn");
const navItems = document.querySelectorAll(".nav-item");
const pages = document.querySelectorAll(".page");

// Initialize the application
document.addEventListener("DOMContentLoaded", function () {
  initializeApp();
});

function initializeApp() {
  // Check if user is already logged in (simplified check)
  const isLoggedIn = sessionStorage.getItem("isLoggedIn") === "true";

  if (isLoggedIn) {
    showMainApp();
  } else {
    showLoginScreen();
  }

  setupEventListeners();
}

function setupEventListeners() {
  // Login form submission
  loginForm.addEventListener("submit", handleLogin);

  // Logout button
  logoutBtn.addEventListener("click", handleLogout);

  // Navigation items
  navItems.forEach((item) => {
    item.addEventListener("click", function () {
      const page = this.getAttribute("data-page");
      navigateToPage(page);
    });
  });

  // Quick action buttons
  const quickActionBtns = document.querySelectorAll("[data-navigate]");
  quickActionBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      const page = this.getAttribute("data-navigate");
      navigateToPage(page);
    });
  });

  // Back to dashboard buttons
  const backBtns = document.querySelectorAll('[data-navigate="dashboard"]');
  backBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      navigateToPage("dashboard");
    });
  });
}

function handleLogin(e) {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  // Show loading state
  loginBtn.textContent = "ログイン中...";
  loginBtn.disabled = true;
  hideError();

  // Simulate API call
  setTimeout(() => {
    if (email === "admin@example.com" && password === "password") {
      // Successful login
      currentUser = { email: email };
      sessionStorage.setItem("isLoggedIn", "true");
      sessionStorage.setItem("userEmail", email);
      showMainApp();
    } else {
      // Failed login
      showError("メールアドレスまたはパスワードが正しくありません");
    }

    // Reset button state
    loginBtn.textContent = "ログイン";
    loginBtn.disabled = false;
  }, 1000);
}

function handleLogout() {
  currentUser = null;
  sessionStorage.removeItem("isLoggedIn");
  sessionStorage.removeItem("userEmail");
  showLoginScreen();

  // Reset form
  document.getElementById("email").value = "";
  document.getElementById("password").value = "";
  hideError();
}

function showLoginScreen() {
  loginContainer.style.display = "flex";
  mainApp.style.display = "none";
}

function showMainApp() {
  loginContainer.style.display = "none";
  mainApp.style.display = "grid";
  navigateToPage("dashboard");
}

function showError(message) {
  errorMessage.textContent = message;
  errorMessage.style.display = "block";
}

function hideError() {
  errorMessage.style.display = "none";
}

function navigateToPage(pageId) {
  // Update current page
  currentPage = pageId;

  // Hide all pages
  pages.forEach((page) => {
    page.classList.remove("active");
    page.style.display = "none";
  });

  // Show selected page
  const targetPage = document.getElementById(pageId + "-page");
  if (targetPage) {
    targetPage.classList.add("active");
    targetPage.style.display = "block";
  }

  // Update navigation active state
  navItems.forEach((item) => {
    item.classList.remove("active");
  });

  const activeNavItem = document.querySelector(`[data-page="${pageId}"]`);
  if (activeNavItem) {
    activeNavItem.classList.add("active");
  }
}

// Broadcast form functionality
function initializeBroadcastForm() {
  const messageTypeRadios = document.querySelectorAll(
    'input[name="messageType"]'
  );
  const targetRadios = document.querySelectorAll('input[name="target"]');

  // Handle message type changes
  messageTypeRadios.forEach((radio) => {
    radio.addEventListener("change", function () {
      handleMessageTypeChange(this.value);
    });
  });

  // Handle target changes
  targetRadios.forEach((radio) => {
    radio.addEventListener("change", function () {
      handleTargetChange(this.value);
    });
  });

  // Reset friend selection state when broadcast page is loaded
  friendSelectionInitialized = false;
  selectedFriends.clear();

  // Hide friend selection area initially
  const friendSelectionArea = document.getElementById('friend-selection-area');
  if (friendSelectionArea) {
    friendSelectionArea.style.display = 'none';
  }
}

function handleMessageTypeChange(type) {
  // Only text messages are supported
  console.log("Message type changed to:", type);
}

function handleTargetChange(target) {
  const friendSelectionArea = document.getElementById('friend-selection-area');

  if (target === 'segment') {
    // セグメント選択時は友達選択UIを表示
    friendSelectionArea.style.display = 'block';
    initializeFriendSelection();
  } else {
    // その他の場合は非表示
    friendSelectionArea.style.display = 'none';
  }

  console.log("Target changed to:", target);
}

// Individual support functionality
function initializeIndividualSupport() {
  const searchInput = document.querySelector(
    "#individual-page .search-box input"
  );

  if (searchInput) {
    searchInput.addEventListener("input", function () {
      filterFriends(this.value);
    });
  }

  // Message buttons
  const messageBtns = document.querySelectorAll(".friend-actions .btn-primary");
  messageBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      const friendItem = this.closest(".friend-item");
      if (friendItem) {
        const friendName = friendItem
          .querySelector(".friend-name")
          .textContent.trim();
        const friendId = friendItem
          .querySelector(".friend-id")
          .textContent.trim();
        const friendAvatar = friendItem
          .querySelector(".friend-avatar")
          .textContent.trim();
        openChat(friendName, friendId, friendAvatar);
      }
    });
  });
}

function filterFriends(searchTerm) {
  // Here you would implement friend filtering logic
  console.log("Filtering friends:", searchTerm);
}

// Settings functionality
function initializeSettings() {
  const saveButtons = document.querySelectorAll("#settings-page .btn-primary");

  saveButtons.forEach((btn) => {
    btn.addEventListener("click", function () {
      // Here you would implement settings save
      console.log("Saving settings...");

      // Show success message (simplified)
      alert("設定を保存しました");
    });
  });
}

// History page functionality
function initializeHistoryPage() {
  const searchInput = document.getElementById("history-search");
  const typeFilter = document.getElementById("history-type-filter");
  const statusFilter = document.getElementById("history-status-filter");

  if (searchInput) {
    searchInput.addEventListener("input", function () {
      filterHistoryTable();
    });
  }

  if (typeFilter) {
    typeFilter.addEventListener("change", function () {
      filterHistoryTable();
    });
  }

  if (statusFilter) {
    statusFilter.addEventListener("change", function () {
      filterHistoryTable();
    });
  }

  // Initialize action buttons
  const actionButtons = document.querySelectorAll("#history-table .btn");
  actionButtons.forEach((btn) => {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      const action = this.textContent.trim();
      const row = this.closest("tr");
      const title = row.querySelector("td:first-child").textContent.trim();

      handleHistoryAction(action, title, row);
    });
  });
}

function filterHistoryTable() {
  const searchTerm = document
    .getElementById("history-search")
    .value.toLowerCase();
  const typeFilter = document.getElementById("history-type-filter").value;
  const statusFilter = document.getElementById("history-status-filter").value;

  const rows = document.querySelectorAll("#history-table tbody tr");
  let visibleCount = 0;

  rows.forEach((row) => {
    const title = row
      .querySelector("td:nth-child(1)")
      .textContent.toLowerCase();
    const type = row.querySelector("td:nth-child(2)").textContent;
    const statusBadge = row.querySelector(".status-badge");
    const status = statusBadge ? statusBadge.textContent : "";

    const matchesSearch = title.includes(searchTerm);
    const matchesType = !typeFilter || type === typeFilter;
    const matchesStatus = !statusFilter || status === statusFilter;

    if (matchesSearch && matchesType && matchesStatus) {
      row.style.display = "";
      visibleCount++;
    } else {
      row.style.display = "none";
    }
  });

  // Update pagination info (simplified)
  const paginationInfo = document.querySelector(".pagination-info");
  if (paginationInfo && visibleCount > 0) {
    paginationInfo.textContent = `表示中: ${visibleCount} 件`;
  } else if (paginationInfo) {
    paginationInfo.textContent = "該当する履歴が見つかりません";
  }
}

function handleHistoryAction(action, title, row) {
  switch (action) {
    case "詳細":
      // Show delivery details modal or navigate to details page
      console.log("詳細表示:", title);
      alert(`${title} の詳細を表示します（実装予定）`);
      break;
    case "停止":
      // Stop ongoing delivery
      console.log("停止:", title);
      if (confirm(`${title} の配信を停止しますか？`)) {
        const statusBadge = row.querySelector(".status-badge");
        if (statusBadge) {
          statusBadge.textContent = "停止";
          statusBadge.className = "status-badge status-error";
        }
        // Update action button
        const actionBtn = row.querySelector(".btn-secondary");
        if (actionBtn && actionBtn.textContent.trim() === "停止") {
          actionBtn.textContent = "再開";
          actionBtn.className = "btn btn-primary btn-sm";
        }
      }
      break;
    case "再開":
      // Resume stopped delivery
      console.log("再開:", title);
      if (confirm(`${title} の配信を再開しますか？`)) {
        const statusBadge = row.querySelector(".status-badge");
        if (statusBadge) {
          statusBadge.textContent = "進行中";
          statusBadge.className = "status-badge status-progress";
        }
        // Update action button
        const actionBtn = row.querySelector(".btn-primary");
        if (actionBtn && actionBtn.textContent.trim() === "再開") {
          actionBtn.textContent = "停止";
          actionBtn.className = "btn btn-secondary btn-sm";
        }
      }
      break;
    default:
      console.log("Unknown action:", action);
  }
}

// Statistics animation (optional enhancement)
function animateStats() {
  const statNumbers = document.querySelectorAll(".stat-number");

  statNumbers.forEach((stat) => {
    const finalValue = stat.textContent;
    const isPercent = finalValue.includes("%");
    const numericValue = parseFloat(finalValue.replace(/[,%]/g, ""));

    if (!isNaN(numericValue)) {
      animateNumber(stat, 0, numericValue, isPercent, finalValue.includes(","));
    }
  });
}

function animateNumber(element, start, end, isPercent, hasComma) {
  const duration = 2000;
  const startTime = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);

    const current = start + (end - start) * easeOutCubic(progress);

    let displayValue = Math.floor(current).toString();

    if (hasComma && current >= 1000) {
      displayValue = current.toLocaleString();
    }

    if (isPercent) {
      displayValue += "%";
    }

    element.textContent = displayValue;

    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }

  requestAnimationFrame(update);
}

function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}

// Initialize page-specific functionality when navigating
const originalNavigateToPage = navigateToPage;
navigateToPage = function (pageId) {
  originalNavigateToPage(pageId);

  // Initialize page-specific functionality
  switch (pageId) {
    case "broadcast":
      initializeBroadcastForm();
      break;
    case "step":
      initializeScenarioModal();
      initializeScenarioEditModal();
      break;
    case "individual":
      initializeIndividualSupport();
      break;
    case "history":
      initializeHistoryPage();
      break;
    case "settings":
      initializeSettings();
      break;
    case "dashboard":
      // Animate stats when dashboard loads
      setTimeout(animateStats, 100);
      break;
  }
};

// Additional utility functions
function formatNumber(num) {
  return num.toLocaleString();
}

function formatDate(date) {
  return new Date(date).toLocaleDateString("ja-JP");
}

function formatDateTime(date) {
  return new Date(date).toLocaleString("ja-JP");
}

// Mobile navigation toggle (for responsive design)
function toggleMobileNav() {
  const sidebar = document.querySelector(".sidebar");
  sidebar.classList.toggle("mobile-open");
}

// Add mobile nav toggle button (if needed)
if (window.innerWidth <= 768) {
  const header = document.querySelector(".app-header .header-content");
  const mobileNavBtn = document.createElement("button");
  mobileNavBtn.innerHTML = "☰";
  mobileNavBtn.className = "mobile-nav-toggle";
  mobileNavBtn.style.cssText = `
    background: transparent;
    border: none;
    color: white;
    font-size: 20px;
    cursor: pointer;
    padding: 5px;
  `;
  mobileNavBtn.addEventListener("click", toggleMobileNav);
  header.insertBefore(mobileNavBtn, header.firstChild);
}

// Handle window resize
window.addEventListener("resize", function () {
  if (window.innerWidth > 768) {
    const sidebar = document.querySelector(".sidebar");
    sidebar.classList.remove("mobile-open");
  }
});

// Form validation helpers
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function validateRequired(value) {
  return value && value.trim().length > 0;
}

// Add enhanced form validation to login
const originalHandleLogin = handleLogin;
handleLogin = function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  // Validate inputs
  if (!validateRequired(email) || !validateRequired(password)) {
    showError("メールアドレスとパスワードを入力してください");
    return;
  }

  if (!validateEmail(email)) {
    showError("有効なメールアドレスを入力してください");
    return;
  }

  originalHandleLogin(e);
};

// Chat functionality
let currentChatUser = null;

function openChat(friendName, friendId, friendAvatar) {
  currentChatUser = { name: friendName, id: friendId, avatar: friendAvatar };

  // Update chat header with friend info
  document.getElementById("chat-user-name").textContent = friendName;
  document.getElementById("chat-user-id").textContent = friendId;
  document.getElementById("chat-avatar").textContent = friendAvatar;

  // Show chat modal
  const chatModal = document.getElementById("chat-modal");
  chatModal.style.display = "flex";

  // Clear input and focus
  const chatInput = document.getElementById("chat-input");
  chatInput.value = "";
  setTimeout(() => chatInput.focus(), 100);

  // Scroll to bottom of messages
  scrollToBottom();

  // Initialize chat event listeners if not already done
  initializeChatEventListeners();
}

function closeChat() {
  const chatModal = document.getElementById("chat-modal");
  chatModal.style.display = "none";
  currentChatUser = null;
}

function initializeChatEventListeners() {
  // Prevent multiple event listeners
  if (window.chatEventListenersInitialized) return;
  window.chatEventListenersInitialized = true;

  // Close button
  document
    .getElementById("chat-close-btn")
    .addEventListener("click", closeChat);

  // Send button
  document
    .getElementById("chat-send-btn")
    .addEventListener("click", sendMessage);

  // Enter key to send (Shift+Enter for new line)
  document
    .getElementById("chat-input")
    .addEventListener("keydown", function (e) {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
      }
    });

  // Close modal when clicking outside
  document.getElementById("chat-modal").addEventListener("click", function (e) {
    if (e.target === this) {
      closeChat();
    }
  });

  // Auto-resize textarea
  document.getElementById("chat-input").addEventListener("input", function () {
    this.style.height = "auto";
    this.style.height = Math.min(this.scrollHeight, 120) + "px";
  });
}

function sendMessage() {
  const chatInput = document.getElementById("chat-input");
  const messageText = chatInput.value.trim();

  if (!messageText) return;

  // Create message element
  const message = createMessageElement(messageText, true);

  // Add to chat messages
  const chatMessages = document.getElementById("chat-messages");
  chatMessages.appendChild(message);

  // Clear input and reset height
  chatInput.value = "";
  chatInput.style.height = "auto";

  // Scroll to bottom
  scrollToBottom();

  // Simulate auto-reply after 1-3 seconds (for demo purposes)
  setTimeout(() => {
    simulateAutoReply(messageText);
  }, Math.random() * 2000 + 1000);
}

function createMessageElement(text, isSent = false, timestamp = null) {
  const messageDiv = document.createElement("div");
  messageDiv.className = `message ${
    isSent ? "message-sent" : "message-received"
  }`;

  const now = timestamp || new Date();
  const timeString = now
    .toLocaleString("ja-JP", {
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    })
    .replace(/\//g, "-");

  messageDiv.innerHTML = `
    <div class="message-content">
      <div class="message-text">${escapeHtml(text)}</div>
      <div class="message-time">${timeString}</div>
    </div>
  `;

  return messageDiv;
}

function simulateAutoReply(originalMessage) {
  // Simple auto-reply logic for demo
  let replyText = "";

  if (
    originalMessage.includes("こんにちは") ||
    originalMessage.includes("こんばんは")
  ) {
    replyText = "こんにちは！お疲れ様です。";
  } else if (originalMessage.includes("ありがとう")) {
    replyText = "どういたしまして！他にご質問はございますか？";
  } else if (
    originalMessage.includes("商品") ||
    originalMessage.includes("製品")
  ) {
    replyText = "商品についてご質問ですね。詳しくご説明させていただきます。";
  } else if (
    originalMessage.includes("価格") ||
    originalMessage.includes("値段")
  ) {
    replyText = "価格についてご案内いたします。詳細をお送りしますね。";
  } else if (
    originalMessage.includes("配送") ||
    originalMessage.includes("発送")
  ) {
    replyText = "配送について確認いたします。少々お待ちください。";
  } else {
    const responses = [
      "ご連絡ありがとうございます。確認いたします。",
      "承知いたしました。詳細をお調べいたします。",
      "お返事ありがとうございます。対応させていただきます。",
      "ご質問いただき、ありがとうございます。",
      "すぐに確認して、ご連絡いたします。",
    ];
    replyText = responses[Math.floor(Math.random() * responses.length)];
  }

  // Add reply message
  const replyMessage = createMessageElement(replyText, false);
  const chatMessages = document.getElementById("chat-messages");
  chatMessages.appendChild(replyMessage);

  // Scroll to bottom
  scrollToBottom();
}

function scrollToBottom() {
  const chatMessages = document.getElementById("chat-messages");
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

// New Scenario Creation Modal functionality
let scenarioModalInitialized = false;

function initializeScenarioModal() {
  if (scenarioModalInitialized) return;
  scenarioModalInitialized = true;

  const modal = document.getElementById("scenario-modal");
  const closeBtn = document.getElementById("scenario-close-btn");
  const cancelBtn = document.getElementById("scenario-cancel-btn");
  const createBtn = document.getElementById("scenario-create-btn");
  const deliveryTimingRadios = document.querySelectorAll(
    'input[name="deliveryTiming"]'
  );

  // Open modal
  const newScenarioBtn = document.querySelector("#step-page .btn-primary");
  if (newScenarioBtn) {
    newScenarioBtn.addEventListener("click", function () {
      openScenarioModal();
    });
  }

  // Close modal events
  closeBtn.addEventListener("click", closeScenarioModal);
  cancelBtn.addEventListener("click", closeScenarioModal);

  // Close modal when clicking outside
  modal.addEventListener("click", function (e) {
    if (e.target === modal) {
      closeScenarioModal();
    }
  });

  // Delivery timing change handler
  deliveryTimingRadios.forEach((radio) => {
    radio.addEventListener("change", function () {
      handleDeliveryTimingChange(this.value);
    });
  });

  // Create scenario handler
  createBtn.addEventListener("click", handleScenarioCreation);

  // Add input event listeners for real-time preview
  const daysInput = document.getElementById("scenario-days");
  const timeInput = document.getElementById("scenario-time");

  if (daysInput) {
    daysInput.addEventListener("input", updateTimingPreview);
  }
  if (timeInput) {
    timeInput.addEventListener("input", updateTimingPreview);
  }
}

function openScenarioModal() {
  const modal = document.getElementById("scenario-modal");
  modal.style.display = "flex";

  // Reset form
  document.getElementById("scenario-name").value = "";
  document.getElementById("scenario-description").value = "";
  document.querySelector(
    'input[name="deliveryTiming"][value="immediate"]'
  ).checked = true;
  document.getElementById("scenario-days").value = "0";
  document.getElementById("scenario-time").value = "09:00";
  document.getElementById("scheduled-group").style.display = "none";

  // Reset preview
  updateTimingPreview();

  // Focus on scenario name input
  setTimeout(() => {
    document.getElementById("scenario-name").focus();
  }, 100);
}

function closeScenarioModal() {
  const modal = document.getElementById("scenario-modal");
  modal.style.display = "none";
}

function handleDeliveryTimingChange(timing) {
  const scheduledGroup = document.getElementById("scheduled-group");

  if (timing === "scheduled") {
    scheduledGroup.style.display = "block";
    // Initialize preview
    updateTimingPreview();
  } else {
    scheduledGroup.style.display = "none";
  }
}

function handleScenarioCreation() {
  const scenarioName = document.getElementById("scenario-name").value.trim();
  const scenarioDescription = document
    .getElementById("scenario-description")
    .value.trim();
  const deliveryTiming = document.querySelector(
    'input[name="deliveryTiming"]:checked'
  ).value;
  const scheduledDays = document.getElementById("scenario-days").value;
  const scheduledTime = document.getElementById("scenario-time").value;

  // Validation
  if (!scenarioName) {
    alert("シナリオ名を入力してください");
    return;
  }

  if (deliveryTiming === "scheduled") {
    if (!scheduledDays || scheduledDays < 0 || scheduledDays > 30) {
      alert("経過日数を0〜30日の範囲で指定してください");
      return;
    }
    if (!scheduledTime) {
      alert("配信時間を指定してください");
      return;
    }
  }

  // Create scenario object
  const newScenario = {
    name: scenarioName,
    description: scenarioDescription,
    deliveryTiming: deliveryTiming,
    scheduledDays:
      deliveryTiming === "scheduled" ? parseInt(scheduledDays) : null,
    scheduledTime: deliveryTiming === "scheduled" ? scheduledTime : null,
    createdAt: new Date().toISOString(),
  };

  console.log("Creating new scenario:", newScenario);

  // Show success message with timing info
  let successMessage = `シナリオ「${scenarioName}」を作成しました！`;
  if (deliveryTiming === "scheduled") {
    successMessage += `\n配信タイミング: ステップ開始から${scheduledDays}日後の${scheduledTime}`;
  }
  alert(successMessage);

  // Close modal
  closeScenarioModal();

  // Here you would typically send the data to the server
  // and refresh the scenarios list
}

// Update timing preview function
function updateTimingPreview() {
  const daysInput = document.getElementById("scenario-days");
  const timeInput = document.getElementById("scenario-time");
  const previewDays = document.getElementById("preview-days");
  const previewTime = document.getElementById("preview-time");

  if (daysInput && timeInput && previewDays && previewTime) {
    const days = daysInput.value || "0";
    const time = timeInput.value || "09:00";

    previewDays.textContent = days;
    previewTime.textContent = time;
  }
}

// Update timing preview function for edit modal
function updateEditTimingPreview() {
  const daysInput = document.getElementById("edit-scenario-days");
  const timeInput = document.getElementById("edit-scenario-time");
  const previewDays = document.getElementById("edit-preview-days");
  const previewTime = document.getElementById("edit-preview-time");

  if (daysInput && timeInput && previewDays && previewTime) {
    const days = daysInput.value || "0";
    const time = timeInput.value || "09:00";

    previewDays.textContent = days;
    previewTime.textContent = time;
  }
}

// Scenario Edit Modal functionality
let scenarioEditModalInitialized = false;
let currentEditScenarioId = null;

function initializeScenarioEditModal() {
  if (scenarioEditModalInitialized) return;
  scenarioEditModalInitialized = true;

  const modal = document.getElementById("scenario-edit-modal");
  const closeBtn = document.getElementById("scenario-edit-close-btn");
  const cancelBtn = document.getElementById("scenario-edit-cancel-btn");
  const saveBtn = document.getElementById("scenario-edit-save-btn");
  const editDeliveryTimingRadios = document.querySelectorAll(
    'input[name="editDeliveryTiming"]'
  );

  // Edit button event listeners
  const editButtons = document.querySelectorAll(".scenario-edit-btn");
  editButtons.forEach((btn) => {
    btn.addEventListener("click", function () {
      const scenarioCard = this.closest(".scenario-card");
      if (scenarioCard) {
        openScenarioEditModal(scenarioCard);
      }
    });
  });

  // Close modal events
  closeBtn.addEventListener("click", closeScenarioEditModal);
  cancelBtn.addEventListener("click", closeScenarioEditModal);

  // Close modal when clicking outside
  modal.addEventListener("click", function (e) {
    if (e.target === modal) {
      closeScenarioEditModal();
    }
  });

  // Delivery timing change handler
  editDeliveryTimingRadios.forEach((radio) => {
    radio.addEventListener("change", function () {
      handleEditDeliveryTimingChange(this.value);
    });
  });

  // Save scenario handler
  saveBtn.addEventListener("click", handleScenarioUpdate);

  // Add input event listeners for real-time preview
  const editDaysInput = document.getElementById("edit-scenario-days");
  const editTimeInput = document.getElementById("edit-scenario-time");

  if (editDaysInput) {
    editDaysInput.addEventListener("input", updateEditTimingPreview);
  }
  if (editTimeInput) {
    editTimeInput.addEventListener("input", updateEditTimingPreview);
  }
}

function openScenarioEditModal(scenarioCard) {
  const modal = document.getElementById("scenario-edit-modal");

  // Get scenario data from attributes
  currentEditScenarioId = scenarioCard.getAttribute("data-scenario-id");
  const scenarioName = scenarioCard.getAttribute("data-scenario-name");
  const scenarioDescription = scenarioCard.getAttribute(
    "data-scenario-description"
  );
  const deliveryTiming = scenarioCard.getAttribute("data-delivery-timing");
  const scheduledDays = scenarioCard.getAttribute("data-scheduled-days") || "0";
  const scheduledTime =
    scenarioCard.getAttribute("data-scheduled-time") || "09:00";

  // Populate form with existing data
  document.getElementById("edit-scenario-name").value = scenarioName;
  document.getElementById("edit-scenario-description").value =
    scenarioDescription;

  // Set delivery timing
  document.querySelector(
    `input[name="editDeliveryTiming"][value="${deliveryTiming}"]`
  ).checked = true;

  if (deliveryTiming === "scheduled") {
    document.getElementById("edit-scenario-days").value = scheduledDays;
    document.getElementById("edit-scenario-time").value = scheduledTime;
    document.getElementById("edit-scheduled-group").style.display = "block";
  } else {
    document.getElementById("edit-scheduled-group").style.display = "none";
  }

  // Update preview
  updateEditTimingPreview();

  // Show modal
  modal.style.display = "flex";

  // Focus on scenario name input
  setTimeout(() => {
    document.getElementById("edit-scenario-name").focus();
  }, 100);
}

function closeScenarioEditModal() {
  const modal = document.getElementById("scenario-edit-modal");
  modal.style.display = "none";
  currentEditScenarioId = null;
}

function handleEditDeliveryTimingChange(timing) {
  const scheduledGroup = document.getElementById("edit-scheduled-group");

  if (timing === "scheduled") {
    scheduledGroup.style.display = "block";
    updateEditTimingPreview();
  } else {
    scheduledGroup.style.display = "none";
  }
}

function handleScenarioUpdate() {
  const scenarioName = document
    .getElementById("edit-scenario-name")
    .value.trim();
  const scenarioDescription = document
    .getElementById("edit-scenario-description")
    .value.trim();
  const deliveryTiming = document.querySelector(
    'input[name="editDeliveryTiming"]:checked'
  ).value;
  const scheduledDays = document.getElementById("edit-scenario-days").value;
  const scheduledTime = document.getElementById("edit-scenario-time").value;

  // Validation
  if (!scenarioName) {
    alert("シナリオ名を入力してください");
    return;
  }

  if (deliveryTiming === "scheduled") {
    if (!scheduledDays || scheduledDays < 0 || scheduledDays > 30) {
      alert("経過日数を0〜30日の範囲で指定してください");
      return;
    }
    if (!scheduledTime) {
      alert("配信時間を指定してください");
      return;
    }
  }

  // Update scenario object
  const updatedScenario = {
    id: currentEditScenarioId,
    name: scenarioName,
    description: scenarioDescription,
    deliveryTiming: deliveryTiming,
    scheduledDays:
      deliveryTiming === "scheduled" ? parseInt(scheduledDays) : null,
    scheduledTime: deliveryTiming === "scheduled" ? scheduledTime : null,
    updatedAt: new Date().toISOString(),
  };

  console.log("Updating scenario:", updatedScenario);

  // Update the scenario card in the UI
  updateScenarioCardInUI(updatedScenario);

  // Show success message
  let successMessage = `シナリオ「${scenarioName}」を更新しました！`;
  if (deliveryTiming === "scheduled") {
    successMessage += `\n配信タイミング: ステップ開始から${scheduledDays}日後の${scheduledTime}`;
  }
  alert(successMessage);

  // Close modal
  closeScenarioEditModal();

  // Here you would typically send the data to the server
}

function updateScenarioCardInUI(scenario) {
  const scenarioCard = document.querySelector(
    `[data-scenario-id="${scenario.id}"]`
  );
  if (scenarioCard) {
    // Update data attributes
    scenarioCard.setAttribute("data-scenario-name", scenario.name);
    scenarioCard.setAttribute(
      "data-scenario-description",
      scenario.description
    );
    scenarioCard.setAttribute("data-delivery-timing", scenario.deliveryTiming);

    if (scenario.deliveryTiming === "scheduled") {
      scenarioCard.setAttribute("data-scheduled-days", scenario.scheduledDays);
      scenarioCard.setAttribute("data-scheduled-time", scenario.scheduledTime);
    } else {
      scenarioCard.removeAttribute("data-scheduled-days");
      scenarioCard.removeAttribute("data-scheduled-time");
    }

    // Update visible elements
    const nameElement = scenarioCard.querySelector(".scenario-header h3");
    const descriptionElement = scenarioCard.querySelector(
      ".scenario-description"
    );

    if (nameElement) nameElement.textContent = scenario.name;
    if (descriptionElement)
      descriptionElement.textContent = scenario.description;
  }
}

// Friend Selection functionality
let friendsData = [];
let selectedFriends = new Set();
let friendSelectionInitialized = false;

// Sample friends data (in a real app, this would come from an API)
const sampleFriendsData = [
  { id: 'U001234', name: '田中太郎', avatar: '田' },
  { id: 'U005678', name: '佐藤花子', avatar: '佐' },
  { id: 'U009876', name: '山田次郎', avatar: '山' },
  { id: 'U005432', name: '鈴木美咲', avatar: '鈴' },
  { id: 'U001122', name: '高橋健太', avatar: '高' },
  { id: 'U003344', name: '伊藤麻衣', avatar: '伊' },
  { id: 'U005566', name: '渡辺晴彦', avatar: '渡' },
  { id: 'U007788', name: '中村優子', avatar: '中' },
  { id: 'U009900', name: '小林大輔', avatar: '小' },
  { id: 'U001199', name: '加藤美穂', avatar: '加' }
];

function initializeFriendSelection() {
  if (friendSelectionInitialized) return;
  friendSelectionInitialized = true;

  // Initialize friends data
  friendsData = [...sampleFriendsData];
  selectedFriends.clear();

  // Render friends list
  renderFriendsList();

  // Set up event listeners
  setupFriendSelectionEventListeners();
}

function setupFriendSelectionEventListeners() {
  const searchInput = document.getElementById('friend-search');
  const selectAllBtn = document.getElementById('select-all-friends');
  const deselectAllBtn = document.getElementById('deselect-all-friends');

  // Search functionality
  if (searchInput) {
    searchInput.addEventListener('input', function() {
      const searchTerm = this.value.toLowerCase();
      filterFriendsList(searchTerm);
    });
  }

  // Select all button
  if (selectAllBtn) {
    selectAllBtn.addEventListener('click', function() {
      selectAllVisibleFriends();
    });
  }

  // Deselect all button
  if (deselectAllBtn) {
    deselectAllBtn.addEventListener('click', function() {
      deselectAllFriends();
    });
  }
}

function renderFriendsList(filteredFriends = null) {
  const friendsList = document.getElementById('friends-selection-list');
  if (!friendsList) return;

  const friendsToRender = filteredFriends || friendsData;

  friendsList.innerHTML = '';

  friendsToRender.forEach(friend => {
    const friendItem = createFriendSelectionItem(friend);
    friendsList.appendChild(friendItem);
  });

  updateSelectedCount();
}

function createFriendSelectionItem(friend) {
  const itemDiv = document.createElement('div');
  itemDiv.className = 'friend-selection-item';
  itemDiv.setAttribute('data-friend-id', friend.id);

  const isSelected = selectedFriends.has(friend.id);
  if (isSelected) {
    itemDiv.classList.add('selected');
  }

  itemDiv.innerHTML = `
    <input type="checkbox" class="friend-checkbox" ${isSelected ? 'checked' : ''}>
    <div class="friend-selection-avatar">${friend.avatar}</div>
    <div class="friend-selection-info">
      <div class="friend-selection-name">${friend.name}</div>
      <div class="friend-selection-id">ID: ${friend.id}</div>
    </div>
  `;

  // Add click event listener
  itemDiv.addEventListener('click', function() {
    toggleFriendSelection(friend.id);
  });

  // Prevent checkbox click from bubbling
  const checkbox = itemDiv.querySelector('.friend-checkbox');
  checkbox.addEventListener('click', function(e) {
    e.stopPropagation();
    toggleFriendSelection(friend.id);
  });

  return itemDiv;
}

function toggleFriendSelection(friendId) {
  const friendItem = document.querySelector(`[data-friend-id="${friendId}"]`);
  const checkbox = friendItem.querySelector('.friend-checkbox');

  if (selectedFriends.has(friendId)) {
    selectedFriends.delete(friendId);
    friendItem.classList.remove('selected');
    checkbox.checked = false;
  } else {
    selectedFriends.add(friendId);
    friendItem.classList.add('selected');
    checkbox.checked = true;
  }

  updateSelectedCount();
}

function selectAllVisibleFriends() {
  const visibleItems = document.querySelectorAll('.friend-selection-item');

  visibleItems.forEach(item => {
    const friendId = item.getAttribute('data-friend-id');
    if (!selectedFriends.has(friendId)) {
      selectedFriends.add(friendId);
      item.classList.add('selected');
      item.querySelector('.friend-checkbox').checked = true;
    }
  });

  updateSelectedCount();
}

function deselectAllFriends() {
  selectedFriends.clear();

  const allItems = document.querySelectorAll('.friend-selection-item');
  allItems.forEach(item => {
    item.classList.remove('selected');
    item.querySelector('.friend-checkbox').checked = false;
  });

  updateSelectedCount();
}

function filterFriendsList(searchTerm) {
  if (!searchTerm.trim()) {
    renderFriendsList();
    return;
  }

  const filteredFriends = friendsData.filter(friend =>
    friend.name.toLowerCase().includes(searchTerm) ||
    friend.id.toLowerCase().includes(searchTerm)
  );

  renderFriendsList(filteredFriends);
}

function updateSelectedCount() {
  const countElement = document.getElementById('selected-friends-count');
  if (countElement) {
    countElement.textContent = selectedFriends.size;
  }
}

// Helper function to get selected friends data
function getSelectedFriendsData() {
  return friendsData.filter(friend => selectedFriends.has(friend.id));
}
