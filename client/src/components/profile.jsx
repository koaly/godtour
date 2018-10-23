import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import CancelBook from "./cancelBook";
import MyBook from "./myBooking";
import ProfileBar from "./common/profileBar";
//import { Route, Switch, Redirect } from "react-router-dom";

class Profile extends Component {
  render() {
    return (
      <div className="container mgtb">
        <h1>Profile</h1>
        <div className="row">
          <div className="col-md-4">
            <ProfileBar />
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
