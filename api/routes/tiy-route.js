const express = require('express');
const router = express.Router();

const tiyCtrl = require('../controllers/tiy-controller');
const operatorCtrl = require('../controllers/operator-controller');
const adminCtrl = require('../controllers/admin-controller');
const bookingCtrl = require('../controllers/booking-controller');
const auth = require('./auth');

router.get('/', auth.optional, async (req, res) =>{
    res.status(200).json({
        'message': "tour-it-yourself's home page"
    })
});
router.get('/browse', auth.require, operatorCtrl.checkOperatorStatus, tiyCtrl.getNonAccepted);
router.get('/accepted', auth.require, adminCtrl.checkAdminStatus, tiyCtrl.getAccepted);
router.get('/all', auth.require, adminCtrl.checkAdminStatus, tiyCtrl.getAll);
router.get('/add', auth.require, operatorCtrl.checkNonOperatorStatus, async (req, res) => {
    res.status(200).json({
        'message': "add tiy page"
    });
});
router.post('/add', auth.require, operatorCtrl.checkNonOperatorStatus, tiyCtrl.addTiy);
router.get('/:id', auth.require, tiyCtrl.checkOwnTiyPlus, tiyCtrl.getOneTiy);
router.delete('/:id', auth.require, tiyCtrl.checkOwnTiy, tiyCtrl.deleteTiy);
router.get('/:id/edit', auth.require, tiyCtrl.checkOwnTiy, tiyCtrl.getOneTiy);
router.put('/:id/edit', auth.require, tourCtrl.checkOwnTiy, tiyCtrl.editTiy);

module.exports = router