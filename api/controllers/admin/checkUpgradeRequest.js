//import errors handings
const {
  UserNotFoundException,
  NoRequestUpgrade,
  Request
} = require("../utility/exception");
//warpper function this to .catch()
const { asynWrapper } = require("../utility/");

//requuire user models
const User = require("../../models/user-models");

const handle = async (req, res, next) => {
  //require params parameter in routes
  const {
    params: { username }
  } = req;

  //if not insert params in routes handing error request
  if (!username) throw new Request("username");

  //find user in databse using condition username
  const user = await User.findOne({ username });

  //if not found handing errors
  if (!user) throw new UserNotFoundException();
  //if found but doesn't upgrade request handing error with no request upgrade
  if (!user.upgradeRequest) throw new NoRequestUpgrade(username);

  //set res locals to store new user
  res.locals.user = user;

  //send callback to next middleware
  return next();
};

//using asynwarpper like try catch but handing with .catch in every function that create and return errors handing
module.exports = asynWrapper.bind(null, handle);
