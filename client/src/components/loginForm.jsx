import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import FetchUser from "./fetch/FetchUser";

class LoginForm extends Form {
  constructor(props) {
    super(props)
    this.state = {
      submit: { username: "", password: "" },
      errors: {},
      isLoading: true,
      data: [],
      info: [],
    };

    this.fetchLoginCallback = this.fetchLoginCallback.bind(this)
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    this.UserFetch = new FetchUser();
  }
  schema = {
    username: Joi.string()
      .required()
      .label("Username"),
    password: Joi.string()
      .required()
      .label("Password")
  };
  handleChange(event) {

  }
  handleSubmit(event) {
    console.log(`login with ${this.state.submit.username}:${this.state.submit.password}`);
    /*
    this.UserFetch.login(
      this.state.submit.username,
      this.state.submit.password,
      this.fetchLoginCallback
    )
    event.pr
    */
    this.props.history.push("/");
  };

  //callback function from fetch
  fetchLoginCallback(info, data) {
    this.setState(state => ({
      isLoading: false,
      data: data,
      info: info
    }));
  }

  render() {
    return (
      <div className="container login mgtb">
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password", "password")}
          {this.renderButton("Login")}
        </form>
      </div>
    );
  }
}

export default LoginForm;
