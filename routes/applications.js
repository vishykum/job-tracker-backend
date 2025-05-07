// routes/applications.js
const express = require("express");
const router = express.Router();
const appController = require("../controllers/applications");
const logger = require("../utils/logger");

router.get("/", (req, res, next) => {
  logger.info("Route accessed: GET /api/applications");
  next();
}, appController.getAllApplications);

router.post("/", (req, res, next) => {
  logger.info("Route accessed: POST /api/applications");
  next();
}, appController.createApplication);

router.put("/:id", (req, res, next) => {
  logger.info(`Route accessed: PUT /api/applications/${req.params.id}`);
  next();
}, appController.updateApplication);

router.delete("/:id", (req, res, next) => {
  logger.info(`Route accessed: DELETE /api/applications/${req.params.id}`);
  next();
}, appController.deleteApplication);

module.exports = router;