const pool = require("../db");
const logger = require("../utils/logger");

exports.getAllLogs = async (req, res) => {
  logger.info("GET /api/skills - Fetching all skill logs");
  try {
    const [rows] = await pool.query("SELECT * FROM skill_logs ORDER BY date DESC");
    res.json(rows);
  } catch (err) {
    logger.error(`Error fetching skill logs: ${err.message}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.createLog = async (req, res) => {
  logger.info("POST /api/skills - Creating new skill log");
  try {
    const { date, category, duration_minutes, topics, notes, num_problems } = req.body;

    let query = "";
    let values = [];

    if (category === "leetcode") {
      query = `
        INSERT INTO skill_logs (date, category, num_problems, duration_minutes, topics, notes)
        VALUES (?, ?, ?, ?, ?, ?)
      `;
      values = [date, category, num_problems || 0, duration_minutes, topics, notes];
    } else {
      query = `
        INSERT INTO skill_logs (date, category, duration_minutes, topics, notes)
        VALUES (?, ?, ?, ?, ?)
      `;
      values = [date, category, duration_minutes, topics, notes];
    }

    const [result] = await pool.query(query, values);

    logger.info(`Created skill log ID: ${result.insertId}`);
    res.status(201).json({ message: "Skill log created", logId: result.insertId });
  } catch (err) {
    logger.error(`Error creating skill log: ${err.message}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.updateLog = async (req, res) => {
  logger.info(`PUT /api/skills/${req.params.id} - Updating skill log`);
  try {
    const { date, category, duration_minutes, topics, notes, num_problems } = req.body;

    let query = "";
    let values = [];

    if (category === "leetcode") {
      query = `
        UPDATE skill_logs
        SET date=?, category=?, num_problems=?, duration_minutes=?, topics=?, notes=?
        WHERE id=?
      `;
      values = [date, category, num_problems || 0, duration_minutes, topics, notes, req.params.id];
    } else {
      query = `
        UPDATE skill_logs
        SET date=?, category=?, num_problems=NULL, duration_minutes=?, topics=?, notes=?
        WHERE id=?
      `;
      values = [date, category, duration_minutes, topics, notes, req.params.id];
    }

    await pool.query(query, values);

    logger.info(`Updated skill log ID: ${req.params.id}`);
    res.json({ message: "Skill log updated" });
  } catch (err) {
    logger.error(`Error updating skill log: ${err.message}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


exports.deleteLog = async (req, res) => {
  logger.info(`DELETE /api/skills/${req.params.id} - Deleting skill log`);
  try {
    await pool.query("DELETE FROM skill_logs WHERE id = ?", [req.params.id]);
    logger.info(`Deleted skill log ID: ${req.params.id}`);
    res.json({ message: "Skill log deleted" });
  } catch (err) {
    logger.error(`Error deleting skill log: ${err.message}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
