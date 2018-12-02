import React, { Component } from "react";
import ProfileBar from "./profileBar";
import OfferBar from "./offerBar";

export default class MyOffer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user
    };
  }

  render() {
    const { user } = this.state;

    return (
      <div className="container">
        <div className="profile-container bglight mgtb">
          <h1 className="profile-head">My Offer</h1>
          <div className="row">
            <div className="col-md-5">
              <ProfileBar user={user} />
            </div>
            <div className="col-md-7 mt-2 ">
              <OfferBar />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
