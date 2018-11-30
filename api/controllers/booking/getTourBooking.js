const Booking = require("../../models/booking-models");
const { asynWrapper } = require("../utility");
const { BookingNotFoundException } = require("../utility/exception");

const handle = async (req, res) => {
  const {
    params: { id }
  } = req;
  //wait a sec
};

module.exports = asynWrapper.bind(null, handle);
