import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import CancelBook from "./cancelBook";
import MyBook from "./myBooking";
import ProfileBar from "./common/profileBar";
import Axios from "axios";
//import { Route, Switch, Redirect } from "react-router-dom";

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      info: undefined,
      isLoaded: false
    };
  }
  async componentDidMount() {
    const token = localStorage.getItem("token");
    // this.setState({ jwt, user })
    const config = {
      headers: { Authorization: "JWT " + token }
    };
    const response = await Axios.get(
      "http://localhost:5000/users/current",
      config
    );
    const { info } = response.data;
    const isLoaded = true
    this.setState({ info, isLoaded });
  }
  render() {
    const { isLoaded } = this.state
    if (!isLoaded) {
      return <h1>isLoading</h1>
    } else {
      const { user } = this.props
      const { info } = this.state;
      console.log(info)
      return (
        <div className="container">
          <div className="profile-container bglight mgtb">
            <h1 className="profile-head">Profile</h1>
            <div className="row">
              <div className="col-md-4">
                <ProfileBar info={info} />
              </div>
              <div className="col-md-8 mt-5">
                <ul>
                  <li>email: {info.email}</li>
                  <li>username: {info.username}</li>
                  <li>name: {info.displayName}</li>
                  <li>gender:{info.gender}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default Profile;
