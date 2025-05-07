const express = require("express");
const router = express.Router();
const refController = require("../controllers/references");
const logger = require("../utils/logger");

router.get("/", (req, res, next) => {
  logger.info("Route accessed: GET /api/references");
  next();
}, refController.getAllReferences);

router.post("/", (req, res, next) => {
  logger.info("Route accessed: POST /api/references");
  next();
}, refController.createReference);

router.put("/:id", (req, res, next) => {
  logger.info(`Route accessed: PUT /api/references/${req.params.id}`);
  next();
}, refController.updateReference);

router.delete("/:id", (req, res, next) => {
  logger.info(`Route accessed: DELETE /api/references/${req.params.id}`);
  next();
}, refController.deleteReference);

module.exports = router;
