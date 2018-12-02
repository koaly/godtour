const express = require("express");
const router = express.Router();
const auth = require("./auth");

const homepage = require("../controllers/homepage/homepage");

router.get("/", auth.optional, homepage);
module.exports = router;
