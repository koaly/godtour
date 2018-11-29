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
        booking: b.toBookingJSON(),
        GET: "https:/api/users/" + b.id
      };
    })
  });
};

module.exports = asynWrapper.bind(null, handle);
