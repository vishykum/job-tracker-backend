const pool = require("../db");
const logger = require("../utils/logger");

exports.getAllLogs = async (req, res) => {
  logger.info("GET /api/networking - Fetching all networking logs");
  try {
    const [rows] = await pool.query("SELECT * FROM networking_logs ORDER BY contact_date DESC");
    res.json(rows);
  } catch (err) {
    logger.error(`Error fetching networking logs: ${err.message}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.createLog = async (req, res) => {
  logger.info("POST /api/networking - Creating new log");
  try {
    const { contact_name, company, type, contact_date, notes, related_application_id } = req.body;
    const [result] = await pool.query(
      `INSERT INTO networking_logs (contact_name, company, type, contact_date, notes, related_application_id)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [contact_name, company, type, contact_date, notes, related_application_id || null]
    );
    logger.info(`Created networking log ID: ${result.insertId}`);
    res.status(201).json({ message: "Networking log created", logId: result.insertId });
  } catch (err) {
    logger.error(`Error creating networking log: ${err.message}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.updateLog = async (req, res) => {
  logger.info(`PUT /api/networking/${req.params.id} - Updating log`);
  try {
    const { contact_name, company, type, contact_date, notes, related_application_id } = req.body;
    await pool.query(
      `UPDATE networking_logs SET contact_name=?, company=?, type=?, contact_date=?, notes=?, related_application_id=? WHERE id=?`,
      [contact_name, company, type, contact_date, notes, related_application_id || null, req.params.id]
    );
    logger.info(`Updated networking log ID: ${req.params.id}`);
    res.json({ message: "Networking log updated" });
  } catch (err) {
    logger.error(`Error updating networking log: ${err.message}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.deleteLog = async (req, res) => {
  logger.info(`DELETE /api/networking/${req.params.id} - Deleting log`);
  try {
    await pool.query("DELETE FROM networking_logs WHERE id = ?", [req.params.id]);
    logger.info(`Deleted networking log ID: ${req.params.id}`);
    res.json({ message: "Networking log deleted" });
  } catch (err) {
    logger.error(`Error deleting networking log: ${err.message}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
