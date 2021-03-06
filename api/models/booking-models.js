const mongoose = require('mongoose');

const bookingSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userID: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    tourID: {
        type: String,
        required: true
    },
    tourName: {
        type: String,
        required: true
    },
    amountBooking: {
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

bookingSchema.methods.toBookingJSON = function () {
    return {
        id: this._id,
        userID: this.userID,
        tourID: this.tourID,
        tourName: this.tourName,
        amountBooking: this.amountBooking,
        bookingDate: this.bookingDate
    }
}

module.exports = mongoose.model('Booking', bookingSchema);