const express = require('express');
const app = express();

const morgan = require('morgan');
const mongoose = require('mongoose');


// use morgan to tracking request
app.use(morgan('dev'));


//connect to database
mongoose.connect("mongodb://"+process.env.MONGO_MLAB_USER+":"
                +process.env.MONGO_MLAB_PW+
                "@ds121373.mlab.com:21373/tourworld",
                (err) =>{
                    if(err){
                        return console.log(err);
                    }
                    console.log("Connect to Mongodb");
                }
)

mongoose.Promise = global.Promise;


//import routes
const tourRoutes = require('./api/routes/tour-router');
const userRoutes = require('./api/routes/user-route');


// express use routes to create path
app.use("/api/tour",tourRoutes);
app.use("/api/user",userRoutes);



//if not find path abover handling with 404
app.use((req,res,next)=>{
    const err = new Error("Not found");
    err.status = 404;
    next(err);
})


app.use((err,req,res,next)=>{
    res.status(err.status || 500);
    res.json({
        error:{
            message: err.message
        }       
    })
})

//export to server.js
module.exports = app;