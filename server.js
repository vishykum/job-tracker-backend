const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");
const pool = require("./db"); // Your MySQL pool
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// 🔹 Run SQL script on server start (for initial DB setup)
const runInitSql = async () => {
  try {
    const sqlPath = path.join(__dirname, "db", "script.sql");
    const sql = fs.readFileSync(sqlPath, "utf8");

    // Split and run each statement if needed
    const statements = sql
      .split(/;\s*$/gm)
      .map(stmt => stmt.trim())
      .filter(stmt => stmt.length > 0);

    for (const stmt of statements) {
      await pool.query(stmt);
    }

    console.log("✅ DB schema initialized from script.sql");
  } catch (err) {
    console.error("❌ Failed to initialize DB schema:", err.message);
  }
};

if (process.env.NODE_ENV === "init") {
    runInitSql();
  }

// Routes
const appRoutes = require("./routes/applications");
const refRoutes = require("./routes/references");
const netRoutes = require("./routes/networking");
const skillRoutes = require("./routes/skills");
const dashRoutes = require("./routes/dashboard");

app.use("/api/applications", appRoutes);
app.use("/api/references", refRoutes);
app.use("/api/networking", netRoutes);
app.use("/api/skills", skillRoutes);
app.use("/api/dashboard", dashRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
