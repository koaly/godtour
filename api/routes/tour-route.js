const express = require('express');
const router = express.Router();

const tourController = require('../controllers/tour-controller');
const userController = require('../controllers/user-controller');
const auth = require('./auth');

router.get('/', auth.optional, tourController.getAll);
router.post('/add', auth.require, userController.checkOperatorStatus, tourController.addTour);
router.get('/:id', auth.optional, tourController.getOneTour);
router.post('/:id', auth.require, tourController.bookTour);
router.put('/:id/edit', auth.require, tourController.checkOwnTour, tourController.editTour);
router.delete('/:id', auth.require, tourController.checkOwnTour, tourController.deleteTour);

module.exports = router
