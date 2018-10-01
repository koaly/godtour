const express = require('express');
const path = require('path');

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
        title: `Tour-to-ur`

    })    
});


//Start server open at specify port
const server = app.listen(port,function(){
    console.log(`Express running -> Port ${server.address().port}`);
});