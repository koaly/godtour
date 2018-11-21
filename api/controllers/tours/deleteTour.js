const Tour = require("../../models/tour-models");
const Booking = require("../../models/booking-models");
const { asynWrapper } = require("../utility/");

const {
  TourNotFoundException,
  ObjectIdIsNotValidException
} = require("./exception");

const mongoose = require("mongoose");

const handle = async (req, res) => {
  const {
    query: { id }
  } = req;

  if (!mongoose.Types.ObjectId.isValid(id))
    throw new ObjectIdIsNotValidException();

  const tour = await Tour.findOne({ _id: id });
  if (!tour) throw new TourNotFoundException();

  const bookingResult = await Booking.find({ tourID: id });

  tour.remove();

  console.log(bookingResult);
  bookingResult.forEach(book => {
    book.remove();
  });

  res.status(200).json({
    msg: `remove tour success and ${bookingResult.length} Bookings`,
    name: tour.name,
    bookingCount: bookingResult.length,
    bookings: bookingResult.map(b => {
      return b.id;
    })
  });
};
module.exports = asynWrapper.bind(null, handle);
