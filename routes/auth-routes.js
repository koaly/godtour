const router = require('express').Router();
const passport = require('passport');

//auth login
router.get('/login',function(req,res){
    res.render('login',{
        user: req.user
    });
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