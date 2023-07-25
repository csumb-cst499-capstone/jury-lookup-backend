jest.mock("../logger/development_logger", () => jest.fn());
jest.mock("../logger/production_logger", () => jest.fn());

describe("logger", () => {
  afterEach(() => {
    jest.clearAllMocks();
    delete process.env.NODE_ENV;
  });

  test("should use the production logger when NODE_ENV is 'production'", () => {
    const ProductionLogger = require("../logger/production_logger");
    const productionLoggerInstance = {};
    ProductionLogger.mockReturnValue(productionLoggerInstance);

    process.env.NODE_ENV = "production";
    const logger = require("../logger/logger");

    expect(ProductionLogger).toHaveBeenCalledTimes(1);
    expect(logger).toBe(productionLoggerInstance);
  });

  test("should use the development logger when NODE_ENV is 'dev'", () => {
    const developmentLoggerInstance = {};
    const DevelopmentLogger = require("../logger/development_logger");
    DevelopmentLogger.mockReturnValue(developmentLoggerInstance);

    process.env.NODE_ENV = "dev";
    const logger = require("../logger/logger");

    expect(logger).toStrictEqual(developmentLoggerInstance);
  });

  test("should use the development logger when NODE_ENV is not set", () => {
    const developmentLoggerInstance = {};
    const DevelopmentLogger = require("../logger/development_logger");
    DevelopmentLogger.mockReturnValue(developmentLoggerInstance);

    delete process.env.NODE_ENV;
    const logger = require("../logger/logger");

    expect(logger).toStrictEqual(developmentLoggerInstance);
  });

  test("should use the development logger when NODE_ENV has an unknown value", () => {
    const developmentLoggerInstance = {};
    const DevelopmentLogger = require("../logger/development_logger");
    DevelopmentLogger.mockReturnValue(developmentLoggerInstance);

    process.env.NODE_ENV = "unknown";
    const logger = require("../logger/logger");

    expect(logger).toStrictEqual(developmentLoggerInstance);
  });
});
