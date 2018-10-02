//import router
const router = require('express').Router();

//auth login
router.get('/login',function(req,res){

});

//auth logout
router.get('/logout',function(req,res){
    res.send('log out');
});

//auth with google
router.get('/google',function(req,res){
    //handle with password
    res.send('loggin with google');
});


//export module to app.js
module.exports = router;