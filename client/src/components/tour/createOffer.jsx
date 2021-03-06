import React from "react";
import Joi from "joi-browser";
import Form from "../common/form";
import { offerTiy } from "../../services/tiyService";
import { toast } from "react-toastify";

class CreateOffer extends Form {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.id,
      token: this.props.token,
      user: this.props.user,
      data: {
        name: "",
        price: "",
        dest: "",
        dayDuration: "",
        nightDuration: "",
        departDate: "",
        returnDate: "",
        airline: "",
        member: "",
        food: "",
        detail: "",
        highlight: ""
      },
      errors: {}
    };
  }

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
    departDate: Joi.string()
      .required()
      .label("DepartDate"),
    returnDate: Joi.string()
      .required()
      .label("ReturnDate"),
    airline: Joi.string()
      .required()
      .label("Airline"),
    member: Joi.number()
      .integer()
      .min(0)
      .required()
      .label("Member"),
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

  doSubmit = async () => {
    try {
      const response = await offerTiy(this.state);
      console.log(response);
      window.location = "/profile/myOffer";
      toast.success("Create Offer Success");
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
    console.log(this.props.location.state);
    const {
      dest,
      detail,
      endFreeDate,
      food,
      highlight,
      maxDuration,
      maxMember,
      maxPrice,
      minDuration,
      minMember,
      minPrice,
      name,
      startFreeDate
    } = this.props.location.state.tiys;
    const deDate = new Date(startFreeDate);
    console.log(deDate);
    const dDate = deDate.getDate();
    const dMonth = deDate.getMonth() + 1;
    const dYear = deDate.getFullYear();
    let getStartBookDate = dMonth + "/" + dDate + "/" + dYear;
    console.log(getStartBookDate);
    const reDate = new Date(endFreeDate);
    console.log(endFreeDate);
    const rDate = reDate.getDate();
    console.log(rDate);
    const rMonth = reDate.getMonth() + 1;
    console.log(rMonth);
    const rYear = reDate.getFullYear();
    console.log(rYear);
    let getReturnBookDate = rMonth + "/" + rDate + "/" + rYear;
    console.log(getReturnBookDate);

    console.log(dest);
    return (
      <div className="container addtour form-container mgtb">
        <h2>Create Offer</h2>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("name", "Name", "text", name)}
          {this.renderInput(
            "price",
            "Price",
            "number",
            minPrice + "-" + maxPrice
          )}
          {this.renderInput("dest", "Destination", "text", dest)}
          {this.renderInput(
            "dayDuration",
            "Day Duration",
            "text",
            minDuration + "-" + maxDuration + " days"
          )}
          {this.renderInput(
            "nightDuration",
            "Night Duration",
            "text",
            minDuration + "-" + maxDuration + " days"
          )}
          {this.renderInput(
            "departDate",
            "Departure Date " + getStartBookDate + " to " + getReturnBookDate,
            "date",
            "",
            getStartBookDate + " to " + getReturnBookDate
          )}
          {this.renderInput(
            "returnDate",
            "Return Date " + getStartBookDate + " to " + getReturnBookDate,
            "date",
            "",
            getStartBookDate + " to " + getReturnBookDate
          )}
          {this.renderInput("airline", "Airline", "text", "airline")}
          {this.renderInput(
            "member",
            "Member",
            "number",
            minMember + "-" + maxMember
          )}
          {this.renderInput("food", "Food", "text", food)}
          {this.renderTextarea("detail", "Detail", "text", detail)}
          {this.renderTextarea("highlight", "Highlight", "text", highlight)}
          <div className="mgt" />
          {this.renderButton("Offer tour")}
        </form>
      </div>
    );
  }
}

export default CreateOffer;
