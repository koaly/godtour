const request = require("supertest");
const app = require("../app");

describe("GET /api", function() {
  //first test is so slow
  this.timeout(10000);
  it("response with json", function(done) {
    request(app)
      .get("/api")
      .set("Accept", "application/json")
      //.expect("Content-Type", "/json/")
      .expect(200, done);
  });
});

describe("GET /api/tours", function() {
  it("response with json about all tour", function(done) {
    request(app)
      .get("/api/tours")
      .set("Accept", "application/json")
      .expect("Content-Type", "application/json; charset=utf-8")
      .expect(200, done);
  });
});
