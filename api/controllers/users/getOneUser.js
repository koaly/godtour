const User = require("../../models/user-models");
const { asynWrapper } = require("../utility/asynWarpper");
const { UserNotFoundException } = require("./exception");

const handle = async (req, res) => {
  const { username } = req.params;
  const querry = { username: username };

  const user = await User.findOne(querry);

  if (!user) throw new UserNotFoundException();

  return res.status(200).json({
    user: user.toProfileJSON()
  });
};

module.exports = asynWrapper.bind(null, handle);
