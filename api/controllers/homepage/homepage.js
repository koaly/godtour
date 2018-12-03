const Tour = require("../../models/tour-models");
const { asynWrapper, checkObjectIdIsValid } = require("../utility");
const {
  Request,
  ObjectIdIsNotValidException,
  TourNotFoundException,
  BookMoreThanCurrentSeat
} = require("../utility/exception");

const randomZTM = max => {
  return Math.floor(Math.random() * max);
};
const remove = (array, index) => {
  return array.splice(index, 1);
};

const handle = async (req, res, next) => {
  let tours = await Tour.find({});

  if (!tours) throw new TourNotFoundException();

  //genearator number index of arrays
  let keys = [];
  for (i = 0; i < tours.length; i++) {
    keys.push(i);
  }
  const show = [];
  let rand = randomZTM(keys.length);
  const indexUse = [];
  let use = 0;
  console.log(keys.length);
  for (i = 0; i < Math.max(5, Math.round(tours.length / 2)); i++) {
    use = remove(keys, rand);
    show.push(tours[use[0]]);
    indexUse.push(use[0]);
    rand = randomZTM(keys.length);
  }
  res.status(200).json({
    count: indexUse.length,
    total: tours.length,
    index: indexUse,
    tours: show
  });
};

module.exports = asynWrapper.bind(null, handle);
