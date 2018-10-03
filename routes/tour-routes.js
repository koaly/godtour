const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Bring in Tour Models
let Tour = require('../models/tour-model');

// Add Route
router.get('/add', function(req, res){
    res.render('add_tour', {
        title: 'Add TOUR'
    });
});

router.post('/add', function(req, res){

    // let err = req.validationErrors();
    // if (err){
    //     res.render('add_tour', {
    //         title: 'Add TOUR',
    //         errors: err
    //     });
    // } else{
        let time = [];
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
        tour.food = req.body.food;
        tour.stars = req.body.stars;
        tour.max_seat = req.body.max_seat;
        tour.now_seat = tour.max_seat;
        tour.description = req.body.description;
        tour.highlight = req.body.highlight;
        // date and time attributes
        tour.start_book = req.body.start_book_date;
        time = req.body.start_book_time.split(':');
        tour.start_book.setHours(parseInt(time[0]), parseInt(time[1]));    

        tour.end_book = req.body.end_book_date;
        time = req.body.end_book_time.split(':');
        tour.end_book.setHours(parseInt(time[0]), parseInt(time[1]));    

        tour.start_trip = req.body.start_trip;
        time = req.body.depart_time.split(':');
        tour.start_trip.setHours(parseInt(time[0]), parseInt(time[1]));    

        tour.end_trip = req.body.end_trip;
        time = req.body.return_time.split(':');
        tour.end_trip.setHours(parseInt(time[0]), parseInt(time[1]));    

        tour.highlight = req.body.highlight;
        tour.description = req.body.description;
        tour.save(function(err){
            if (err){
                console.log(err);
                return;
            } else {
                // req.flash('success', 'New TOUR added');
                res.redirect('/');
            }
        });
    // }
});

module.exports = tour = router;