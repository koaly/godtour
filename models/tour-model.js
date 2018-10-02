const mongoose = require('mongoose');

const articleSchema = mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    organizer:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    destination:{
        type: String,
        required: true
    },
    day_duration:{
        type: Number,
        required: true
    },
    night_duration:{
        type: Number,
        required: true
    },
    start_book:{
        type: Date,
        required: true
    },
    end_book:{
        type: Date,
        required: true
    },
    start_trip:{
        type: Date,
        required: true
    },
    end_trip:{
        type: Date,
        required: true
    },
    flight_airline:{
        type: String,
        required: true
    },
    flight_airport:{
        type: String,
        required: true
    },
    flight_depart:{
        type: String,
        required: true
    },
    flight_return:{
        type: String,
        required: true
    },
    stars:{
        type: Number,
        required: true
    },
    max_seat:{
        type: Number,
        required: true
    },
    now_seat:{
        type: Number,
        required: true
    },
    description:{
        type: String
    },
    highlight:{
        type: String
    }
});

const Tour = mongoose.model('Tour', articleSchema);

module.exports = Tour;