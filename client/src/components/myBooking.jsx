import React, { Component } from "react";
import ProfileBar from "./common/profileBar";
import ProfileBooking from "./common/profileBooking"

export default class MyBook extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pageSize: 3,
      currentPage: 1,
      user: this.props.user,

    }

  }

  render() {
    const { user } = this.state;

    return (
      <div className="container">
        <div className="profile-container bglight mgtb">
          <h1 className="profile-head">My Booking</h1>
          <div className="row">
            <div className="col-md-4">
              <ProfileBar user={user} />
            </div>
            <ProfileBooking />
          </div>
        </div>
      </div>
    );
  }
}

