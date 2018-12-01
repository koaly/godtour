const {
  UserNotFoundException,
  NoRequestUpgrade,
  Request
} = require("../utility/exception");
const User = require("../../models/user-models");
const handle = async (req, res, next) => {
  const {
    params: { username }
  } = req;

  if (!username) next(new Request("username"));
  const user = await User.findOne({ username: username });

  if (!user) next(new UserNotFoundException());
  if (!user.upgradeRequest) next(new NoRequestUpgrade());

  return next(null);
};

module.exports = handle;
