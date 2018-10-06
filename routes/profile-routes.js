const router = require('express').Router();
let Booking = require('../models/booking-model');

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

router.get('/mybooking', authCheck, function(req, res){
    Booking.find({username: req.user.username}, function(err, bookings){
        if (err){
            console.log(err);
        } else{
            res.render('mybooking', {
                title: 'My Booking',
                bookings: booking,
                user: req.user
            });
        }
    });
});

module.exports = router;