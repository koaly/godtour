import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import Form from "./common/form";
import Joi from "joi-browser";
import auth from "../services/authService";
import { toast } from "react-toastify";

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

  doSubmit = async () => {
    try {
      const { data } = this.state;
      await auth.login(data.email, data.password);
	  let redirectLink = sessionStorage.getItem("tourLastLink");
	  if( redirectLink === null){
		window.location = "/";
	  }
	  else{
		window.location = redirectLink;
	  }
    } catch (ex) {
      if (
        ex.response &&
        ex.response.status >= 400 &&
        ex.response.status < 500
      ) {
        toast.error("Invalid email or password");
      }
    }
  };
  render() {
    return (
      <li className="dropdown nav-item space">
        <NavLink
          className="nav-link dropdown-toggle"
          to="/login"
          data-toggle="dropdown"
          style={{fontSize:20}}
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
                  {this.renderInput("email", "Email", "email", "email")}
                  {this.renderInput(
                    "password",
                    "Password",
                    "password",
                    "password"
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
