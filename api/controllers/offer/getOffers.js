const Offer = require("../../models/offer-models");
const { asynWrapper } = require("../utility");
const { OfferNotFound } = require("../utility/exception");

const handle = async (req, res, next) => {
  //search offer models with tiyID
  const offers = await Offer.find();
  //if not found offers in serach
  if (!offers) throw new OfferNotFound(offerID);

  res.locals.offers = offers;
  next();
};

//warpper catch function
module.exports = asynWrapper.bind(null, handle);
