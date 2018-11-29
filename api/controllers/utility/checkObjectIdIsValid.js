const mongoose = require("mongoose");

const checkObjectIdIsValid = id => {
  if (mongoose.Types.ObjectId.isValid(id)) {
    return true;
  } else {
    return false;
  }
};

module.exports = checkObjectIdIsValid;
