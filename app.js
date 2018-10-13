const express = require('express');
const app = express();

const morgan = require('morgan');



app.use(morgan('dev'));



const tourRoutes = require('./api/routes/tour');


app.use("/tour",tourRoutes);



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