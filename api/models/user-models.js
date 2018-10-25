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
        default: null
    },
    username: {
        type: String,
        require: true,
        unique: true,
    },
    displayName: {
        type: String,
        require: true,
    },
    isGoogle: {
        type: Boolean,
        default: false
    },
    googleID: {
        type: String,
        default: null
    },
    registerDate: {
        type: Date,
        default: Date.now(),
    },
    status: {
        type: Number,
        default: 0
    },
    imgsrc: {
        type: String,
        default: 'http://getdrawings.com/img/facebook-profile-picture-silhouette-17.jpg?sz=50'
    },
    gender: {
        type: String,
        default: null,
    },
    upgradeRequest: {
        type: Boolean,
        default: false
    },
    upgradeReason: {
        type: String,
        default: 'no request'
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
        info: this.toProfileJSON(),
        email: this.email,
        id: this._id,
        status: this.status,
        exp: parseInt(expirationDate.getTime() / 1000, 10)
        //another private key we must add to json that store sercet of file later
    }, process.env.JWT_SECRET);
}

userSchema.methods.toProfileJSON = function () {
    return {
        _id: this.id,
        username: this.username,
        displayName: this.displayName,
        status: this.status,
        imgsrc: this.imgsrc,
        gender: this.gender,
        email: this.email,
        isGoogle: this.isGoogle,
        googleID: this.googleID,
        upgradeRequest: this.upgradeRequest,
        upgradeReason: this.upgradeReason,
        registerDate: this.registerDate,
    }
}
userSchema.methods.toAuthJSON = function () {
    return {
        info: this.toProfileJSON(),
        token: this.generateJWT()
    }
}


module.exports = mongoose.model('User', userSchema);