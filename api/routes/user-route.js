const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user-controller')
const tiyCtrl = require('../controllers/tiy-controller');
const tourCtrl = require('../controllers/tour-controller')
const bookingCtrl = require('../controllers/booking-controller')
const operatorCtrl = require('../controllers/operator-controller')
const auth = require('./auth');
//import for validator for check
const { body } = require('express-validator/check');
const { checkValidation } = require('../middleware/validation')

router.get('/', auth.optional, userCtrl.getAll);
router.get('/current', auth.require, userCtrl.curretUser);

router.get('/current/bookings', auth.require, bookingCtrl.getUserBooking);
router.get('/current/bookings/:id', auth.require, bookingCtrl.checkOwnBooking, async (req, res) => {
    res.status(200).json({
        "message": "cancel booking page"
    })
});
router.delete('/current/bookings/:id', auth.require, bookingCtrl.checkOwnBooking, bookingCtrl.cancelBooking);
router.get('/current/tours', auth.require, operatorCtrl.checkOperatorStatus, tourCtrl.getOwnTour);
router.get('/current/tiys', auth.require, operatorCtrl.checkNonOperatorStatus, tiyCtrl.getOwnTiy);

router.get('/current/request/upgrade', auth.require, operatorCtrl.checkNonOperatorStatus, userCtrl.curretUser);
router.put('/current/request/upgrade', auth.require, operatorCtrl.checkNonOperatorStatus, operatorCtrl.requestUpgrade);

router.get('/login', auth.optional, async (req, res, next) => {
    res.status(200).json({
        "message": "login page"
    })
})

router.post('/signup', auth.optional,
    [
        body('email')
            .isEmail()
            .normalizeEmail()
            .withMessage('email is invaild'),
        body('password')
            .exists()
            .withMessage('require password'),
        body('username')
            .isLength({ min: 3 })
            .trim()
            .escape()
            .withMessage('require string more than 3 charater'),
        body('displayName')
            .isLength({ min: 3 })
            .trim()
            .escape()
            .withMessage('require string more than 3 charater'),
        body('gender')
            .isIn(['male', 'female', 'unknown'])
            .withMessage('request only field male female or unknow')
    ]
    , checkValidation, userCtrl.userSignup);

router.post('/login', auth.optional,
    [
        body('email')
            .isEmail()
            .normalizeEmail()
            .withMessage('email is invaild'),
        body('password')
            .exists()
            .withMessage('require password'),
    ],
    checkValidation, userCtrl.userLogin)


router.get('/:username', auth.optional, userCtrl.getOneUser)
/*
router.get('/logout', (req, res) => {
    req.logout();
    res.status(200).json({
        'message': 'succesfully logout'
    })
})
*/

module.exports = router;