const express = require("express");
const router = express.Router();
const netController = require("../controllers/networking");
const logger = require("../utils/logger");

router.get("/", (req, res, next) => {
  logger.info("Route accessed: GET /api/networking");
  next();
}, netController.getAllLogs);

router.post("/", (req, res, next) => {
  logger.info("Route accessed: POST /api/networking");
  next();
}, netController.createLog);

router.put("/:id", (req, res, next) => {
  logger.info(`Route accessed: PUT /api/networking/${req.params.id}`);
  next();
}, netController.updateLog);

router.delete("/:id", (req, res, next) => {
  logger.info(`Route accessed: DELETE /api/networking/${req.params.id}`);
  next();
}, netController.deleteLog);

module.exports = router;
