const mongoose = require("mongoose");

const tourSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: {
    type: String,
    required: true
  },
  operatorID: {
    type: String,
    required: true
  },
  operatorName: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  dest: {
    type: String,
    required: true
  },
  destCounty: {
    type: String
  },
  dayDuration: {
    type: Number,
    required: true
  },
  nightDuration: {
    type: Number,
    required: true
  },
  startBooking: {
    type: Date,
    required: true
  },
  endBooking: {
    type: Date,
    required: true
  },
  departDate: {
    type: Date,
    required: true
  },
  returnDate: {
    type: Date,
    required: true
  },
  airline: {
    type: String,
    required: true
  },
  maxSeat: {
    type: Number,
    required: true
  },
  currentSeat: {
    type: Number,
    required: true
  },
  rating: {
    type: Number,
    default: 0,
    required: true
  },
  ratingCount: {
    type: Number,
    default: 0,
    required: true
  },
  food: {
    type: Number,
    defalut: 0
  },
  detail: {
    type: String
  },
  highlight: {
    type: String
  },
  imgsrc: {
    type: String
  },
  alternateImgsrc: {
    type: String
  }
});

tourSchema.methods.toInformationJSON = function() {
  return {
    imgsrc: this.imgsrc,
    alternateImgsrc: this.alternateImgsrc,
    price: this.price,
    remainingSeat: this.currentSeat,
    maxSeat: this.maxSeat,
    destination: this.dest,
    dayDuration: this.dayDuration,
    nightDuration: this.nightDuration,
    startBooking: this.startBooking,
    endBooking: this.endBooking,
    departDate: this.departDate,
    returnDate: this.returnDate,
    airline: this.airline,
    rating: this.rating,
    ratingCount: this.ratingCount,
    food: this.food,
    detail: this.detail,
    highlight: this.highlight
  };
};
tourSchema.methods.toProfileJSON = function() {
  return {
    id: this._id,
    name: this.name,
    operatorID: this.operatorID,
    operatorName: this.operatorName,
    info: this.toInformationJSON(),
    GET: `/api/tours?id=${this._id}`
  };
};
module.exports = mongoose.model("Tour", tourSchema);
