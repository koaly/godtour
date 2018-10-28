const mongoose = require('mongoose');

const Tour = require('../models/tour-models');
const User = require('../models/user-models');
const Booking = require('../models/booking-models');

exports.checkNotNullTour = async (req, res, next) => {
    try{
        const tour = await Tour.findById(req.params.id);
        if (!tour) {
            res.status(404).json({
                error : {
                    message: "Not found"
                }
            });
        } else {
            return next();
        }
    } catch(err){
        console.log(err);
        res.status(500).json({
            error: err
        });
    }
}

exports.getAll = async function (req, res, next) {
    try {
        let tours = await Tour.find()
            .select()
            .exec()
        console.log(tours);
        res.status(200).json({
            count: tours.length,
            tours
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: err
        });
    }
}

exports.getOwnTour = async function (req, res, next) {
    try {
        const { payload: { info } } = req;
        const tours = await Tour.find({ operatorID: info.id })
            .select()
            .exec()
        console.log(tours);
        res.status(200).json({
            count: tours.length,
            tours
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: err
        });
    }
}

exports.getOneTour = async function (req, res, next) {
    try {
        const tour = await Tour.findById(req.params.id)
            .select()
            .exec()
        console.log(tour);
        res.status(200).json({
            tour
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: err
        });
    }
}

exports.checkOwnTour = async (req, res, next) => {
    try {
        const { payload: { info } } = req;
        const tour = await Tour.findById(req.params.id);
        console.log(tour.operatorID);
        if (info.id != tour.operatorID) {
            return res.status(403).json({
                error: {
                    message: "Permission denied"
                }
            });
        } else {
            return next();
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: err
        });
    }
}

exports.addTour = async function (req, res, next) {
    try {
        const { payload: { info } } = req;

        const tour = await new Tour({
            _id: new mongoose.Types.ObjectId,
            name: req.body.name,
            operatorID: info.id,
            operatorName: info.displayName,
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
        });
        const result = await tour.save();
        console.log(result);
        res.status(201).json({
            message: "Tour added"
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: err
        })
    }
}

exports.editTour = async function (req, res, next) {
    try {
        if (req.body.maxSeat < req.body.currentSeat) {
            return res.status(405).json({
                error: {
                    message: "Max Seat is less than Remaining Seat"
                }
            });
        }
        const tour = {}
        if (req.body.name) tour.name = req.body.name
        if (req.body.price) tour.price = req.body.price
        if (req.body.dest) tour.dest = req.body.dest
        if (req.body.dayDuration) tour.dayDuration = req.body.dayDuration
        if (req.body.nightDuration) tour.nightDuration = req.body.nightDuration
        if (req.body.startBookDate && req.body.startBookTime) tour.startBooking = req.body.startBookDate + 'T' + req.body.startBookTime
        if (req.body.endBookDate && req.body.endBookTime) tour.endBooking = req.body.endBookDate + 'T' + req.body.endBookTime
        if (req.body.departDate) tour.departDate = req.body.departDate
        if (req.body.returnDate) tour.returnDate = req.body.returnDate
        if (req.body.airline) tour.airline = req.body.airline
        if (req.body.maxSeat) tour.maxSeat = req.body.maxSeat
        if (req.body.currentSeat) tour.currentSeat = req.body.currentSeat
        if (req.body.food) tour.food = req.body.food
        if (req.body.detail) tour.detail = req.body.detail
        if (req.body.highlight) tour.highlight = req.body.highlight

        console.log(req.params);
        console.log(tour);
        const id = { _id: req.params.id }
        const result = await Tour.findOneAndUpdate(id, tour);
        console.log(result);
        res.status(200).json({
            message: "Tour updated"
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: err
        })
    }
}

exports.deleteTour = async (req, res, next) => {
    try {
        const id = { _id: req.params.id }
        const result = await Tour.findOneAndRemove(id);
        console.log(result);
        res.status(200).json({
            message: "Tour deleted"
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: err
        })
    }
}
