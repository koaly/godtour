const mongoose = require('mongoose');

const offerSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    name :{
        type: String,
        required: true
    },
    tiyID :{
        type: String,
        required: true
    },
    operatorID :{
        type: String,
        required: true
    },
    operatorName :{
        type: String,
        required: true
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
    member :{
        type: Number,
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

module.exports = mongoose.model('Offer',offerSchema);