const express = require('express');
const router = express.Router();

const tiyCtrl = require('../controllers/tiy-controller');
const operatorCtrl = require('../controllers/operator-controller');
const adminCtrl = require('../controllers/admin-controller');
const bookingCtrl = require('../controllers/booking-controller');
const auth = require('./auth');

router.get('/', auth.optional, async (req, res) =>{
    res.status(200).json({
        'message': "tour_it_yourself's home page"
    })
});
router.get('/browse', auth.require, operatorCtrl.checkOperatorStatus, tiyCtrl.getNonAccepted);
router.get('/accepted', auth.require, adminCtrl.checkAdminStatus, tiyCtrl.getAccepted);
router.get('/all', auth.require, adminCtrl.checkAdminStatus, tiyCtrl.getAll);

router.get('/:id', auth.require, tiyCtrl.checkOwnTiy, tiyCtrl.getOneTiy);
module.exports = router