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

exports.addOffer = async function(req, res, next){
    try{
        const { payload: { id, email } } = req;
        const offer = await new Offer({
            _id: new mongoose.Types.ObjectId,
            name: req.body.name,
            tiyID: req.params.tiyID,
            operatorID: id,
            operatorName: email,
            price: req.body.price,
            dest: req.body.dest,
            dayDuration: req.body.dayDuration,
            nightDuration: req.body.nightDuration,
            departDate: req.body.departDate,
            returnDate: req.body.returnDate,
            airline: req.body.airline,
            member: req.body.member,
            food: req.body.food,
            detail: req.body.detail,
            highlight: req.body.highlight
        });
        const result = await offer.save();
        console.log(result);
        res.status(201).json({
            message: "Offer added"
        });
    } catch(err){
        console.log(err);
        res.status(500).json({
            error: err
        })
    }
}