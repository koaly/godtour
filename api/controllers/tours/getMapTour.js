/**
 * function maping array of tours return to promise
 * @param {Array} tours tourslist
 * @return {Promise} tourslist mapping list
 */

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

module.exports = getMapTour;
