//use old style function to memorize that is constructor
exports.TourNotFoundException = function(tourname) {
  this.name = "Tour";
  this.status = 404;
  this.message = `Tour ${tourname || "unknown"} is not found in database`;
};

exports.ObjectIdIsNotValidException = function() {
  this.name = "ObjectId";
  this.status = 404;
  this.message = "ObjectId is Not Valid";
};

exports.StatusIsNotVaild = function() {
  this.name = "Status";
  this.message = "Status user is not vaild";
};

exports.NoPermissonAccess = function() {
  this.name = "Status";
  this.message = "No Permission Acess";
};
//user old style function to memorize that is constructor
exports.UserNotFoundException = function(username) {
  this.name = "User";
  this.status = 404;
  this.message = `User ${username || "unknown"} is not found in database`;
};
