const router = require('express').Router();
const passport = require('passport');
const bcrypt = require('passport');

//auth register

router.get('/register',function(req,res){
    res.render('register',{
        
    });
});

router.post('/register',function(req,res){
    //initilize variable from form
    const name = req.body.name;
    const gender = req.body.gender;
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;
    const password2 = req.body.password2;

    //check not empty 
    req.checkBody('name','Name is required').notEmpty();
    req.checkBody('email','Email is required').notEmpty();
    req.checkBody('email','Email is not valid').isEmail();
    req.checkBody('username','Username is required').notEmpty();
    req.checkBody('password','Password is required').notEmpty();
    req.checkBody('password2','Password do not match').equals(req.body.password);

    let errors = req.vaildationErrors();
    
    if(errors){
        console.log(errors);
    }else{
        let newUser = new User({
            name:name,
            email:email,
            gender:gender,
            username:username,
            password:password
        });
        bcrypt.genSalt(10,function(err,salt){
            bcrypt.hash(newUser.passport,salt,function(err,hash){
                if(err){
                    console.log(err);
                }
                newUser.passport = hash;
                newUser.save(function(err){

                });
            })
        });
    }
});

//auth login
router.get('/login',function(req,res){
    res.render('login',{
        user: req.user
    });
});
router.post('/login',function(req,res){

});
//auth logout
router.get('/logout',function(req,res){
    req.logout();
    res.redirect('/');
});

//auth with google
router.get('/google',passport.authenticate('google',{
    scope:['profile']
}));

router.get('/google/redirect',passport.authenticate('google'),function(req,res){
    res.redirect('/profile/');
});


//export module to app.js
module.exports = router;