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
    res.render('profile',{
        user: req.user

    });
});

module.exports = router;