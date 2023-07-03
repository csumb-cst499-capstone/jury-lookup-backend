const { createLogger, format, transports } = require("winston");
const { combine, timestamp, json, colorize, errors } = format;

const DevelopmentLogger = () => {
  return createLogger({
    level: process.env.LOG_LEVEL || "http",
    format: combine(
      errors({ stack: true }),
      timestamp({ format: "HH:mm:ss" }),
      json()
    ),

    transports: [new transports.Console()],
  });
};

module.exports = DevelopmentLogger;
