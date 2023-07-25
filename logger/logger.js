const DevelopmentLogger = require("./development_logger");
const ProductionLogger = require("./production_logger");
let logger = null;
if (process.env.NODE_ENV === "production") {
  logger = ProductionLogger();
}

if (process.env.NODE_ENV === "devevelopment") {
  logger = DevelopmentLogger();
}

if (process.env.NODE_ENV === "test") {
  logger = DevelopmentLogger();
}

module.exports = logger;
