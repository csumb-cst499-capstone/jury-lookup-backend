const { createLogger, format, transports } = require("winston");
const { combine, timestamp, json, errors, printf } = format;
const { Logtail } = require("@logtail/node");
const { LogtailTransport } = require("@logtail/winston");

const ProductionLogger = require("../logger/production_logger");

jest.mock("winston", () => ({
  createLogger: jest.fn(),
  format: {
    combine: jest.fn(),
    timestamp: jest.fn(),
    json: jest.fn(),
    errors: jest.fn(),
    printf: jest.fn(),
  },
  transports: {
    Console: jest.fn(),
    File: jest.fn(),
  },
}));

jest.mock("@logtail/node", () => ({
  Logtail: jest.fn(),
}));

jest.mock("@logtail/winston", () => ({
  LogtailTransport: jest.fn(),
}));

describe("ProductionLogger", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should create a production logger with the correct options", () => {
    process.env.LOGTAIL_SOURCE_TOKEN = "12345";
    const logFormatMock = jest.fn();
    const logtailInstanceMock = {};
    const logtailTransportInstanceMock = {};
    const consoleTransportInstanceMock = {};
    const fileTransportInstanceMocks = [{}, {}, {}];

    format.printf.mockReturnValue(logFormatMock);
    Logtail.mockReturnValue(logtailInstanceMock);
    LogtailTransport.mockReturnValue(logtailTransportInstanceMock);
    transports.Console.mockReturnValue(consoleTransportInstanceMock);
    transports.File.mockImplementationOnce(() => fileTransportInstanceMocks[0])
      .mockImplementationOnce(() => fileTransportInstanceMocks[1])
      .mockImplementationOnce(() => fileTransportInstanceMocks[2]);

    const loggerOptions = {
      level: process.env.LOG_LEVEL || "http",
      format: combine(
        errors({ stack: true }),
        timestamp(),
        logFormatMock,
        json()
      ),
      transports: [
        consoleTransportInstanceMock,
        logtailTransportInstanceMock,
        fileTransportInstanceMocks[0],
        fileTransportInstanceMocks[1],
        fileTransportInstanceMocks[2],
      ],
    };

    ProductionLogger();

    expect(createLogger).toHaveBeenCalledWith(loggerOptions);

    expect(format.combine).toHaveBeenCalledWith(
      errors({ stack: true }),
      timestamp(),
      expect.any(Function),
      json()
    );

    expect(format.printf).toHaveBeenCalledWith(expect.any(Function));
    expect(Logtail).toHaveBeenCalledWith(process.env.LOGTAIL_SOURCE_TOKEN);
    expect(LogtailTransport).toHaveBeenCalledWith(logtailInstanceMock);
    expect(transports.Console).toHaveBeenCalled();
    expect(transports.File).toHaveBeenCalledTimes(3);
    expect(transports.File).toHaveBeenNthCalledWith(1, {
      filename: "./logs/error.log",
      level: "error",
    });
    expect(transports.File).toHaveBeenNthCalledWith(2, {
      filename: "./logs/info.log",
      level: "info",
    });
    expect(transports.File).toHaveBeenNthCalledWith(3, {
      filename: "./logs/debug.log",
      level: "debug",
    });

    expect(format.printf.mock.calls[0][0]({ level: "info" })).toEqual(
      expect.any(String)
    );

    delete process.env.LOGTAIL_SOURCE_TOKEN;
  });
});
