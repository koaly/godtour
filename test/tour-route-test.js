const supertest = require("supertest");
const expect = require("chai").expect;

const request = supertest.agent("http://localhost:5000/api");

nonOperatorCredentials = {
  email: "god@gmail.com",
  password: "12345"
};

operatorCredentials = {
  email: "suck@gmail.com",
  password: "12345"
};

tourCredentials = {
  name: "Thai Tour",
  price: 500,
  dest: "Thailand",
  dayDuration: 3,
  nightDuration: 2,
  startBookDate: "2019-01-01",
  startBookTime: "00:00",
  endBookDate: "2019-01-02",
  endBookTime: "23:59",
  departDate: "2019-02-01",
  returnDate: "2019-02-03",
  airline: "Nok Air",
  seat: 100,
  food: 6,
  detail: "nothing",
  highlight: "everything"
};

// no login
describe("Tour: Guest", () => {
  let tourID = '5bf4e94fe06f311ca128b121';
  // create tour
  it("POST /tours/create with error 401", function(done) {
    console.log(`/tours/create`);
    this.timeout(0);

    request
      .post("/tours/create")
      .set("Accept", "application/json")
      .end((err, res) => {
        expect(res.statusCode).to.equal(401);
        done(err);
      });
  });
  // edit tour
  it(`PUT /tours?id with error 401`, function(done){
    console.log(`/tours?id=${tourID}`);
    this.timeout(0);
    request
      .put(`/tours?id=${tourID}`)
      .set("Accept", "application/json")
      .send(tourCredentials)
      .end((err, res) => {
        expect(res.statusCode).to.equal(401);
        done(err);
      });
  });
  // delete tour
  it(`DELETE /tours?id with error 401`, function(done) {
    this.timeout(0);
    request
      .delete(`/tours?id=${tourID}`)
      .set("Accept", "application/json")
      .end((err, res) => {
        expect(res.statusCode).to.equal(401);
        done(err);
      });
  });
});

// operator login
describe("Tour: Operator", () => {
  // login
  let token = null;
  let tourID = null;
  before(function(done) {
    this.timeout(0);
    request
      .post("/users/login")
      .send(operatorCredentials)
      .end(function(err, response) {
        token = `JWT ${response.body.user.token}`;
        console.log(operatorCredentials)
        expect(response.statusCode).to.equal(200);
        done(err);
      });
  });
  // create tour
  it("POST /tours/create with 201", function(done) {
    console.log(`/tours/create`);
    this.timeout(0);

    request
      .post("/tours/create")
      .set("Accept", "application/json")
      .set("Authorization", token)
      .send(tourCredentials)
      .end((err, res) => {
        expect(res.statusCode).to.equal(201);
        tourID = res.body.id;
        expect(res.body.msg).to.equal(
          `success add tour ${tourCredentials.name}`
        );
        done(err);
      });
  });
  // edit tour
  it(`PUT /tours?id with 200`, function(done){
    console.log(`/tours?id=${tourID}`);
    this.timeout(0);
    request
      .put(`/tours?id=${tourID}`)
      .set("Accept", "application/json")
      .set("Authorization", token)
      .send(tourCredentials)
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        done(err);
      });
  });
  // delete tour
  it(`DELETE /tours?id with 200`, function(done) {
    this.timeout(0);
    request
      .delete(`/tours?id=${tourID}`)
      .set("Accept", "application/json")
      .set("Authorization", token)
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body.name).to.equal(tourCredentials.name);
        done(err);
      });
  });
});

// user login
describe("Tour: User", () => {
  // login
  let token = null;
  let tourID = '5bf4e94fe06f311ca128b121';
  before(function(done) {
    this.timeout(0);
    request
      .post("/users/login")
      .send(nonOperatorCredentials)
      .end(function(err, response) {
        token = `JWT ${response.body.user.token}`;
        console.log(nonOperatorCredentials)
        expect(response.statusCode).to.equal(200);
        done(err);
      });
  });
  // create tour
  it("POST /tours/create with error 403", function(done) {
    console.log(`/tours/create`);
    this.timeout(0);

    request
      .post("/tours/create")
      .set("Accept", "application/json")
      .set("Authorization", token)
      .send(tourCredentials)
      .end((err, res) => {
        expect(res.statusCode).to.equal(403);
        done(err);
      });
  });
  // edit tour
  it(`PUT /tours?id with error 403`, function(done){
    console.log(`/tours?id=${tourID}`);
    this.timeout(0);
    request
      .put(`/tours?id=${tourID}`)
      .set("Accept", "application/json")
      .set("Authorization", token)
      .send(tourCredentials)
      .end((err, res) => {
        expect(res.statusCode).to.equal(403);
        done(err);
      });
  });
  // delete tour
  it(`DELETE /tours?id with error 403`, function(done) {
    this.timeout(0);
    request
      .delete(`/tours?id=${tourID}`)
      .set("Accept", "application/json")
      .set("Authorization", token)
      .end((err, res) => {
        expect(res.statusCode).to.equal(403);
        done(err);
      });
  });
});
