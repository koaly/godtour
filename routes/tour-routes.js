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