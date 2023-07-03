const morgan = require("morgan");
const logger = require("../logger/logger");

const MorganMiddleware = morgan(
  function (tokens, req, res) {
    return JSON.stringify({
      method: tokens.method(req, res),
      url: tokens.url(req, res),
      status: Number.parseFloat(tokens.status(req, res)),
      content_length: tokens.res(req, res, "content-length"),
      body: req.body, // Include the request body here
      response_time: Number.parseFloat(tokens["response-time"](req, res)),
    });
  },
  {
    stream: {
      write: (message) => {
        const data = JSON.parse(message);
        logger.http("incoming-request", data);
      },
    },
  }
);

module.exports = MorganMiddleware;
