const mongoose = require('mongoose');

const Tiy = require('../models/tiy-models');

exports.checkOwnTiy = async (req, res, next) => {
    try{
        const { payload: { id } } = req;
        const tiy = await Tiy.findById(req.params.tiyID);
        console.log(id);
        console.log(tiy.userID);
        if(id != tiy.userID){
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

exports.checkOwnTiyPlus = async (req, res, next) => {
    try{
        const { payload: { id, status } } = req;
        const tiy = await Tiy.findById(req.params.tiyID);
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
        let tiy = await Tiy.findById(req.params.tiyID)
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

exports.getOwnTiy = async function(req,res,next){
    try{
        const { payload: { id } } = req;
        const tiys = await Tiy.find({userID: id})
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

exports.addTiy = async function(req, res, next){
    try{
        if (req.body.maxPrice < req.body.minPrice
            || req.body.maxDuration < req.body.minDuration
            || req.body.maxMember < req.body.minMember){
            return res.status(405).json({
                error: {
                    message: "Tried to insert max < min"
                }
            }); 
        }
        const { payload: { id, email } } = req;
        const tiy = await new Tiy({
            _id: new mongoose.Types.ObjectId,
            name: req.body.name,
            userID: id,
            userName: email,
            minPrice: req.body.minPrice,
            maxPrice: req.body.maxPrice,
            minMember: req.body.minMember,
            maxMember: req.body.maxMember,
            dest: req.body.dest,
            minDuration: req.body.minDuration,
            maxDuration: req.body.maxDuration,
            startFreeDate: req.body.startFreeDate,
            endFreeDate: req.body.endFreeDate,
            food: req.body.food,
            detail: req.body.detail,
            highlight: req.body.highlight
        });
        const result = await tiy.save();
        console.log(result);
        res.status(201).json({
            message: "Tiy added"
        });
    } catch(err){
        console.log(err);
        res.status(500).json({
            error: err
        })
    }
}

exports.editTiy = async function(req, res, next){
    try{
        if (req.body.maxPrice < req.body.minPrice
            || req.body.maxDuration < req.body.minDuration
            || req.body.maxMember < req.body.minMember){
            return res.status(405).json({
                error: {
                    message: "Tried to insert max < min"
                }
            }); 
        }
        const tiy = {}
        if(req.body.name) tiy.name = req.body.name
        if(req.body.minPrice) tiy.minPrice = req.body.minPrice
        if(req.body.maxPrice) tiy.maxPrice = req.body.maxPrice
        if(req.body.minMember) tiy.minMember = req.body.minMember
        if(req.body.maxMember) tiy.maxMember = req.body.maxMember
        if(req.body.dest) tiy.dest = req.body.dest
        if(req.body.minDuration) tiy.minDuration = req.body.minDuration
        if(req.body.maxDuration) tiy.maxDuration = req.body.maxDuration
        if(req.body.startFreeDate) tiy.startFreeDate = req.body.startFreeDate
        if(req.body.endFreeDate) tiy.endFreeDate = req.body.endFreeDate
        if(req.body.food) tiy.food = req.body.food
        if(req.body.detail) tiy.detail = req.body.detail
        if(req.body.highlight) tiy.highlight = req.body.highlight
        
        console.log(req.params);
        console.log(tiy);
        const id = {_id:req.params.tiyID}
        const result = await Tiy.findOneAndUpdate(id, tiy);
        console.log(result);
        res.status(200).json({
            message: "Tiy updated"
        })
    } catch(err){
        console.log(err);
        res.status(500).json({
            error: err
        })
    }
}

exports.deleteTiy = async (req, res, next) => {
    try{
        const id = {_id:req.params.tiyID}
        const result = await Tiy.findOneAndRemove(id);
        console.log(result);
        res.status(200).json({
            message: "Tiy deleted"
        })
    } catch(err){
        console.log(err);
        res.status(500).json({
            error: err
        })
    }
}
