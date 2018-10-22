const express = require('express');
const router = express.Router();

const tourController = require('../controllers/tour-controller');
const userController = require('../controllers/user-controller');
const bookingController = require('../controllers/booking-controller');
const auth = require('./auth');

router.get('/', auth.optional, tourController.getAll);
router.post('/add', auth.require, userController.checkOperatorStatus, tourController.addTour);
router.get('/:id', auth.optional, tourController.getOneTour);
router.post('/:id', auth.require, bookingController.bookTour);
router.delete('/:id', auth.require, tourController.checkOwnTour, tourController.deleteTour);
router.get('/:id/edit', auth.require, async (req, res) => {
    res.status(200).json({
        "message": "edit page"
    })
});
router.put('/:id/edit', auth.require, tourController.checkOwnTour, tourController.editTour);
router.get('/:id/bookings', auth.require, tourController.checkOwnTour, bookingController.getTourBooking);

module.exports = router
