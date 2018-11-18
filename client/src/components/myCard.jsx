import React, { Component } from "react";
import ProfileBar from "./common/profileBar";

export default class MyCard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: this.props.user
    }
    console.log(this.state.user)
  }
  render() {
    const { user } = this.state;
    return (
      <div className="container">
        <div className="profile-container bglight mgtb">
          <h1 className="profile-head">My Cards</h1>
          <div className="row">
            <div className="col-md-5">
              <ProfileBar user={user} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

