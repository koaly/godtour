const mongoose = require('mongoose');

const Tour = require('../models/tour-models');

exports.getAll = (req,res,next) =>{
    Tour.find()
    .select()
    .exec()
    .then(tours =>{
        console.log(tours);
        const response ={
            count: tours.length,
            tour : tours
        }
        res.status(200).json({
            response
        });
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
}

