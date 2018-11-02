const mongoose = require('mongoose');

const Tour = require('../models/tour-models');
const User = require('../models/user-models');
const Booking = require('../models/booking-models');
const {
    TourNotFoundException,
    BookNotFoundException,
    HandingErorr
} = require('./handingError')


exports.checkNotNullBooking = async (req, res, next) => {
    try {
        const booking = await Booking.findById(req.params.id);
        if (!booking) {
            res.status(404).json({
                error: {
                    message: "Not found"
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

exports.getAll = async function (req, res, next) {
    try {
        const bookings = await Booking.find()

        if (!bookings || bookings.length == 0) throw new BookNotFoundException()

        console.log(bookings);
        res.status(200).json({
            count: bookings.length,
            bookings
        });
    } catch (e) {
        HandingErorr(res, e)
    }
}

exports.getUserBooking = async function (req, res, next) {
    try {
        const {
            payload: {
                info
            }
        } = req;
        const {
            id
        } = info

        const bookings = await Booking.find({
            userID: id
        })

        if (!bookings || bookings.length == 0) throw new BookNotFoundException()
        console.log(bookings);
        res.status(200).json({
            count: bookings.length,
            booking: bookings.map(booking => {
                return booking.toBookingJSON();
            })
        });
    } catch (e) {
        HandingErorr(res, e)
    }
}

exports.getTourBooking = async function (req, res, next) {
    try {
        const {
            id
        } = req.params
        const bookings = await Booking.find({
            tourID: id
        })

        if (!bookings || bookings.length == 0) throw new BookNotFoundException()
        console.log(bookings);
        res.status(200).json({
            count: bookings.length,
            booking: bookings.map(booking => {
                return booking.toBookingJSON();
            })
        });
    } catch (e) {
        HandingErorr(res, e)
    }
}

exports.bookTour = async (req, res, next) => {
    try {
        const session = await Tour.startSession();
        console.log(session);

        const {
            payload: {
                info
            }
        } = req;
        const {
            amountBooking
        } = req.body

        const tour = await Tour.find({
            _id: req.params.id
        });
        if (!tour || tour.length == 0) throw new TourNotFoundException()

        console.log(tour)
        const {
            id,
            name
        } = tour[0]

        const booking = await new Booking({
            _id: new mongoose.Types.ObjectId,
            userID: info.id,
            userName: info.displayName,
            tourID: id,
            tourName: name,
            amountBooking: amountBooking
        });
        session.startTransaction();
        console.log("after")
        if (tour.currentSeat - req.body.amountBooking < 0) {
            return res.status(405).json({
                error: {
                    message: "Attemped to book more than available"
                }
            });
        } else {
            tour.currentSeat -= req.body.amountBooking;
            const bookingResult = await booking.save();
            //const tourResult = await tour.save();
            console.log(bookingResult);
            //console.log(tourResult);
            res.status(201).json({
                message: "Book tour successful"
            });
        }

        await session.commitTransaction();

    } catch (e) {
        HandingErorr(res, e)
    }
}

exports.cancelBooking = async (req, res, next) => {
    try {
        const booking = await Booking.find({
            _id: req.params.id
        });
        if (!booking || booking.length == 0) throw new BookNotFoundException()

        const tour = await Tour.find({
            _id: booking.tourID
        });
        if (!tour || tour.length == 0) throw new TourNotFoundException()
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
    } catch (e) {
        HandingErorr(res, e)
    }
}


exports.checkOwnBooking = async (req, res, next) => {
    try {
        const {
            payload: {
                info
            }
        } = req;
        const booking = await Booking.find({
            _id: req.params.id
        });
        if (!booking || booking.length == 0) throw new BookNotFoundException(

        )
        console.log(booking.userID);

        if (info.id != booking.userID) {
            return res.status(403).json({
                error: {
                    message: "Permission denied"
                }
            });
        } else {
            return next();
        }
    } catch (err) {
        HandingErorr(res, e)
    }
}