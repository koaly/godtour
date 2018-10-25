/*
const GoogleStrategy = require('passport-google-oauth20');
const User = require('../models/user-models');

const startegy = new GoogleStrategy({
    clientID: process.env.GOOGLE.CLIENT_ID,
    clientID: process.env.GOOGLE.CLIENT_SECRET,
    callbackURL: '/',
}, async function (accessToken, refreshToken, profile, callback) {
    try {
        const { email } = profile;
        console.log(`${Date.now()}: ${email} request to passport-google-oauth20`)
        console.log(`${profile}`)
        const user = await User.findOne({ email: email[0].value })

        if (!user) {
            //register
            const newUser = await new User()

            newUser.email = email;
            newUser.
        }
        //if find user
        console.log(`succesfuly login`)
        done(null, user)
    }
    catch (err) {
        console.log(err);
        return done(err, false);
    }
});
*/