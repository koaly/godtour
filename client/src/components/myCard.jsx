import React, { Component } from "react";
import ProfileBar from "./common/profileBar";

class MyCard extends Component {
  render() {
    const { user } = this.props;
    return (
      <div className="container">
      <div className="profile-container bglight mgtb">
        <h1 className="profile-head">My Cards</h1>
        <div className="row">
          <div className="col-md-4">
            <ProfileBar userr={user} />
          </div>
        </div>
      </div>
      </div>
    );
  }
}

export default MyCard;
