const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    //user information
    username: String,
    googleId: String,
	surname: String,
	lastname: String,
	gender: String,
	photo: String,
	phone: String,
	email: String
})

const User = mongoose.model('user',userSchema);

//export for passport-setup
module.exports = User;
