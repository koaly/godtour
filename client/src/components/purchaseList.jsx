import React, { Component } from "react";
import ProfileBar from "./common/profileBar";

class PurchaseList extends Component {
  render() {
    const { user } = this.props;
    return (
      <div className="container mgtb">
        <h1>Purchase List</h1>
        <div className="row">
          <div className="col-md-4">
            <ProfileBar userr={user} />
          </div>
        </div>
      </div>
    );
  }
}

export default PurchaseList;
