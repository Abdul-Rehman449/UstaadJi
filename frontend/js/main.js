/* =====================================================
   UstaadJi v2 — Language System
   Urdu (Default) ↔ English
   ===================================================== */

const Lang = {
  current: localStorage.getItem('uj_lang') || 'ur',

  set: function(lang) {
    this.current = lang;
    localStorage.setItem('uj_lang', lang);
    this.apply();
  },

  apply: function() {
    const isEn = this.current === 'en';

    // Body class
    document.body.classList.toggle('lang-en', isEn);

    // Toggle buttons
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lang === this.current);
    });

    // Show/hide elements
    document.querySelectorAll('[data-ur]').forEach(el => {
      el.textContent = isEn ? el.dataset.en : el.dataset.ur;
    });

    document.querySelectorAll('.ur-only').forEach(el => {
      el.style.display = isEn ? 'none' : '';
    });

    document.querySelectorAll('.en-only').forEach(el => {
      el.style.display = isEn ? '' : 'none';
    });

    // Placeholders
    document.querySelectorAll('[data-ph-ur]').forEach(el => {
      el.placeholder = isEn ? el.dataset.phEn : el.dataset.phUr;
    });

    // Page title
    const titleEl = document.querySelector('[data-title-ur]');
    if (titleEl) {
      document.title = isEn ? titleEl.dataset.titleEn : titleEl.dataset.titleUr;
    }
  },

  init: function() {
    this.apply();
    // Bind toggle buttons
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.addEventListener('click', () => this.set(btn.dataset.lang));
    });
  }
};

/* =====================================================
   AUTH SYSTEM
   ===================================================== */
const API_BASE = 'http://localhost:5000/api';

const Auth = {
  setToken: (t) => localStorage.setItem('uj_token', t),
  getToken: () => localStorage.getItem('uj_token'),
  setUser:  (u) => localStorage.setItem('uj_user', JSON.stringify(u)),
  getUser:  () => JSON.parse(localStorage.getItem('uj_user') || 'null'),
  logout: () => {
    localStorage.removeItem('uj_token');
    localStorage.removeItem('uj_user');
    window.location.href = '/login';
  },
  isLoggedIn: () => !!localStorage.getItem('uj_token'),
  redirectToDashboard: () => {
    const user = Auth.getUser();
    if (!user) return;
    const routes = { admin: '/admin', worker: '/worker-dashboard', customer: '/dashboard' };
    window.location.href = routes[user.role] || '/dashboard';
  }
};

// Redirect if logged in
if (Auth.isLoggedIn() && ['/login', '/register', '/'].includes(window.location.pathname)) {
  Auth.redirectToDashboard();
}

/* ── Alert ── */
function showAlert(type, urMsg, enMsg) {
  const el = document.getElementById('uj-alert');
  if (!el) return;
  const msg = (Lang.current === 'en' && enMsg) ? enMsg : urMsg;
  el.className = `uj-alert uj-alert-${type} show`;
  el.innerHTML = `<i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i> ${msg}`;
  setTimeout(() => el.classList.remove('show'), 5000);
}

/* ── Loading ── */
function setLoading(btnId, loading, urText, enText) {
  const btn = document.getElementById(btnId);
  if (!btn) return;
  btn.disabled = loading;
  const spinner = btn.querySelector('.spin');
  const text = btn.querySelector('.btn-text');
  if (spinner) spinner.style.display = loading ? 'block' : 'none';
  if (text) {
    if (loading) {
      text.textContent = Lang.current === 'en' ? 'Please wait...' : 'انتظار کریں...';
    } else {
      text.textContent = Lang.current === 'en' ? (enText || btn.dataset.en) : (urText || btn.dataset.ur);
    }
  }
}

function authHeader() {
  return { 'Authorization': `Bearer ${Auth.getToken()}` };
}

function requireAuth() {
  if (!Auth.isLoggedIn()) { window.location.href = '/login'; return; }
  const user = Auth.getUser();
  const name = document.getElementById('sidebar-name');
  const role = document.getElementById('sidebar-role');
  const avatar = document.getElementById('sidebar-avatar');
  if (name) name.textContent = user?.full_name || '';
  if (role) role.textContent = user?.role || '';
  if (avatar) avatar.textContent = (user?.full_name || 'U').charAt(0).toUpperCase();
}

/* ── Scroll Navbar ── */
window.addEventListener('scroll', () => {
  const nav = document.querySelector('.uj-nav');
  if (nav) nav.classList.toggle('scrolled', window.scrollY > 10);
});

/* ── Init ── */
document.addEventListener('DOMContentLoaded', () => {
  Lang.init();

  // Logout
  document.getElementById('logoutBtn')?.addEventListener('click', e => { e.preventDefault(); Auth.logout(); });
});
