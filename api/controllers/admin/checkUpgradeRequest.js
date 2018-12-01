const {
  UserNotFoundException,
  NoRequestUpgrade,
  Request
} = require("../utility/exception");

const { asynWrapper } = require("../utility/");

const User = require("../../models/user-models");
const handle = async (req, res, next) => {
  const {
    params: { username }
  } = req;

  if (!username) throw new Request("username");

  const user = await User.findOne({ username });

  if (!user) throw new UserNotFoundException();
  if (!user.upgradeRequest) throw new NoRequestUpgrade(username);

  res.locals.user = user;

  return next();
};

module.exports = asynWrapper.bind(null, handle);
