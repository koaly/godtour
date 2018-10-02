const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');

//import key.js
/**
 * I doesn't add this file to github you ask me if you want
 * it have a secret clientID and clientSecret that use google api
 */
const keys = require('./none')

passport.use(
    new GoogleStrategy({
        // options for google start
        callbackURL:'/auth/google/redirect',
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret
    },function(){
        console.log('passport callback');
    })
);