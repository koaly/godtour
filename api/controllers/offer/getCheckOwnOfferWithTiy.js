const Offer = require("../../models/offer-models");
const Tiy = require("../../models/tiy-models");

const { asynWrapper, checkObjectIdIsValid } = require("../utility");
const {
  OfferNotFound,
  Request,
  ObjectIdIsNotValidException,
  NoPermissonAccess,
  TiyNotFound
} = require("../utility/exception");

const handle = async (req, res, next) => {
  const {
    //payload from auth
    payload: {
      info: { id: UserID, status: userStatus }
    },
    //from url
    params: { offerID, tiyID }
  } = req;

  //check if request id both tiy and offer
  if (!tiyID) throw new Request("TiyID in Params");
  if (!offerID) throw new Request("OfferID in Params");

  //check objectid if is not value and handleing errors
  if (!checkObjectIdIsValid(offerID) && !checkObjectIdIsValid(tiyID))
    throw new ObjectIdIsNotValidException();

  //search tiy models with tiyID from params
  const tiy = await Tiy.findOne({ _id: tiyID });
  //check it exits it not handling error
  if (!tiy) throw new TiyNotFound();

  //search offer models with offerID
  const offer = await Offer.findOne({ _id: offerID });
  //if not found offers in serach
  if (!offer) throw new OfferNotFound(offerID);

  //check if not own tour return no permission if admin can access
  if (userStatus == 2 || (UserID == offer.operatorID && UserID == tiy.UserID)) {
    //set variable to locals in res to send to next middleware
    res.locals.offer = offer;
    res.locals.tiy = tiy;
    next();
  } else {
    //handleing permission
    throw new NoPermissonAccess();
  }
};

//warpper catch function
module.exports = asynWrapper.bind(null, handle);
