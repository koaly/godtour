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
