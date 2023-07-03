const DevelopmentLogger = require("./development_logger");
const ProductionLogger = require("./production_logger");
let logger = null;
if (process.env.NODE_ENV === "production") {
  logger = ProductionLogger();
}

if (process.env.NODE_ENV === "development") {
  logger = DevelopmentLogger();
}

module.exports = logger;
