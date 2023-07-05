require("dotenv").config();
const mongoose = require("mongoose");
const database = require("../utils/db_utils");
const logger = require("../logger/logger"); // Add this line

// Mock the logger
jest.mock("../logger/logger", () => ({
  error: jest.fn(),
  info: jest.fn(),
}));

describe("Database Connection", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should log an error if there is an error connecting to the database", () => {
    const error = new Error("Database connection error");

    // Simulate the "error" event on the database connection
    database.emit("error", error);

    expect(logger.error).toHaveBeenCalledWith(error);
  });

  test("should log a success message when the database is connected", () => {
    // Simulate the "connected" event on the database connection
    database.emit("connected");

    expect(logger.info).toHaveBeenCalledWith("Database Connected");
  });
});
