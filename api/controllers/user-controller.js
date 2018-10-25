const mongoose = require('mongoose');
const passport = require('passport');
const User = require('../models/user-models');
const { validationResult } = require('express-validator/check')

const userResponse = (users) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const response = {
                count: users.length,
                user: users.map(user => {
                    return user.toProfileJSON();
                })
            }
            resolve(response);
        }, 1000)
    })
}

exports.getAll = async (req, res, next) => {
    try {
        const users = await User.find()
        const response = await userResponse(users)

        res.status(200).json({
            users: response
        })
    }
    catch (err) {
        res.status(500).json({
            error: err
        })
    }
}

exports.getOneUser = async function (req, res, next) {
    const { username } = req.params
    try {
        const user = await User.findOne({ username: username })
            .select()
            .exec()
        if (!user) {
            return res.status(404).json({
                error: "user doesn't exits"
            })
        }
        console.log(user);
        return res.status(200).json({
            user: user.toProfileJSON()
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            error: err
        });
    }
}
exports.userLogin = (req, res, next) => {
    return passport.authenticate('local-login', { session: false }, (err, passportUser, info) => {
        console.log("local")
        if (!passportUser) {
            return res.status(404).json({
                message: info
            })
        }
        if (passportUser) {
            return res.status(200).json({
                user: passportUser.toAuthJSON()
            })
        }
    })(req, res, next)
}

exports.curretUser = async (req, res, next) => {
    const { payload: { info } } = req;
    return res.status(200).json({
        info: info
    });
}


exports.userSignup = async (req, res, next) => {
    try {
        const {
            email,
            password,
            username,
            displayName,
            imgsrc,
            gender,
        } = req.body;

        const user = await User.find({ email: email });

        if (user.length >= 1) {
            return res.status(409).json({
                message: "Email already existed"
            })
        } else {
            const newUser = await new User();

            newUser.email = email;
            newUser.password = await newUser.generateHash(password);
            newUser.username = username;
            newUser.gender = gender;
            newUser.displayName = displayName;
            newUser.imgsrc = imgsrc;

            const result = await newUser.save();
            res.status(201).json({
                message: "New User Created",
                user: result
            })
        }
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({
            error: err
        })
    }
}
