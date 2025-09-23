// Application State
let currentUser = null;
let currentPage = 'dashboard';

// DOM Elements
const loginContainer = document.getElementById('login-container');
const mainApp = document.getElementById('main-app');
const loginForm = document.getElementById('login-form');
const loginBtn = document.getElementById('login-btn');
const errorMessage = document.getElementById('error-message');
const logoutBtn = document.getElementById('logout-btn');
const navItems = document.querySelectorAll('.nav-item');
const pages = document.querySelectorAll('.page');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
  initializeApp();
});

function initializeApp() {
  // Check if user is already logged in (simplified check)
  const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';

  if (isLoggedIn) {
    showMainApp();
  } else {
    showLoginScreen();
  }

  setupEventListeners();
}

function setupEventListeners() {
  // Login form submission
  loginForm.addEventListener('submit', handleLogin);

  // Logout button
  logoutBtn.addEventListener('click', handleLogout);

  // Navigation items
  navItems.forEach(item => {
    item.addEventListener('click', function() {
      const page = this.getAttribute('data-page');
      navigateToPage(page);
    });
  });

  // Quick action buttons
  const quickActionBtns = document.querySelectorAll('[data-navigate]');
  quickActionBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const page = this.getAttribute('data-navigate');
      navigateToPage(page);
    });
  });

  // Back to dashboard buttons
  const backBtns = document.querySelectorAll('[data-navigate="dashboard"]');
  backBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      navigateToPage('dashboard');
    });
  });
}

function handleLogin(e) {
  e.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  // Show loading state
  loginBtn.textContent = 'ログイン中...';
  loginBtn.disabled = true;
  hideError();

  // Simulate API call
  setTimeout(() => {
    if (email === 'admin@example.com' && password === 'password') {
      // Successful login
      currentUser = { email: email };
      sessionStorage.setItem('isLoggedIn', 'true');
      sessionStorage.setItem('userEmail', email);
      showMainApp();
    } else {
      // Failed login
      showError('メールアドレスまたはパスワードが正しくありません');
    }

    // Reset button state
    loginBtn.textContent = 'ログイン';
    loginBtn.disabled = false;
  }, 1000);
}

function handleLogout() {
  currentUser = null;
  sessionStorage.removeItem('isLoggedIn');
  sessionStorage.removeItem('userEmail');
  showLoginScreen();

  // Reset form
  document.getElementById('email').value = '';
  document.getElementById('password').value = '';
  hideError();
}

function showLoginScreen() {
  loginContainer.style.display = 'flex';
  mainApp.style.display = 'none';
}

function showMainApp() {
  loginContainer.style.display = 'none';
  mainApp.style.display = 'grid';
  navigateToPage('dashboard');
}

function showError(message) {
  errorMessage.textContent = message;
  errorMessage.style.display = 'block';
}

function hideError() {
  errorMessage.style.display = 'none';
}

function navigateToPage(pageId) {
  // Update current page
  currentPage = pageId;

  // Hide all pages
  pages.forEach(page => {
    page.classList.remove('active');
    page.style.display = 'none';
  });

  // Show selected page
  const targetPage = document.getElementById(pageId + '-page');
  if (targetPage) {
    targetPage.classList.add('active');
    targetPage.style.display = 'block';
  }

  // Update navigation active state
  navItems.forEach(item => {
    item.classList.remove('active');
  });

  const activeNavItem = document.querySelector(`[data-page="${pageId}"]`);
  if (activeNavItem) {
    activeNavItem.classList.add('active');
  }
}

// Broadcast form functionality
function initializeBroadcastForm() {
  const messageTypeRadios = document.querySelectorAll('input[name="messageType"]');
  const targetRadios = document.querySelectorAll('input[name="target"]');

  // Handle message type changes
  messageTypeRadios.forEach(radio => {
    radio.addEventListener('change', function() {
      handleMessageTypeChange(this.value);
    });
  });

  // Handle target changes
  targetRadios.forEach(radio => {
    radio.addEventListener('change', function() {
      handleTargetChange(this.value);
    });
  });
}

function handleMessageTypeChange(type) {
  // Here you would show/hide image upload section
  console.log('Message type changed to:', type);
}

function handleTargetChange(target) {
  // Here you would show/hide segment/tag selection
  console.log('Target changed to:', target);
}

// Individual support functionality
function initializeIndividualSupport() {
  const searchInput = document.querySelector('#individual-page .search-box input');
  const filterSelect = document.querySelector('#individual-page .filter-tags select');

  if (searchInput) {
    searchInput.addEventListener('input', function() {
      filterFriends(this.value, filterSelect.value);
    });
  }

  if (filterSelect) {
    filterSelect.addEventListener('change', function() {
      filterFriends(searchInput.value, this.value);
    });
  }

  // Message buttons
  const messageBtns = document.querySelectorAll('.friend-actions .btn-primary');
  messageBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      // Here you would open chat interface
      console.log('Opening chat...');
    });
  });
}

function filterFriends(searchTerm, tagFilter) {
  // Here you would implement friend filtering logic
  console.log('Filtering friends:', searchTerm, tagFilter);
}

// Settings functionality
function initializeSettings() {
  const saveButtons = document.querySelectorAll('#settings-page .btn-primary');

  saveButtons.forEach(btn => {
    btn.addEventListener('click', function() {
      // Here you would implement settings save
      console.log('Saving settings...');

      // Show success message (simplified)
      alert('設定を保存しました');
    });
  });
}

// Statistics animation (optional enhancement)
function animateStats() {
  const statNumbers = document.querySelectorAll('.stat-number');

  statNumbers.forEach(stat => {
    const finalValue = stat.textContent;
    const isPercent = finalValue.includes('%');
    const numericValue = parseFloat(finalValue.replace(/[,%]/g, ''));

    if (!isNaN(numericValue)) {
      animateNumber(stat, 0, numericValue, isPercent, finalValue.includes(','));
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
      displayValue += '%';
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
navigateToPage = function(pageId) {
  originalNavigateToPage(pageId);

  // Initialize page-specific functionality
  switch(pageId) {
    case 'broadcast':
      initializeBroadcastForm();
      break;
    case 'individual':
      initializeIndividualSupport();
      break;
    case 'settings':
      initializeSettings();
      break;
    case 'dashboard':
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
  return new Date(date).toLocaleDateString('ja-JP');
}

function formatDateTime(date) {
  return new Date(date).toLocaleString('ja-JP');
}

// Mobile navigation toggle (for responsive design)
function toggleMobileNav() {
  const sidebar = document.querySelector('.sidebar');
  sidebar.classList.toggle('mobile-open');
}

// Add mobile nav toggle button (if needed)
if (window.innerWidth <= 768) {
  const header = document.querySelector('.app-header .header-content');
  const mobileNavBtn = document.createElement('button');
  mobileNavBtn.innerHTML = '☰';
  mobileNavBtn.className = 'mobile-nav-toggle';
  mobileNavBtn.style.cssText = `
    background: transparent;
    border: none;
    color: white;
    font-size: 20px;
    cursor: pointer;
    padding: 5px;
  `;
  mobileNavBtn.addEventListener('click', toggleMobileNav);
  header.insertBefore(mobileNavBtn, header.firstChild);
}

// Handle window resize
window.addEventListener('resize', function() {
  if (window.innerWidth > 768) {
    const sidebar = document.querySelector('.sidebar');
    sidebar.classList.remove('mobile-open');
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
handleLogin = function(e) {
  e.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  // Validate inputs
  if (!validateRequired(email) || !validateRequired(password)) {
    showError('メールアドレスとパスワードを入力してください');
    return;
  }

  if (!validateEmail(email)) {
    showError('有効なメールアドレスを入力してください');
    return;
  }

  originalHandleLogin(e);
};