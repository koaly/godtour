const passport = require('passport');
const localStrategy = require('../middleware/passport-local');
const User = require('../models/user-models');

passport.serializeUser((user, done) => {
    done(null, user.email);
})

passport.deserializeUser(async (email, done) => {
    try {
        const user = await User.findOne({ email: email });
        if (!user) {
            return done(new Error('User not found'));
        }
        done(null, user);
    }
    catch (err) {
        done(err);
    }
})

passport.use(localStrategy);