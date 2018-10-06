const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const User = require('../models/user-model');

router.get('/',(req,res,next)=>{
    res.status(200).json({
        message: "Handling /GET request to /user"
    });
});

router.post('/',(req,res,next)=>{
    res.status(200).json({
        message: "Handling /POST request to /user"
    });
});


module.exports = router;
