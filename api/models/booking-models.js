const mongoose = require('mongoose');

const bookingSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    userID: {
        type: String,
        required: true
    },
    tourID: {
        type: String,
        required: true
    },
    numberBooking: {
        type: Number,
        required: true,
        default: 1
    },
    bookingDate: {
        type: Date,
        required: true,
        default: Date.now()
    }
});

module.exports = mongoose.model('Booking',bookingSchema);