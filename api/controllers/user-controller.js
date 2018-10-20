const mongoose = require('mongoose');

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