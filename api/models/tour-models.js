const mongoose = require('mongoose');

const tourSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    name :{
        type: String,
        require: true
    },
    operatorID :{
        type: String,
        require: true
    },
    operatorName :{
        type: String,
        require: true
    },
    price :{
        type: Number,
        required: true
    }, 
    dest :{
        type: String,
        required: true
    },
    dayDuration :{
        type: Number,
        required: true
    },
    nightDuration :{
        type: Number,
        required: true
    },
    startBooking :{
        type: Date,
        required: true
    },
    endBooking :{
        type: Date,
        required: true
    },
    departDate :{
        type: Date,
        required: true
    },
    returnDate :{
        type: Date,
        required: true
    },
    airline :{
        type: String,
        required: true
    },
    maxSeat :{
        type: Number,
        required: true
    },
    currentSeat :{
        type: Number,
        required: true
    },
    rating :{
        type: Number,
        default: 0,
        required: true
    },
    ratingCount :{
        type: Number,
        default: 0,
        required: true
    },
    food :{
        type: Number,
        defalut: 0
    },
    detail :{
        type: String
    },
    highlight :{
        type: String
    }
});

module.exports = mongoose.model('Tour',tourSchema);