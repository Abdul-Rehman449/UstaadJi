# 🛠️ UstaadJi — Complete Project
### Web Engineering Semester Project | CUST | AI-Powered | Bilingual

---

## 📁 Project Structure

```
UstaadJi_FINAL/
├── backend/
│   ├── config/
│   │   ├── db.js              ← MySQL connection
│   │   └── database.sql       ← Complete DB schema (RUN THIS FIRST)
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── workerController.js
│   │   ├── bookingController.js
│   │   ├── aiController.js    ← AI Recommendation (Claude/Groq)
│   │   └── adminController.js
│   ├── middleware/
│   │   └── auth.js            ← JWT verification
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── workerRoutes.js
│   │   ├── bookingRoutes.js
│   │   ├── aiRoutes.js
│   │   └── adminRoutes.js
│   ├── .env                   ← ⚠️ Update DB password here
│   ├── package.json
│   └── server.js
│
└── frontend/
    ├── css/
    │   ├── style.css          ← Main design system
    │   └── dashboard.css      ← Dashboard components
    ├── js/
    │   ├── main.js            ← Auth + Language switching
    │   └── dashboard.js       ← Sidebar + shared utilities
    └── pages/
        ├── index.html         ← Landing page (Bilingual)
        ├── login.html         ← Login (Urdu/English)
        ├── register.html      ← Register (2-step)
        ├── dashboard.html     ← Customer dashboard
        ├── workers.html       ← Worker search + booking
        ├── my-bookings.html   ← Customer bookings + reviews
        ├── worker-dashboard.html ← Worker panel
        ├── admin.html         ← Admin panel
        └── ai-recommend.html  ← AI recommendation
```

---

## 🚀 Setup — Step by Step

### Step 1: MySQL Database
- MySQL Workbench kholo
- File → Open SQL Script → `backend/config/database.sql`
- Ctrl+Shift+Enter — run karo
- `ustaadji` database ban jayega ✅

### Step 2: .env Update
```
DB_PASSWORD=tumhara_mysql_password
GROQ_API_KEY=tumhara_groq_api_key   ← console.groq.com se free milta hai
```

### Step 3: Install & Run
```bash
cd backend
npm install
npm run dev
```

### Step 4: Open Browser
```
http://localhost:5000
```

---

## 🌐 Pages

| URL | Page |
|-----|------|
| localhost:5000 | Landing Page |
| localhost:5000/login | Login |
| localhost:5000/register | Register |
| localhost:5000/dashboard | Customer Dashboard |
| localhost:5000/workers | Find Workers |
| localhost:5000/ai-recommend | AI Recommendation |
| localhost:5000/my-bookings | My Bookings |
| localhost:5000/worker-dashboard | Worker Panel |
| localhost:5000/admin | Admin Panel |

---

## ✨ Features

- 🌍 **Bilingual** — Urdu (default) + English toggle
- 🤖 **AI Recommendation** — Groq API powered
- 🔐 **3 Roles** — Customer, Worker, Admin
- 📅 **Booking System** — Full pipeline
- ⭐ **Reviews & Ratings**
- 📊 **Admin Dashboard**
- 💳 **EasyPaisa / JazzCash / Cash**

---

## 👨‍💻 Tech Stack

| Layer | Tech |
|-------|------|
| Frontend | HTML5, CSS3, Bootstrap concepts |
| Interactivity | jQuery + AJAX |
| Backend | Node.js + Express.js |
| Database | MySQL |
| Auth | JWT + bcryptjs |
| AI | Groq API (Free) |

---

*CUST — Web Engineering Semester Project 2026*
