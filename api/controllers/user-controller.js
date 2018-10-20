const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const User = require('../models/user-models');

const userResponse = (users) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const response = {
                count: users.length,
                user: users.map(doc => {
                    return {
                        email: doc.email,
                        password: doc.password
                    }
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


const createPassword = (password, salt) => {
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, salt, (err, encrypted) => {
            console.log(err, " ", encrypted)
            if (err) {
                reject(err);
            } else {
                resolve(encrypted)
            }
        })
    })
}



exports.userSignup = async (req, res, next) => {
    try {
        const user = await User.find({ email: req.body.email });
        if (user.length >= 1) {
            return res.status(409).json({
                message: "Email already existed"
            })
        } else {
            const hash = await createPassword(req.body.password, 10);
            const newUser = await new User({
                _id: new mongoose.Types.ObjectId,
                email: req.body.email,
                password: hash
            })
            const result = await newUser.save();
            res.status(201).json({
                message: "newUser Created",
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