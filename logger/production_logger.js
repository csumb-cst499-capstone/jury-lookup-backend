const { createLogger, format, transports } = require("winston");
const { combine, timestamp, json, errors, printf } = format;
const { Logtail } = require("@logtail/node");
const { LogtailTransport } = require("@logtail/winston");
const e = require("express");

const logtail = new Logtail(process.env.LOGTAIL_SOURCE_TOKEN || "12345");

const logFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level.toUpperCase()}]: ${message}`;
});

const ProductionLogger = () => {
  return createLogger({
    level: process.env.LOG_LEVEL || "http",
    format: combine(errors({ stack: true }), timestamp(), logFormat, json()),
    transports: [
      new transports.Console(),
      new LogtailTransport(logtail),
      new transports.File({
        filename: "./logs/error.log",
        level: "error",
      }),
      new transports.File({
        filename: "./logs/info.log",
        level: "info",
      }),
      new transports.File({
        filename: "./logs/debug.log",
        level: "debug",
      }),
    ],
  });
};

module.exports = ProductionLogger;
