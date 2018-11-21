const Tour = require("../../models/tour-models");
const { asynWrapper } = require("../utility/");
const mongoose = require("mongoose");

toDate = (dateStr, timeStr) => {
  return new Date(dateStr + " " + timeStr);
};
const handle = async (req, res) => {
  const {
    payload: {
      info: { id: userId, displayName: userDisplayName }
    },
    body: {
      name: tourName,
      price,
      dest,
      dayDuration,
      nightDuration,
      startBookDate,
      startBookTime,
      endBookDate,
      endBookTime,
      endBooking,
      departDate,
      returnDate,
      airline,
      seat,
      food,
      detail,
      highlight,
      imgsrc,
      alternateImgsrc
    }
  } = req;

  const newInfoTour = {
    _id: new mongoose.Types.ObjectId(),
    name: tourName,
    operatorID: userId,
    operatorName: userDisplayName,
    price,
    dest,
    dayDuration,
    nightDuration,
    startBooking: toDate(startBookDate, startBookTime),
    endBooking: toDate(endBookDate, endBookTime),
    departDate,
    returnDate,
    airline,
    food,
    detail,
    maxSeat: seat,
    currentSeat: seat,
    highlight,
    imgsrc,
    alternateImgsrc
  };
  const tour = await new Tour(newInfoTour);
  const result = await tour.save();

  res.status(201).json({
    msg: `success add tour ${result.name}`,
    name: result.name,
    operatorName: result.operatorName,
    id: result.id,
    GET: `/api/tours?id=${result._id}`
  });
};
module.exports = asynWrapper.bind(null, handle);
