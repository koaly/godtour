const { asynWrapper } = require("../utility/");

const handle = async (req, res) => {
  const {
    locals: { user }
  } = res;

  return res.status(200).json({
    user: user.toProfileJSON()
  });
};

module.exports = asynWrapper.bind(null, handle);
