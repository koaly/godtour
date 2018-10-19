const mongoose = require('mongoose');
const Item = require('../models/example-model');

exports.getAllItem = (req, res, next) => {
    Item.find()
        .select()
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                item: docs.map(doc => {
                    return {
                        name: doc.name,
                        value: doc.value
                    }
                })
            }
            //200 ok
            res.status(200).json({
                item: response
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
}

exports.registerItem = (req, res, next) => {
    Item.find({ name: req.body.name })
        .exec()
        .then(item => {
            //return to arrays of items
            if (item.length > 1) {
                //409 confit
                return res.status(409).json({
                    message: "item already exits"
                });
            } else {
                if (req.body.value <= 0) {
                    //411 require length
                    return res.status(411).json({
                        message: "need value"
                    })
                }


                const item = new Item({
                    _id: new mongoose.Types.ObjectId,
                    name: req.body.name,
                    value: req.body.value
                })

                item.save()
                    .then(result => {
                        //201 create
                        return res.status(201).json({
                            message: "sucess create new item",
                            item: result
                        })
                    })
                    .catch(err => {
                        //500 itenal error
                        return res.status(500).json({
                            error: err
                        })
                    })
            }
        })
        .catch()
    return true;
} 