import React, { Component } from "react";
import RequestBoxList from "./common/requestStatus/requestBoxList";

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
        <div className="profile-container bgdark">
          <RequestBoxList />
        </div>
      </div>
    );
  }
}
