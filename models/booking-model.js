const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookingSchema = new Schema({
    userId:{
        type: String,
        required: true
    },
    username:{
        type: String,
        required: true
    },
    tourId:{
        type: String,
        required: true
    },
    tourTitle:{
        type: String,
        required: true
    }
});

const Booking = mongoose.model('booking', bookingSchema);

module.exports = Booking;