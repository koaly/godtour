import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import Form from "./common/form";
import Joi from "joi-browser";
import { login } from "../services/authService";
import { toast } from "react-toastify";
import FetchUser from "./fetch/FetchUser.jsx";

class LoginDropdown extends (Component, Form) {

	constructor( props ){ // this function auto call when you init class or start class 
		super( props );
		this.state = {	data	: { email: "", password: "" }
					,	errors	: { }
					,	Loading : "NOT"
					,	Data	: "Failure"
		};

		this.User = new FetchUser(); // inti fetch class login

		this.schema = {	email	: Joi.string()
									.required()
									.email()
									.label("Email")
					 , password	: Joi.string()
									.required()
									.label("Password")
		};
		// set call back when login for receive data
		this.FetchCallback = this.FetchCallback.bind( this );
	}

	doSubmit = async () => { // this function call by form code by Frontend-React
		console.log("This doSubmit function");
		const { data } = this.state;	
		this.User.login( data.email , data.password , this.FetchCallback );
		console.log("Now I will set state for render");
		this.setstate( state => ({ Loading : "Loading" }));
	};

	// this function for call by finish fetch data manage by branch fetch
	FetchCallback( Receiveinformation , ReceiveData ){
		console.log("Callback Function and data is " , ReceiveData );
		if( ReceiveData.have ){
			console.log( "Success Login");
			localStorage.setItem("token", ReceiveData.token);
//			window.location = "/";
		}
		else{
			console.log( "Failure Login");
			this.setstate( {	Loading : "Finish" 
							,	Data	: "Wrong" });
		}
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
							<form onSubmit={this.handleSubmit.bind( this )}>
									{this.renderInput("email", "Email", "email", "email")}
									{this.renderInput( "password", "Password", "password",
														"password"
									)}
									{this.renderButton("Login")}
							</form>
							{ this.state.Loading === "Loading" && 
								<p>Now Loading</p>
							}
							{ this.state.Loading === "Finish" &&
								<p>Wrong username or password</p>
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
