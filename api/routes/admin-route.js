const express = require("express");
const router = express.Router();

const adminCtrl = require("../controllers/admin-controller");
const adminController = require("../controllers/admin/");
const operatorController = require("../controllers/operator/");
const userCtrl = require("../controllers/user-controller");
const userController = require("../controllers/users");
const bookingCtrl = require("../controllers/booking/");
const auth = require("./auth");

router.get("/booking/browse", auth.require, bookingCtrl.getAllBooking);
router.get(
  "/request/upgrade",
  auth.require,
  operatorController.checkAdminStatus,
  adminCtrl.getUpgradeRequest
);
router.get(
  "/request/upgrade/:username",
  auth.require,
  operatorController.checkAdminStatus,
  adminController.checkUpgradeRequest,
  userController.getOneUser
);

//no body require don't need to validation
router.get(
  "/request/upgrade/:id/accept",
  auth.require,
  adminCtrl.checkAdminStatus,
  adminCtrl.checkUpgradeRequest,
  adminCtrl.acceptUpgradeRequest
);
//no body require don't need to validation
router.get(
  "/request/upgrade/:id/refuse",
  auth.require,
  adminCtrl.checkAdminStatus,
  adminCtrl.checkUpgradeRequest,
  adminCtrl.refuseUpgradeRequest
);

module.exports = router;
