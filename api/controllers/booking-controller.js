const mongoose = require('mongoose');

const Tour = require('../models/tour-models');
const User = require('../models/user-models');
const Booking = require('../models/booking-models');

exports.getAll = async function(req,res,next){
    try{
        const bookings = await Booking.find()
        .select()
        .exec()
        console.log(bookings);
        res.status(200).json({
            count : bookings.length,
            bookings
        });
    } catch(err){
        console.log(err);
        res.status(500).json({
            error: err
        });
    }
}

exports.getUserBooking = async function(req,res,next){
    try{
        const { payload: { info } } = req;
        const user = await User.findById(info.id);
        const bookings = await Booking.find({userID: info.id})
        .select()
        .exec()
        console.log(bookings);
        res.status(200).json({
            count : bookings.length,
            bookings
        });
    } catch(err){
        console.log(err);
        res.status(500).json({
            error: err
        });
    }
}

exports.getTourBooking = async function(req,res,next){
    try{
        const bookings = await Booking.find({tourID: req.params.id})
        .select()
        .exec()
        console.log(bookings);
        res.status(200).json({
            count : bookings.length,
            bookings
        });
    } catch(err){
        console.log(err);
        res.status(500).json({
            error: err
        });
    }
}

exports.bookTour = async (req, res, next) => {
    try{
        const session = await Tour.startSession();
        console.log(session);
        const { payload: { info } } = req;
        const tour = await Tour.findById(req.params.id);
        console.log(tour);
        const booking = await new Booking({
            _id: new mongoose.Types.ObjectId,
            userID: info.id,
            userName: info.displayName,
            tourID: tour._id,
            tourName: tour.name,
            amountBooking: req.body.amountBooking
        });
        session.startTransaction();
        if (tour.currentSeat - req.body.amountBooking < 0){
            return res.status(405).json({
                error: {
                    message: "Attemped to book more than available"
                }
            }); 
        } else{
            tour.currentSeat -= req.body.amountBooking;
            const bookingResult = await booking.save();
            const tourResult = await tour.save();
            console.log(bookingResult);
            console.log(tourResult);
            res.status(201).json({
                message: "Book tour successful"
            });
        }
        await session.commitTransaction();
    } catch(err){
        console.log(err);
        res.status(500).json({
            error: err
        })
    }
}

exports.cancelBooking = async (req, res, next) => {
    try{
        const booking = await Booking.findById(req.params.id);
        const tour = await Tour.findById(booking.tourID);
        console.log(booking);
        console.log(tour);
        tour.currentSeat += booking.amountBooking;
        const bookingResult = await booking.remove();
        const tourResult = await tour.save();
        console.log(bookingResult);
        console.log(tourResult);
        res.status(200).json({
            message: "Booking cancel successful"
        })
    } catch(err){
        console.log(err);
        res.status(500).json({
            error: err
        })
    }
}


exports.checkOwnBooking = async (req, res, next) => {
    try{
        const { payload: { info } } = req;
        const booking = await Booking.findById(req.params.id);
        console.log(booking.userID);
        if(info.id != booking.userID){
            return res.status(403).json({
                error: {
                    message: "Permission denied"
                }
            });
        } else{
            return next();
        }
    } catch(err){
        console.log(err);
        res.status(500).json({
            error: err
        });
    }
}