const express = require('express');
const router = express.Router();

// Bring in Tour Models
let Tour = require('../models/tour-model');

// Add Route
router.get('/add', ensureAuthenticated, function(req, res){
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
        // tour.organizer = 
        tour.price = req.body.price;
    }
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
        tour.stars = req.body.stars;
        tour.max_seat = req.body.max_seat;
        tour.now_seat = tour.max_seat;
        tour.description = req.body.description;
        tour.highlight = req.body.highlight;
        // wait for add date and time attributes

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