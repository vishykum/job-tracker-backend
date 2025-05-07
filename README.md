# 🧠 Job Tracker Backend

This is the backend server for the Job Application Tracker web application. It provides a RESTful API built with Express.js and MySQL for tracking job applications, networking efforts, skill-building progress, and referrals — all tailored to your job search pipeline.

---

## 🚀 Tech Stack

- **Node.js + Express.js** — Web framework
- **MySQL** — Relational database
- **Winston** — Production-grade logging
- **Dotenv** — Environment configuration
- **REST API** — Modularized routes/controllers

---

## 📁 Folder Structure

```
backend/
├── controllers/       # API logic
├── routes/            # RESTful route definitions
├── db/                # MySQL connection pool
├── logs/              # Persistent logs (in production)
├── utils/             # Reusable tools (e.g. logger)
├── middleware/        # Optional: reusable route middleware
├── .env               # DB credentials
├── server.js          # Entry point
└── README.md
```

---

## ⚙️ Setup Instructions

### 1. Install dependencies
```bash
cd backend
npm install
```

### 2. Create `.env` file
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=jtdb
DB_PORT=3306
PORT=5000
NODE_ENV=development
```

### 3. Set up the MySQL database

Run these SQL scripts in order:

```bash
mysql -u root -p < db/schema.sql
mysql -u root -p < db/seed.sql
mysql -u root -p < db/views.sql
```

> To reset the database:
```bash
mysql -u root -p < db/drop.sql
```

---

## 🧪 Development

Start the server with:

```bash
npm run dev
```

This uses `nodemon` for hot reloads and logs actions to the console via Winston.

---

## 📡 API Overview

Base URL: `http://localhost:5000/api/`

| Route               | Methods               | Description                    |
|--------------------|------------------------|--------------------------------|
| `/applications`     | GET / POST / PUT / DELETE | Manage job applications |
| `/references`       | GET / POST / PUT / DELETE | Manage referral contacts |
| `/networking`       | GET / POST / PUT / DELETE | Track networking efforts |
| `/skills`           | GET / POST / PUT / DELETE | Log technical skill building |
| `/dashboard/summary`| GET                   | Get weekly summary for dashboard |

---

## 📝 Logging

- Logs are printed to console in **development**
- Logs are saved in `/logs/` directory in **production**:
  - `combined.log` – all logs
  - `error.log` – only errors

---

## 🔐 Notes

- Uses **prepared statements** to prevent SQL injection
- Modular controllers and routes for scalability
- Designed to integrate with a React + Vite + Tailwind frontend

---

## 👨‍💻 Author

Built with ❤️ by [Vishal Venkatakumar]
