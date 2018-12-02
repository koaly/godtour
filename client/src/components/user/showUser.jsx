import React, { Component } from "react";
import UserBoxList from "./userBoxList";

export default class ShowUser extends Component {
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
          <UserBoxList />
        </div>
      </div>
    );
  }
}
