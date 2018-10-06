const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Bring in Tour Models
let Tour = require('../models/tour-model');
let Booking = require('../models/booking-model');

router.get('/', function(req, res){
    Tour.find({}, function(err, tours){
        if (err){
            console.log(err);
        } else{
            res.render('show_tour',{
                title: 'Tour List',
                tours: tours,
                user: req.user
            });
        }
    });
});

// Add Route
router.get('/add', ensureAuthenticated, function(req, res){
    console.log(req.user.state);
    if(!req.user.state){
        req.flash('danger', 'You are not a Tour Operator, please contact us.');
        res.redirect('/');
        return;
    }
    res.render('add_tour', {
        title: 'Add TOUR',
        user: req.user
    });
});

router.post('/add', function(req, res){
    req.checkBody('title', 'Tour\'s name needed').notEmpty();

    let err = req.validationErrors();
    if (err){
        res.render('add_tour', {
            title: 'Add TOUR',
            user: req.user,
            errors: err
        });
    } else{
        let time = [];
        let tour = new Tour();
        tour.title = req.body.title;
        tour.organizerId = req.user._id;
        tour.organizer = req.user.username;
        tour.price = req.body.price;
        tour.destination = req.body.destination;
        tour.day_duration = req.body.day_duration;
        tour.night_duration = req.body.night_duration;
        tour.flight_airline = req.body.flight_airline;
        tour.flight_airport = req.body.flight_airport;
        tour.flight_depart = req.body.flight_depart;
        tour.flight_return = req.body.flight_return;
        tour.food = req.body.food;
        tour.stars = req.body.stars;
        tour.max_seat = req.body.max_seat;
        tour.now_seat = tour.max_seat;
        tour.description = req.body.description;
        tour.highlight = req.body.highlight;
        // date and time attributes
        time = req.body.start_book_date + "T" + req.body.start_book_time;
        tour.start_book = time

        time = req.body.end_book_date + "T" + req.body.end_book_time;
        tour.end_book = time;

        time = req.body.start_trip + "T" + req.body.depart_time;        
        tour.start_trip = time;

        time = req.body.end_trip + "T" + req.body.return_time;
        tour.end_trip = time;

        tour.save(function(err){
            if (err){
                console.log(err);
                return;
            } else {
                req.flash('success', 'Your ' + tour.title + ' added!');
                res.redirect('/');
            }
        });
    }
});

// Access Control
function ensureAuthenticated(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    else{
        req.flash('danger', 'Please Login');
        res.redirect('/');
    }
}

// Get Single tour
router.get('/:id', function(req, res){
    Tour.findById(req.params.id, function(err, tour){
        res.render('one_tour', {
            tour: tour,
            user: req.user
        });
    });
});

// Booking
router.post('/:id', function(req, res){

    Tour.findById(req.params.id, function(err, tour){
        if (tour.now_seat) {
            tour.now_seat--;
            let booking = new Booking();
            booking.userId = req.user._id;
            booking.username = req.user.username;
            booking.tourId = tour._id;
            booking.tourTitle = tour.title;
            
            booking.save(function(err){
                if (err){
                    console.log(err);
                    return;
                }
            });
            tour.save(function(err){
                if (err){
                    console.log(err);
                    return;
                } else {
                    req.flash('success', 'Book ' + tour.title + ' successful!');
                    res.redirect('/');
                }
            });
        }
    });
});

// Load Edit Form
router.get('/edit/:id', ensureAuthenticated, function(req, res){
    Tour.findById(req.params.id, function(err, tour){
        if(!req.user.state || tour.organizerId != req.user._id){
            req.flash('danger', 'You don\'t have permission to edit this tour.');
            res.redirect('/');
            return;
        }
        res.render('edit_tour', {
            title: 'Edit Tour',
            tour: tour
        });
    });
});

// Update Submit POST Route
router.post('/edit/:id', function(req, res){
    Tour.findById(req.params.id, function(err, tour){
        if (req.body.title) tour.title = req.body.title;
        if (req.body.price) tour.price = req.body.price;
        if (req.body.destination) tour.destination = req.body.destination;
        if (req.body.day_duration) tour.day_duration = req.body.day_duration;
        if (req.body.night_duration) tour.night_duration = req.body.night_duration;
        if (req.body.flight_airline) tour.flight_airline = req.body.flight_airline;
        if (req.body.flight_airport) tour.flight_airport = req.body.flight_airport;
        if (req.body.flight_depart) tour.flight_depart = req.body.flight_depart;
        if (req.body.flight_return) tour.flight_return = req.body.flight_return;
        if (req.body.food) tour.food = req.body.food;
        if (req.body.stars) tour.stars = req.body.stars;
        if (req.body.max_seat) tour.max_seat = req.body.max_seat;
        if (req.body.now_seat) tour.now_seat = req.body.now_seat;
        if (req.body.description) tour.description = req.body.description;
        if (req.body.highlight) tour.highlight = req.body.highlight;
        // date and time attributes
        if (req.body.start_book_date && req.body.start_book_time) tour.start_book = req.body.start_book_date + "T" + req.body.start_book_time;

        if (req.body.end_book_date && req.body.end_book_time) tour.end_book = req.body.end_book_date + "T" + req.body.end_book_time;

        if (req.body.start_trip && req.body.depart_time) tour.start_trip = req.body.start_trip + "T" + req.body.depart_time;        

        if (req.body.end_trip && req.body.return_time) tour.end_trip = req.body.end_trip + "T" + req.body.return_time;

        let query = {_id:req.params.id}

        tour.save(function(err){
            if (err){
                console.log(err);
                return;
            } else {
                req.flash('success', 'Update ' + tour.title + ' successful!');
                res.redirect('/');
            }
        });
    });
});

router.delete('/:id', function(req, res){
    if(!req.user._id){
        res.status(500).send();
    }
    let query = {_id:req.params.id};

    Tour.findById(req.params.id, function(err, tour){
        if(tour.organizerId != req.user._id){
            res.status(500).send();
        }
        else{
            Tour.remove(query, function(err){
                if(err){
                    console.log(err);
                }
                res.send('Success');
            });
        }
    });
});

module.exports = tour = router;