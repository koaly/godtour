const mongoose = require('mongoose');

const tourSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        required: true
    },
    operatorID: {
        type: String,
        required: true
    },
    operatorName: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    dest: {
        type: String,
        required: true
    },
    dayDuration: {
        type: Number,
        required: true
    },
    nightDuration: {
        type: Number,
        required: true
    },
    startBooking: {
        type: Date,
        required: true
    },
    endBooking: {
        type: Date,
        required: true
    },
    departDate: {
        type: Date,
        required: true
    },
    returnDate: {
        type: Date,
        required: true
    },
    airline: {
        type: String,
        required: true
    },
    maxSeat: {
        type: Number,
        required: true
    },
    currentSeat: {
        type: Number,
        required: true
    },
    rating: {
        type: Number,
        default: 0,
        required: true
    },
    ratingCount: {
        type: Number,
        default: 0,
        required: true
    },
    food: {
        type: Number,
        defalut: 0
    },
    detail: {
        type: String
    },
    highlight: {
        type: String
    }
});
tourSchema.post('find', function (doc, next) {
    console.log('inside post middleware')
    if (doc.length > 0) {
        next()
    }
    throw new Error('not found tour')
})
tourSchema.post('findOne', function (doc, next) {
    console.log('inside post middleware')
    if (doc) {
        next()
    }
    throw new Error('not found tour')
})

tourSchema.post('findOneAndUpdate', function (doc, next) {
    console.log('inside post middleware')
    if (doc) {
        next()
    }
    throw new Error('not found tour')
})
tourSchema.post('findOneAndRemove', function (doc, next) {
    console.log('inside post middleware')
    if (doc) {
        next()
    }
    throw new Error('not found tour')
})
module.exports = mongoose.model('Tour', tourSchema);