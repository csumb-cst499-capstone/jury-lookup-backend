const app = require("../app");
const request = require("supertest");

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

let token = "";

// test getAll
describe("GET /api/getAll", () => {
  it("responds with json", (done) => {
    request(app)
      .get("/api/getAll")
      .expect("Content-Type", /json/)
      .expect(200, done);
  });
});

// test login with correct credentials for testUser
describe("POST /api/login", () => {
  it("responds with json", () => {
    return request(app)
      .post("/api/login")
      .send(testUser)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((response) => {
        token = response.body.token;
      })
      .catch((err) => {
        console.log(err);
      });
  });
});

// test login with incorrect credentials
describe("POST /api/login", () => {
  it("responds with json", (done) => {
    request(app)
      .post("/api/login")
      .send({ BadgeNumber: "9999999", PinCode: "9999998" })
      .expect("Content-Type", /json/)
      .expect(401, done);
  });
});
// test login with missing credentials
describe("POST /api/login", () => {
  it("responds with json", (done) => {
    request(app)
      .post("/api/login")
      .send({ BadgeNumber: "9999999" })
      .expect("Content-Type", /json/)
      .expect(401, done);
  });
});

// test summon details with correct credentials
describe("POST /api/summon", () => {
  it("responds with json", (done) => {
    request(app)
      .post("/api/summon")
      .set("Authorization", token) // Include the token in the Authorization header
      .expect("Content-Type", /json/)
      .expect(200, done);
  });
});

// test summon details with incorrect credentials
describe("POST /api/summon", () => {
  it("responds with json", (done) => {
    request(app)
      .post("/api/summon")
      .set("Authorization", "1234")
      .expect("Content-Type", /json/)
      .expect(403, done);
  });
});

// test summon details without credentials
describe("POST /api/summon", () => {
  it("responds with json", (done) => {
    request(app)
      .post("/api/summon")
      .expect("Content-Type", /json/)
      .expect(401, done);
  });
});
