const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    //user information
    username:{
		type : String,
		required: true
	},
	password:{
		type: String
	},
    googleId:{
		type: String
	},
	firstname:{
		type: String
	},
	lastname:{
		type: String
	},
	gender:{
		type: String
	},
	photo: {
		type: String
	},
	phone: {
		type: String
	},
	email: {
		type: String
	},
	tour: {
		type: [String]
	}
})

const User = mongoose.model('user',userSchema);

//export for passport-setup
module.exports = User;
