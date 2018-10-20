const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user-models');
const bcrypt = require('bcrypt');
const strategy = new LocalStrategy({
    usernameField: "email",
    passwordField: "password",
    passReqToCallback: true
},
    async (req, email, password, done) => {
        try {
            const currentUser = await User.findOne({ email: email });
            if (!currentUser) {
                return done(null, false, { message: 'No User Exits' })
            }
            const match = await bcrypt.compareSync(password, currentUser.password);
            if (!match) {
                return done(null, false, { message: 'Not a matching password' })
            }
            return done(null, currentUser)
        }
        catch (err) {
            return done(err);
        }
    }
)
module.exports = strategy;