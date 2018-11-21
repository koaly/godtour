const Tour = require("../../models/tour-models");
const { asynWrapper } = require("../utility/");

const {
  TourNotFoundException,
  ObjectIdIsNotValidException
} = require("./exception");

const mongoose = require("mongoose");

const handle = async (req, res) => {
  const {
    payload: {
      info: { id: userID, status: userStatus }
    },
    query: { id: tourID }
  } = req;

  if (!mongoose.Types.ObjectId.isValid(tourID))
    throw new ObjectIdIsNotValidException();

  let tour = await Tour.findByOwnOneTour(userID, userStatus, tourID);
  if (!tour) throw new TourNotFoundException();

  res.status(200).json({
    tour
  });
};

module.exports = asynWrapper.bind(null, handle);
