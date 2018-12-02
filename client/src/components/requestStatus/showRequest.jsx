import React, { Component } from "react";
import RequestBoxList from "./requestBoxList";

export default class ShowRequest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false
    };
  }
  render() {
    return (
      <div className="container mgtb">
        <div className="profile-container">
          <RequestBoxList />
        </div>
      </div>
    );
  }
}
