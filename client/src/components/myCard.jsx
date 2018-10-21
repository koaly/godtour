import React, { Component } from "react";
import ProfileBar from "./common/profileBar";

class MyCard extends Component {
  render() {
    return (
      <div className="container mgtb">
        <h1>My Cards</h1>
        <div className="row">
          <div className="col-md-4">
            <ProfileBar />
          </div>
        </div>
      </div>
    );
  }
}

export default MyCard;
