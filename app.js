const express = require('express');
const app = express();

const morgan = require('morgan');


// use morgan to tracking request
app.use(morgan('dev'));


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