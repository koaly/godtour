const Offer = require("../../models/offer-models");
const { asynWrapper, checkObjectIdIsValid } = require("../utility");
const {
  OfferNotFound,
  Request,
  ObjectIdIsNotValidException
} = require("../utility/exception");

const handle = async (req, res, next) => {
  const {
    //payload from auth
    payload: {
      info: { id: UserID, status: userStatus }
    },
    //from url
    params: { tiyID }
  } = req;

  //check if request id
  if (!tiyID) throw new Request("tiyID in Params");
  //check objectid if is not value and handleing errors
  if (!checkObjectIdIsValid(tiyID)) throw new ObjectIdIsNotValidException();

  //search offer models with tiyID
  const offers = await Offer.find({ tiyID, operatorID: UserID });

  //if not found offers in serach
  if (!offers) throw new OfferNotFound(offerID);

  res.locals.offers = offers;
  next();
};

//warpper catch function
module.exports = asynWrapper.bind(null, handle);
