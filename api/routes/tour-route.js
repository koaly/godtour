const express = require('express');
const router = express.Router();
const auth = require('./auth')
const tourController = require('../controllers/tour-controller');
const auth = require('./auth');

router.get('/', auth.optional, tourController.getAll);
router.post('/add', auth.require, tourController.addTour);
router.put('/edit/:id', auth.require, tourController.editTour);
router.delete('/:id', auth.require, tourController.deleteTour);

module.exports = router
