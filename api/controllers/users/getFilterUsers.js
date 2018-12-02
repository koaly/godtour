const User = require("../../models/user-models");
const { asynWrapper, getPaginate } = require("../utility/");
const {
  UserNotFoundException,
  StatusIsNotVaild
} = require("../utility/exception");

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

const handler = async (req, res) => {
  //req.query.page from url browse/?page=3
  //both from url browse/?page=3&limit=5

  const {
    payload: {
      info: { status }
    },
    query: { page, limit }
  } = req;

  //select status for querry
  const querry = await getQueryForStatusUser(status);

  let users = await User.find(querry);
  if (!users || users.length == 0) throw new UserNotFoundException();

  users = await getPaginate(users, page, limit);
  users = await getMapUser(users);

  return res.status(200).json(users);
};

module.exports = asynWrapper.bind(null, handler);
