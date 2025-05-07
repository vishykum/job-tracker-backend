const express = require("express");
const router = express.Router();
const dashboardController = require("../controllers/dashboard");
const logger = require("../utils/logger");

router.get("/summary", (req, res, next) => {
  logger.info("Route accessed: GET /api/dashboard/summary");
  next();
}, dashboardController.getDashboardSummary);

module.exports = router;
