const express = require("express");
const router = express.Router();

const adminCtrl = require("../controllers/admin/");
const userController = require("../controllers/users");
const bookingController = require("../controllers/booking");
const auth = require("./auth");

router.get(
  "/booking/browse",
  auth.require,
  adminCtrl.checkAdminStatus,
  bookingController.getAllBooking
);

router.get(
  "/request/upgrade",
  auth.require,
  adminCtrl.checkAdminStatus,
  userController.findUserRequest
);

router.get(
  "/request/upgrade/:username",
  auth.require,
  adminCtrl.checkAdminStatus,
  adminCtrl.checkUpgradeRequest,
  userController.OneUser
);

router.get(
  "/request/upgrade/:username/accept",
  auth.require,
  adminCtrl.checkAdminStatus,
  adminCtrl.checkUpgradeRequest,
  adminCtrl.acceptUpgradeRequest
);

router.get(
  "/request/upgrade/:username/refuse",
  auth.require,
  adminCtrl.checkAdminStatus,
  adminCtrl.checkUpgradeRequest,
  adminCtrl.refuseUpgradeRequest
);

module.exports = router;
