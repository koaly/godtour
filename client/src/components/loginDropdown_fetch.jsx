import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import Form from "./common/form";
import Joi from "joi-browser";
import { login } from "../services/authService";
import { toast } from "react-toastify";
import FetchUser from "./fetch/FetchUser.jsx";

class LoginDropdown extends (Component, Form) {

	constructor( props ){
		super( props );
		this.state = {	data	: { email: "", password: "" }
					,	errors	: { }
		};

		this.User = new FetchUser();

		this.schema = {	email	: Joi.string()
									.required()
									.email()
									.label("Email")
					 , password	: Joi.string()
									.required()
									.label("Password")
		};

		this.FetchCallback = this.FetchCallback.bind( this );
	}

	doSubmit = async () => {
		console.log("This doSubmit function");
		this.state.Loading = true;
		const { data } = this.state;
		// if you want to render but want same state 
		this.User.login( data.email , data.password , this.FetchCallback );
		console.log("Now I will set state for render");
		this.setstate();
	};

	FetchCallback( Receiveinformation , ReceiveData ){
		console.log("Callback Function and data is " , ReceiveData );
	}

	render() {
		console.log("In render of login Dropdown " , this.state );
	    return (
			<li className="dropdown nav-item space">
				<NavLink	className="nav-link dropdown-toggle"
							to="/login"
							data-toggle="dropdown" >
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
									{this.renderInput( "password", "Password", "password",
														"password"
									)}
									{this.renderButton("Login")}
							</form>
							{ this.state.Loading == true && 
								<p>Now Loading</p>
							}
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
