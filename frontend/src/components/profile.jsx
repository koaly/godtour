import React, { Component } from "react";
import CancelBook from "./cancelBook";
import MyBook from "./myBooking";
//import { Route, Switch, Redirect } from "react-router-dom";

class Profile extends Component {
  render() {
    return (
        <div>
            <h1>Profile</h1>
            <ul className="nav nav-pills flex-column">
                <li className="nav-item active">
                    <a className="nav-link" href="#">
                        Profile
                    </a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#">
                        My Cards
                    </a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#">
                        Purchase List
                    </a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="/profile/myBooking">
                        My Booking
                    </a>
                </li>
            </ul>
            
        </div>
        
    );
  }
}

export default Profile;