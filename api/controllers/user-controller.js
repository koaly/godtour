//passport library middleware
const passport = require("passport");

//import models
const User = require("../models/user-models");
const Tour = require("../models/tour-models");
const Booking = require("../models/booking-models");

const {
  UserNotFoundException,
  EmailAlreadyExits,
  HandingErorr
} = require("./handingError");

exports.checkNotNullUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(404).json({
        error: {
          message: "Not found"
        }
      });
    } else {
      return next();
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err
    });
  }
};

exports.getOneUser = async function(req, res, next) {
  const { username } = req.params;

  try {
    const user = await User.findOne({ username: username });

    if (!user || user.length == 0) throw new UserNotFoundException();

    return res.status(200).json({
      user: user.toProfileJSON()
    });
  } catch (e) {
    HandingErorr(res, e);
  }
};
exports.deleteUser = async (req, res, next) => {
  const { username } = req.params;
  try {
    const user = await User.findOne({ username: username });
    if (!user || user.length == 0) throw new UserNotFoundException();

    const { _id } = user;
    console.log(_id);
    const tour = await Tour.find({ operatorID: _id });
    const booking = await Booking.find({ userID: _id });
    console.log(booking);
    user.remove();
    tour.forEach(async t => {
      console.log(t._id);
      let bookingInTour = await Booking.find({ tourID: t._id });
      await bookingInTour.forEach(async b => {
        b.remove();
      });

      t.remove();
    });
    booking.forEach(async b => {
      b.remove();
    });
    return res.status(200).json({
      message: "sucess remove"
    });
  } catch (e) {
    HandingErorr(res, e);
  }
};
exports.userLogin = (req, res, next) => {
  return passport.authenticate(
    "local-login",
    { session: false },
    (err, passportUser, info) => {
      console.log("local");
      if (!passportUser) {
        return res.status(404).json({
          message: info
        });
      }
      if (passportUser) {
        return res.status(200).json({
          user: passportUser.toAuthJSON()
        });
      }
    }
  )(req, res, next);
};

exports.currentUser = async (req, res, next) => {
  const {
    payload: { info }
  } = req;
  return res.status(200).json({
    info: info
  });
};

exports.editCurrentUser = async (req, res, next) => {
  try {
    const {
      payload: { info }
    } = req;
    const id = info.id;

    const {
      displayName,
      imgsrc,
      gender,
      upgradeRequest,
      upgradeReason
    } = req.body;

    const editUser = {};

    editUser.displayName = displayName;
    editUser.imgsrc = imgsrc;
    editUser.gender = gender;
    editUser.upgradeRequest = upgradeRequest;
    editUser.upgradeReason = upgradeReason;

    const user = await User.findOneAndUpdate({ _id: id }, editUser, {
      new: true
    });
    if (!user) throw new UserNotFoundException();

    return res.status(200).json({
      user: user.toProfileJSON,
      message: "current user have been update //get new token",
      token: user.generateJWT()
    });
  } catch (e) {
    HandingErorr(res, e);
  }
};
exports.userSignup = async (req, res, next) => {
  try {
    const { email, password, username, displayName, imgsrc, gender } = req.body;

    const user = await User.find({
      $or: [{ email: email }, { username: username }]
    });

    if (user.length >= 1) throw new EmailAlreadyExits();
    const newUser = await new User();

    newUser.email = email;
    newUser.password = await newUser.generateHash(password);
    newUser.username = username;
    newUser.gender = gender;
    newUser.displayName = displayName;
    newUser.imgsrc = imgsrc;

    const result = await newUser.save();
    res.status(201).json({
      message: "New User Created",
      user: result
    });
  } catch (e) {
    HandingErorr(res, e);
  }
};
