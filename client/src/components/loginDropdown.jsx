import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import Form from "./common/form";
import Joi from "joi-browser";

class LoginDropdown extends (Component, Form) {
  state = {
    data: { email: "", password: "" },
    errors: {}
  };

  schema = {
    email: Joi.string()
      .required()
      .email()
      .label("Email"),
    password: Joi.string()
      .required()
      .label("Password")
  };

  doSubmit = () => {
    console.log("Submitted");
  };
  render() {
    return (
      <li className="dropdown nav-item space">
        <NavLink
          className="nav-link dropdown-toggle"
          to="/login"
          data-toggle="dropdown"
        >
          Login
        </NavLink>
        <ul id="login-dp" className=" dropdown-menu dropdown-menu-right">
          <li>
            <div className="row">
              <div className="col-md-12">
                Login With
                <div className="social-buttons">
                  <a href="#">
                    <button className="btn btn-block btn-google">
                      <i className="fa fa-google">Google</i>
                    </button>
                  </a>
                </div>
                or
                <form onSubmit={this.handleSubmit}>
                  {this.renderInput("email", "Email", "", "Email Address")}
                  {this.renderInput(
                    "password",
                    "Password",
                    "password",
                    "Password"
                  )}
                  {this.renderButton("Login")}
                </form>
              </div>
            </div>
            <div className="bottom text-center">
              New here ?<Link to="/register">Register</Link>
            </div>
          </li>
        </ul>
      </li>
    );
  }
}

export default LoginDropdown;
