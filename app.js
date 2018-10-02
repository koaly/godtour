const express = require('express');
const path = require('path');

//import auth-routes.js
const authRoutes = require('./routes/auth-routes');
const passportSetup = require('./config/passport-setup');
const mongoose = require('mongoose');

//ask me for connect to keys <rpwrepenwork>
const keys = require('./config/keys');

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
        title: properties.server.name
    })    
});

//set up routes
app.use('/auth',authRoutes);

//Route Files


//let tours = require('./routes/tours');
//let users = require('./routes/users');
//app.use('/tours', tours);
//app.use('/users', users);

//Start server open at specify port
const server = app.listen(port,function(){
    console.log(`Express running -> Port ${server.address().port}`);
});
