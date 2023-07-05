const app = require("./app");
const logger = require("./logger/logger");

const PORT = 3000;

app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});
