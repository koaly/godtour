const express = require('express');
const router = express.Router();

const tourController = require('../controllers/tour');

router.get('/',tourController.tours_get_all)


module.exports = router
