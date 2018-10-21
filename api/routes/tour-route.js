const express = require('express');
const router = express.Router();

const tourController = require('../controllers/tour-controller');

router.get('/',tourController.getAll);
router.post('/add',tourController.addTour);
router.put('/edit/:id',tourController.editTour);
router.delete('/:id',tourController.deleteTour);

module.exports = router
