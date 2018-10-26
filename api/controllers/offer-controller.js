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

exports.editOffer = async function(req, res, next){
    try{
        const offer = {}
        if(req.body.name) offer.name = req.body.name
        if(req.body.price) offer.price = req.body.price
        if(req.body.dest) offer.dest = req.body.dest
        if(req.body.dayDuration) offer.dayDuration = req.body.dayDuration
        if(req.body.nightDuration) offer.nightDuration = req.body.nightDuration
        if(req.body.departDate) offer.departDate = req.body.departDate
        if(req.body.returnDate) offer.returnDate = req.body.returnDate
        if(req.body.airline) offer.airline = req.body.airline
        if(req.body.member) offer.member = req.body.member
        if(req.body.food) offer.food = req.body.food
        if(req.body.detail) offer.detail = req.body.detail
        if(req.body.highlight) offer.highlight = req.body.highlight
        
        console.log(req.params);
        console.log(offer);
        const id = {_id:req.params.offerID}
        const result = await Offer.findOneAndUpdate(id, offer);
        console.log(result);
        res.status(200).json({
            message: "Offer updated"
        })
    } catch(err){
        console.log(err);
        res.status(500).json({
            error: err
        })
    }
}