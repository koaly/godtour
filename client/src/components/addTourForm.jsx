import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";

class AddTourForm extends Form {
  state = {
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
      seat: "",
      food: "",
      detail: "",
      highlight: ""
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
      .label("Highlight")
  };

  doSubmit = () => {
    console.log("Submitted");
    this.props.history.push("/");
  };

  render() {
    return (
      <div className="container addtour form-container mgtb">
        <h2>Add Tour</h2>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("name", "Name")}
          {this.renderInput("price", "Price")}
          {this.renderInput("destination", "Destination")}
          {this.renderInput("dayDuration", "DayDuration")}
          {this.renderInput("nightDuration", "NightDuration")}
          {this.renderInput("startBookDate", "StartBookDate", "date")}
          {this.renderInput("startBookTime", "StartBookTime", "time")}
          {this.renderInput("departDate", "DepartDate", "date")}
          {this.renderInput("returnDate", "ReturnDate", "date")}
          {this.renderInput("airline", "Airline")}
          {this.renderInput("seat", "Seat")}
          {this.renderInput("food", "Food")}
          {this.renderInput("detail", "Detail")}
          {this.renderInput("highlight", "Highlight")}
          <div className="mgt"></div>
          {this.renderButton("Add Tour")}
        </form>
      </div>
    );
  }
}

export default AddTourForm;
