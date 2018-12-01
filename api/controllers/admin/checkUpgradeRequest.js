const {
  UserNotFoundException,
  ObjectIdIsNotValidException,
  NoRequestUpgrade
} = require("../utility/exception");
const { checkObjectIdIsValid } = require("../utility/");

const handle = async (req, res, next) => {
  const {
    params: { id }
  } = req;

  if (checkObjectIdIsValid(id)) next(new ObjectIdIsNotValidException());

  const user = await user.findOne({ _id: id });

  if (!user) next(new UserNotFoundException());
  if (!user.upgradeRequest) next(new NoRequestUpgrade());

  return next(null);
};

module.exports = handle;
