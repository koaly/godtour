const Offer = require("../../models/offer-models");
const { asynWrapper } = require("../utility");
const { Exception } = require("../utility/exception");

/**
 * this function request middleware to recive locals.offer
 */
const handle = async (req, res, next) => {
  const {
    locals: { offer }
  } = res;

  //remove offer
  const result = await Offer.remove({ _id: offer._id });

  //return json file to request with status 200
  if (result) {
    return res.status(200).json({
      msg: "remove offer success",
      tiyID: offer.tiyID,
      name: offer.name,
      operatorID: offer.operatorID
    });
  } else throw new Exception();
};

//warpper catch function
module.exports = asynWrapper.bind(null, handle);
