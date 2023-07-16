// const DevelopmentLogger = require("./development_logger");
// const ProductionLogger = require("./production_logger");
// let logger = null;
// if (process.env.NODE_ENV === "prod") {
//   logger = ProductionLogger();
// }

// if (process.env.NODE_ENV === "dev") {
//   logger = DevelopmentLogger();
// }

// if (process.env.NODE_ENV === "test") {
//   logger = DevelopmentLogger();
// }

// module.exports = logger;

const DevelopmentLogger = require("./development_logger");
const ProductionLogger = require("./production_logger");

let logger = null;

if (process.env.NODE_ENV === "production") {
  logger = ProductionLogger();
} else if (process.env.NODE_ENV === "development") {
  logger = DevelopmentLogger();
} else if (process.env.NODE_ENV === "test") {
  logger = DevelopmentLogger();
} else {
  // Default logger implementation in case NODE_ENV is not set
  logger = DevelopmentLogger();
}

module.exports = logger;


//     set NODE_ENV=dev && nodemon server.js
