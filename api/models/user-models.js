const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const userSchema = mongoose.Schema({
    local: {
        _id: mongoose.Schema.Types.ObjectId,
        email: {
            type: String,
            require: true,
            unique: true,
            match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
        },
        password: {
            type: String,
            require: true
        }
    }
})

//generating a hash
userSchema.methods.generateHash = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}
//checking if password is valid
userSchema.methods.validPassword = (password) => {
    return bcrypt.compareSync(password, this.local.password);
}
module.exports = mongoose.model('User', userSchema);