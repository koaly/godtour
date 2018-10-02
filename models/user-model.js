const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    //user information
    username: String,
    googleId: String
})

const User = mongoose.model('user',userSchema);

//export for passport-setup
module.exports = User;