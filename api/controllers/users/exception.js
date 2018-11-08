//user old style function to memorize that is constructor
exports.UserNotFoundException = function(username) {
  this.name = "User";
  this.status = 404;
  this.message = `User ${username || "unknown"} is not found in database`;
};
exports.StatusIsNotVaild = function() {
  this.name = "Status";
  this.message = "Status user is not vaild";
};
