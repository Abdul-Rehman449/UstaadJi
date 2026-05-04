/* =====================================================
   UstaadJi v2 — Dashboard Shared JS
   ===================================================== */

// ── Sidebar builder ──────────────────────────────────
function buildSidebar(activeLink) {
  const user = Auth.getUser();
  if (!user) { window.location.href = '/login'; return; }

  const isCustomer = user.role === 'customer';
  const isWorker   = user.role === 'worker';
  const isAdmin    = user.role === 'admin';

  // Nav items per role
  const customerLinks = `
    <span class="sidebar-section-title" data-ur="مین" data-en="Main">مین</span>
    <a class="sidebar-link ${activeLink==='dashboard'?'active':''}" href="/dashboard">
      <i class="fas fa-th-large"></i>
      <span data-ur="ڈیش بورڈ" data-en="Dashboard">ڈیش بورڈ</span>
    </a>
    <span class="sidebar-section-title" data-ur="خدمات" data-en="Services">خدمات</span>
    <a class="sidebar-link ${activeLink==='workers'?'active':''}" href="/workers">
      <i class="fas fa-hard-hat"></i>
      <span data-ur="کاریگر تلاش کریں" data-en="Find Workers">کاریگر تلاش کریں</span>
    </a>
    <a class="sidebar-link ${activeLink==='ai-recommend'?'active':''}" href="/ai-recommend">
      <i class="fas fa-robot"></i>
      <span data-ur="AI سفارش ✨" data-en="AI Recommend ✨">AI سفارش ✨</span>
    </a>
    <span class="sidebar-section-title" data-ur="میری سرگرمی" data-en="My Activity">میری سرگرمی</span>
    <a class="sidebar-link ${activeLink==='my-bookings'?'active':''}" href="/my-bookings">
      <i class="fas fa-calendar-check"></i>
      <span data-ur="میری بکنگز" data-en="My Bookings">میری بکنگز</span>
    </a>
    <a class="sidebar-link ${activeLink==='profile'?'active':''}" href="/profile">
      <i class="fas fa-user-cog"></i>
      <span data-ur="پروفائل" data-en="Profile">پروفائل</span>
    </a>
  `;

  const workerLinks = `
    <span class="sidebar-section-title" data-ur="مین" data-en="Main">مین</span>
    <a class="sidebar-link ${activeLink==='worker-dashboard'?'active':''}" href="/worker-dashboard">
      <i class="fas fa-th-large"></i>
      <span data-ur="ڈیش بورڈ" data-en="Dashboard">ڈیش بورڈ</span>
    </a>
    <span class="sidebar-section-title" data-ur="بکنگز" data-en="Bookings">بکنگز</span>
    <a class="sidebar-link ${activeLink==='pending'?'active':''}" href="#" onclick="window.showTab&&showTab('pending')">
      <i class="fas fa-clock"></i>
      <span data-ur="نئی درخواستیں" data-en="New Requests">نئی درخواستیں</span>
    </a>
    <a class="sidebar-link" href="#" onclick="window.showTab&&showTab('accepted')">
      <i class="fas fa-tools"></i>
      <span data-ur="جاری کام" data-en="Active Jobs">جاری کام</span>
    </a>
    <a class="sidebar-link" href="#" onclick="window.showTab&&showTab('completed')">
      <i class="fas fa-check-circle"></i>
      <span data-ur="مکمل کام" data-en="Completed">مکمل کام</span>
    </a>
    <span class="sidebar-section-title" data-ur="پروفائل" data-en="Profile">پروفائل</span>
    <a class="sidebar-link ${activeLink==='profile'?'active':''}" href="/profile">
      <i class="fas fa-user-cog"></i>
      <span data-ur="پروفائل ترمیم" data-en="Edit Profile">پروفائل ترمیم</span>
    </a>
  `;

  const adminLinks = `
    <span class="sidebar-section-title" data-ur="ایڈمن پینل" data-en="Admin Panel">ایڈمن پینل</span>
    <a class="sidebar-link ${activeLink==='admin'?'active':''}" href="/admin">
      <i class="fas fa-th-large"></i>
      <span data-ur="ڈیش بورڈ" data-en="Dashboard">ڈیش بورڈ</span>
    </a>
    <a class="sidebar-link" href="#" onclick="window.loadSection&&loadSection('users')">
      <i class="fas fa-users"></i>
      <span data-ur="تمام صارفین" data-en="All Users">تمام صارفین</span>
    </a>
    <a class="sidebar-link" href="#" onclick="window.loadSection&&loadSection('workers')">
      <i class="fas fa-hard-hat"></i>
      <span data-ur="کاریگر" data-en="Workers">کاریگر</span>
    </a>
    <a class="sidebar-link" href="#" onclick="window.loadSection&&loadSection('bookings')">
      <i class="fas fa-calendar"></i>
      <span data-ur="تمام بکنگز" data-en="All Bookings">تمام بکنگز</span>
    </a>
  `;

  const links = isCustomer ? customerLinks : isWorker ? workerLinks : adminLinks;

  document.getElementById('uj-sidebar').innerHTML = `
    <div class="sidebar-brand">
      <div class="sidebar-brand-mark">🛠️</div>
      <span class="sidebar-brand-name">Ustaad<span>Ji</span></span>
    </div>

    <div class="sidebar-user">
      <div class="sidebar-avatar">${user.full_name.charAt(0).toUpperCase()}</div>
      <div class="sidebar-user-info">
        <div class="sidebar-user-name">${user.full_name}</div>
        <div class="sidebar-user-role">${user.role}</div>
      </div>
    </div>

    <nav class="sidebar-nav">
      ${links}
      <a class="sidebar-link danger" href="#" id="logoutBtn">
        <i class="fas fa-sign-out-alt"></i>
        <span data-ur="لاگ آؤٹ" data-en="Logout">لاگ آؤٹ</span>
      </a>
    </nav>

    <div class="sidebar-lang">
      <div class="lang-toggle">
        <button class="lang-btn" data-lang="ur">اردو</button>
        <button class="lang-btn" data-lang="en">EN</button>
      </div>
    </div>
  `;

  // Re-init lang + logout after building sidebar
  Lang.init();
  document.getElementById('logoutBtn')?.addEventListener('click', e => { e.preventDefault(); Auth.logout(); });
}

// ── Quick action card ─────────────────────────────────
function quickActionCard(emoji, urLabel, enLabel, href, color='#fff3f0') {
  return `
    <a href="${href}" style="text-decoration:none;">
      <div style="background:${color};border-radius:var(--radius-md);padding:20px;text-align:center;cursor:pointer;
        transition:all 0.25s;border:1.5px solid var(--border);"
        onmouseover="this.style.borderColor='var(--flame)';this.style.transform='translateY(-3px)';this.style.boxShadow='var(--shadow-md)'"
        onmouseout="this.style.borderColor='var(--border)';this.style.transform='';this.style.boxShadow=''">
        <div style="font-size:32px;margin-bottom:10px;">${emoji}</div>
        <span class="ur-only" style="font-family:var(--font-urdu);font-size:16px;font-weight:700;color:var(--ink);display:block;">${urLabel}</span>
        <span class="en-only" style="display:none;font-family:var(--font-body);font-size:13px;font-weight:700;color:var(--ink);display:block;">${enLabel}</span>
      </div>
    </a>
  `;
}

// ── Status badge ─────────────────────────────────────
const statusMap = {
  pending:     { cls:'badge-pending', ur:'⏳ زیر التواء',   en:'⏳ Pending'    },
  accepted:    { cls:'badge-blue',    ur:'✅ قبول',         en:'✅ Accepted'   },
  in_progress: { cls:'badge-gold',    ur:'🔧 جاری ہے',      en:'🔧 In Progress'},
  completed:   { cls:'badge-green',   ur:'✔️ مکمل',         en:'✔️ Completed'  },
  cancelled:   { cls:'badge-red',     ur:'❌ منسوخ',        en:'❌ Cancelled'  },
  rejected:    { cls:'badge-red',     ur:'🚫 مسترد',        en:'🚫 Rejected'   },
};

function statusBadge(status) {
  const s = statusMap[status] || { cls:'badge-gray', ur:status, en:status };
  return `<span class="badge ${s.cls}">
    <span class="ur-only">${s.ur}</span>
    <span class="en-only" style="display:none;">${s.en}</span>
  </span>`;
}

// ── Format date ───────────────────────────────────────
function fmtDate(d) {
  return new Date(d).toLocaleDateString('en-PK', { day:'numeric', month:'short', year:'numeric' });
}

// ── Loading skeleton ──────────────────────────────────
function loadingSkeleton(rows=4) {
  let html = '';
  for(let i=0; i<rows; i++) {
    html += `<div style="height:60px;background:linear-gradient(90deg,var(--cream) 0%,var(--border) 50%,var(--cream) 100%);
      background-size:200% 100%;animation:shimmer 1.5s infinite;border-radius:10px;margin-bottom:12px;"></div>`;
  }
  return `<style>@keyframes shimmer{0%{background-position:200% 0}100%{background-position:-200% 0}}</style>${html}`;
}
