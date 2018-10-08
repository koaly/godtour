const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    //user information
	_id: mongoose.Schema.Types.ObjectId,
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
		type: String,
		required: true
	},
	lastname:{
		type: String,
		required: true
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
		type: String,
		required: true,
		unique: true,
		match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
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
