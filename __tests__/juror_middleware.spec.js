const logger = require("../logger/logger");
const {
  logFindQuery,
  logFindOneQuery,
  logSaveOperation,
  logUpdateOperation,
  logDeleteOperation,
} = require("../middlewares/juror_middleware");

jest.mock("../logger/logger", () => ({
  info: jest.fn(),
}));

describe("Logging Functions", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("logFindQuery should log the find query", () => {
    const next = jest.fn();
    const getQueryMock = jest.fn().mockReturnValue("find query");

    const context = {
      getQuery: getQueryMock,
    };

    logFindQuery.call(context, next);

    expect(logger.info).toHaveBeenCalledWith("Executing find query", {
      query: "find query",
    });
    expect(getQueryMock).toHaveBeenCalled();
    expect(next).toHaveBeenCalled();
  });

  test("logFindOneQuery should log the findOne query", () => {
    const next = jest.fn();
    const getQueryMock = jest.fn().mockReturnValue("findOne query");

    const context = {
      getQuery: getQueryMock,
    };

    logFindOneQuery.call(context, next);

    expect(logger.info).toHaveBeenCalledWith("Executing findOne query", {
      query: "findOne query",
    });
    expect(getQueryMock).toHaveBeenCalled();
    expect(next).toHaveBeenCalled();
  });

  test("logSaveOperation should log the save operation", () => {
    const next = jest.fn();
    const toObjectMock = jest.fn().mockReturnValue("data");

    const context = {
      toObject: toObjectMock,
    };

    logSaveOperation.call(context, next);

    expect(logger.info).toHaveBeenCalledWith("Executing save operation", {
      data: "data",
    });
    expect(toObjectMock).toHaveBeenCalled();
    expect(next).toHaveBeenCalled();
  });

  test("logUpdateOperation should log the update operation", () => {
    const next = jest.fn();
    const getQueryMock = jest.fn().mockReturnValue("update query");
    const getUpdateMock = jest.fn().mockReturnValue("update data");

    const context = {
      getQuery: getQueryMock,
      getUpdate: getUpdateMock,
    };

    logUpdateOperation.call(context, next);

    expect(logger.info).toHaveBeenCalledWith("Executing update operation", {
      query: "update query",
      update: "update data",
    });
    expect(getQueryMock).toHaveBeenCalled();
    expect(getUpdateMock).toHaveBeenCalled();
    expect(next).toHaveBeenCalled();
  });

  test("logDeleteOperation should log the delete operation", () => {
    const next = jest.fn();
    const getQueryMock = jest.fn().mockReturnValue("delete query");

    const context = {
      getQuery: getQueryMock,
    };

    logDeleteOperation.call(context, next);

    expect(logger.info).toHaveBeenCalledWith("Executing delete operation", {
      query: "delete query",
    });
    expect(getQueryMock).toHaveBeenCalled();
    expect(next).toHaveBeenCalled();
  });
});
