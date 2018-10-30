const mongoose = require('mongoose');

const Tiy = require('../models/tiy-models');
const Offer = require('../models/offer-models');
const { TiyNotFoundException, OfferNotFoundException, HandingErorr } = require('./handingError')

exports.checkNotNullOffer = async (req, res, next) => {
    try {
        const offer = await Offer.findById(req.params.offerID);
        if (!offer) {
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

exports.checkOwnOffer = async (req, res, next) => {
    try {
        const { payload: { info } } = req;
        const offer = await Offer.find({ _id: req.params.offerID });
        if (!offer || offer.length == 0) throw new OfferNotFoundException()

        console.log(info.id);
        console.log(offer.operatorID);
        if (info.id != offer.operatorID) {
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

exports.checkOwnOfferPlus = async (req, res, next) => {
    try {
        const { payload: { info } } = req;
        const tiy = await Tiy.find({ _id: req.params.tiyID });
        if (!tiy || tiy.length == 0) throw new TiyNotFoundException()

        const offer = await Offer.findById(req.params.offerID);
        if (!offer || offer.length == 0) throw new OfferNotFoundException()
        console.log(info.id);
        console.log(tiy.userID);
        console.log(offer.operatorID);
        if (info.id != offer.operatorID && info.id != tiy.userID) {
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

exports.getOneOffer = async function (req, res, next) {
    try {
        const offer = await Offer.find({ _id: req.params.offerID })
        if (!offer || offer.length == 0) throw new OfferNotFoundException()

        console.log(offer);
        res.status(200).json({
            offer
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: err
        });
    }
}

exports.getByTiy = async (req, res, next) => {
    try {
        const { payload: { info } } = req;
        const { status, id } = info

        const { tiyID } = req.params
        //what
        let offers = {}
        if (status)
            offers = await Offer.find({ tiyID, operatorID: id })
        else
            offers = await Offer.find({ tiyID })
        if (!offers || offers.length == 0) throw new OfferNotFoundException()

        console.log(offers);
        res.status(200).json({
            count: offers.length,
            offers
        });
    } catch (e) {
        HandingErorr(res, e)
    }
}

exports.getOwnOffer = async (req, res, next) => {
    try {
        const { payload: { info } } = req;
        const offers = await Offer.find({ operatorID: info.id })

        if (!offers || offers.length == 0) throw new OfferNotFoundException()

        console.log(offers);
        res.status(200).json({
            count: offers.length,
            offers
        });
    } catch (e) {
        HandingErorr(res, e)
    }
}

exports.addOffer = async function (req, res, next) {
    try {
        const { payload: { info } } = req;
        const offer = await new Offer({
            _id: new mongoose.Types.ObjectId,
            name: req.body.name,
            tiyID: req.params.tiyID,
            operatorID: info.id,
            operatorName: info.displayName,
            price: req.body.price,
            dest: req.body.dest,
            dayDuration: req.body.dayDuration,
            nightDuration: req.body.nightDuration,
            departDate: req.body.departDate,
            returnDate: req.body.returnDate,
            //in model airline is require
            //what about tour in our county
            airline: req.body.airline,
            member: req.body.member,
            food: req.body.food,
            detail: req.body.detail,
            highlight: req.body.highlight
        });
        const result = await offer.save();
        console.log(result);
        res.status(201).json({
            message: "Offer added"
        });
    } catch (e) {
        HandingErorr(res, e)
    }
}

exports.editOffer = async function (req, res, next) {
    try {
        const offer = {}
        if (req.body.name) offer.name = req.body.name
        if (req.body.price) offer.price = req.body.price
        if (req.body.dest) offer.dest = req.body.dest
        if (req.body.dayDuration) offer.dayDuration = req.body.dayDuration
        if (req.body.nightDuration) offer.nightDuration = req.body.nightDuration
        if (req.body.departDate) offer.departDate = req.body.departDate
        if (req.body.returnDate) offer.returnDate = req.body.returnDate
        if (req.body.airline) offer.airline = req.body.airline
        if (req.body.member) offer.member = req.body.member
        if (req.body.food) offer.food = req.body.food
        if (req.body.detail) offer.detail = req.body.detail
        if (req.body.highlight) offer.highlight = req.body.highlight

        console.log(req.params);
        console.log(offer);
        const id = { _id: req.params.offerID }
        const result = await Offer.findOneAndUpdate(id, offer);

        if (!result || result.length == 0) throw new OfferNotFoundException()
        console.log(result);
        res.status(200).json({
            message: "Offer updated"
        })
    } catch (e) {
        HandingErorr(res, e)
    }
}

exports.deleteOffer = async (req, res, next) => {
    try {
        const id = { _id: req.params.offerID }
        const result = await Offer.findOneAndRemove(id);

        if (!result || result.length == 0) throw new OfferNotFoundException()
        console.log(result);
        res.status(200).json({
            message: "Offer deleted"
        })
    } catch (e) {
        HandingErorr(res, e)
    }
}