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
    gender: [{ _id: "1", name: "Male" }, { _id: "2", name: "Female" }],
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
      <div>
        <div className="container register form-container mgtb">
          <h2>Register</h2>
          <form onSubmit={this.handleSubmit}>
            {this.renderInput("firstname", "Firstname","text","firstname")}
            {this.renderInput("lastname", "Lastname","text","lastname")}
            {this.renderInput("username", "Username","text","username")}
            {this.renderInput("email", "Email","email","to-urworld@gmail.com")}
            {this.renderInput("password", "Password", "password", "password")}
            {this.renderSelect("gender", "Gender", this.state.gender)}
            <div className="mgt"></div>
            {this.renderButton("Register")}
          </form>
        </div>
      </div>
    );
  }
}

export default RegisterForm;
