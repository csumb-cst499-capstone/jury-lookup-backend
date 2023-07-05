const { createLogger, format, transports } = require("winston");
const { combine, timestamp, json, errors } = format;

const DevelopmentLogger = require("../logger/development_logger");

jest.mock("winston", () => ({
  createLogger: jest.fn(),
  format: {
    combine: jest.fn(),
    errors: jest.fn(),
    timestamp: jest.fn(),
    json: jest.fn(),
  },
  transports: {
    Console: jest.fn(),
  },
}));

describe("DevelopmentLogger", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should create a development logger with the correct options", () => {
    const logFormatMock = jest.fn();
    const consoleTransportInstanceMock = {};

    format.combine.mockImplementation(() => logFormatMock);
    format.errors.mockReturnValue(errors);
    format.timestamp.mockReturnValue(timestamp);
    format.json.mockReturnValue(json);
    transports.Console.mockReturnValue(consoleTransportInstanceMock);

    const loggerOptions = {
      level: process.env.LOG_LEVEL || "http",
      format: combine(
        errors({ stack: true }),
        timestamp({ format: "HH:mm:ss" }),
        json()
      ),
      transports: [consoleTransportInstanceMock],
    };

    DevelopmentLogger();

    expect(createLogger).toHaveBeenCalledWith(loggerOptions);
    expect(format.combine).toHaveBeenCalledWith(
      errors({ stack: true }),
      timestamp({ format: "HH:mm:ss" }),
      json()
    );
    expect(format.errors).toHaveBeenCalled();
    expect(format.timestamp).toHaveBeenCalled();
    expect(format.json).toHaveBeenCalled();
    expect(transports.Console).toHaveBeenCalled();
  });
});
