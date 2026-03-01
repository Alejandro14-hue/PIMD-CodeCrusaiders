const loginBtn = document.getElementById('login-btn');
const logoutBtn = document.getElementById('logout-btn');
const userInfo = document.getElementById('user-info');
const userEmail = document.getElementById('user-email');

async function checkAuth() {
  try {
    const response = await fetch('/auth/me');
    if (response.ok) {
      const user = await response.json();
      if (user.error) {
        showLogin();
      } else {
        showUser(user);
      }
    } else {
      showLogin();
    }
  } catch (error) {
    console.error("Auth check failed", error);
    showLogin();
  }
}

function showLogin() {
  loginBtn.style.display = 'block';
  userInfo.style.display = 'none';
}

function showUser(user) {
  loginBtn.style.display = 'none';
  userInfo.style.display = 'block';
  userEmail.textContent = user.email || user.name || "User";
}

loginBtn.addEventListener('click', () => {
  window.location.href = '/auth/login';
});

logoutBtn.addEventListener('click', () => {
  window.location.href = '/auth/logout';
});

checkAuth();