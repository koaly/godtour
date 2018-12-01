const Booking = require("../../models/booking-models");
const Tour = require("../../models/tour-models");
const { asynWrapper, checkObjectIdIsValid } = require("../utility");
const {
  Request,
  ObjectIdIsNotValidException,
  TourNotFoundException,
  BookingNotFoundException
} = require("../utility/exception");

const handle = async (req, res) => {
  const {
    payload: {},
    params: { id: bookingId }
  } = req;

  if (!bookingId) throw new Request("Id");
  if (!checkObjectIdIsValid(bookingId)) throw new ObjectIdIsNotValidException();

  const booking = await Booking.findOne({ _id: bookingId });

  if (!booking) throw new BookingNotFoundException();

  console.log(booking);
  const tour = await Tour.findOne({ _id: booking.tourID });
  console.log(booking.tourID);
  if (!tour) throw new TourNotFoundException();

  tour.currentSeat += booking.amountBooking;

  const bookingResult = await booking.remove();
  const tourResult = await tour.save();

  res.status(200).json({
    msg: "success remove booking",
    id: booking._id,
    tourId: booking.tourID,
    userId: booking.userID,
    currentSeat: tour.currentSeat
  });
};

module.exports = asynWrapper.bind(null, handle);
