// run with mocha
// when npm install -g mocha don't fonget to sudo if you do in linux
// -> npm test

const supertest = require("supertest");
const expect = require("chai").expect;
// This agent refers to PORT where program is runninng.
const request = supertest.agent("http://localhost:5000/api");

//information of users
userCredentials = {
  email: "suck@gmail.com",
  password: "12345"
};

// UNIT test begin
describe("Guest No login", function() {
  //should return error of current users
  it("/users/current should return error", function(done) {
    this.timeout(2000);

    request
      .get("/users/current")
      .set("Accept", "application/json")
      .end((err, res) => {
        expect(res.statusCode).to.equal(401);
        done(err);
      });
  });

  //should return 401 when not found jwt
  it("/users/browse should can't accept and return 401", function(done) {
    this.timeout(2000);

    request
      .get("/users/browse")
      .set("Accept", "application/json")
      .end((err, res) => {
        expect(res.statusCode).to.equal(401);
        done(err);
      });
  });
});

describe("Users login with JWT", function() {
  //init token
  var token = null;

  //login users before we continue
  before(function(done) {
    // runs before all tests in this block
    this.timeout(0);
    request
      .post("/users/login")
      .send(userCredentials)
      .end(function(err, response) {
        token = `JWT ${response.body.user.token}`;
        expect(response.statusCode).to.equal(200);
        done(err);
      });
  });

  //return current user when we login
  it("/users/current return current users 'suck' ", function(done) {
    this.timeout(0);

    request
      .get("/users/current")
      .set("Accept", "application/json")
      .set("Authorization", token)
      .end((err, res) => {
        expect(res.body.info.username).to.equal("suck");
        expect(res.statusCode).to.equal(200);
        done(err);
      });
  });

  //return all user with status of this users
  it("/users/browse should return arrays of users when login", function(done) {
    this.timeout(0);

    request
      .get("/users/browse")
      .set("Accept", "application/json")
      .set("Authorization", token)
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body.users.length).to.equal(res.body.count);
        done(err);
      });
  });

  //return user one user that we request
  it("/users?username=suck should return username suck", function(done) {
    this.timeout(0);

    request
      .get("/users?username=suck")
      .set("Accept", "application/json")
      .set("Authorization", token)
      .end((err, res) => {
        expect(res.body.user.username).to.equal("suck");
        expect(res.statusCode).to.equal(200);
        done(err);
      });
  });
});
