const express = require('express');
const router = express.Router();

const tourCtrl = require('../controllers/tour-controller');
const operatorCtrl = require('../controllers/operator-controller');
const bookingCtrl = require('../controllers/booking-controller');
const auth = require('./auth');

<<<<<<< HEAD
//express-valdator
const { body } = require('express-validator/check');
const { checkValidation } = require('../middleware/validation');
=======
const tourConfig = require('./validation/tours-validation')
const bookingConfig = require('./validation/booking-validation')
const checkValidation = require('./validation/checkValidation')
>>>>>>> f4d97e089aac70e0077fe574265e3d6477244699

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
<<<<<<< HEAD
router.post('/create', auth.require, operatorCtrl.checkOperatorStatus,
    [
        body('name')
            .isLength({ min: 3 })
            .trim()
            .escape()
            .withMessage('require name more than 3 charater')
            .isAlphanumeric()
            .withMessage('only charater or number is allowed')
        , body('price')
            .isFloat({ min: 0 })
            .withMessage('number less than zero is not allowed')
        , body('dest')
            .isAlpha()
            .withMessage('only alphabet is allowed')
        , body('dayDuration')
        , body('nightDuration')
        , body('startBookDate')
        , body('startBookTime')
        , body('endBookDate')
        , body('endBookTime')
        , body('departDate')
        , body('returnDate')
        , body('airline')
            .isAlpha()
            .withMessage('only alphabet is allowed')
        , body('seat')
            .isNumeric({ min: 0 })
            .withMessage('number less thant zero is now allowed')
        , body('food')
            .isAlphanumeric()
            .withMessage('only alphabet or number is alllowed')
        , body('detail')
        , body('highlight')
    ],
    checkValidation, tourCtrl.addTour);
router.get('/:id', auth.optional, tourCtrl.getOneTour);
router.post('/:id', auth.require, bookingCtrl.bookTour);
router.delete('/:id', auth.require, tourCtrl.checkOwnTour, tourCtrl.deleteTour);
router.get('/:id/edit', auth.require, tourCtrl.checkOwnTour, tourCtrl.getOneTour);
router.put('/:id/edit', auth.require, tourCtrl.checkOwnTour, tourCtrl.editTour);
router.get('/:id/bookings', auth.require, tourCtrl.checkOwnTour, bookingCtrl.getTourBooking);
=======
router.post('/create',
    auth.require,
    operatorCtrl.checkOperatorStatus,
    tourConfig.tour,
    checkValidation,
    tourCtrl.addTour);

router.get('/:id', auth.optional, tourCtrl.checkNotNullTour, tourCtrl.getOneTour);

router.post('/:id',
    auth.require,
    tourCtrl.checkNotNullTour,
    bookingConfig.bookTour,
    checkValidation,
    bookingCtrl.bookTour);
router.delete('/:id',
    auth.require,
    tourCtrl.checkNotNullTour,
    tourCtrl.checkOwnTour,
    tourCtrl.deleteTour);
router.get('/:id/edit', auth.require, tourCtrl.checkNotNullTour, tourCtrl.checkOwnTour, tourCtrl.getOneTour);

router.put('/:id/edit',
    auth.require,
    tourCtrl.checkNotNullTour,
    tourCtrl.checkOwnTour,
    tourConfig.tour,
    checkValidation,
    tourCtrl.editTour);

router.get('/:id/bookings', auth.require, tourCtrl.checkNotNullTour, tourCtrl.checkOwnTour, bookingCtrl.getTourBooking);
>>>>>>> f4d97e089aac70e0077fe574265e3d6477244699

module.exports = router
