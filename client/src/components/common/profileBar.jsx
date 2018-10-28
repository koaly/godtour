import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";

class ProfileBar extends Component {
  render() {
    const { userr } = this.props;
    console.log(userr);
    return (
      <div>
        <ul className="nav flex-column nav-pills pdb pdl">
          {userr && (
            <img
              className="profileimg pdl"
              src={userr.info.imgsrc}
              alt="no image"
            />
          )}
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

export default ProfileBar;
