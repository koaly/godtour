const express = require('express');
const router = express.Router();
const auth = require('./auth')
const Tour = require('../models/tour-models')
const { TourNotFoundException, HandingErorr } = require('../controllers/handingError')


router.get('/',
    auth.optional,
    async (req, res, next) => {
        try {
            let tours = await Tour.find();

            if (!tours || tours.length === 0)
                throw new TourNotFoundException()

            tours = tours[Math.floor(Math.random(5) * tours.length)]
            console.log(tours)
            return res.status(200).json({
                tours: tours
            })
        }

        catch (e) {
            HandingErorr(res, e)
        }
    })
module.exports = router