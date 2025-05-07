// utils/logger.js
const { createLogger, format, transports } = require("winston");
const path = require("path");

const isProduction = process.env.NODE_ENV === "production";

const logger = createLogger({
  level: "info",
  format: format.combine(
    format.timestamp(),
    format.printf(({ level, message, timestamp }) => {
      return `[${timestamp}] ${level.toUpperCase()}: ${message}`;
    })
  ),
  transports: [
    new transports.Console({
      level: isProduction ? "error" : "info",
      format: format.combine(format.colorize(), format.simple())
    }),
    ...(isProduction
      ? [
          new transports.File({
            filename: path.join(__dirname, "../logs/error.log"),
            level: "error"
          }),
          new transports.File({
            filename: path.join(__dirname, "../logs/combined.log")
          })
        ]
      : [])
  ]
});

module.exports = logger;
