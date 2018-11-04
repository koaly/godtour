import React, { Component } from "react";
import Axios from "axios";
import { toast } from "react-toastify";
import { getSpecificTour, booking } from "../services/specificTourService";

export default class OneUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: this.props.user.username,
      user: [],
      token: this.props.token,
      isLoaded: false,
      isLoadToken: false,
      user: this.props.user
    };
  }

  async getOneTour() {
    this.setState({ isLoaded: false });
    try {
      const result = await getSpecificUser(this.state.username);
      const { user } = result.data;
      this.setState({ user: user[0] });
    } catch (e) {
      console.log(e.response);
    }
    this.setState({ isLoaded: true });
  }

  componentDidMount() {
    this.getOneTour();
  }

  render() {
    const { user, isLoaded } = this.state;
    if (!isLoaded) {
      return <h1>isLoading</h1>;
    }
    if (!user || user.length === 0) {
      return <h1>notFoundUser</h1>;
    }
    console.log(user);
    return (
      <div className="container">
        <div className="profile-container bglight mgtb">
          <h1>Hello</h1>
        </div>
      </div>
    );
  }
}