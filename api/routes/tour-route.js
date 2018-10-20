const express = require('express');
const router = express.Router();

const tourController = require('../controllers/tour-controller');

router.get('/',tourController.getAll);
router.post('/add',tourController.addTour);
router.post('/edit/:id',tourController.editTour);

module.exports = router
