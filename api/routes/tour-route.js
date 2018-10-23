const express = require('express');
const router = express.Router();

const tourController = require('../controllers/tour-controller');
const operatorController = require('../controllers/operator-controller');
const bookingController = require('../controllers/booking-controller');
const auth = require('./auth');

router.get('/', auth.optional, tourController.getAll);
router.post('/add', auth.require, operatorController.checkOperatorStatus, tourController.addTour);
router.get('/:id', auth.optional, tourController.getOneTour);
router.post('/:id', auth.require, bookingController.bookTour);
router.delete('/:id', auth.require, tourController.checkOwnTour, tourController.deleteTour);
router.get('/:id/edit', auth.require, tourController.checkOwnTour, tourController.getOneTour);
router.put('/:id/edit', auth.require, tourController.checkOwnTour, tourController.editTour);
router.get('/:id/bookings', auth.require, tourController.checkOwnTour, bookingController.getTourBooking);

module.exports = router
