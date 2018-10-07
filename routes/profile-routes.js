const router = require('express').Router();
        console.log('a');
let Booking = require('../models/booking-model');
let Tour = require('../models/tour-model');

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
                bookings: bookings,
                user: req.user
            });
        }
    });
});

router.get('/mybooking/:id', authCheck, function(req, res){
    Booking.findById(req.params.id, function(err, booking){
        if (!booking){
            req.flash('danger', 'You don\'t have permission to access this site.');
            res.redirect('/');
            return;
        }
        res.render('cancel_book',{
            user: req.user,
            booking: booking
        });
    });
});

router.delete('/mybooking/:id', function(req, res){
    if(!req.user._id){
        res.status(500).send();
    }
    let query = {_id:req.params.id};
    console.log(req.params);

    Booking.findById(req.params.id, function(err, booking){
        if(booking.userId != req.user._id){
            res.status(500).send();
        }
        else{
            Tour.findById(booking.tourId, function(err, tour){
                if(tour.now_seat < tour.max_seat){
                    tour.now_seat++;
                    tour.save(function(err){
                        if (err){
                            console.log(err);
                            return;
                        }
                    });
                    Booking.remove(query, function(err){
                        if(err){
                            console.log(err);
                        }
                        res.send('Success');
                    });
                }
            });
        }
    });
});
module.exports = router;