const express = require("express");
const router = express.Router();

const userCtrl = require("../controllers/user-controller");
const usercontroller = require("../controllers/users/");

const tiyCtrl = require("../controllers/tiy-controller");
const offerCtrl = require("../controllers/offer-controller");
const tourCtrl = require("../controllers/tour-controller");
const bookingCtrl = require("../controllers/booking-controller");
const operatorCtrl = require("../controllers/operator-controller");
const adminCtrl = require("../controllers/admin-controller");
const auth = require("./auth");
const config = require("./validation/users-validation");
const checkValidation = require("./validation/checkValidation");

//doesn't protect routes at this moment
router.get("/", auth.optional, usercontroller.getOneUser);
router.put("/", auth.require, usercontroller.editUser);
router.get("/browse", auth.require, usercontroller.getFilterUser);

router.get("/current", auth.require, userCtrl.currentUser);

router.get("/current/edit", auth.require, userCtrl.currentUser);

router.put(
  "/current/edit",
  auth.require,
  config.currentEdit,
  checkValidation,
  userCtrl.editCurrentUser
);
//show uniq user with uniq username

router.get("/?username=:username", auth.optional, usercontroller.getOneUser);
router.delete(
  "/:username",
  auth.require,
  adminCtrl.checkAdminStatus,
  userCtrl.deleteUser
);
router.get("/current/bookings", auth.require, bookingCtrl.getUserBooking);
router.get(
  "/current/bookings/:id",
  auth.require,
  bookingCtrl.checkNotNullBooking,
  bookingCtrl.checkOwnBooking,
  async (req, res) => {
    res.status(200).json({
      message: "cancel booking page"
    });
  }
);
router.delete(
  "/current/bookings/:id",
  auth.require,
  bookingCtrl.checkOwnBooking,
  bookingCtrl.cancelBooking
);

router.get(
  "/current/tours",
  auth.require,
  operatorCtrl.checkOperatorStatus,
  tourCtrl.getOwnTour
);

router.get(
  "/current/tiys",
  auth.require,
  operatorCtrl.checkNonOperatorStatus,
  tiyCtrl.getOwnTiy
);

router.get(
  "/current/offers",
  auth.require,
  operatorCtrl.checkOperatorStatus,
  offerCtrl.getOwnOffer
);

router.get(
  "/current/request/upgrade",
  auth.require,
  operatorCtrl.checkNonOperatorStatus,
  userCtrl.currentUser
);

router.put(
  "/current/request/upgrade",
  auth.require,
  operatorCtrl.checkNonOperatorStatus,
  operatorCtrl.requestUpgrade
);

router.get("/login", auth.optional, async (req, res, next) => {
  res.status(200).json({
    message: "login page"
  });
});

router.post(
  "/signup",
  auth.optional,
  config.signup,
  checkValidation,
  userCtrl.userSignup
);

router.post(
  "/login",
  auth.optional,
  config.login,
  checkValidation,
  userCtrl.userLogin
);

/*
router.get('/logout', (req, res) => {
    req.logout();
    res.status(200).json({
        'message': 'succesfully logout'
    })
})
*/

module.exports = router;
