const logger = require("../logger/logger");

function logFindQuery(next) {
  logger.info("Executing find query", {
    query: this.getQuery(),
  });
  next();
}

function logFindOneQuery(next) {
  logger.info("Executing findOne query", {
    query: this.getQuery(),
  });
  next();
}

function logSaveOperation(next) {
  logger.info("Executing save operation", {
    data: this.toObject(),
  });
  next();
}

function logUpdateOperation(next) {
  logger.info("Executing update operation", {
    query: this.getQuery(),
    update: this.getUpdate(),
  });
  next();
}

function logDeleteOperation(next) {
  logger.info("Executing delete operation", {
    query: this.getQuery(),
  });
  next();
}

module.exports = {
  logFindQuery,
  logFindOneQuery,
  logSaveOperation,
  logUpdateOperation,
  logDeleteOperation,
};
