const router = require('express').Router();

const authCheck = function(req,res,next){
    if(!req.user){
        //if user is not logged in
        res.redirect('/auth/login')
    }
    else{
        //if user is logged in
        next();
    }
};

router.get('/',authCheck,function(req,res){
    res.send('you are logged in,this is your profile '+req.user.username);
});

module.exports = router;