const express = require('express');
const router = express.Router();
const passport = require('passport');

const userController = require('../controllers/user-controller')
const auth = require('./auth');
const User = require('../models/user-models')

router.get('/', auth.optional, userController.getAll);
router.get('/current', auth.require, userController.curretUser);

router.get('/login', auth.optional, (req, res, next) => {
    res.status(200).json({
        "message": "login page"
    })
})

router.get('/secret', auth.require, (req, res, next) => {
    res.status(200).json({
        'message': "this is secret word"
    })
})

router.post('/signup', auth.optional, userController.userSignup);
router.post('/login', auth.optional, userController.userLogin);

/*
router.get('/logout', (req, res) => {
    req.logout();
    res.status(200).json({
        'message': 'succesfully logout'
    })
})
*/

module.exports = router;