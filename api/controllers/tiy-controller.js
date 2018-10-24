const mongoose = require('mongoose');

const Tiy = require('../models/tiy-models');

exports.getAll = async function(req,res,next){
    try{
        let tiys = await Tiy.find()
        .select()
        .exec()
        console.log(tiys);
        res.status(200).json({
            count : tiys.length,
            tiys
        });
    } catch(err){
        console.log(err);
        res.status(500).json({
            error: err
        });
    }
}

exports.getNonAccepted = async function(req,res,next){
    try{
        let tiys = await Tiy.find({isAccepted: false})
        .select()
        .exec()
        console.log(tiys);
        res.status(200).json({
            count : tiys.length,
            tiys
        });
    } catch(err){
        console.log(err);
        res.status(500).json({
            error: err
        });
    }
}

exports.getAccepted = async function(req,res,next){
    try{
        let tiys = await Tiy.find({isAccepted: true})
        .select()
        .exec()
        console.log(tiys);
        res.status(200).json({
            count : tiys.length,
            tiys
        });
    } catch(err){
        console.log(err);
        res.status(500).json({
            error: err
        });
    }
}