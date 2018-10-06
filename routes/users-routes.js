const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const User = require('../models/user-model');

router.get('/',(req,res,next)=>{
    User.find()
        .exec()
        .then(docs =>{
            res.status(200).json({
                docs
            });
        })
        .catch(err =>{
            res.status(500).json({
                error: err
            })
        });
});
router.get('/add',(req,res,next)=>{
    res.render('register');
});

//next time we will use this instead register
router.post('/add',(req,res,next)=>{
    const newUser = new User({
        _id: new mongoose.Types.ObjectId,
        username: req.body.username,
        password: req.body.password,
        googleId: req.body.googleId,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        gender: req.body.gender,
        photo: req.body.imgsrc,
        phone: req.body.phone,
        email: req.body.email,
        tour: req.body.tour,
        state: req.body.state
    });
    newUser
        .save()
        .then(result =>{
            console.log(result);
            res.status(201).json({
                message: "Handing POST request to /register",
                createUser: newUser
            });
        })
        .catch(err =>{
            console.log(err);
            res.status(500).json({
                erorr: err
            });
        })


});


module.exports = router;
