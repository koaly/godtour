/**
 * promise function that filter paginate of array object return with promise
 * @param {Array} users users arrays of total object
 * @param {Int32Array} page pages index
 * @param {Int32Array} limit limit of page index
 * @return {Promise}
 */
const getPaginate = (obj, page = 1, limit = 5) => {
  //array can init with const and assign with address of that array
  return new Promise((resolve, reject) => {
    const objList = [];

    const start = (page - 1) * limit;
    const final = Math.min(obj.length, limit * page);
    for (let i = start; i < final; i++) {
      objList.push(obj[i]);
    }
    resolve(objList);
  });
};

module.exports = getPaginate;
