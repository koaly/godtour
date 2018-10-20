import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";

class RegisterForm extends Form {
  state = {
    data: {
      firstname: "",
      lastname: "",
      username: "",
      email: "",
      password: ""
    },
    gender: [{ _id: "1", name: "male" }, { _id: "2", name: "female" }],
    errors: {}
  };

  schema = {
    firstname: Joi.string()
      .required()
      .label("Firstname"),
    lastname: Joi.string()
      .required()
      .label("Lastname"),
    username: Joi.string()
      .required()
      .label("Username"),
    email: Joi.string()
      .required()
      .email()
      .label("Email"),
    password: Joi.string()
      .required()
      .min(5)
      .label("Password"),
    gender: Joi.string()
      .required()
      .label("Gender")
  };

  doSubmit = () => {
    console.log("Submitted");
    this.props.history.push("/");
  };

  render() {
    return (
      <div className="container register">
        <h1>Register</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("firstname", "Firstname")}
          {this.renderInput("lastname", "Lastname")}
          {this.renderInput("username", "Username")}
          {this.renderInput("email", "Email")}
          {this.renderInput("password", "Password", "password")}
          {this.renderSelect("gender", "Gender", this.state.gender)}
          {this.renderButton("Register")}
        </form>
      </div>
    );
  }
}

export default RegisterForm;
