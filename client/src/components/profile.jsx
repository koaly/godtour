import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import CancelBook from "./cancelBook";
import MyBook from "./myBooking";
import ProfileBar from "./common/profileBar";
//import { Route, Switch, Redirect } from "react-router-dom";

class Profile extends Component {
  render() {
    const { user } = this.props;
    console.log(user);
    return (
      <div className="container mgtb">
        <h1>Profile</h1>
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
    );
  }
}

export default Profile;
