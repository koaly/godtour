const express = require('express');
const router = express.Router();

const adminCtrl = require('../controllers/admin-controller');
const tourCtrl = require('../controllers/tour-controller');
const operatorCtrl = require('../controllers/operator-controller');
const userCtrl = require('../controllers/user-controller');
const bookingCtrl = require('../controllers/booking-controller');
const auth = require('./auth');

router.get('/request/upgrade', auth.require, adminCtrl.checkAdminStatus, adminCtrl.getUpgradeRequest);
router.get('/request/upgrade/:id', auth.require, adminCtrl.checkAdminStatus, adminCtrl.checkUpgradeRequest, userCtrl.getOneUser);
router.put('/request/upgrade/:id/accept', auth.require, adminCtrl.checkAdminStatus, adminCtrl.checkUpgradeRequest, adminCtrl.acceptUpgradeRequest);
router.put('/request/upgrade/:id/refuse', auth.require, adminCtrl.checkAdminStatus, adminCtrl.checkUpgradeRequest, adminCtrl.refuseUpgradeRequest);

module.exports = router;