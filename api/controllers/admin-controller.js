const mongoose = require('mongoose');

const Tour = require('../models/tour-models');
const User = require('../models/user-models');
const Booking = require('../models/booking-models');

exports.checkAdminStatus = async (req, res, next) => {
    try{
        const { payload: { id } } = req;
        const user = await User.findById(id);
        console.log(user.status);
        if(user.status != 2){
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

exports.checkUpgradeRequest = async (req, res, next) => {
    try{
        const user = await User.findById(req.params.id);
        console.log(user.upgradeRequest);
        if(!user.upgradeRequest){
            return res.status(403).json({
                error: {
                    message: "No Request"
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

exports.getUpgradeRequest = async (req, res, next) => {
    try{
        const users = await User.find({upgradeRequest: true})
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

exports.acceptUpgradeRequest = async (req, res, next) => {
    try{
        const user = await User.findById(req.params.id);
        console.log(user);
        user.upgradeRequest = false;
        user.status = 1;
        const result = await user.save();
        console.log(result);
        res.status(200).json({
            message: "accepted request"
        });
    } catch(err){
        console.log(err);
        res.status(500).json({
            error: err
        });
    }
}

exports.refuseUpgradeRequest = async (req, res, next) => {
    try{
        const user = await User.findById(req.params.id);
        console.log(user);
        user.upgradeRequest = false;
        const result = await user.save();
        console.log(result);
        res.status(200).json({
            message: "refused request"
        });
    } catch(err){
        console.log(err);
        res.status(500).json({
            error: err
        });
    }
}