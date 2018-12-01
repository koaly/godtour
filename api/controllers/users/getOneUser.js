const User = require("../../models/user-models");
const { asynWrapper } = require("../utility/");
const { UserNotFoundException } = require("../utility/exception");

const handle = async (req, res) => {
  const {
    query: { username }
  } = req;
  const user = await User.findOne({ username });
  if (!user) throw new UserNotFoundException(username);

  return res.status(200).json({
    user: user.toProfileJSON()
  });
};

module.exports = asynWrapper.bind(null, handle);
