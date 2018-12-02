const supertest = require("supertest");
const expect = require("chai").expect;

const request = supertest.agent("http://localhost:5000/api/tiys");

nonOperatorCredentials = {
  email: "god@gmail.com",
  password: "12345"
};

operatorCredentials = {
  email: "suck@gmail.com",
  password: "12345"
};

tiyCredentials = {
    name: "Thai Tour",
    minPrice: 500,
    maxPrice: 600,
    minMember: 2,
    maxMember: 3,
    dest: "Thailand",
    minDuration: 3,
    maxDuration: 4,
    startFreeDate: "2019-01-01",
    endFreeDate: "2019-01-02",
    food: 6,
    detail: "nothing",
    highlight: "everything"
};

// no login
describe("Tiy: Guest", () => {
    // create tiy
    it("POST /tiys/create with error 401", function(done) {
      console.log(`/tiys/create`);
      this.timeout(0);
  
      request
        .post("/create")
        .set("Accept", "application/json")
        .send(tiyCredentials)
        .end((err, res) => {
          expect(res.statusCode).to.equal(401);
          done(err);
        });
    });
});