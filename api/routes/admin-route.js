const express = require("express");
const router = express.Router();

const adminCtrl = require("../controllers/admin-controller");
const adminController = require("../controllers/admin/");
const operatorController = require("../controllers/operator/");
const userController = require("../controllers/users");
const bookingCtrl = require("../controllers/booking/");
const auth = require("./auth");

router.get("/booking/browse", auth.require, bookingCtrl.getAllBooking);
router.get(
  "/request/upgrade",
  auth.require,
  operatorController.checkAdminStatus,
  userController.findUserRequest
);
router.get(
  "/request/upgrade/:username",
  auth.require,
  operatorController.checkAdminStatus,
  adminController.checkUpgradeRequest,
  userController.OneUser
);

//no body require don't need to validation
router.get(
  "/request/upgrade/:username/accept",
  auth.require,
  operatorController.checkAdminStatus,
  adminController.checkUpgradeRequest,
  adminController.acceptUpgradeRequest
);
//no body require don't need to validation
router.get(
  "/request/upgrade/:id/refuse",
  auth.require,
  operatorController.checkAdminStatus,
  adminController.checkUpgradeRequest,
  adminController.refuseUpgradeRequest
);

module.exports = router;
