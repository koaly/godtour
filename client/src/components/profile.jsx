import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import CancelBook from "./cancelBook";
import MyBook from "./myBooking";
import ProfileBar from "./common/profileBar";
//import { Route, Switch, Redirect } from "react-router-dom";
import Axios from "axios";

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      info: undefined
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
    console.log(info);
    this.setState({ info });
    console.log(info);
    console.log(config);
  }
  render() {
    const { user } = this.props;
    console.log(user);
    const { info } = this.state;
    console.log(info);
    return (
      <div className="container">
        <div className="profile-container bglight mgtb">
          <h1 className="profile-head">Profile</h1>
          <div className="row">
            <div className="col-md-4">
              <ProfileBar userr={user} />
            </div>
            <div className="col-md-8 mt-5">
              <ul>
                <li>email: {user && user.info.email}</li>
                <li>username: {user && user.info.username}</li>
                <li>
                  gender:
                  {user && user.info.gender}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
