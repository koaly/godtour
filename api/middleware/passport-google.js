const GoogleStrategy = require('passport-google-oauth20');
const User = require('../models/user-models');

const startegy = new GoogleStrategy({
    callbackURL: '/',
    clientID: process.env.GOOGLE.CLIENT_ID,
    clientID: process.env.GOOGLE.CLIENT_SECRET,
})