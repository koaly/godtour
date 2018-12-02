/**
 *  if we use ES6 it can't import my class
 */

/**
 * function that can handling more error with some status
 * @param {response} res
 * @param {error} e
 */
exports.HandingErorr = function(res, e) {
  if (e.status) {
    console.log(`${e.name}(${e.status}):${e.message}`);
    return res.status(e.status).json({
      error: {
        message: e.message.toString()
      }
    });
  }
  console.log(`${e.name}:${e.message}`);
  res.status(500).json({
    error: {
      message: e.message.toString()
    }
  });
};
exports.Exception = function(name, status, message) {
  this.name = name;
  this.status = status;
  this.message = message;
};

exports.NotFoundException = function(obj) {
  this.name = "errors";
  this.status = 404;
  this.message = `${obj} is not found`;
};
exports.UserNotFoundException = function() {
  this.name = "errors";
  this.status = 404;
  this.message = "User is not found";
};
exports.EmailAlreadyExits = function() {
  this.name = "errors";
  this.status = 409;
  this.message = "Email or Username is already exits";
};
exports.TourNotFoundException = function() {
  this.name = "errors";
  this.status = 404;
  this.message = "Tour is not found";
};
exports.TiyNotFoundException = function() {
  this.name = "errors";
  this.status = 404;
  this.message = "Tour it youself is not found";
};

exports.BookNotFoundException = function() {
  this.name = "errors";
  this.status = 404;
  this.message = "Book is not found";
};
exports.OfferNotFoundException = function() {
  this.name = "errors";
  this.status = 404;
  this.message = "Offer is not found";
};
