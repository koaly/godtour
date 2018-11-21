const Tour = require("../../models/tour-models");
const { asynWrapper } = require("../utility/");

toDate = (dateStr, timeStr) => {
  return new Date(dateStr + " " + timeStr);
};

const handle = async (req, res) => {
  const {
    payload: {
      info: { id: userId, status: userStatus }
    },
    body: {
      name: tourName,
      price,
      dest,
      dayDuration,
      nightDuration,
      startBookDate,
      startBookTime,
      endBookDate,
      endBookTime,
      departDate,
      returnDate,
      airline,
      seat,
      food,
      detail,
      highlight,
      imgsrc,
      alternateImgsrc
    },
    query: { id: tourID }
  } = req;

  const tour = await Tour.findByOwnOneTour(userId, userStatus, tourID);
  res.status(200).json(tour);
};

module.exports = asynWrapper.bind(null, handle);
