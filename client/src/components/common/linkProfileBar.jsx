import React, { Component } from "react";
import { NavLink } from "react-router-dom";
export default class LinkProfileBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user
    };
  }

  render() {
    const { user } = this.state;
    const { status } = user.info;

    if (status === 0) {
      return (
        <ul className="nav flex-column nav-pills">
          <img
            className="profileimg mgt img-thumbnail rounded"
            src={user.info.imgsrc}
            alt="profile"
          />
          <li className="nav-item">
            <NavLink className="nav-link" exact to="/profile">
              <center>
              <span className="black">Profile</span>
              </center>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/profile/myCard">
            <center>
              <span className="black">My Cards</span>
            </center>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/profile/purchaseList">
            <center>
              <span className="black">Purchase List</span>
            </center>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/profile/myBooking">
            <center>
              <span className="black">My Booking</span>
            </center>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/profile/myTiy">
              <center>
                <span className="black">My TIYs</span>
              </center>
            </NavLink>
          </li>
        </ul>
      );
    } else if (status === 1) {
      return (
        <ul className="nav flex-column nav-pills">
          <img
            className="profileimg mgt img-thumbnail rounded"
            src={user.info.imgsrc}
            alt="profile"
          />
          <li className="nav-item">
            <NavLink className="nav-link" exact to="/profile">
              <center>
                <span className="black">Profile</span>
              </center>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/profile/myCard">
              <center>
                <span className="black">My Cards</span>
              </center>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/profile/myTour">
              <center>
                <span className="black">My Tour</span>
              </center>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/profile/myOffer">
              <center>
                <span className="black">My Offers</span>
              </center>
            </NavLink>
          </li>
        </ul>
      );
    } else {
      return (
        <ul className="nav flex-column nav-pills">
          <img
            className="profileimg mgt img-thumbnail rounded"
            src={user.info.imgsrc}
            alt="profile"
          />
          <li className="nav-item">
            <NavLink className="nav-link" exact to="/profile">
            <center>
              <span className="black">Profile</span>
              </center>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/profile/myCard">
            <center>
              <span className="black">My Cards</span>
              </center>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/profile/purchaseList">
            <center>
              <span className="black">Purchase List</span>
              </center>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/profile/myBooking">
            <center>
              <span className="black">My Booking</span>
              </center>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/profile/myOffer">
            <center>
              <span className="black">My Offers</span>
              </center>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/profile/myTour">
            <center>
              <span className="black">My Tour</span>
              </center>
            </NavLink>
          </li>
        </ul>
      );
    }
  }
}
