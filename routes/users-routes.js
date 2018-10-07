const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
const User = require('../models/user-model');

router.get('/',(req,res,next)=>{
    User.find()
        .select()
        .exec()
        .then(docs =>{
            const reponse = {
                count: docs.length,
                user : docs.map(doc =>
                {
                    return{
                        _id : doc._id,
                        username : doc.username,
                        firstname : doc.firstname,
                        lastname : doc.lastname,
                        gender : doc.gender,
                        photo : doc.photo,
                        email : doc.email,
                        state : doc.state,    
                        request : {
                            type: "GET",
                            url: "http://localhost:3000/user/"+doc._id
                        }
                    };
                })
            };
            console.log(reponse)
            //res.status(200).json(reponse);
            res.render('user',{
                userList : reponse
            })
        })
        .catch(err =>{
            res.status(500).json({
                error: err
            })
        });
});
router.get('/signup',(req,res,next)=>{
    res.render('register');
});

//next time we will use this instead register
router.post('/signup',(req,res,next)=>{
    
    const username = req.body.username;
    const password = req.body.password;
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const gender = req.body.gender;
    const email = req.body.email;
   
    req.checkBody('firstname','First Name is required').notEmpty();
    req.checkBody('lastname', 'Last Name is required').notEmpty();
    req.checkBody('email','Email is required').notEmpty();
    req.checkBody('email','Email is not valid').isEmail();
    req.checkBody('username','Username is required').notEmpty();
    req.checkBody('password','Password is required').notEmpty();
    req.checkBody('password2','Password do not match').equals(req.body.password);

    let errors = req.validationErrors()
    if(errors){
        res.render('register',{
            errors:errors
        })
    }
    User.findOne(
        {
            email:req.body.email
        })
        .exec()
        .then(user =>{
            console.log(user)
            if(user){                
                req.flash('danger', 'Email Already in use');
                res.redirect('/user/signup')
            }else{
                bcrypt.hash(req.body.password,10,(err,hash)=>{
                    if(err){
                        return res.status(500).json({
                            message: "No password to Hash",
                            error : err
                        });
                    }else{

                        const newUser = new User({
                            _id: new mongoose.Types.ObjectId,
                            username: req.body.username,
                            password: hash,
                            firstname: req.body.firstname,
                            lastname: req.body.lastname,
                            gender: req.body.gender,
                            photo: req.body.imgsrc,
                            phone: req.body.phone,
                            email: req.body.email,
                            state: req.body.state
                        });
                        newUser
                            .save()
                            .then(result =>{
                                /*
                                res.status(201).json({
                                    message: "create newUser Success",
                                    createUser: {
                                        _id: result.id,
                                        name: result.username,
                                        firstname: result.firstname,
                                        gender: result.gender,
                                        photo: result.photo,
                                        email: result.email,
                                        state: result.state,
                                        request: {
                                            type: "GET",
                                            url: "http://localhost:3000/user/"+result._id
                                        }
                                    }
                                });
                                */
                                req.flash('success', 'Signup complete!');
                                res.redirect('/');
                            })
                            .catch(err =>{
                                console.log(err);
                                res.status(500).json({
                                    error: err
                                });
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
    
});
router.get('/:userId',(req,res,next)=>{
   const id = req.params.userId;
   User.findById(id)
    .exec()
    .then(doc =>{
        console.log("From Database",doc);
        if(doc){
            res.status(200).json({
                doc
            });
        }else{
            res.status(404).json({
                message: "Not vaild of Username"
            });
        }
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({
            error: err
        });
    })
});
router.delete('/:userId',(req,res,next)=>{
    const id = req.params.userId;
    User.remove(
        {
        _id : id
        })
        .exec()
        .then(result =>{
            res.status(200).json({
                message: "success remvoe username"
            })
        })
        .catch(err =>{
            console.log(err);
            res.status(500).json({
                error: err
            })
        })

})
module.exports = router;
