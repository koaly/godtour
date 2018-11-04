import React, { Component } from "react";
import ProfileBar from "./common/profileBar";
import { MailIcon } from "mdi-react";
import getStatus from "./common/status"
import Link from "react-router-dom/Link";
//import { Route, Switch, Redirect } from "react-router-dom";

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user,
      isLoaded: false
    };
  }

  async componentDidMount() {
    this.setState({ isLoaded: true })
  }

  render() {
    const { user, isLoaded } = this.state;
    const {
      displayName,
      username,
      email,
      gender,
      registerDate,
      status,
    } = user.info

    const Rank = getStatus(status)
    const timeDate = registerDate.replace('T', ' ').replace('Z', ' ')

    if (!isLoaded) {
      return <h1>isLoading</h1>
    }
    console.log(user)
    return (
      <div className="container">
        <div className="profile-container bglight mgtb">
          <h1 className="profile-head">Profile</h1>
          <div className="row">
            <div className="col-md-4">
              <ProfileBar user={user} />
            </div>
            <div className="col-md-8 mt-2">
              <div className="profile-infor mr-5 ml-4">
                <div className="profile-infor ">
                  <h4>{displayName} ({Rank})</h4>
                  <h5>@{username}</h5>
                  <h5>Gender: {gender}</h5>
                </div>
                <div className="profile-infor ">
                  <h4><MailIcon className="blue mr-2" />{email}</h4>
                  <h5>เป็นสมาชิกตั้งแต่ {timeDate}</h5>
                </div>
                <Link to={`/request`} >
                  <button className="btn btn-primary">Request</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

