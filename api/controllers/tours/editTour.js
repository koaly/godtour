const Tour = require("../../models/tour-models");
const { asynWrapper } = require("../utility/");
const {
  TourNotFoundException,
  ObjectIdIsNotValidException
} = require("../utility/exception");

const mongoose = require("mongoose");
toDate = (dateStr, timeStr) => {
  return new Date(dateStr + " " + timeStr);
};

checkDate = (dateStr, timeStr) => {
  if (dateStr && timeStr) {
    return toDate(dateStr, timeStr);
  }
  return null;
};

const handle = async (req, res) => {
  const {
    payload: {
      info: { id: userId, status: userStatus }
    },
    body: {
      name,
      price,
      dest,
      dayDuration,
      nightDuration,
      startBookDate,
      startBookTime,
      endBookDate,
      endBookTime,
      departDate,
      returnDate,
      airline,
      currentSeat,
      maxSeat,
      food,
      detail,
      highlight,
      imgsrc,
      alternateImgsrc
    },
    query: { id: tourID }
  } = req;

  if (!mongoose.Types.ObjectId.isValid(tourID))
    throw new ObjectIdIsNotValidException();
  const tour = await Tour.findByOwnOneTour(userId, userStatus, tourID);

  if (!tour) throw new TourNotFoundException();

  const editTour = {
    name: name || tour.name,
    price: price || tour.payload,
    dest: dest || tour.dest,
    dayDuration: dayDuration || tour.dayDuration,
    nightDuration: nightDuration || tour.nightDuration,
    startBooking: checkDate(startBookDate, startBookTime) || tour.startBooking,
    endBooking: checkDate(endBookDate, endBookTime) || tour.endBooking,
    departDate: departDate || tour.departDate,
    returnDate: returnDate || tour.returnDate,
    airline: airline || tour.airline,
    maxSeat: maxSeat || tour.maxSeat,
    currentSeat: currentSeat || tour.currentSeat,
    food: food || tour.food,
    detail: detail || tour.detail,
    highlight: highlight || tour.highlight,
    imgsrc: imgsrc || tour.imgsrc,
    alternateImgsrc: alternateImgsrc || tour.alternateImgsrc
  };

  const result = await Tour.update({ _id: tourID }, editTour);
  res.status(200).json(result);
};

module.exports = asynWrapper.bind(null, handle);
