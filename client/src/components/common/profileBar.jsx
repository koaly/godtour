import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import Spinner from "./spinner";

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
        <ul className="nav flex-column nav-pills pdb pdl">
          <img
            className="profileimg mgt img-thumbnail rounded"
            src={user.info.imgsrc}
            alt="profile"
          />
          <li className="nav-item">
            <NavLink className="nav-link" exact to="/profile">
              <span className="black">Profile</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/profile/myCard">
              <span className="black">My Cards</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/profile/purchaseList">
              <span className="black">Purchase List</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/profile/myBooking">
              <span className="black">My Booking</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/profile/myCard">
              <span className="black">Offers</span>
            </NavLink>
          </li>
          < li className="nav-item">
            <NavLink className="nav-link" to="/profile/myTour">
              <span className="black">My Tour</span>
            </NavLink>
          </li>
        </ul>
      </div>
    );
  }
}
