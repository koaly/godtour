const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const LocalStragtegy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
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
		console.log(profile);
        //check user already exits in our db
        User.findOne({googleId:profile.id})
        .then(function(currentUser){
            if(currentUser){
                //already have the user
                console.log('user is',currentUser);
                done(null,currentUser);    
            }
            else{
                //if not create user in our db
                new User({
                    username: profile.displayName,
                    googleId: profile.id,
					gender: profile.gender,
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
       usernameField: 'username',
       callbackURL:'/'
    },function(username,password,done){
        console.log('inside the localStragtegy callback');
        console.log('login with ',username);
        
        let query = {
            username:username
        };
        User.findOne(query).then(function(currentUser){
            console.log('inside findone')
            
            if(currentUser){
                //already have the user
                console.log('found user login with',currentUser);
                bcrypt.compare(password,currentUser.password,function(err,isMatch){
                    console.log('input password:',password)
                    console.log('user password:',currentUser.password)
                    if(err){
                        console.log(err)
                    }
                    if(isMatch){
                        console.log('login success with',currentUser);
                        done(null,currentUser);
                    }else{
                        console.log('wrong password',currentUser);
                        done(null,false,{message: 'Wrong password'});
                    } 
                });
            }
            else{
                console.log('not found user')
                done(null,false,{message:'No user found'});
                //not found
            }
        });
    })
);
