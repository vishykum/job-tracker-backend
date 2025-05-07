const express = require("express");
const router = express.Router();
const skillController = require("../controllers/skills");
const logger = require("../utils/logger");

router.get("/", (req, res, next) => {
  logger.info("Route accessed: GET /api/skills");
  next();
}, skillController.getAllLogs);

router.post("/", (req, res, next) => {
  logger.info("Route accessed: POST /api/skills");
  next();
}, skillController.createLog);

router.put("/:id", (req, res, next) => {
  logger.info(`Route accessed: PUT /api/skills/${req.params.id}`);
  next();
}, skillController.updateLog);

router.delete("/:id", (req, res, next) => {
  logger.info(`Route accessed: DELETE /api/skills/${req.params.id}`);
  next();
}, skillController.deleteLog);

module.exports = router;
