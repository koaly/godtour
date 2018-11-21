import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { editTour } from "../services/tourService";
import { toast } from "react-toastify";

class EditTourForm extends Form {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.id,
      token: this.props.token,
      user: this.props.user,
      data: {
        name: "",
        price: "",
        destination: "",
        dayDuration: "",
        nightDuration: "",
        startBookDate: "",
        startBookTime: "",
        departDate: "",
        returnDate: "",
        airline: "",
        maxSeat: "",
        currentSeat: "",
        food: "",
        detail: "",
        highlight: "",
        imgsrc: ""
      },
      errors: {}
    };
  }
  // state = {
  //   data: {
  //     name: "",
  //     price: "",
  //     destination: "",
  //     dayDuration: "",
  //     nightDuration: "",
  //     startBookDate: "",
  //     startBookTime: "",
  //     departDate: "",
  //     returnDate: "",
  //     airline: "",
  //     maxSeat: "",
  //     currentSeat: "",
  //     food: "",
  //     detail: "",
  //     highlight: ""
  //   },
  //   errors: {}
  // };

  schema = {
    name: Joi.string()
      .required()
      .label("Name"),
    price: Joi.number()
      .required()
      .min(0)
      .label("Price"),
    destination: Joi.string()
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
    departDate: Joi.string()
      .required()
      .label("DepartDate"),
    returnDate: Joi.string()
      .required()
      .label("ReturnDate"),
    airline: Joi.string()
      .required()
      .label("Airline"),
    maxSeat: Joi.number()
      .integer()
      .min(0)
      .required()
      .label("Max Seat"),
    currentSeat: Joi.number()
      .integer()
      .min(0)
      .required()
      .label("Current Seat"),
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
      const response = await editTour(this.state);
      console.log(response);
      window.location = "/tours";
      toast.success("Edited Success");
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
    // console.log("Submitted");
    // this.props.history.push("/");
  };

  render() {
    const { tour } = this.props.location.state;
    console.log(tour);
    console.log(this.state);
    console.log(this.state.data);
    return (
      <div className="container addtour form-container mgtb">
        <h2>Edit Tour</h2>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("name", "Name", "text", "firstname", tour.name)}
          {this.renderInput("price", "Price", "number", "price", tour.price)}
          {this.renderInput(
            "destination",
            "Destination",
            "text",
            "destination",
            tour.dest
          )}
          {this.renderInput(
            "dayDuration",
            "Day Duration",
            "text",
            "day duration",
            tour.dayDuration
          )}
          {this.renderInput(
            "nightDuration",
            "Night Duration",
            "text",
            "night duration",
            tour.nightDuration
          )}
          {this.renderInput(
            "startBookDate",
            "Booking Date",
            "date",
            "booking date"
          )}
          {this.renderInput(
            "startBookTime",
            "Booking Time",
            "time",
            "booking time"
          )}
          {this.renderInput(
            "departDate",
            "Departure Date",
            "date",
            "departure date",
            tour.departDate
          )}
          {this.renderInput(
            "returnDate",
            "Return Date",
            "date",
            "departure time",
            tour.returnDate
          )}
          {this.renderInput(
            "airline",
            "Airline",
            "text",
            "airline",
            tour.airline
          )}
          {this.renderInput(
            "maxSeat",
            "Max Seat",
            "number",
            "max seat",
            tour.maxSeat
          )}
          {this.renderInput(
            "currentSeat",
            "Current Seat",
            "number",
            "current seat",
            tour.currentSeat
          )}
          {this.renderInput("food", "Food", "text", "food", tour.food)}
          {this.renderInput(
            "imgsrc",
            "Imgsrc",
            "string",
            "imgsrc",
            tour.imgsrc
          )}
          {this.renderTextarea(
            "detail",
            "Detail",
            "text",
            "detail",
            tour.detail
          )}
          {this.renderTextarea(
            "highlight",
            "Highlight",
            "text",
            "highlight",
            tour.highlight
          )}
          <div className="mgt" />
          {this.renderButton("Confirm Edit")}
        </form>
      </div>
    );
  }
}

export default EditTourForm;
