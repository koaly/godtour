const supertest = require("supertest");
const expect = require("chai").expect;

const request = supertest.agent("http://localhost:5000/api");

userCredentials = {
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
    // create tour
    it("GET /tours/create with error 401", function(done) {
        this.timeout(2000);

        request
            .get("/tours/create")
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
    var token = null;
    var tourID = null;
    before(function(done) {
        this.timeout(0);
        request
            .post("/users/login")
            .send(operatorCredentials)
            .end(function(err, response) {
                token = `JWT ${response.body.user.token}`;
                expect(response.statusCode).to.equal(200);
                done(err);
            });
    });
    // create tour
    it("GET /tours/create with 200", function(done) {
        this.timeout(0);

        request
            .get("/tours/create")
            .set("Accept", "application/json")
            .set("Authorization", token)
            .end((err, res) => {
                expect(res.body.message).to.equal("add tour page");
                expect(res.statusCode).to.equal(200);
                done(err);
            });
    });
    it("POST /tours/create with 201", function(done) {
        this.timeout(0);

        request
            .post("/tours/create")
            .set("Accept", "application/json")
            .set("Authorization", token)
            .send(tourCredentials)
            .end((err, res) => {
                expect(res.statusCode).to.equal(201);
                expect(res.body.message).to.equal("Tour added");
                tourID = res.body.tourID;
                console.log(`tourID: ${tourID}`);
                done(err);
            });
    });
    it(`DELETE /tours/:id with 200`, function(done) {
        this.timeout(0);

        request
            .delete(`/tours/${tourID}`)
            .set("Accept", "application/json")
            .set("Authorization", token)
            .end((err, res) => {
                expect(res.statusCode).to.equal(200);
                expect(res.body.message).to.equal("Tour deleted");
                done(err);
            });
    });
});