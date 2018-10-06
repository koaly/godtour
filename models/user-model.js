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
		type: String,
		default: 'http://getdrawings.com/img/facebook-profile-picture-silhouette-17.jpg?sz=50'
	},
	phone: {
		type: String
	},
	email: {
		type: String
	},
	tour: {
		type: [String]
	},
	state:{
		type: Number,
		default: 0,
		required: true
	}
})

const User = mongoose.model('user',userSchema);

//export for passport-setup
module.exports = User;
