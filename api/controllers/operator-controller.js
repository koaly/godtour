const mongoose = require('mongoose');

const Tour = require('../models/tour-models');
const User = require('../models/user-models');
const Booking = require('../models/booking-models');
const { UserNotFoundException, HandingErorr } = require('./handingError')

exports.checkOperatorStatus = async (req, res, next) => {
    try {
        const { payload: { info } } = req;
        console.log(info.status);
        if (!info.status) {
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

exports.checkNonOperatorStatus = async (req, res, next) => {
    try {
        const { payload: { info } } = req;
        console.log(info.status);
        if (info.status) {
            return res.status(403).json({
                error: {
                    message: "Already Tour-operator"
                }
            });
        } else {
            return next();
        }
    } catch (e) {
        HandingErorr(res, e)
    }
}

exports.requestUpgrade = async (req, res, next) => {
    try {
        const { payload: { info } } = req;
        const { upgradeReason } = req.body;

        const user = await User.find({ _id: info.id });
        if (!user || user.length == 0) throw new UserNotFoundException()

        user.upgradeRequest = true;

        if (upgradeReason)
            user.upgradeReason = upgradeReason;
        else
            user.upgradeReason = null;

        const result = await user.save();
        console.log(result);
        res.status(200).json({
            message: "Request upgrade successful"
        });
    } catch (e) {
        HandingErorr(res, e)
    }
}