const User = require("../../models/user-models");
const { asynWrapper } = require("../utility/");

const { UserNotFoundException, Exception } = require("../utility/exception");

const mongoose = require("mongoose");

handle = async (req, res) => {
  const {
    payload: {
      info: { id: userID, status }
    },
    body: { displayName, imgsrc, gender, upgradeRequest, upgradeReason },
    query: { username: username }
  } = req;

  //need jwt blacklist to refesh token and cann't no use expire token
  //make me think it dificult T^T
  const user = await User.findByOwnUser(userID, status, username);
  
  console.log(user);
  if (!user) throw new UserNotFoundException(username);
  console.log(upgradeRequest);
  const editUser = {
    displayName: displayName || user.displayName,
    imgsrc: imgsrc || user.imgsrc,
    gender: gender || user.gender,
    upgradeReason: upgradeReason || user.upgradeReason,
    upgradeRequest: upgradeRequest
  };
  console.log(editUser);
  const result = await User.update({ _id: user.id }, editUser);
  if (result) {
    res.status(200).json({
      msg: "success edit user",
    });
  } else throw new Exception();
};

module.exports = asynWrapper.bind(null, handle);
