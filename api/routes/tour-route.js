const express = require("express");
const router = express.Router();

const tourCtrl = require("../controllers/tours/");
const operatorCtrl = require("../controllers/operator-controller");
const bookingController = require("../controllers/booking/");
const bookingCtrl = require("../controllers/booking-controller");
const auth = require("./auth");

const tourConfig = require("./validation/tours-validation");
const bookingConfig = require("./validation/booking-validation");
const checkValidation = require("./validation/checkValidation");

router.get("/", auth.optional, tourCtrl.getOneTour);
router.get("/browse", auth.optional, tourCtrl.getAllTours);
//router.get("/browse", auth.optional, tourCtrl.getAll);
router.post(
  "/create",
  auth.require,
  operatorCtrl.checkOperatorStatus,
  tourConfig.tour,
  checkValidation,
  tourCtrl.addTour
);

router.get("/booking/:id", auth.require, bookingController.getOneBooking);

router.post(
  "/:id",
  auth.require,
  bookingConfig.bookTour,
  checkValidation,
  bookingController.bookTour
);

router.delete("/booking/:id", auth.require, bookingController.cancelBooking);
router.delete("/", auth.require, tourCtrl.deleteTour);

router.put(
  "/",
  auth.require,
  // tourConfig.tour,
  // checkValidation,
  tourCtrl.editTour
);
/*
router.get(
  "/:id/bookings",
  auth.require,
  tourCtrl.checkNotNullTour,
  tourCtrl.checkOwnTour,
  bookingCtrl.getTourBooking
);
*/
module.exports = router;
