const { asynWrapper } = require("../utility");

/**
 * this function request middleware to recive locals.offer
 */
const handle = async (req, res, next) => {
  const {
    locals: { offer }
  } = res;

  //return json file to request with status 200
  return res.status(200).json({
    offer
  });
};

//warpper catch function
module.exports = asynWrapper.bind(null, handle);
