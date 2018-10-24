const express = require('express');
const router = express.Router();

const tiyCtrl = require('../controllers/tiy-controller');
const operatorCtrl = require('../controllers/operator-controller');
const bookingCtrl = require('../controllers/booking-controller');
const auth = require('./auth');

router.get('/', auth.optional, async (req, res) =>{
    res.status(200).json({
        'message': "tour_it_yourself's home page"
    })
});
module.exports = router