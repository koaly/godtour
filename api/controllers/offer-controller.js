const mongoose = require('mongoose');

const Tiy = require('../models/tiy-models');
const Offer = require('../models/offer-models');

exports.getByTiy = async (req, res, next) => {
    try{
        let offers = await Offer.find({tiyID: req.params.tiyID})
        .select()
        .exec()
        console.log(offers);
        res.status(200).json({
            count : offers.length,
            offers
        });
    } catch(err){
        console.log(err);
        res.status(500).json({
            error: err
        });
    }
}