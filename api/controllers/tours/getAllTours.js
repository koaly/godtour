const Tour = require("../../models/tour-models");
const { asynWrapper, getPaginate } = require("../utility/");
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
