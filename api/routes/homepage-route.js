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

            let show = [];
            let i = 0
            let newTour = null;
            for (i = 0; i < Math.min(3, tours.length); i++) {
                newTour = tours[Math.floor(Math.random() * tours.length)]
                for (let j = 0; j < i; j++) {
                    while (show[j] === newTour) {
                        newTour = tours[Math.floor(Math.random() * tours.length)]
                    }
                }
                show[i] = newTour
            }
            return res.status(200).json({
                tours: show
            })
        }

        catch (e) {
            HandingErorr(res, e)
        }
    })
module.exports = router