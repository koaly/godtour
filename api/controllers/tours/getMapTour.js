/**
 * function maping array of tours return to promise
 * @param {Array} tours tourslist
 * @return {Promise} tourslist mapping list
 */

const getMapTour = (tours, total, page, limit) => {
  return new Promise((resolve, reject) => {
    const result = {
      count: tours.length,
      total: total,
      next: page * limit < total ? true : false,
      tours: tours.map(t => {
        if (t) return t.toProfileJSON();
      })
    };
    resolve(result);
  });
};

module.exports = getMapTour;
