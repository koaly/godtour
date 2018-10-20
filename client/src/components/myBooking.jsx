import React, { Component } from "react";
import OneTour from "./cancelBook";
import ProfileBar from "./common/profileBar";

class MyBook extends Component {
  render() {
    return (
      <div className="container">
        <h1>My Booking</h1>
        <div className="row">
          <div className="col-md-4">
            <ProfileBar />
          </div>
        </div>
      </div>
    );
  }
}

export default MyBook;
