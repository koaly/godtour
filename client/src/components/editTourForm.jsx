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
      tour: this.props.location.state.tour,
      data: {
        name: "",
        price: "",
        destination: "",
        dayDuration: "",
        nightDuration: "",
        startBookDate: "",
        startBookTime: "",
        endBookDate: "",
        endBookTime: "",
        departDate: "",
        returnDate: "",
        airline: "",
        currentSeat: "",
        maxSeat: "",
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
    currentSeat: Joi.number()
      .integer()
      .min(0)
      .required()
      .label("currentSeat"),
    maxSeat: Joi.number()
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
      const response = await editTour(this.state);
      console.log(response);
      window.location = "/tours?page=1&limit=3";
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
  componentDidMount() {
    const { tour } = this.state;

    // this.setState({ data: tour, tour: "" });
    // this.setState({ data: tour, tour: "" });
  }
  render() {
    const { tour, data } = this.state;
    const d = new Date(tour.departDate);
    const dDate = d.getDate();
    const dMonth = d.getMonth() + 1;
    const dYear = d.getFullYear();
    const dHour = d.getHours();
    const dMinute = d.getMinutes();
    const departDate = dYear + "-" + dMonth + "-" + dDate;
    const bookingTime = dHour + ":" + dMinute;
    const b = new Date(tour.endBooking);
    const bDate = b.getDate();
    const bMonth = b.getMonth() + 1;
    const bYear = b.getFullYear();
    const bHour = b.getHours();
    const bMinute = b.getMinutes();
    console.log(dHour);
    console.log(dMinute);
    console.log(departDate);
    console.log(tour);
    console.log(data);
    console.log(tour);
    // if (!tour) return null;

    console.log(this.state);
    console.log(this.state.data);
    console.log(data.departDate);
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
            "booking time",
            data.bookingTime
          )}
          {this.renderInput(
            "endBookDate",
            "End Booking Date",
            "date",
            "end booking date"
          )}
          {this.renderInput(
            "endBookTime",
            "End Booking Time",
            "time",
            "end booking time"
          )}
          {this.renderInput(
            "departDate",
            "Departure Date",
            "date",
            "departure date",
            data.departDate
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
            "currentSeat",
            "Current Seat",
            "number",
            "current seat",
            tour.currentSeat
          )}
          {this.renderInput(
            "maxSeat",
            "Max Seat",
            "number",
            "max seat",
            tour.maxSeat
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
