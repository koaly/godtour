const mongoose = require('mongoose');

const Tour = require('../models/tour-models');

exports.getAll = async function(req,res,next){
    try{
        let tours = await Tour.find()
        .select()
        .exec()
        console.log(tours);
        const response = {
            count: tours.length,
            tour : tours
        }
        res.status(200).json({
            response
        });
    } catch(err){
        console.log(err);
        res.status(500).json({
            error: err
        });
    }
}

exports.addTour = async function(req, res, next){
    const tour = await new Tour({
        _id: new mongoose.Types.ObjectId,
        name: req.body.name,
        operatorID: "admin",
        operatorName: "admin",
        price: req.body.price,
        dest: req.body.dest,
        dayDuration: req.body.dayDuration,
        nightDuration: req.body.nightDuration,
        startBooking: req.body.startBookDate + 'T' + req.body.startBookTime,
        endBooking: req.body.endBookDate + 'T' + req.body.endBookTime,
        departDate: req.body.departDate,
        returnDate: req.body.returnDate,
        airline: req.body.airline,
        maxSeat: req.body.seat,
        currentSeat: req.body.seat,
        food: req.body.food,
        detail: req.body.detail,
        highlight: req.body.highlight
    })
    tour.save()
    .then(result =>{
        console.log(result);
        res.status(201).json({
            message: "Tour added"
        })
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({
            error: err
        })
    });
}