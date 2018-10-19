const mongoose = require('mongoose');

const exampleSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        require: true,
    },
    value: {
        type: String,
        require: true
    }
})

module.exports = mongoose.model('Item', exampleSchema);