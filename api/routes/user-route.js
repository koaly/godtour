const express = require('express');
const router = express.Router();
const passport = require('passport');

const userController = require('../controllers/user-controller')
const auth = require('./auth');
const User = require('../models/user-models')

router.get('/', auth.optional, userController.getAll);
router.post('/signup', userController.userSignup);

router.get('/secret', auth.require, (req, res, next) => {
    res.status(200).json({
        'message': "this is secret word"
    })
})

/**
 * If we sucees login with passport it will return user
 * every req
 */
router.get('/login', auth.optional, (req, res, next) => {
    res.status(200).json({
        "message": "login page"
    })
})
router.post('/login', auth.optional, function (req, res, next) {
    const { body: user } = req;
    if (!user.email) {
        return res.status(422).json({
            error: {
                email: 'is required',
            }
        });
    }
    if (!user.password) {
        return res.status(422).json({
            error: {
                password: 'is required',
            }
        });
    }
    return passport.authenticate('local-login', { session: false }, (err, passportUser, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.status(404).json({
                response: info
            })
        }
        if (passportUser) {
            const user = passportUser;
            user.token = passportUser.generateJWT();

            return res.json({ user: user.toAuthJSON() });
        }
    })(req, res, next);
});

router.get('/current', auth.require, (req, res, next) => {
    const { payload: { id } } = req;
    return User.findById(id).then((user) => {
        if (!user) {
            return res.sendStatus(400);
        }
        return res.json({ user: user.toAuthJSON() });
    })
})

router.get('/logout', (req, res) => {
    req.logout();
    res.status(200).json({
        'message': 'succesfully logout'
    })
})

module.exports = router;