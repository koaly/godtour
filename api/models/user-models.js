const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
    email: {
        type: String,
        require: true,
        unique: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    password: {
        type: String,
        require: true
    },
    googleID: {
        type: String,
    }
})

//generating a hash
userSchema.methods.generateHash = function (pwd) {
    return bcrypt.hashSync(pwd, bcrypt.genSaltSync(10), null)
}
//checking if password is valid
//use function not arrow function becase we will ref to this object
userSchema.methods.validPassword = function (pwd) {
    return bcrypt.compareSync(pwd, this.password);
}

userSchema.methods.generateJWT = function () {
    const today = new Date();
    const expirationDate = new Date(today);
    //exprite in 1 day
    expirationDate.setDate(today.getDate() + 1);
    return jwt.sign({
        email: this.email,
        id: this._id,
        exp: parseInt(expirationDate.getTime() / 1000, 10)
        //another private key we must add to json that store sercet of file later
    }, process.env.JWT_SECRET);
}

userSchema.methods.toAuthJSON = function () {
    return {
        _id: this._id,
        email: this.email,
        //every time request create a new one
        token: this.generateJWT()
    }
}
module.exports = mongoose.model('User', userSchema);