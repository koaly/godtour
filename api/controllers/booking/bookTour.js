const Booking = require("../../models/booking-models");
const Tour = require("../../models/tour-models");
const { asynWrapper, checkObjectIdIsValid } = require("../utility");
const {
  Request,
  ObjectIdIsNotValidException,
  TourNotFoundException,
  BookMoreThanCurrentSeat
} = require("../utility/exception");

const mongoose = require("mongoose");

const handle = async (req, res) => {
  const session = await Tour.startSession();

  const {
    payload: {
      info: { id: userId, displayName: userDisplayName }
    },
    body: { amountBooking },
    params: { id }
  } = req;

  if (!id) throw new Request("id");
  if (!amountBooking) throw new Request("amountBooking");
  if (!checkObjectIdIsValid(id)) throw new ObjectIdIsNotValidException();

  let tour = await Tour.findOne({ _id: id });
  if (!tour) throw new TourNotFoundException();

  const { name, currentSeat } = tour;

  const booking = await new Booking({
    _id: new mongoose.Types.ObjectId(),
    userID: userId,
    userName: userDisplayName,
    tourID: id,
    tourName: name,
    amountBooking: amountBooking
  });

  session.startTransaction();
  if (currentSeat - amountBooking < 0) {
    throw new BookMoreThanCurrentSeat();
  } else {
    tour.currentSeat -= amountBooking;
    const bookingResult = await booking.save();
    const tourResult = await tour.save();

    // console.log(bookingResult);
    // console.log(tourResult);
  }

  await session.commitTransaction();

  res.status(200).json({
    msg: `success booking tour remaining ${tour.currentSeat}`,
    id: booking._id,
    tourId: tour._id,
    userId: userId,
    currentSeat: tour.currentSeat,
    GET: "api/tours/booking/" + booking._id
  });
};

module.exports = asynWrapper.bind(null, handle);
