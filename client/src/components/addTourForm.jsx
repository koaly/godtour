import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { addTour } from "../services/tourService";
import { toast } from "react-toastify";

class AddTourForm extends Form {
  state = {
    data: {
      name: "",
      price: "",
      dest: "",
      dayDuration: "",
      nightDuration: "",
      startBookDate: "",
      startBookTime: "",
      endBookDate: "",
      endBookTime: "",
      departDate: "",
      returnDate: "",
      airline: "",
      seat: "",
      food: "",
      detail: "",
      highlight: "",
      imgsrc: ""
    },
    errors: {}
  };

  schema = {
    name: Joi.string()
      .required()
      .label("Name"),
    price: Joi.number()
      .required()
      .min(0)
      .label("Price"),
    dest: Joi.string()
      .required()
      .label("Destination"),
    dayDuration: Joi.number()
      .integer()
      .required()
      .min(0)
      .label("DayDuration"),
    nightDuration: Joi.number()
      .integer()
      .required()
      .min(0)
      .label("NightDuration"),
    startBookDate: Joi.string()
      .required()
      .label("StartBookDate"),
    startBookTime: Joi.string()
      .required()
      .label("StartBookTime"),
    endBookDate: Joi.string()
      .required()
      .label("EndBookDate"),
    endBookTime: Joi.string()
      .required()
      .label("EndBookTime"),
    departDate: Joi.string()
      .required()
      .label("DepartDate"),
    returnDate: Joi.string()
      .required()
      .label("ReturnDate"),
    airline: Joi.string()
      .required()
      .label("Airline"),
    seat: Joi.number()
      .integer()
      .min(0)
      .required()
      .label("Seat"),
    food: Joi.number()
      .integer()
      .min(0)
      .required()
      .label("Food"),
    detail: Joi.string()
      .required()
      .label("Detail"),
    highlight: Joi.string()
      .required()
      .label("Highlight"),
    imgsrc: Joi.string()
      .required()
      .label("Imgsrc")
  };

  doSubmit = async () => {
    try {
      const response = await addTour(this.state.data);
      console.log(response);
      window.location = "/tours?page=1&limit=3";
      toast.success("Added Success");
    } catch (ex) {
      console.log(ex.response.data);
      if (
        ex.response &&
        ex.response.status >= 400 &&
        ex.response.status < 500
      ) {
        const errorRes = ex.response.data.errors;
        console.log(JSON.stringify(errorRes));
        if (errorRes) {
          errorRes.forEach(error => {
            toast.error(` ${error.param}: ${error.msg}`);
          });
        } else {
          toast.error(`${ex.response.data.message}`);
        }
      }
    }
  };

  render() {
    return (
      <div className="container addtour form-container mgtb">
        <h2>Add Tour</h2>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("name", "Name", "text", "name of tour")}
          {this.renderInput("price", "Price", "number", "price")}
          {this.renderInput("dest", "Destination", "text", "destination")}
          {this.renderInput(
            "dayDuration",
            "Day Duration",
            "text",
            "day duration"
          )}
          {this.renderInput(
            "nightDuration",
            "Night Duration",
            "text",
            "night duration"
          )}
          {this.renderInput(
            "startBookDate",
            "Booking Date",
            "date",
            "booking date"
          )}
          {this.renderInput("startBookTime", "Booking Time", "time", "booking")}
          {this.renderInput(
            "endBookDate",
            "End Booking Date",
            "date",
            "booking date"
          )}
          {this.renderInput(
            "endBookTime",
            "End Booking Time",
            "time",
            "end booking"
          )}
          {this.renderInput(
            "departDate",
            "Departure Date",
            "date",
            "departure date"
          )}
          {this.renderInput("returnDate", "Return Date", "date", "return date")}
          {this.renderInput("airline", "Airline", "text", "airline")}
          {this.renderInput("seat", "Seat", "number", "seat")}
          {this.renderInput("food", "Food", "text", "food")}
          {this.renderTextarea("detail", "Detail", "text", "detail")}
          {this.renderTextarea("highlight", "Highlight", "text", "highlight")}
          {this.renderInput("imgsrc", "Imgsrc", "text", "imgsrc")}
          <div className="mgt" />
          {this.renderButton("Add Tour")}
        </form>
      </div>
    );
  }
}

export default AddTourForm;
