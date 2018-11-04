const express = require('express');
const router = express.Router();

const tourCtrl = require('../controllers/tour-controller');
const operatorCtrl = require('../controllers/operator-controller');
const bookingCtrl = require('../controllers/booking-controller');
const auth = require('./auth');

const tourConfig = require('./validation/tours-validation')
const bookingConfig = require('./validation/booking-validation')
const checkValidation = require('./validation/checkValidation')

router.get('/', auth.optional, async (req, res) => {
    res.status(200).json({
        'message': "tour's home page"
    });
});
router.get('/browse', auth.optional, tourCtrl.getAll);
router.get('/create', auth.require, operatorCtrl.checkOperatorStatus, async (req, res) => {
    res.status(200).json({
        'message': "add tour page"
    });
});
router.post('/create',
    auth.require,
    operatorCtrl.checkOperatorStatus,
    tourConfig.tour,
    checkValidation,
    tourCtrl.addTour);

router.get('/:id', auth.optional, tourCtrl.checkNotNullTour, tourCtrl.getOneTour);

router.post('/:id',
    auth.require,
    bookingConfig.bookTour,
    checkValidation,
    bookingCtrl.bookTour);
router.delete('/:id',
    auth.require,
    tourCtrl.checkOwnTour,
    tourCtrl.deleteTour);
router.get('/:id/edit', auth.require, tourCtrl.checkNotNullTour, tourCtrl.checkOwnTour, tourCtrl.getOneTour);

router.put('/:id/edit',
    auth.require,
    tourCtrl.checkOwnTour,
    tourConfig.tour,
    checkValidation,
    tourCtrl.editTour);

router.get('/:id/bookings', auth.require, tourCtrl.checkNotNullTour, tourCtrl.checkOwnTour, bookingCtrl.getTourBooking);

module.exports = router