const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const User = require('../models/user-models');

exports.getAll = (req,res,next) =>{
    User.find()
    .select()
    .exec()
    .then(docs =>{
        console.log(docs);
        const response ={
            count: docs.length,
            user: docs.map(doc =>{
                return {
                    email: doc.email,
                    password: doc.password
                }
            })
        }
        res.status(200).json({
            response
        })
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({
            error: err
        })
    })
}

exports.userSignup = (req,res,next) =>{
    User.find({
        email: req.body.email
    })
    .exec()
    .then(user =>{
        console.log(user);
        if(user.length >= 1){
            return res.status(409).json({
                message: "Email already existed"
            })
        }else{
            bcrypt.hash(req.body.password,10,(err,hash) =>{
                if(err){
                    return res.status(500).json({
                        error: err,
                        message: "Require Password"
                    })
                }else{
                    const user = new User({
                        _id: new mongoose.Types.ObjectId,
                        email: req.body.email,
                        password: hash
                    })

                    user
                    .save()
                    .then(result =>{
                        console.log(result);
                        res.status(201).json({
                            message:"User Created"
                        })
                    })
                    .catch(err =>{
                        console.log(err);
                        res.status(500).json({
                            error: err
                        })   
                    })
                }
            })            
        }
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({
            error: err
        })
    })
}