const Booking = require("../../models/booking-models");
const { asynWrapper } = require("../utility");
const {
  BookingNotFoundException,
  ObjectIdIsNotValidException
} = require("../utility/exception");

const mongoose = require("mongoose");

const handle = async (req, res) => {
  const {
    params: { id: bookingID }
  } = req;

  if (!mongoose.Types.ObjectId.isValid(bookingID))
    throw new ObjectIdIsNotValidException();

  let booking = await Booking.findOne({ _id: bookingID });
  if (!booking) throw new BookingNotFoundException();

  res.status(200).json({
    booking: booking.toBookingJSON()
  });
};

module.exports = asynWrapper.bind(null, handle);
