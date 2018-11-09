const User = require("../../models/user-models");
const { asynWrapper } = require("../utility/asynWarpper");
const { UserNotFoundException, StatusIsNotVaild } = require("./exception");

const getQueryForStatusUser = status => {
  return new Promise((resolve, reject) => {
    switch (status) {
      case 2:
        resolve({});
      case 1:
        resolve({ $or: [{ status: 0 }, { status: 1 }] });
      case 0:
        resolve({ status: 1 });
      default:
        reject(new StatusIsNotVaild());
    }
  });
};
const getMapUser = users => {
  return new Promise((resolve, reject) => {
    const result = {
      count: users.length,
      users: users.map(u => {
        return u.toProfileJSON();
      })
    };
    resolve(result);
  });
};
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

const handler = async (req, res) => {
  //req.query.page from url browse/?page=3
  //both from url browse/?page=3&limit=5

  const {
    payload: { info },
    query: { page, limit }
  } = req;

  const { status } = info;
  const querry = await getQueryForStatusUser(status);
  let users = await User.find(querry);
  if (!users || users.length == 0) throw new UserNotFoundException();

  users = await getPaginate(users, page, limit);
  const usersList = await getMapUser(users);

  return res.status(200).json(usersList);
};

module.exports = asynWrapper.bind(null, handler);
