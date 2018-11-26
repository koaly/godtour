const Booking = require("../../models/booking-models");
const { asynWrapper, getPaginate } = require("../utility/");
const mapSelectBook = require("./mapSelectBook");
const { BookingNotFoundException } = require("../utility/exception");

const handle = async (req, res) => {
  const {
    query: { page, limit }
  } = req;

  let booking = await Booking.find();

  if (!booking) throw new BookingNotFoundException();

  booking = await getPaginate(booking, page, limit);
  booking = await mapSelectBook(booking);
  return res.status(200).json(booking);
};

module.exports = asynWrapper.bind(null, handle);
