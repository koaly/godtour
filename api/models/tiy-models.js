const mongoose = require('mongoose');

const tiySchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    name :{
        type: String,
        required: true
    },
    userID :{
        type: String,
        required: true
    },
    userName :{
        type: String,
        required: true
    },
    minPrice :{
        type: Number,
        required: true
    },
    maxPrice :{
        type: Number,
        required: true
    }, 
    minMember :{
        type: Number,
        required: true
    },
    maxMember :{
        type: Number,
        required: true
    },
    dest :{
        type: String,
        required: true
    },
    minDuration :{
        type: Number,
        required: true
    },
    maxDuration :{
        type: Number,
        required: true
    },
    startFreeDate :{
        type: Date,
        required: true
    },
    endFreeDate :{
        type: Date,
        required: true
    },
    rating :{
        type: Number,
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
    },
    isAccepted :{
        type: Boolean,
        defalut: false
    }
});

module.exports = mongoose.model('Tiy',tiySchema);