import React, { Component } from "react";
import ProfileBar from "./common/profileBar";

class PurchaseList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: this.props.user
    }
  }
  render() {
    const { user } = this.state;
    return (
      <div className="container">
        <div className="profile-container bglight mgtb">
          <h1 className="profile-head">Purchase List</h1>
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

export default PurchaseList;
