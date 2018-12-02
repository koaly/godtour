const Tiy = require("../../models/tiy-models");
const { asynWrapper, checkObjectIdIsValid } = require("../utility");
const {
  Request,
  ObjectIdIsNotValidException,
  NoPermissonAccess,
  TiyNotFound
} = require("../utility/exception");

const handle = async (req, res, next) => {
  const {
    payload: {
      info: { id: userID, status: userStatus }
    },
    params: { tiyID }
  } = req;

  //request tiyid
  if (!tiyID) throw new Request("TiyID");
  //check tiyID is vaild
  if (!checkObjectIdIsValid(tiyID)) throw new ObjectIdIsNotValidException();

  //find id
  const tiy = await Tiy.findOne({ _id: tiyID });
  if (!tiy) throw new TiyNotFound();

  //check if not admin or not own return
  if (userStatus == 2 || userID == tiy.userID) {
    res.locals.tiy = tiy;
    next();
  } else throw new NoPermissonAccess();

  //set tiy to next middleware
};

module.exports = asynWrapper.bind(null, handle);
