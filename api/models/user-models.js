const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

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
userSchema.methods.validPassword = function (pwd) {
    console.log("suck")
    return bcrypt.compareSync(pwd, this.password);
}
module.exports = mongoose.model('User', userSchema);