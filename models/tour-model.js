const mongoose = require('mongoose');

const articleSchema = mongoose.Schema({
    title:{
        type: String,
        required: true
    },

});

const Tour = mongoose.model('Tour', articleSchema);

module.exports = Tour;