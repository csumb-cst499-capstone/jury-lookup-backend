const mongoose = require("mongoose");
const mongoString = process.env.DATABASE_URL;
const logger = require("../logger/logger");

mongoose.connect(mongoString);
const database = mongoose.connection;

database.on("error", (error) => {
  logger.error(error);
});

database.once("connected", () => {
  logger.info("Database Connected");
});

module.exports = database;
