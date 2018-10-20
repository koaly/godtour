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
router.get('/login', (req, res, next) => {
    res.status(200).json({
        "message": "login page"
    })
})
router.post('/login', function (req, res, next) {
    passport.authenticate('local-login', function (err, user, info) {
        console.log("helo", info)
        if (err) {
            return res.status(500).json({
                error: err
            })
        }
        if (!user) {
            return res.status(404).json({
                response: info
            })
        }
        req.logIn(user, function (err) {
            if (err) {
                return res.status(500).json({
                    error: err
                })
            }
            res.status(200).json({
                message: 'login succes'
            })
        });
    })(req, res, next);
});

router.get('/logout', checkAuth, (req, res) => {
    req.logout();
    res.status(200).json({
        'message': 'succesfully logout'
    })
})

module.exports = router;