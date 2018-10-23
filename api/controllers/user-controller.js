const mongoose = require('mongoose');
const passport = require('passport');
const User = require('../models/user-models');

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
exports.userLogin = (req, res, next) => {
    const { body: user } = req;

    if (!user.email) {
        return res.status(422).json({
            error: {
                message: "email is required"
            }
        });
    }
    if (!user.password) {
        return res.status(422).json({
            error: {
                message: "password is required"
            }
        })
    }
    return passport.authenticate('local-login', { session: false }, (err, passportUser, info) => {
        console.log("local")
        if (!passportUser) {
            return res.status(404).json({
                message: info
            })
        }
        if (passportUser) {
            console.log(passportUser)
            const user = passportUser;
            user.token = passportUser.generateJWT();

            return res.status(200).json({
                user: user.toAuthJSON()
            })
        }
    })(req, res, next)
}

exports.curretUser = async (req, res, next) => {
    const { payload: { id } } = req;
    const user = await User.findById(id)
    if (!user) {
        return res.status(400).json({
            message: "No CurrentUser",
        })
    }
    return res.status(200).json({
        user: user.toAuthJSON()
    });
}


exports.userSignup = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.find({ email: email });
        if (user.length >= 1) {
            return res.status(409).json({
                message: "Email already existed"
            })
        } else {
            const newUser = await new User();

            newUser.email = email;
            newUser.password = await newUser.generateHash(password);

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

exports.checkOperatorStatus = async (req, res, next) => {
    try{
        const { payload: { id } } = req;
        const user = await User.findById(id);
        console.log(user.status);
        if(!user.status){
            return res.status(403).json({
                error: {
                    message: "Permission denied"
                }
            });
        } else{
            return next();
        }
    } catch(err){
        console.log(err)
        return res.status(500).json({
            error: err
        });
    } 
}