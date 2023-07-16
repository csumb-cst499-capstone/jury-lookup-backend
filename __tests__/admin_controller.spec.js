const app = require("../app");
const request = require("supertest");
const logger = require("../logger/logger");
const JurorModel = require("../models/juror_model");

testUser = {
  BadgeNumber: "9999999",
  FirstName: "John",
  LastName: "Dinglehiemer",
  PinCode: "9999999",
  Email: "John.dinglehiemer@fakemail.com",
  MailingAddress: "4905 Buchanan st.",
  City: "Seaside",
  State: "CA",
  SummonsDate: "2023-12-26",
  GroupNumber: "2",
  ReportingLocation: "King City",
  CanPostpone: true,
};

beforeAll(async () => {
  logger.silent = true;
});
describe("adminGetOne", () => {
  it("should return the juror if found", async () => {
    // Mock the behavior of JurorModel.findById to return a sample juror
    JurorModel.findById = jest.fn().mockResolvedValue({
      _id: "123456789",
      FirstName: "John",
      LastName: "Doe",
      Email: "john.doe@example.com",
    });

    const response = await request(app)
      .get("/api/admin/juror/123456789")
      .expect(200);

    expect(response.header["content-type"]).toContain("application/json");
    expect(response.body).toEqual({
      _id: "123456789",
      FirstName: "John",
      LastName: "Doe",
      Email: "john.doe@example.com",
    });
  });

  it("should return 404 if juror is not found", async () => {
    // Mock the behavior of JurorModel.findById to return null
    JurorModel.findById = jest.fn().mockResolvedValue(null);

    const response = await request(app)
      .get("/api/admin/juror/123456789")
      .expect(404);

    expect(response.body).toEqual({ message: "Juror not found" });
  });

  it("should return 500 if there is an error retrieving juror", async () => {
    // Mock the behavior of JurorModel.findById to throw an error
    JurorModel.findById = jest
      .fn()
      .mockRejectedValue(new Error("Mocked error"));

    const response = await request(app)
      .get("/api/admin/juror/123456789")
      .expect(500);

    expect(response.body).toEqual({ message: "Mocked error" });
  });
});

describe("adminSearch", () => {
  it("should return a list of jurors matching the search query", async () => {
    // Mock the behavior of JurorModel.find to return a sample result
    JurorModel.find = jest.fn().mockResolvedValue([
      {
        FirstName: "John",
      },
    ]);

    const response = await request(app)
      .get("/api/admin/search")
      .query({ query: "Dinglehiemer" })
      .expect(200);

    expect(response.header["content-type"]).toContain("application/json");
    expect(response.body).toEqual([
      expect.objectContaining({
        FirstName: expect.stringContaining("John"),
      }),
    ]);
  });
  it("should return an error if there was a problem searching jurors", async () => {
    // Mock the behavior of JurorModel.find to throw an error
    JurorModel.find = jest.fn().mockRejectedValue(new Error("Mocked error"));

    const response = await request(app)
      .get("/api/admin/search")
      .query({ query: "Dinglehiemer" })
      .expect(500);

    expect(response.status).toBe(500);
    expect(response.body).toEqual({
      error: "An error occurred while searching jurors",
    });
  });
});

describe("adminEditJuror", () => {
  it("should update the juror and return the updated juror", async () => {
    JurorModel.findById = jest.fn().mockResolvedValue({
      _id: "123456789",
      FirstName: "John",
      LastName: "Doe",
      Email: "john.doe@example.com",
      save: jest.fn().mockResolvedValue({
        _id: "123456789",
        FirstName: "John",
        LastName: "Doe",
        Email: "john.doe@example.com",
        UpdatedField: "Updated Value",
      }),
    });

    const response = await request(app)
      .patch("/api/admin/juror/edit/123456789") // Update the route to match the controller
      .send({ UpdatedField: "Updated Value" })
      .expect(200);

    expect(response.header["content-type"]).toContain("application/json");
    expect(response.body).toEqual({
      _id: "123456789",
      FirstName: "John",
      LastName: "Doe",
      Email: "john.doe@example.com",
      UpdatedField: "Updated Value",
    });
  });

  it("should return 404 if juror is not found", async () => {
    JurorModel.findById = jest.fn().mockResolvedValue(null);

    const response = await request(app)
      .patch("/api/admin/juror/edit/123456789") // Update the route to match the controller
      .send({ UpdatedField: "Updated Value" })
      .expect(404);

    expect(response.body).toEqual({ message: "Juror not found" });
  });

  it("should return 500 if there is an error updating the juror", async () => {
    JurorModel.findById = jest.fn().mockResolvedValue({
      _id: "123456789",
      FirstName: "John",
      LastName: "Doe",
      Email: "john.doe@example.com",
      save: jest.fn().mockRejectedValue(new Error("Mocked error")),
    });

    const response = await request(app)
      .patch("/api/admin/juror/edit/123456789") // Update the route to match the controller
      .send({ UpdatedField: "Updated Value" })
      .expect(500);

    expect(response.body).toEqual({ message: "Mocked error" });
  });
});
