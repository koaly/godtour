const Tour = require("../../models/tour-models");
const { asynWrapper } = require("../utility/asynWarpper");
const { TourNotFoundException } = require("./exception");

const getMapTour = tours => {
  return new Promise((resolve, reject) => {
    const result = {
      count: tours.length,
      tours: tours.map(t => {
        return t.toProfileJSON();
      })
    };
    resolve(result);
  });
};

const handle = async (req, res) => {
  const tours = await Tour.find();

  if (!tours || tours.length == 0) throw new TourNotFoundException();
  const toursList = await getMapTour(tours);

  return res.status(200).json(toursList);
};

module.exports = asynWrapper.bind(null, handle);
