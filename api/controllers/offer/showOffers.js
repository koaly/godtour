const { asynWrapper } = require("../utility");

/**
 * this function request middleware to recive locals.offers
 */
const handle = async (req, res, next) => {
  const {
    locals: { offers }
  } = res;

  //return json file to request with status 200
  return res.status(200).json({
    count: offers.length,
    offers
  });
};

//warpper catch function
module.exports = asynWrapper.bind(null, handle);
