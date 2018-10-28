import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";

class ProfileBar extends Component {
  render() {
    const { userr } = this.props;
    console.log(userr);
    return (
      <div>
        <ul className="nav flex-column nav-pills">
          {userr && (
            <img
              className="profileimg"
              src={userr.info.imgsrc}
              alt="no image"
            />
          )}
          <li className="nav-item">
            <NavLink className="nav-link" exact to="/profile">
              Profile
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/profile/myCard">
              My Cards
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/profile/purchaseList">
              Purchase List
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/profile/myBooking">
              My Booking
            </NavLink>
          </li>
        </ul>
      </div>
    );
  }
}

export default ProfileBar;
