const express = require('express');
const router = express.Router();

const tiyCtrl = require('../controllers/tiy-controller');
const operatorCtrl = require('../controllers/operator-controller');
const adminCtrl = require('../controllers/admin-controller');
const bookingCtrl = require('../controllers/booking-controller');
const offerCtrl = require('../controllers/offer-controller');
const auth = require('./auth');

router.get('/', auth.optional, async (req, res) =>{
    res.status(200).json({
        'message': "tour-it-yourself's home page"
    })
});
router.get('/browse', auth.require, operatorCtrl.checkOperatorStatus, tiyCtrl.getNonAccepted);
router.get('/accepted', auth.require, adminCtrl.checkAdminStatus, tiyCtrl.getAccepted);
router.get('/all', auth.require, adminCtrl.checkAdminStatus, tiyCtrl.getAll);
router.get('/create', auth.require, operatorCtrl.checkNonOperatorStatus, async (req, res) => {
    res.status(200).json({
        'message': "add tiy page"
    });
});
router.post('/create', auth.require, operatorCtrl.checkNonOperatorStatus, tiyCtrl.addTiy);
router.get('/:tiyID', auth.require, tiyCtrl.checkOwnTiyPlus, tiyCtrl.checkNonAccepted, tiyCtrl.getOneTiy);
router.delete('/:tiyID', auth.require, tiyCtrl.checkOwnTiy, tiyCtrl.deleteTiy);
router.get('/:tiyID/edit', auth.require, tiyCtrl.checkOwnTiy, tiyCtrl.getOneTiy);
router.put('/:tiyID/edit', auth.require, tiyCtrl.checkOwnTiy, tiyCtrl.editTiy);

router.get('/:tiyID/offers', auth.require, tiyCtrl.checkOwnTiy, offerCtrl.getByTiy);
router.get('/:tiyID/offers/:offerID', auth.require, offerCtrl.checkOwnOfferPlus, offerCtrl.getOneOffer);
router.post('/:tiyID/offers/:offerID', auth.require, tiyCtrl.checkOwnTiy, tiyCtrl.acceptOffer);
router.delete('/:tiyID/offers/:offerID', auth.require, offerCtrl.checkOwnOffer, offerCtrl.deleteOffer);

module.exports = router