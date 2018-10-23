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