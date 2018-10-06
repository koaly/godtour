const router = require('express').Router();


//home page
router.get('/',function(req,res){
    res.status(200).json({
        message:'/GET homepage'
    })
    res.render('index.pug',{
        //list of db will send
        user: req.user

    });
    console.log('inside the homepage function');
    console.log(req.sessionID)
});

//export module
module.exports = router;