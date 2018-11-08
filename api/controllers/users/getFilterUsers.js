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
      user: users.map(u => {
        return u.toProfileJSON();
      })
    };
    resolve(result);
  });
};

const handler = async (req, res) => {
  const {
    payload: { info }
  } = req;

  const { status } = info;
  const querry = await getQueryForStatusUser(info);
  const users = await User.find(querry);

  if (!users || users.length == 0) throw new UserNotFoundException();
  const usersList = await getMapUser(users);

  return res.status(200).json({
    users: usersList
  });
};

module.exports = asynWrapper.bind(null, handler);
