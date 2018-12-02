import React from "react";
import Joi from "joi-browser";
import Form from "../common/form";
import { toast } from "react-toastify";
import { editOwnTiy } from "../../services/tiyService";

class EditTiyForm extends Form {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.id,
      token: this.props.token,
      user: this.props.user,
      tiys: this.props.location.state.tiys,
      data: {
        dest: this.props.location.state.tiys.dest,
        detail: this.props.location.state.tiys.detail,
        endFreeDate: "",
        food: this.props.location.state.tiys.food,
        highlight: this.props.location.state.tiys.highlight,
        maxDuration: this.props.location.state.tiys.maxDuration,
        maxMember: this.props.location.state.tiys.maxMember,
        maxPrice: this.props.location.state.tiys.maxPrice,
        minDuration: this.props.location.state.tiys.minDuration,
        minMember: this.props.location.state.tiys.minMember,
        minPrice: this.props.location.state.tiys.minPrice,
        name: this.props.location.state.tiys.name,
        startFreeDate: ""
      },
      errors: {}
    };
  }
  schema = {
    name: Joi.string()
      .required()
      .label("Name"),
    dest: Joi.string()
      .required()
      .label("Destination"),
    minPrice: Joi.number()
      .required()
      .min(0)
      .label("Min Price"),
    maxPrice: Joi.number()
      .required()
      .min(0)
      .label("Max Price"),
    minDuration: Joi.number()
      .integer()
      .required()
      .min(0)
      .label("Min Duration"),
    maxDuration: Joi.number()
      .integer()
      .required()
      .min(0)
      .label("Max Duration"),
    minMember: Joi.number()
      .integer()
      .min(0)
      .required()
      .label("Min Member"),
    maxMember: Joi.number()
      .integer()
      .min(0)
      .required()
      .label("Max Member"),
    startFreeDate: Joi.string()
      .required()
      .label("Start Date"),
    endFreeDate: Joi.string()
      .required()
      .label("End Date"),
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
      const response = await editOwnTiy(this.state);
      console.log(response);
      window.location = "/profile/myTiy";
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
    const { tiys } = this.state;
    // let data = { ...this.state.data };
    const s = new Date(tiys.startFreeDate);
    const sDate = s.getDate();
    const sMonth = s.getMonth() + 1;
    const sYear = s.getFullYear();
    let getStartFreeDate =
      sMonth >= 10 ? sYear + "-" + sMonth : sYear + "-0" + sMonth;
    getStartFreeDate += sDate >= 10 ? "-" + sDate : "-0" + sDate;
    console.log(getStartFreeDate);
    const e = new Date(tiys.endFreeDate);
    const eDate = e.getDate();
    const eMonth = e.getMonth() + 1;
    const eYear = e.getFullYear();
    let getEndFreeDate =
      eMonth >= 10 ? eYear + "-" + eMonth : eYear + "-0" + eMonth;
    getEndFreeDate += eDate >= 10 ? "-" + eDate : "-0" + eDate;
    this.setState(prevState => ({
      data: {
        ...prevState.data,
        startFreeDate: getStartFreeDate,
        endFreeDate: getEndFreeDate
      }
    }));
  }
  render() {
    return (
      <div className="container addtour form-container mgtb">
        <h2>Edit Tour</h2>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("name", "Name", "text", "firstname")}
          {this.renderInput("dest", "Destination", "text", "destination")}
          {this.renderInput("minPrice", "Min Price", "number", "min price")}
          {this.renderInput("maxPrice", "Max Price", "number", "max price")}
          {this.renderInput("minMember", "Min Member", "number", "min member")}
          {this.renderInput("maxMember", "Max Member", "number", "max member")}
          {this.renderInput(
            "minDuration",
            "Min Duration",
            "number",
            "min duration"
          )}
          {this.renderInput(
            "maxDuration",
            "Max Duration",
            "number",
            "max duration"
          )}
          {this.renderInput(
            "startFreeDate",
            "Start Date",
            "date",
            "start date"
          )}
          {this.renderInput("endFreeDate", "End Date", "date", "end date")}
          {this.renderInput("food", "Food", "text", "food")}
          {this.renderTextarea("detail", "Detail", "text", "detail")}
          {this.renderTextarea("highlight", "Highlight", "text", "highlight")}

          <div className="mgt" />
          {this.renderButton("Confirm Edit")}
        </form>
      </div>
    );
  }
}

export default EditTiyForm;
