const express = require('express');
const path = require('path');

//import auth-routes.js
const authRoutes = require('./routes/auth-routes');
const passportSetup = require('./config/passport-setup');
const profileRoutes = require('./routes/profile-routes')
const tourRoutes = require('./routes/tour-routes');

const mongoose = require('mongoose');

//ask me for connect to keys <rpwrepenwork>
const keys = require('./config/keys');

const cookieSession = require('cookie-session');
const passport = require('passport');
//Database Connection

mongoose.connect(keys.mongodb.dbURI,() =>{
    console.log('connect to mongoddb');
});


//Get detail of Server
const properties = require('./properties.json');
//Initialize Appication
const app = express();

//Set Port
const port = properties.server.port;

//Initialize Views
app.set('views',path.join(__dirname,'views'));
app.set('view engine','pug');

//Home page
app.get('/',function(req,req){
    req.render('index',{
        title: properties.server.name,
        user: req.user
    })    
});

//create cookie
app.use(cookieSession({
    //time out of cookie
    maxAge:12*60*60*1000,
    
    //must use key.js in config not in github ask me if you wisk
    keys:[keys.session.cookieKey]
}));

//initialize passport
app.use(passport.initialize());
app.use(passport.session());


//Route Files

//set up routes
app.use('/auth',authRoutes);
app.use('/profile',profileRoutes);
app.use('/tour',tourRoutes);


//let tours = require('./routes/tours');
//let users = require('./routes/users');
//app.use('/tours', tours);
//app.use('/users', users);

//Start server open at specify port
const server = app.listen(port,function(){
    console.log(`Express running -> Port ${server.address().port}`);
});
