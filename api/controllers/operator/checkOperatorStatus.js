const { NoPermissonAccess } = require("../utility/exception");

const handle = async (req, res, next) => {
  const {
    payload: {
      info: { status }
    }
  } = req;

  switch (status) {
    case 2:
    case 1:
      return next(null);
    default:
      return next(new NoPermissonAccess());
  }
};

module.exports = handle;
