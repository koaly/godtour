const mongoose = require('mongoose');

const Tiy = require('../models/tiy-models');

exports.checkNotNullTiy = async (req, res, next) => {
    try {
        const tiy = await Tiy.findById(req.params.tiyID);
        if (!tiy) {
            res.status(404).json({
                error: {
                    message: "Not found"
                }
            });
        } else {
            return next();
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: err
        });
    }
}

exports.checkOwnTiy = async (req, res, next) => {
    try {
        const { payload: { info } } = req;
        const { id } = info
        const tiy = await Tiy.find({ _id: req.params.tiyID });
        console.log(info.id);
        console.log(tiy.userID);
        if (id != tiy.userID) {
            return res.status(403).json({
                error: {
                    message: "Permission denied"
                }
            });
        } else {
            return next();
        }
    } catch (e) {
        console.log(e.message.toString());
        res.status(500).json({
            error: e.message.toString()
        });
    }
}

exports.checkOwnTiyPlus = async (req, res, next) => {
    try {
        const { payload: { info } } = req;
        const { id, status } = info

        const tiy = await Tiy.find({ _id: req.params.tiyID });
        console.log(info.id);
        console.log(tiy.userID);
        if (id != tiy.userID && !status) {
            return res.status(403).json({
                error: {
                    message: "Permission denied"
                }
            });
        } else {
            return next();
        }
    } catch (e) {
        console.log(e.message.toString());
        res.status(500).json({
            error: e.message.toString()
        });
    }
}

exports.checkNonAccepted = async (req, res, next) => {
    try {
        const { payload: { info } } = req;
        const { id } = info

        const { tiyID } = req.params

        const { isAccepted, userID } = await Tiy.find({ _id: tiyID });

        console.log(isAccepted);
        if (isAccepted && id != userID) {
            return res.status(403).json({
                error: {
                    message: "This Tour-it-yourself was accepted."
                }
            });
        } else {
            return next();
        }
    } catch (e) {
        console.log(e);
        res.status(500).json({
            error: e.message.toString()
        });
    }
}

exports.getAll = async function (req, res, next) {
    try {
        const tiys = await Tiy.find()
            .select()
            .exec()
        console.log(tiys);
        res.status(200).json({
            count: tiys.length,
            tiys
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({
            error: e.message.toString()
        });
    }
}

exports.getNonAccepted = async function (req, res, next) {
    try {
        const tiys = await Tiy.find({ isAccepted: false })
            .select()
            .exec()
        console.log(tiys);
        res.status(200).json({
            count: tiys.length,
            tiys
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({
            error: e.message.toString()
        });
    }
}

exports.getAccepted = async function (req, res, next) {
    try {
        const tiys = await Tiy.find({ isAccepted: true })
            .select()
            .exec()
        console.log(tiys);
        res.status(200).json({
            count: tiys.length,
            tiys
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({
            error: e.message.toString()
        });
    }
}

exports.getOneTiy = async function (req, res, next) {
    try {
        const tiy = await Tiy.find({ _id: req.params.tiyID })
            .select()
            .exec()
        console.log(tiy);
        res.status(200).json({
            tiy
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({
            error: e.message.toString()
        });
    }
}

exports.getOwnTiy = async function (req, res, next) {
    try {
        const { payload: { info } } = req;
        const { id } = info
        const tiys = await Tiy.find({ userID: id })
            .select()
            .exec()
        console.log(tiys);
        res.status(200).json({
            count: tiys.length,
            tiys
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({
            error: e.message.toString()
        });
    }
}

exports.addTiy = async function (req, res, next) {
    try {
        const {
            minPrice,
            maxPrice,
            minDuration,
            maxDuration,
            minMember,
            maxMember,
            name,
            dest,
            startFreeDate,
            endFreeDate,
            food,
            detail,
            highlight
        } = req.body

        if (maxPrice < minPrice
            || maxDuration < minDuration
            || maxMember < minMember) {
            return res.status(405).json({
                error: {
                    message: "Tried to insert max < min"
                }
            });
        }
        const { payload: { info } } = req;
        const tiy = await new Tiy({
            _id: new mongoose.Types.ObjectId,
            name: name,
            userID: info.id,
            userName: info.displayName,
            minPrice: minPrice,
            maxPrice: maxPrice,
            minMember: minMember,
            maxMember: maxMember,
            dest: dest,
            minDuration: minDuration,
            maxDuration: maxDuration,
            startFreeDate: startFreeDate,
            endFreeDate: endFreeDate,
            food: food,
            detail: detail,
            highlight: highlight
        });
        const result = await tiy.save();

        console.log(result);
        res.status(201).json({
            message: "Tiy added"
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({
            error: e.message.toString()
        })
    }
}

exports.editTiy = async function (req, res, next) {
    const {
        minPrice,
        maxPrice,
        minDuration,
        maxDuration,
        minMember,
        maxMember,
        name,
        dest,
        startFreeDate,
        endFreeDate,
        food,
        detail,
        highlight
    } = req.body
    try {
        if (maxPrice < minPrice
            || maxDuration < minDuration
            || maxMember < minMember) {
            return res.status(405).json({
                error: {
                    message: "Tried to insert max < min"
                }
            });
        }

        //don't need to check if you can pass if req doesn't send value
        //will not instead value
        const tiy = {}
        tiy.name = name
        tiy.minPrice = minPrice
        tiy.maxPrice = maxPrice
        tiy.minMember = minMember
        tiy.maxMember = maxMember
        tiy.dest = dest
        tiy.dest = dest
        tiy.maxDuration = maxDuration
        tiy.minDuration = minDuration
        tiy.startFreeDate = startFreeDate
        tiy.endFreeDate = endFreeDate
        tiy.food = food
        tiy.detail = detail
        tiy.highlight = highlight

        const { tiyID } = req.params
        console.log(req.params);
        console.log(tiy);

        const id = { _id: tiyID }

        const result = await Tiy.findOneAndUpdate(id, tiy, { new: true });
        console.log(result);
        res.status(200).json({
            message: "Tiy updated"
        })
    } catch (e) {
        console.log(e);
        res.status(500).json({
            error: e.message.toString()
        })
    }
}

exports.deleteTiy = async (req, res, next) => {
    try {
        const id = { _id: req.params.tiyID }
        const result = await Tiy.findOneAndRemove(id);
        console.log(result);
        res.status(200).json({
            message: "Tiy deleted"
        })
    } catch (e) {
        console.log(e);
        res.status(500).json({
            error: e.message.toString()
        })
    }
}

exports.acceptOffer = async (req, res, next) => {
    try {
        const tiy = await Tiy.find({ _id: req.params.tiyID });
        console.log(tiy);
        tiy.isAccepted = true;
        tiy.offerID = req.params.offerID;
        const result = await tiy.save();
        console.log(result);
        res.status(200).json({
            message: "Accepted Offer"
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({
            error: e.message.toString()
        });
    }
}

exports.cancelOffer = async (req, res, next) => {
    try {
        const tiy = await Tiy.find({ _id: req.params.tiyID });
        console.log(tiy);
        tiy.isAccepted = false;
        tiy.offerID = undefined;
        const result = await tiy.save();
        console.log(result);
        res.status(200).json({
            message: "Canceled Offer"
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({
            error: e
        });
    }
}