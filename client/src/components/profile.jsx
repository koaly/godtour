import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import CancelBook from "./cancelBook";
import MyBook from "./myBooking";
import ProfileBar from "./common/profileBar";
import Axios from "axios";
import {MailIcon} from "mdi-react";
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
            <div className="col-md-8 mt-4">
              {/*<ul>
                <li>email: {user.info.email}</li>
                <li>username: {user.info.username}</li>
                <li>name: {user.info.displayName}</li>
                <li>gender:{user.info.gender}</li>
              </ul>*/}
              <div className="profile-infor mr-5">
                <h4>Display Name</h4>
                <h5>{user.info.displayName}</h5>
              </div>
              <div className="profile-infor mr-5">
                <h4>Username</h4>
                <h5>{user.info.username}</h5>
              </div>
              <div className="profile-infor mr-5">
                <h4><MailIcon className="blue mr-2"/>Email Address</h4>
                <h5>{user.info.email}</h5>
              </div>
              <div className="profile-infor mr-5">
                <h4>Gender</h4>
                <h5>{user.info.gender}</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

