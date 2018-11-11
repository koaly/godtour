const Tour = require("../../models/tour-models");
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

  let tour = await Tour.findOne({ _id: id });
  if (!tour) throw new TourNotFoundException();

  res.status(200).json({
    tour
  });
};

module.exports = asynWrapper.bind(null, handle);
