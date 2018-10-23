const mongoose = require('mongoose');

const Tour = require('../models/tour-models');
const User = require('../models/user-models');
const Booking = require('../models/booking-models');

exports.getUpgradeRequest = async (req, res, next) => {
    try{
        const users = User.find({upgradeRequest: true})
        .select()
        .exec()
        console.log(users);
        res.status(200).json({
            count : users.length,
            users
        });
    } catch(err){
        console.log(err);
        res.status(500).json({
            error: err
        });
    }
}