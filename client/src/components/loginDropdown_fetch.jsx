import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import Form from "./common/form_fetch";
import Joi from "joi-browser";
import { login } from "../services/authService";
import { toast } from "react-toastify";
import FetchUser from "./fetch/FetchUser.jsx";

class LoginDropdown extends Component {

	constructor( props ){ // this function auto call when you init class or start class 
		console.log( "Constructor of LoginDropdown" , props)
		super( props );

		this.Schema = {	email	: Joi.string()
									.required()
									.email()
									.label("Email")
					 , password	: Joi.string()
									.required()
									.label("Password")
		};
		this.state = {	data	: { email: "", password: "" }
					,	errors	: { }
					,	Loading : "NOT"
					,	Data	: "Failure"
		};
		this.User = new FetchUser(); // inti fetch class login
		this.FetchCallback = this.FetchCallback.bind( this ); // callback for get value
		this.CallBackSubmit = this.CallBackSubmit.bind(this)
		this.CallBackRender = this.CallBackRender.bind(this)
		this.FormUser = new Form( props , this.Schema 
										, this.CallBackSubmit , this.CallBackRender , this)
	}

	CallBackRender(){
		this.setstate();
	}

	CallBackSubmit(){ // this function call by form code by Frontend-React
		console.log("This doSubmit function");
		const { data } = this.state;	
		this.User.login( data.email , data.password , this.FetchCallback );
		console.log("Now I will set state for render");
		this.state.Loading = "Loading";
//		this.setstate( state => ({ Loading : "Loading" }))
	};

	// this function for call by finish fetch data manage by branch fetch
	FetchCallback( Receiveinformation , ReceiveData ){
		console.log("Callback Function and data is " , ReceiveData );
		if( ReceiveData.have ){
			console.log( "Success Login");
			localStorage.setItem("token", ReceiveData.token);
			window.location = "/";
		}
		else{
			console.log( "Failure Login");
			toast.error("Invalid email or password");
			this.state.Loading = "Finish";
			this.forceUpdate();
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
							<form onSubmit={this.FormUser.handleSubmit}>
									{this.FormUser.renderInput(
											"email", "Email", "email", "email"
										)
									}
									{this.FormUser.renderInput( 
											"password", "Password", "password", "password"
										)
									}
									{this.FormUser.renderButton("Login")}
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
