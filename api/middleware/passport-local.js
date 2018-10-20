const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user-models');

const strategy = new LocalStrategy({
    usernameField: "email",
    passwordField: "password",
    passReqToCallback: true
},
    async (req, email, password, done) => {
        try {
            const user = await User.findOne({ 'local.email': email });
            console.log(user)
            console.log(password)
            if (!user) {
                return done(null, false, { message: 'No User Exits' })
            }
            console.log(1)
            if (!user.validPassword(password)) {
                console.log(2)
                return done(null, false, { message: 'Not a matching password' })
            }
            console.log(3)
            return done(null, user)
        }
        catch (err) {
            return done(err);
        }
    }
)
module.exports = strategy;