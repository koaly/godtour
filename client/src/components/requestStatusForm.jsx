import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import { toast } from "react-toastify";
import { requestStatus } from "../services/requestStatusService";

class RequestStatusForm extends Form {
  state = {
    data: { reasonToUpgrade: "" },
    errors: {}
  };

  schema = {
    reasonToUpgrade: Joi.string()
      .required()
      .label("ReasonToUpgrade")
  };
  doSubmit = async () => {
    try {
      const response = await requestStatus(this.state.data);
      console.log(response);
      window.location = "/";
      toast.success("Success");
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
      <div className="container form-container mgtb">
        <h2 className="mt-2">Upgrade Status Request</h2>
        <form onSubmit={this.handleSubmit}>
          {this.renderTextarea(
            "reasonToUpgrade",
            "ReasonToUpgrade",
            "text",
            "give me a good reason bro"
          )}
          <div className="mgt" />
          {this.renderButton("Please upgrade my status")}
        </form>
      </div>
    );
  }
}

export default RequestStatusForm;
