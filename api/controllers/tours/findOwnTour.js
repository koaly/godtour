const Tour = require("../../models/tour-models");
const { TourNotFoundException, NoPermissonAccess } = require("./exception");

const findOwnTour = (userID, userStatus, tourID) => {
  return new Promise((resolve, reject) => {
    Tour.findOne({ _id: tourID })
      .then(tour => {
        if (!tour) reject(new TourNotFoundException());

        if (userStatus === 2 || tour.operatorID === userID) {
          resolve(tour);
        } else {
          reject(new NoPermissonAccess());
        }
      })
      .catch(err => {
        reject(err);
      });
  });
};

module.exports = findOwnTour;
