const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user-models');

const strategy = new LocalStrategy({
    usernameField: "email",
    passwordField: "password",
    passReqToCallback: true
},
    async (req, email, password, done) => {
        try {
            console.log(`${Date.now()}: ${email} request to passport-local`)
            const user = await User.findOne({ email: email });
            if (!user) {
                console.log(`doesn't find email in system`)
                return done(null, false, { message: 'No User Exits' })
            }
            if (!user.validPassword(password)) {
                console.log(`wrong password`)
                return done(null, false, { message: 'Not a matching password' })
            }
            console.log(`successfuly login`)
            return done(null, user)
        }
        catch (err) {
            console.log(err);
            return done(err);
        }
    }
)
module.exports = strategy;