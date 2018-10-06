const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const LocalStragtegy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const mongooes = require('mongoose')
//import key.js
/**
 * I doesn't add this file to github you ask me if you want
 * it have a secret clientID and clientSecret that use google api
 */
const keys = require('./keys.js');
const User = require('../models/user-model');

//serializeUser
passport.serializeUser(function(user,done){
    console.log('Inside serializeUser callback')
    done(null,user.id);
});


passport.deserializeUser(function(id,done){
    User.findById(id).then(function(user){
        done(null,user);
    });
});

passport.use(
    new GoogleStrategy({
        // options for google start
        callbackURL:'/auth/google/redirect',
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret
    
    },function(accessToken,refreshToken,profile,done){
        //check user already exits in our db
        User.findOne({googleId:profile.id})
        .then(function(currentUser){
            if(currentUser){
                //already have the user
                console.log('user is',currentUser);
                done(null,currentUser);    
            }
            else{
                console.log(profile)
                //if not create user in our db
                new User({
                    _id: new mongooes.Types.ObjectId,
                    username: profile.displayName,
                    //username: profile.name.givenName,
                    googleId: profile.id,
                    gender: profile.gender,
                    firstname: profile.name.givenName,
                    lastname: profile.name.familyName,
                    email: profile.emails[0].value,
					photo: profile.photos[0].value
                })
                .save()
                .then(function(newUser){
                    console.log('new user created'+newUser);
                    done(null,newUser);
                });
            }
        });
        
    })
);
passport.use(
    new LocalStragtegy({
       usernameField: 'email',
    },(email,password,done) =>{
        
        const query = {
            email:email
        };
        User.findOne(query)
        .exec()
        .then((user)=>{
            
            if(user){
                //already have the user
                console.log(user)
                bcrypt.compare(password,user.password,function(err,result){
                    if(err){
                        done(err,false,{message: "Compare password Wrong"})
                    }
                    if(result){
                        done(null,user);
                    }else{
                        done(null,false,{message: 'Wrong password'});
                    } 
                });
            }
            else{
                done(null,false,{message:'No user found'});
            }
        })
        .catch(err =>{
            done(err,false)
        })
    })
);