const mongoose = require('mongoose');

const Tiy = require('../models/tiy-models');

exports.checkOwnTiy = async (req, res, next) => {
    try{
        const { payload: { id, status } } = req;
        const tiy = await Tiy.findById(req.params.id);
        console.log(id);
        console.log(tiy.userID);
        if(id != tiy.userID && !status){
            return res.status(403).json({
                error: {
                    message: "Permission denied"
                }
            });
        } else{
            return next();
        }
    } catch(err){
        console.log(err);
        res.status(500).json({
            error: err
        });
    }
}
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

exports.getOneTiy = async function(req,res,next){
    try{
        let tiy = await Tiy.findById(req.params.id)
        .select()
        .exec()
        console.log(tiy);
        res.status(200).json({
            tiy
        });
    } catch(err){
        console.log(err);
        res.status(500).json({
            error: err
        });
    }
}