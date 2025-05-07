// controllers/applications.js
const pool = require("../db");
const logger = require("../utils/logger");

exports.getAllApplications = async (req, res) => {
  logger.info("GET /api/applications - Fetching all applications");
  try {
    const [rows] = await pool.query("SELECT * FROM applications ORDER BY created_at DESC");
    logger.info("Fetched all applications");
    res.json(rows);
  } catch (err) {
    logger.error(`Error fetching applications: ${err.message}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.createApplication = async (req, res) => {
  logger.info("POST /api/applications - Creating new application");
  try {
    const { company, position, status, date_applied, job_url, notes, tags } = req.body;

    const [result] = await pool.query(
      `INSERT INTO applications (company, position, status, date_applied, job_url, notes, tags)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [company, position, status, date_applied, job_url, notes, tags]
    );

    logger.info(`Created application for ${company} - ${position} (ID: ${result.insertId})`);
    res.status(201).json({ message: "Application added", applicationId: result.insertId });
  } catch (err) {
    logger.error(`Error creating application: ${err.message}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.updateApplication = async (req, res) => {
  logger.info(`PUT /api/applications/${req.params.id} - Updating application`);
  try {
    const { id } = req.params;
    const { company, position, status, date_applied, job_url, notes, tags } = req.body;

    await pool.query(
      `UPDATE applications SET company=?, position=?, status=?, date_applied=?, job_url=?, notes=?, tags=?
       WHERE id=?`,
      [company, position, status, date_applied, job_url, notes, tags, id]
    );

    logger.info(`Updated application ID: ${id}`);
    res.json({ message: "Application updated" });
  } catch (err) {
    logger.error(`Error updating application ID ${req.params.id}: ${err.message}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.deleteApplication = async (req, res) => {
  logger.info(`DELETE /api/applications/${req.params.id} - Deleting application`);
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM applications WHERE id = ?", [id]);
    logger.info(`Deleted application ID: ${id}`);
    res.json({ message: "Application deleted" });
  } catch (err) {
    logger.error(`Error deleting application ID ${req.params.id}: ${err.message}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
};