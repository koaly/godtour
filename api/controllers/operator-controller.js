const mongoose = require('mongoose');

const Tour = require('../models/tour-models');
const User = require('../models/user-models');
const Booking = require('../models/booking-models');

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

exports.checkNonOperatorStatus = async (req, res, next) => {
    try{
        const { payload: { id } } = req;
        const user = await User.findById(id);
        console.log(user.status);
        if(user.status){
            return res.status(403).json({
                error: {
                    message: "Already Tour-operator"
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

exports.requestUpgrade = async (req, res, next) => {
    try{
        const { payload: { id } } = req;
        const user = await User.findById(id);
        user.upgradeRequest = true;
        if(req.body.upgradeReason) user.upgradeReason = req.body.upgradeReason;
        else user.upgradeReason = '';
        const result = await user.save();
        console.log(result);
        res.status(200).json({
            message: "Request upgrade successful"
        });
    } catch(err){
        console.log(err)
        return res.status(500).json({
            error: err
        });
    } 
}