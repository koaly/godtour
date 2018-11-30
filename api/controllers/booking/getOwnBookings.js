const Booking = require("../../models/booking-models");
const { asynWrapper } = require("../utility");
const { BookingNotFoundException } = require("../utility/exception");

const handle = async (req, res) => {
  const {
    payload: {
      info: { id: userID }
    }
  } = req;

  const booking = await Booking.find({ userID });
  if (!booking || booking.length == 0) throw new BookingNotFoundException();

  res.status(200).json({
    count: booking.length,
    booking: booking.map(b => {
      return {
        id: b.id,
        userID: b.userID,
        tourID: b.tourID,
        tourName: b.tourName,
        amountBooking: b.amountBooking,
        bookingDate: b.bookingDate,
        GET: "/api/tours/booking/" + b.id
      };
    })
  });
};

module.exports = asynWrapper.bind(null, handle);
