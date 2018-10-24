const express = require('express');
const router = express.Router();

const tourCtrl = require('../controllers/tour-controller');
const operatorCtrl = require('../controllers/operator-controller');
const bookingCtrl = require('../controllers/booking-controller');
const auth = require('./auth');

router.get('/', auth.optional, async (req, res) =>{
    res.status(200).json({
        'message': "tour's home page"
    })
});
router.get('/browse', auth.optional, tourCtrl.getAll);
router.post('/add', auth.require, operatorCtrl.checkOperatorStatus, tourCtrl.addTour);
router.get('/:id', auth.optional, tourCtrl.getOneTour);
router.post('/:id', auth.require, bookingCtrl.bookTour);
router.delete('/:id', auth.require, tourCtrl.checkOwnTour, tourCtrl.deleteTour);
router.get('/:id/edit', auth.require, tourCtrl.checkOwnTour, tourCtrl.getOneTour);
router.put('/:id/edit', auth.require, tourCtrl.checkOwnTour, tourCtrl.editTour);
router.get('/:id/bookings', auth.require, tourCtrl.checkOwnTour, bookingCtrl.getTourBooking);

module.exports = router
