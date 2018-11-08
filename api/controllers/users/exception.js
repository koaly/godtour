//user old style function to memorize that is constructor
exports.UserNotFoundException = function() {
  this.name = "User";
  this.status = 404;
  this.message = "User is not found in database";
};

exports.StatusIsNotVaild = function() {
  this.name = "Status";
  this.message = "Status user is not vaild";
};
