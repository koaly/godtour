const Tour = require("../../models/tour-models");
const { asynWrapper, getPaginate } = require("../utility/");
const { TourNotFoundException } = require("./exception");
const getMapTour = require("./getMapTour");

const handle = async (req, res) => {
  const {
    query: { page, limit }
  } = req;

  let tours = await Tour.find();

  if (!tours || tours.length == 0) throw new TourNotFoundException();

  tours = await getPaginate(tours, page, limit);
  tours = await getMapTour(tours);

  return res.status(200).json(tours);
};

module.exports = asynWrapper.bind(null, handle);
