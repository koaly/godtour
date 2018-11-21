const jwt = require("express-jwt");
const getTokenFromHeaders = req => {
  const {
    headers: { authorization }
  } = req;
  if (authorization && authorization.split(" ")[0] == "JWT") {
    const result = authorization.split(" ")[1];
    return result;
  }
  return null;
};

//add secret in file later
const auth = {
  require: jwt({
    secret: process.env.JWT_SECRET,
    userProperty: "payload",
    getToken: getTokenFromHeaders,
    credentialsRequired: true
  }),
  optional: jwt({
    secret: process.env.JWT_SECRET,
    userProperty: "payload",
    getToken: getTokenFromHeaders,
    credentialsRequired: false
  })
};

module.exports = auth;
