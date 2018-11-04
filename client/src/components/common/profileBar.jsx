import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import Spinner from "./spinner";
import LinkProfileBar from "./linkProfileBar";

export default class ProfileBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: this.props.user,
      isLoaded: false
    }

  }
  componentDidMount() {
    this.setState({ isLoaded: true })
  }
  render() {

    const { user, isLoaded } = this.state;
    if (!isLoaded) {
      return <Spinner />
    }
    if (!user) {
      return <h1>Login</h1>
    }
    return (
      <div className="container text-center profile-infor mt-2 ml-3 mb-3 mr-5">
        <LinkProfileBar user={user} />
      </div>
    );
  }
}
