const express = require('express');
const router = express.Router();
const passport = require('passport');

const userController = require('../controllers/user-controller')

router.get('/', userController.getAll);
router.post('/signup', userController.userSignup);

router.get('/login', (req, res, next) => {
    return {
        message: 'login with email and password'
    }
})
router.post('/login', passport.authenticate('local', { failureRedirect: '/' }), (req, res, next) => {
    console.log("success")
    res.redirect('/')
})

module.exports = router;