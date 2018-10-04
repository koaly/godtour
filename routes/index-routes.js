const router = require('express').Router();


//home page
router.get('/',function(req,res){
    res.render('index.pug',{
        //list of db will send
        user: req.user

    });
});

//export module
module.exports = router;