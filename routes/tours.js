const express = require('express');
const router = express.Router();

// Bring in Tour Models
let Tour = require('../models/tour');

// Add Route
router.get('/add', ensureAuthenticated, function(req, res){
    res.render('add_article', {
        title: 'Add TOUR'
    });
});