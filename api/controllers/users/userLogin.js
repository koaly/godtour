const passport = require("passport");

const { asynWrapper } = require("../utility/asynWarpper");
const { UserNotFoundException } = require("./exception");

const handle = async (req, res) => {
  return await passport.authenticate(
    "local-login",
    { session: false },
    (e, user) => {
      if (!user) throw new UserNotFoundException();
      return res.status(200).json({
        user: user.toAuthJSON()
      });
    }
  )(req, res);
};

module.exports = asynWrapper.bind(null, handle);
