const app = require("../app");
const request = require("supertest");
const logger = require("../logger/logger");

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
beforeAll(async () => {
  logger.silent = true;
});
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

// test getOne with a correct juror id
describe("GET /api/getOne/:BadgeNumber", () => {
  it("responds with json", (done) => {
    const jurorBadgeNumber = "9999999";
    request(app)
      .get(`/api/getOne/${jurorBadgeNumber}`)
      .expect("Content-Type", /json/)
      .expect(200, done);
  });
});

// test getOne with an incorrect juror id
describe("GET /api/getOne/:BadgeNumber", () => {
  it("responds with json", (done) => {
    const jurorBadgeNumber = "999999";
    request(app)
      .get(`/api/getOne/${jurorBadgeNumber}`)
      .expect("Content-Type", /json/)
      .expect(200, done);
  });
});

// test verify token with a correct token
describe("POST /api/verify", () => {
  it("responds with json", (done) => {
    request(app)
      .post("/api/verify")
      .set("Authorization", token)
      .expect("Content-Type", /json/)
      .expect(200, done);
  });
});

// test verify token without a token
describe("POST /api/verify", () => {
  it("responds with json", (done) => {
    request(app)
      .post("/api/verify")
      .expect("Content-Type", /json/)
      .expect(401, done);
  });
});

// test editSummons with a correct token and location and incorrect postpone date
describe("POST /api/editSummons", () => {
  it("responds with json", (done) => {
    const postponeDate = "2100-01-05";
    const location = "King City";
    request(app)
      .post("/api/editSummons")
      .set("Authorization", token)
      .send({ PostponeDate: postponeDate, ReportingLocation: location })
      .expect("Content-Type", /json/)
      .expect(404, done);
  });
});

// test editSummons with a correct token and correct location and correct postpone date
describe("POST /api/editSummons", () => {
  it("responds with json", (done) => {
    const postponeDate = "2100-01-04";
    const location = "Salinas";
    request(app)
      .post("/api/editSummons")
      .set("Authorization", token)
      .send({ ReportingLocation: location, PostponeDate: postponeDate })
      .expect("Content-Type", /json/)
      .expect(200, done);
  });
});

// test editSummons without a token
describe("POST /api/editSummons", () => {
  it("responds with json", (done) => {
    const postponeDate = "2100-12-30";
    const location = "King City";
    request(app)
      .post("/api/editSummons")
      .send({ PostponeDate: postponeDate, ReportingLocation: location })
      .expect("Content-Type", /json/)
      .expect(401, done);
  });
});

// test changePostponeStatus with a correct token and correct CanPostpone value
describe("POST /api/changePostponeStatus", () => {
  it("responds with json", (done) => {
    const CanPostpone = true;
    request(app)
      .post("/api/changePostponeStatus")
      .set("Authorization", token)
      .send({ BadgeNumber: "9999999", CanPostpone })
      .expect("Content-Type", /json/)
      .expect(200, done);
  });
});

// test changePostponeStatus without a token
describe("POST /api/changePostponeStatus", () => {
  it("responds with json", (done) => {
    const CanPostpone = true;
    request(app)
      .post("/api/changePostponeStatus")
      .send({ BadgeNumber: "9999999", CanPostpone })
      .expect("Content-Type", /json/)
      .expect(401, done);
  });
});

// test jurorGetReportingLocations 
describe("GET /api/getReportingLocations", () => {
  it("responds with json", (done) => {
    request(app)
      .get("/api/getReportingLocations")
      .expect("Content-Type", /json/)
      .expect(200, done);
  });
});

// test resetSummonsDate
describe("POST /api/resetSummonsTest", () => {
  it("responds with json", (done) => {
    request(app)
      .post("/api/resetSummonsTest")
      .set("Authorization", token)
      .send({ BadgeNumber: "9999999" })
      .expect("Content-Type", /json/)
      .expect(200, done);
  });
});

// test resetSummonsDate without a token
describe("POST /api/resetSummonsTest", () => {
  it("responds with json", (done) => {
    request(app)
      .post("/api/resetSummonsTest")
      .expect("Content-Type", /json/)
      .expect(401, done);
  });
});
