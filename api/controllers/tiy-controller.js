const mongoose = require('mongoose');

const Tiy = require('../models/tiy-models');
const { TiyNotFoundException, HandingErorr } = require('./handingError')

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
        res.status(500).json({
            error: err
        });
    }
}

exports.checkOwnTiy = async (req, res, next) => {
    try {
        const { payload: { info } } = req;
        const { id } = info
        const tiy = await Tiy.findById(req.params.tiyID);

        console.log(1);
        console.log(tiy);
        console.log(req.params.tiyID);
        console.log(tiy.userID);
        if (!tiy || tiy.length == 0) throw new TiyNotFoundException()

        console.log(`Check ${info.id} != ${tiy.userID}`);
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
        HandingErorr(res, e)
    }
}

exports.checkOwnTiyPlus = async (req, res, next) => {
    try {
        const { payload: { info } } = req;
        const { id, status } = info

        const tiy = await Tiy.findById(req.params.tiyID);

        if (!tiy || tiy.length == 0) throw new TiyNotFoundException()

        console.log(`Check ${info.id} != ${tiy.userID}`);

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
        HandingErorr(res, e)
    }
}

exports.checkNonAccepted = async (req, res, next) => {
    try {
        const { payload: { info } } = req;
        const { id } = info

        const { tiyID } = req.params

        const tiy = await Tiy.findById(tiyID);

        if (!tiy || tiy.length == 0) throw new TiyNotFoundException()
        console.log(isAccepted);
        if (tiy.isAccepted && id != tiy.userID) {
            return res.status(403).json({
                error: {
                    message: "This Tour-it-yourself was accepted."
                }
            });
        } else {
            return next();
        }
    } catch (e) {
        HandingErorr(res, e)
    }
}

exports.getAll = async function (req, res, next) {
    try {
        const tiys = await Tiy.find()

        if (!tiys || tiys.length == 0) throw new TiyNotFoundException()
        console.log(tiys);
        res.status(200).json({
            count: tiys.length,
            tiys
        });
    } catch (e) {
        HandingErorr(res, e)
    }
}

exports.getNonAccepted = async function (req, res, next) {
    try {
        const tiys = await Tiy.find({ isAccepted: false })

        if (!tiys || tiys.length == 0) throw new TiyNotFoundException()
        console.log(tiys);
        res.status(200).json({
            count: tiys.length,
            tiys
        });
    } catch (e) {
        HandingErorr(res, e)
    }
}

exports.getAccepted = async function (req, res, next) {
    try {
        const tiys = await Tiy.find({ isAccepted: true })

        if (!tiys || tiys.length == 0) throw new TiyNotFoundException()
        console.log(tiys);
        res.status(200).json({
            count: tiys.length,
            tiys
        });
    } catch (e) {
        HandingErorr(res, e)
    }
}

exports.getOneTiy = async function (req, res, next) {
    try {
        const tiy = await Tiy.findById({ _id: req.params.tiyID })

        if (!tiy || tiy.length == 0) throw new TiyNotFoundException()
        res.status(200).json({
            tiyu
        });
    } catch (e) {
        HandingErorr(res, e)
    }
}

exports.getOwnTiy = async function (req, res, next) {
    try {
        const { payload: { info } } = req;
        const { id } = info
        const tiys = await Tiy.find({ userID: id })

        if (!tiys || tiys.length == 0) throw new TiyNotFoundException()
        console.log(tiys);
        res.status(200).json({
            count: tiys.length,
            tiys
        });
    } catch (e) {
        HandingErorr(res, e)
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
        HandingErorr(res, e)
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
        if (!result || result.length == 0) throw new TiyNotFoundException()
        console.log(result);
        res.status(200).json({
            message: "Tiy updated"
        })
    } catch (e) {
        HandingErorr(res, e)
    }
}

exports.deleteTiy = async (req, res, next) => {
    try {
        const id = { _id: req.params.tiyID }
        const result = await Tiy.findOneAndRemove(id);

        if (!result || result.length == 0) throw new TiyNotFoundException()
        console.log(result);
        res.status(200).json({
            message: "Tiy deleted"
        })
    } catch (e) {
        HandingErorr(res, e)
    }
}

exports.acceptOffer = async (req, res, next) => {
    try {
        const tiy = await Tiy.find({ _id: req.params.tiyID });

        if (!tiy || tiy.length == 0) throw new TiyNotFoundException()
        console.log(tiy);
        tiy.isAccepted = true;
        tiy.offerID = req.params.offerID;
        const result = await tiy.save();
        console.log(result);
        res.status(200).json({
            message: "Accepted Offer"
        });
    } catch (e) {
        HandingErorr(res, e)
    }
}

exports.cancelOffer = async (req, res, next) => {
    try {
        const tiy = await Tiy.find({ _id: req.params.tiyID });

        if (!tiy || tiy.length == 0) throw new TiyNotFoundException()
        console.log(tiy);
        tiy.isAccepted = false;
        tiy.offerID = undefined;
        const result = await tiy.save();
        console.log(result);
        res.status(200).json({
            message: "Canceled Offer"
        });
    } catch (e) {
        HandingErorr(res, e)
    }
}