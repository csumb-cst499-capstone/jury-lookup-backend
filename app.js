require("dotenv").config();
const express = require("express");
require("jsonwebtoken");
const routes = require("./routes/routes");
const cors = require("cors");
require("./utils/db_utils");
const MorganMiddleware = require("./middlewares/morgan_middleware");

const app = express();
const options = {
  origin: ["http://localhost:3001"],
};
app.use(cors(options));
app.use(MorganMiddleware);
app.use(express.json());

app.use("/api", routes);

module.exports = app;
