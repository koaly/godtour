const router = require('express').Router();
const passport = require('passport');
const bcrypt = require('bcryptjs');

//import user

const User = require('../models/user-model');

/*
router.post('/register',function(req,res){
    res.status(200).json({
        message: "Handling POST request to /register"
    });
    //initilize variable from form
    let firstname = req.body.firstname;
    let lastname = req.body.lastname;
    let gender = req.body.gender;
    let email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;
    const password2 = req.body.password2;

    //check not empty 
    req.checkBody('firstname','First Name is required').notEmpty();
    req.checkBody('lastname', 'Last Name is required').notEmpty();
    req.checkBody('email','Email is required').notEmpty();
    req.checkBody('email','Email is not valid').isEmail();
    req.checkBody('username','Username is required').notEmpty();
    req.checkBody('password','Password is required').notEmpty();
    req.checkBody('password2','Password do not match').equals(req.body.password);

    let errors = req.validationErrors();
    if(errors){
        res.render('register',{
            errors: errors
        })
    }else{
        let newUser = new User({
            firstname: firstname,
            lastname: lastname,
            email: email,
            gender: gender,
            username: username,
            password: password
        });
        bcrypt.genSalt(10,function(err,salt){
            bcrypt.hash(newUser.password,salt,function(err,hash){
                if(err){
                    console.log(err);
                }
                newUser.password = hash;
                newUser.save(function(err){
                    if(err){
                        console.log(err);
                        return;
                    }else{
                        req.flash('success','You are now register');
                        res.redirect('/profile')
                    }
                });
            })
        });
    }
});
*/

//auth login
router.get('/login',function(req,res){
    res.render('login',{
        user: req.user
    });
});
router.get('/login/error',(req,res)=>{
    req.flash('danger','Email or Password is not corret')
    res.render('login',{
        user:req.user
    });
});
router.post('/login',passport.authenticate('local',{ failureRedirect: '/auth/login/error' }),(req,res,next) =>{
    res.redirect('/profile')
    /*
    console.log("suck2");
    bcrypt.hash(req.body.password,10,(err,hash)=>{
        if(err){
            return res.status(500).json({
                message: "No password to Hash",
                error : err
            });
        }else{
            User.find({email: req.body.email, password: hash}, function(err, user){
                if (err){
                    console.log(err);
                    req.flash('danger', 'Please check Email and Password.');
                    res.redirect('#');
                    return;
                }
                
                res.redirect('/profile');
            });
        }
    });
    */
});
//auth logout
router.get('/logout',function(req,res){
    req.logout();
    res.redirect('/');
});

//auth with google
router.get('/google',
    passport.authenticate('google',{
        scope: [
            'https://www.googleapis.com/auth/userinfo.profile',
            'https://www.googleapis.com/auth/userinfo.email'
        ]
    },
    (req,res)=>{
        /*
        res.status(200).json({
            message:"Hadling /GET request to /google"
        })
        */
    }
));

router.get('/google/redirect',passport.authenticate('google'),function(req,res){
    res.redirect('/profile/');
});


//export module to app.js
module.exports = router;
