import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import CancelBook from "./cancelBook";
import MyBook from "./myBooking";
import ProfileBar from "./common/profileBar";
import Axios from "axios";
//import { Route, Switch, Redirect } from "react-router-dom";

export default class Profile extends Component {
  /*
  const config = {
    headers: { Authorization: "JWT " + token }
  }
  */
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user,
      isLoaded: false
    };
    console.log(this.state.user)
  }
  async componentDidMount() {
    this.setState({ isLoaded: true })
  }

  render() {
    const { user, isLoaded } = this.state;
    if (!isLoaded) {
      return <h1>isLoading</h1>
    }
    return (
      <div className="container">
        <div className="profile-container bglight mgtb">
          <h1 className="profile-head">Profile</h1>
          <div className="row">
            <div className="col-md-4">
              <ProfileBar user={user} />
            </div>
            <div className="col-md-8 mt-5">
              <ul>
                <li>email: {user.info.email}</li>
                <li>username: {user.info.username}</li>
                <li>name: {user.info.displayName}</li>
                <li>gender:{user.info.gender}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

