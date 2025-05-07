const pool = require("../db");
const logger = require("../utils/logger");

exports.getAllReferences = async (req, res) => {
  logger.info("GET /api/references - Fetching all references");
  try {
    const [rows] = await pool.query("SELECT * FROM `references`");
    res.json(rows);
  } catch (err) {
    logger.error(`Error fetching references: ${err.message}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.createReference = async (req, res) => {
  logger.info("POST /api/references - Creating new reference");
  try {
    const { name, role, company, contact_info, notes } = req.body;

    const [result] = await pool.query(
      `INSERT INTO \`references\` (name, role, company, contact_info, notes) VALUES (?, ?, ?, ?, ?)`,
      [name, role, company, contact_info, notes]
    );

    logger.info(`Created reference ID: ${result.insertId}`);
    res.status(201).json({ message: "Reference created", referenceId: result.insertId });
  } catch (err) {
    logger.error(`Error creating reference: ${err.message}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.updateReference = async (req, res) => {
  logger.info(`PUT /api/references/${req.params.id} - Updating reference`);
  try {
    const { name, role, company, contact_info, notes } = req.body;
    await pool.query(
      `UPDATE \`references\` SET name=?, role=?, company=?, contact_info=?, notes=? WHERE id=?`,
      [name, role, company, contact_info, notes, req.params.id]
    );

    logger.info(`Updated reference ID: ${req.params.id}`);
    res.json({ message: "Reference updated" });
  } catch (err) {
    logger.error(`Error updating reference: ${err.message}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.deleteReference = async (req, res) => {
  logger.info(`DELETE /api/references/${req.params.id} - Deleting reference`);
  try {
    await pool.query("DELETE FROM \`references\` WHERE id = ?", [req.params.id]);
    logger.info(`Deleted reference ID: ${req.params.id}`);
    res.json({ message: "Reference deleted" });
  } catch (err) {
    logger.error(`Error deleting reference: ${err.message}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
