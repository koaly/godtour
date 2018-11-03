import React, { Component } from "react";
import OwnTour from "./common/ownTour";
import ProfileBar from "./common/profileBar"
//import { Route, Switch, Redirect } from "react-router-dom";

export default class myTour extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user,
      isLoaded: false
    };
  }

  async componentDidMount() {
    this.setState({ isLoaded: true })
  }

  render() {
    const { user, isLoaded } = this.state;

    if (!isLoaded) {
      return <h1>isLoading</h1>
    }
    console.log(user)
    return (
      <div className="container">
        <div className="profile-container bglight mgtb">
          <h1 className="profile-head">Profile</h1>
          <div className="row">
            <div className="col-md-4">
              <ProfileBar user={user} />
            </div>
            <div className="col-md-8 mt-2">
              <div className="profile-infor mr-5">
                <OwnTour />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

