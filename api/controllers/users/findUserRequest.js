const User = require("../../models/user-models");
const { asynWrapper, getPaginate } = require("../utility");
const { UserNotFoundException } = require("../utility/exception");
const getMapUser = require("./getMapUser");
const handle = async (req, res, next) => {
  const {
    query: { page, limit }
  } = req;

  let users = await User.find({ upgradeRequest: true });

  if (!users || users.length == 0) next(new UserNotFoundException());

  users = await getPaginate(users, page, limit);
  users = await getMapUser(users);
  return res.status(200).json({ users });
};

module.exports = asynWrapper.bind(null, handle);
