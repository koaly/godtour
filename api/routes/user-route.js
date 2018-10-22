const express = require('express');
const router = express.Router();
const passport = require('passport');

const userController = require('../controllers/user-controller')
const tourController = require('../controllers/tour-controller')
const bookingController = require('../controllers/booking-controller')
const auth = require('./auth');
const User = require('../models/user-models')

router.get('/', auth.optional, userController.getAll);
router.get('/current', auth.require, userController.curretUser);
router.get('/current/bookings', auth.require, bookingController.getUserBooking);
router.get('/current/own_tours', auth.require, userController.checkOperatorStatus, tourController.getOwnTour);

router.get('/login', auth.optional, async (req, res, next) => {
    res.status(200).json({
        "message": "login page"
    })
})

router.get('/secret', auth.require, async (req, res, next) => {
    res.status(200).json({
        'message': "this is secret word"
    })
})

router.post('/signup', auth.optional, userController.userSignup);
router.post('/login', auth.optional, userController.userLogin);

/*
router.get('/logout', (req, res) => {
    req.logout();
    res.status(200).json({
        'message': 'succesfully logout'
    })
})
*/

module.exports = router;