import React, { Component } from "react";
import ProfileBar from "./common/profileBar";

class PurchaseList extends Component {
  render() {
    return (
      <div className="container">
        <h1>Purchase List</h1>
        <div className="row">
          <div className="col-md-4">
            <ProfileBar />
          </div>
        </div>
      </div>
    );
  }
}

export default PurchaseList;
