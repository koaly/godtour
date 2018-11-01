import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";

class ProfileBar extends Component {
  render() {
    const { info } = this.props;
    return (
      <div>
        <ul className="nav flex-column nav-pills pdb pdl">
          <img
            className="profileimg pdl mgt"
            src={info && info.imgsrc}
            alt="no image"
          />
          <li className="nav-item pdl">
            <NavLink className="nav-link" exact to="/profile" info={info}>
              <span className="black">Profile</span>
            </NavLink>
          </li>
          <li className="nav-item pdl">
            <NavLink className="nav-link" to="/profile/myCard" info={info}>
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

export default ProfileBar;
