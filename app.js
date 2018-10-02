const express = require('express');
const path = require('path');
const mysql = require('mysql');

let db = mysql.createConnection({
    host: "localhost",
    user: "godtoue",
    password: "jui"
});

db.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

//Get detail of Server
const properties = require('./properties.json');
//Initialize Appication
const app = express();

//Set Port
const port = 3000;

//Initialize Views
app.set('views',path.join(__dirname,'views'));
app.set('view engine','pug');

//Home page
app.get('/',function(req,req){
    req.render('index',{
        title: properties.websiteName

    })    
});

// Route Files
//let tours = require('./routes/tours');
//let users = require('./routes/users');
//app.use('/tours', tours);
//app.use('/users', users);

//Start server open at specify port
const server = app.listen(port,function(){
    console.log(`Express running -> Port ${server.address().port}`);
});
