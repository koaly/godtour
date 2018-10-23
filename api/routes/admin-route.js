const express = require('express');
const router = express.Router();

const adminCtrl = require('../controllers/admin-controller');
const tourCtrl = require('../controllers/tour-controller');
const operatorCtrl = require('../controllers/operator-controller');
const bookingCtrl = require('../controllers/booking-controller');
const auth = require('./auth');

router.get('/request/upgrade', auth.require, adminCtrl.checkAdminStatus, adminCtrl.getUpgradeRequest);
router.put('/request/upgrade/:id/accept', auth.require, adminCtrl.checkAdminStatus, adminCtrl.checkUpgradeRequest, adminCtrl.acceptUpgradeRequest);
router.put('/request/upgrade/:id/refuse', auth.require, adminCtrl.checkAdminStatus, adminCtrl.checkUpgradeRequest, adminCtrl.refuseUpgradeRequest);

module.exports = router;