// runSqlScript.js
const fs = require("fs");
const path = require("path");
const pool = require("../db/index"); // your existing MySQL pool connection

async function runScript(filePath) {
  const sql = fs.readFileSync(path.resolve(__dirname, filePath), "utf8");

  try {
    const result = await pool.query(sql);
    console.log("✅ Script executed successfully.");
    process.exit(0);
  } catch (err) {
    console.error("❌ Error executing script:", err.message);
    process.exit(1);
  }
}

// Change this path to your schema/seed file
module.exports = runScript;
// Or runScript("db/seed.sql");
