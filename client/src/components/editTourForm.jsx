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
        name: this.props.location.state.tour.name,
        price: this.props.location.state.tour.price,
        destination: this.props.location.state.tour.dest,
        dayDuration: this.props.location.state.tour.dayDuration,
        nightDuration: this.props.location.state.tour.nightDuration,
        startBookDate: "",
        startBookTime: "",
        endBookDate: "",
        endBookTime: "",
        departDate: "",
        returnDate: "",
        airline: this.props.location.state.tour.airline,
        currentSeat: this.props.location.state.tour.currentSeat,
        maxSeat: this.props.location.state.tour.maxSeat,
        food: this.props.location.state.tour.food,
        detail: this.props.location.state.tour.detail,
        highlight: this.props.location.state.tour.highlight,
        imgsrc: this.props.location.state.tour.imgsrc
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
    // let data = { ...this.state.data };
    const d = new Date(tour.departDate);
    const dDate = d.getDate();
    const dMonth = d.getMonth() + 1;
    const dYear = d.getFullYear();
    let getDepartDate =
      dMonth >= 10 ? dYear + "-" + dMonth : dYear + "-0" + dMonth;
    getDepartDate += dDate >= 10 ? "-" + dDate : "-0" + dDate;
    const startBook = new Date(tour.startBooking);
    const sDate = startBook.getDate();
    const sMonth = startBook.getMonth() + 1;
    const sYear = startBook.getFullYear();
    const sHour = startBook.getHours();
    const sMinute = startBook.getMinutes();
    let getStartBookDate =
      sMonth >= 10 ? sYear + "-" + sMonth : sYear + "-0" + sMonth;
    getStartBookDate += sDate >= 10 ? "-" + sDate : "-0" + sDate;
    let getStartBookTime = sHour >= 10 ? sHour + ":" : "0" + sHour + ":";
    getStartBookTime += sMinute >= 10 ? sMinute : "0" + sMinute;
    const endBook = new Date(tour.endBooking);
    const eDate = endBook.getDate();
    const eMonth = endBook.getMonth() + 1;
    const eYear = endBook.getFullYear();
    const eHour = endBook.getHours();
    const eMinute = endBook.getMinutes();
    let getEndBookDate =
      eMonth >= 10 ? eYear + "-" + eMonth : eYear + "-0" + eMonth;
    getEndBookDate += eDate >= 10 ? "-" + eDate : "-0" + eDate;
    let getEndBookTime = eHour >= 10 ? eHour + ":" : "0" + eHour + ":";
    getEndBookTime += eMinute >= 10 ? eMinute : "0" + eMinute;
    const returnD = new Date(tour.returnDate);
    const rDate = returnD.getDate();
    const rMonth = returnD.getMonth() + 1;
    const rYear = returnD.getFullYear();
    let getReturnDate =
      rMonth >= 10 ? rYear + "-" + rMonth : rYear + "-0" + rMonth;
    getReturnDate += rDate >= 10 ? "-" + rDate : "-0" + rDate;

    // data.departDate = getDepartDate;
    // this.setState({ data });
    this.setState(prevState => ({
      data: {
        ...prevState.data,
        departDate: getDepartDate,
        startBookDate: getStartBookDate,
        startBookTime: getStartBookTime,
        endBookDate: getEndBookDate,
        endBookTime: getEndBookTime,
        returnDate: getReturnDate
      }
    }));
  }
  render() {
    // const bookingTime = dHour + ":" + dMinute;
    // const b = new Date(tour.endBooking);
    // const bDate = b.getDate();
    // const bMonth = b.getMonth() + 1;
    // const bYear = b.getFullYear();
    // const bHour = b.getHours();
    // const bMinute = b.getMinutes();
    // console.log(dHour);
    // console.log(dMinute);
    // console.log(departDate);
    // console.log(tour);
    // console.log(data);
    // console.log(tour);
    // if (!tour) return null;

    console.log(this.state);
    console.log(this.state.data);
    console.log(this.state.tour);
    // console.log(data.departDate);
    return (
      <div className="container addtour form-container mgtb">
        <h2>Edit Tour</h2>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("name", "Name", "text", "firstname")}
          {this.renderInput("price", "Price", "number", "price")}
          {this.renderInput(
            "destination",
            "Destination",
            "text",
            "destination"
          )}
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
          {this.renderInput(
            "startBookTime",
            "Booking Time",
            "time",
            "booking time"
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
            "departure date"
          )}
          {this.renderInput(
            "returnDate",
            "Return Date",
            "date",
            "departure time"
          )}
          {this.renderInput("airline", "Airline", "text", "airline")}
          {this.renderInput(
            "currentSeat",
            "Current Seat",
            "number",
            "current seat"
          )}
          {this.renderInput("maxSeat", "Max Seat", "number", "max seat")}
          {this.renderInput("food", "Food", "text", "food")}
          {this.renderInput("imgsrc", "Imgsrc", "string", "imgsrc")}
          {this.renderTextarea("detail", "Detail", "text", "detail")}
          {this.renderTextarea("highlight", "Highlight", "text", "highlight")}
          <div className="mgt" />
          {this.renderButton("Confirm Edit")}
        </form>
      </div>
    );
  }
}

export default EditTourForm;
