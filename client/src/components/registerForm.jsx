import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { toast } from "react-toastify";
import * as userService from "../services/userService";

class RegisterForm extends Form {
  state = {
    data: {
      email: "",
      password: "",
      username: "",
      displayName: "",
      imgsrc: "",
      gender: ""
    },
    genderOption: [
      { _id: "male", name: "male" },
      { _id: "female", name: "female" }
    ],
    errors: {}
  };

  schema = {
    email: Joi.string()
      .required()
      .email()
      .label("Email"),
    password: Joi.string()
      .required()
      .min(5)
      .label("Password"),
    username: Joi.string()
      .required()
      .label("Username"),
    displayName: Joi.string()
      .required()
      .label("DisplayName"),
    imgsrc: Joi.string()
      .required()
      .label("Imgsrc"),
    gender: Joi.string()
      .required()
      .label("Gender")
  };

  doSubmit = async () => {
    try {
      const response = await userService.register(this.state.data);
      console.log(response);
      window.location = "/";
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
      <div className="container">
        <div className="register form-container mgtb ">
          <div className="row">
            <div className="register-leftside d-md-flex flex-column d-none " />
            <div className="register-rightside">
              <h2>Register</h2>
              <form onSubmit={this.handleSubmit}>
                {this.renderInput("email", "Email", "email", "email")}
                {this.renderInput(
                  "password",
                  "Password",
                  "password",
                  "password"
                )}
                {this.renderInput("username", "Username", "text", "username")}
                {this.renderInput(
                  "displayName",
                  "DisplayName",
                  "text",
                  "displayname"
                )}
                {this.renderInput("imgsrc", "Imgsrc", "text", "imgsrc")}
                {this.renderSelect("gender", "Gender", this.state.genderOption)}
                <div className="mgt" />
                {this.renderButton("Register")}
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default RegisterForm;
