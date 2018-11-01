import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";

export default class ProfileBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: this.props.user
    }
    console.log(this.state.user)
  }
  render() {

    const { user } = this.state;
    return (
      <div>
        <ul className="nav flex-column nav-pills pdb pdl">
          <img
            className="profileimg pdl mgt"
            src={user.info.imgsrc}
            alt="no image"
          />
          <li className="nav-item pdl">
            <NavLink className="nav-link" exact to="/profile">
              <span className="black">Profile</span>
            </NavLink>
          </li>
          <li className="nav-item pdl">
            <NavLink className="nav-link" to="/profile/myCard">
              <span className="black">My Cards</span>
            </NavLink>
          </li>
          <li className="nav-item pdl">
            <NavLink className="nav-link" to="/profile/purchaseList">
              <span className="black">Purchase List</span>
            </NavLink>
          </li>
          <li className="nav-item pdl">
            <NavLink className="nav-link" to="/profile/myBooking">
              <span className="black">My Booking</span>
            </NavLink>
          </li>
        </ul>
      </div>
    );
  }
}
