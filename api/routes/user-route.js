const express = require('express');
const router = express.Router();
const passport = require('passport');

const userController = require('../controllers/user-controller')
const checkAuth = require('../middleware/check-auth');

router.get('/', userController.getAll);
router.post('/signup', userController.userSignup);

router.get('/secret', checkAuth, (req, res, next) => {
    res.status(200).json({
        'message': "this is secret word"
    })
})

/**
 * If we sucees login with passport it will return user
 * every req
 */
router.post('/login', passport.authenticate('local-login',
    { successRedirect: 'user/secret', failureRedirect: 'user/login' }
));

router.get('logout', checkAuth, (req, res) => {
    req.logout();
    res.status(200).json({
        'message': 'succesfully logout'
    })
})

module.exports = router;