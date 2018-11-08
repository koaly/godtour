const User = require("../../models/user-models");
const { asynWrapper } = require("../utility/asynWarpper");
const { UserNotFoundException } = require("./exception");

const handle = async (req, res) => {
  /**
   * working must use other component to sucess
   */
};

module.exports = asynWrapper.bind(null, handle);
