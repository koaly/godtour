import React from "react";
import { Link, NavLink } from "react-router-dom";
import LoginDropdown from "./loginDropdown";
import FetchAllUsers from "./fetch/FetchAllUsers";

const NavBar = ({ user }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
      <Link className="navbar-brand" to="/">
        To-ur-world
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#collapsibleNavbar"
      >
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="collapsibleNavbar">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <NavLink className="nav-link" to="/tour">
              Tour List
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/addTour">
              Add Tour
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/editTour">
              Edit Tour
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/cancelBook">
              Cancel Booking
            </NavLink>
          </li>
        </ul>
        <ul className="nav navbar-nav navbar-right">
          {!user && <LoginDropdown />}
          {user && (
            <React.Fragment>
              <li className="nav-item">
                <NavLink className="nav-link" to="/profile">
                  {user.email}
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/logout">
                  Logout
                </NavLink>
              </li>
            </React.Fragment>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
