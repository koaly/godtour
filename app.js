const express = require('express');
const path = require('path');

//Initialize Appication
const app = express();

//Set Port
const port = 3000;

//Initialize pug
app.set('view engine','pug');

//Home Route
app.get('/',function(req,res){
    res.render('index');
});


//Start server open at specify port
app.listen(port,function(){
    console.log(`Server start on port ${port}`)
});