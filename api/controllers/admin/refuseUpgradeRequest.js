const User = require("../../models/user-models");
const { asynWrapper } = require("../utility");
const { Exception } = require("../utility/exception");

const handle = async (req, res) => {
  const {
    locals: { user }
  } = res;

  user.upgradeRequest = false;
  user.upgradeReason = "refuse upgade you suck";
  user.status = 0;

  const result = await User.update({ _id: user.id }, user);
  if (result) {
    res.status(200).json({
      msg: `refuse upgarde user ${user.username}`,
      username: user.username
    });
  } else throw new Exception();
};

module.exports = asynWrapper.bind(null, handle);
