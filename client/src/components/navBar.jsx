import React from "react";
import { Link, NavLink } from "react-router-dom";

const NavBar = () => {
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
        </ul>
        <ul className="nav navbar-nav navbar-right">
          <li className="nav-item">
            <NavLink className="nav-link" to="/profile">
              Profile
            </NavLink>
          </li>
          <li className="dropdown nav-item space">
            <NavLink className="nav-link dropdown-toggle" to="/login" data-toggle="dropdown">

              Login
              
            </NavLink>
            <ul id="login-dp" className=" dropdown-menu dropdown-menu-right">
                <li>
                  <div className="row">
                    <div className="col-md-12">
                      Login With
                      <div className="social-buttons">
                        <a href="#">
                          <button className="btn btn-block btn-google">
                            <i className="fa fa-google">
                              Google
                            </i>
                          </button>
                        </a>
                      </div>
                      or
                      <form role="form" method="POST" action="#" acceptCharset="UTP-8">
                        <div className="form-group">
                          <label className="sr-only" htmlFor="exampleInputEmail2">Email address</label>
                          <input id="exampleInputEmail2" className="form-control" name="email" type="email" placeholder="Email address" required=""/>
                        </div>
                        <div className="form-group">
                          <label className="sr-only" htmlFor="exampleInputPassword2">Password</label>
                          <input id="exampleInputPassword2" className="form-control" name="password" type="password" placeholder="Password" required=""/>
                          <div className="help-block text-right">
                            <a href="#">
                              Forget the password?
                            </a>
                          </div>
                          <div className="form-group">
                            <button className="btn btn-primary btn-block" type="submit">
                              Sign in
                            </button>
                          </div>
                          <div className="checkbox">
                            <label>
                              <input type="checkbox"/>
                                keep me logged-in
                            </label>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                  <div className="bottom text-center">
                    New here ?
                    <a href="/register">
                      Register
                    </a>
                  </div>
                </li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
