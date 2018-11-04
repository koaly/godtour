const mongoose = require('mongoose');

const Tour = require('../models/tour-models');
const User = require('../models/user-models');
const Booking = require('../models/booking-models');

const { UserNotFoundException, HandingErorr } = require('./handingError')

exports.checkAdminStatus = async (req, res, next) => {
    try {
        const { payload: { info } } = req;
        console.log(info.status);
        if (info.status != 2) {
            return res.status(403).json({
                error: {
                    message: "Permission denied"
                }
            });
        } else {
            return next();
        }
    } catch (e) {
        HandingErorr(res, e)
    }
}

exports.checkUpgradeRequest = async (req, res, next) => {
    try {
        const user = await User.findOne({ _id: req.params.id });
        if (!user || user.length == 0) throw new UserNotFoundException()

        console.log(user.upgradeRequest);
        if (!user.upgradeRequest) {
            return res.status(403).json({
                error: {
                    message: "No Request"
                }
            });
        } else {
            return next();
        }
    } catch (e) {
        HandingErorr(res, e)
    }
}

exports.getUpgradeRequest = async (req, res, next) => {
    try {
        const users = await User.find({ upgradeRequest: true })

        if (!users || users.length == 0) throw new UserNotFoundException()
        console.log(users);
        res.status(200).json({
            count: users.length,
            users
        });
    } catch (e) {
        HandingErorr(res, e)
    }
}

exports.acceptUpgradeRequest = async (req, res, next) => {
    try {
        const user = await User.findOne({ _id: req.params.id });
        if (!user || user.length == 0) throw new UserNotFoundException()

        console.log(user);
        user.upgradeRequest = false;
        user.status = 1;
        const result = await user.save();
        console.log(result);
        res.status(200).json({
            message: "accepted request"
        });
    } catch (e) {
        HandingErorr(res, e)
    }
}

exports.refuseUpgradeRequest = async (req, res, next) => {
    try {
        const user = await User.find({ _id: req.params.id });
        if (!user || user.length == 0) throw new UserNotFoundException()
        user.upgradeRequest = false;
        const result = await user.save();
        console.log(result);
        res.status(200).json({
            message: "refused request"
        });
    } catch (e) {
        HandingErorr(res, e)
    }
}