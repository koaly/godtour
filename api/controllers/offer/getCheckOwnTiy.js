const Offer = require("../../models/offer-models");
const { asynWrapper, checkObjectIdIsValid } = require("../utility");
const {
  OfferNotFound,
  Request,
  ObjectIdIsNotValidException,
  NoPermissonAccess
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
  const offer = await Offer.find({ _id: tiyID });

  //if not found offers in serach
  if (!offer) throw new OfferNotFound(offerID);

  //check if not own tour return no permission if admin can access
  if (userStatus == 2 || UserID == offer.operatorID) {
    res.locals.offer = offer;
    next();
  } else {
    //handleing permission
    throw new NoPermissonAccess();
  }
};

//warpper catch function
module.exports = asynWrapper.bind(null, handle);
