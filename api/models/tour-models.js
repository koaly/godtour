const mongoose = require('mongoose');

const foodSchema = mongoose.Schema({
    breakfast : Boolean,
    lunch : Boolean,
    dinner : Boolean
});

const tourSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    name :{
        type: String,
        require: true
    },
    operatorID :{
        type: mongoose.Schema.Types.ObjectId,
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
        type: [foodSchema]
    },
    detail :{
        type: String
    },
    highlight :{
        type: String
    }
});

module.exports = mongoose.model('Tour',tourSchema);