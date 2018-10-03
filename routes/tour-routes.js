const express = require('express');
const router = express.Router();

// Bring in Tour Models
let Tour = require('../models/tour-model');

// Add Route
router.get('/add', function(req, res){
    res.render('add_tour', {
        title: 'Add TOUR'
    });
});

router.post('/add', function(req, res){

    let err = req.validationErrors();
    if (err){
        res.render('add_tour', {
            title: 'Add TOUR',
            errors: err
        });
    } else{
        let tour = new Tour();
        tour.title = req.body.title;
        tour.organizer = 'admin';
        tour.price = req.body.price;
        tour.destination = req.body.destination;
        tour.day_duration = req.body.day_duration;
        tour.night_duration = req.body.night_duration;
        tour.flight_airline = req.body.flight_airline;
        tour.flight_airport = req.body.flight_airport;
        tour.flight_depart = req.body.flight_depart;
        tour.flight_return = req.body.flight_return;
<<<<<<< HEAD
=======
        tour.food = req.body.food;
>>>>>>> aa008ddb29c1a926b6e6e9f70724abc3839c62b8
        tour.stars = req.body.stars;
        tour.max_seat = req.body.max_seat;
        tour.now_seat = tour.max_seat;
        tour.description = req.body.description;
        tour.highlight = req.body.highlight;
        // wait for add date and time attributes
<<<<<<< HEAD

        tour.save(function(err){
            if (err){
                console.log(err);
                return;
            } else {
                req.flash('success', 'New TOUR added');
                res.redirect('/');
            }
        });
    }
});router.post('/add', function(req, res){

    let err = req.validationErrors();
    if (err){
        res.render('add_tour', {
            title: 'Add TOUR',
            errors: err
        });
    } else{
        let tour = new Tour();
        tour.title = req.body.title;
        tour.organizer = 'admin';
        tour.price = req.body.price;
        tour.destination = req.body.destination;
        tour.day_duration = req.body.day_duration;
        tour.night_duration = req.body.night_duration;
        tour.flight_airline = req.body.flight_airline;
        tour.flight_airport = req.body.flight_airport;
        tour.flight_depart = req.body.flight_depart;
        tour.flight_return = req.body.flight_return;
        tour.stars = req.body.stars;
        tour.max_seat = req.body.max_seat;
        tour.now_seat = tour.max_seat;
        tour.description = req.body.description;
        tour.highlight = req.body.highlight;
        // wait for add date and time attributes
=======
        tour.start_book.setDate(req.body.start_book_date);
        tour.start_book.setMonth(req.body.start_book_month);
        tour.start_book.setFullYear(req.body.start_book_year);
        tour.start_book.setHour(req.body.start_book_hour, req.body.start_book_min, 0);    
        tour.end_book.setDate(req.body.end_book_date);
        tour.end_book.setMonth(req.body.end_book_month);
        tour.end_book.setFullYear(req.body.end_book_year);
        tour.end_book.setHour(req.body.end_book_hour, req.body.end_book_min, 0);    
        tour.start_trip.setDate(req.body.start_trip_date);
        tour.start_trip.setMonth(req.body.start_trip_month);
        tour.start_trip.setFullYear(req.body.start_trip_year);
        tour.start_trip.setHour(req.body.depart_hour, depart_min, 0);
        tour.end_trip.setDate(req.body.end_trip_date);
        tour.end_trip.setMonth(req.body.end_trip_month);
        tour.end_trip.setFullYear(req.body.end_trip_year);
        tour.end_trip.setHour(req.body.return_hour, return_min, 0);
>>>>>>> aa008ddb29c1a926b6e6e9f70724abc3839c62b8

        tour.save(function(err){
            if (err){
                console.log(err);
                return;
            } else {
                req.flash('success', 'New TOUR added');
                res.redirect('/');
            }
        });
    }
});

module.exports = router;