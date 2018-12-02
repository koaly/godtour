import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  TwitterIcon,
  FacebookIcon,
  InstagramIcon,
  YoutubeIcon
} from "mdi-react";

const Footer = () => {
  return (
    <footer className="footer-classic context-dark bg-image">
      <div className="container">
        <div className="row row-30">
          <div className="col-md-4 col-xl-5">
            <div className="pr-xl-4">
              <h5 className="mt-3">Copyright © 2018</h5>
              <h5 className="mt-3">All Rights Reserved</h5>
            </div>
            <hr className="info-color mb-4 mt-0 d-inline-block mx-auto" />
          </div>
          <div className="col-md-4">
            <h5 className="mt-3">Contacts</h5>
            <dl className="contact-list">
              <dt>Address:</dt>
              <dd>798 South Park Avenue, Jaipur, Raj</dd>
            </dl>
            <dl className="contact-list">
              <dt>email:</dt>
              <dd>hahahaha</dd>
            </dl>
            <dl className="contact-list">
              <dt>phones:</dt>
              <dd>hahahaha</dd>
            </dl>
          </div>
          <div className="visib col-md-4 col-xl-3">
            <h5 className="mt-3">Links</h5>
            <ul className="nav-list">
              <li>
                <a href="#">About</a>
              </li>
              <li>
                <a href="#">Projects</a>
              </li>
              <li>
                <a href="#">About</a>
              </li>
              <li>
                <a href="#">About</a>
              </li>
              <li>
                <a href="#">About</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="row no-gutters social-container">
        <div className="col-md-3">
          <div className="social-inner d-lg-inline-block">
            <a href="https://twitter.com/tour_wor1d" className="twitter">
              <center>
                <p className="my-2 mx-2">
                  <TwitterIcon /> Twitter
                </p>
              </center>
            </a>
          </div>
        </div>
        <div className="col-md-3">
          <div className="social-inner">
            <a href="https://www.facebook.com/tour.wor1d" className="facebook">
              <center>
                <p className="my-2 mx-2">
                  <FacebookIcon /> Facebook
                </p>
              </center>
            </a>
          </div>
        </div>
        <div className="col-md-3">
          <div className="social-inner">
            <a
              href="https://www.youtube.com/channel/UCejOXMM5zGyD8GUETtqhJmQ"
              className="youtube"
            >
              <center>
                <p className="my-2 mx-2">
                  <YoutubeIcon /> Youtube
                </p>
              </center>
            </a>
          </div>
        </div>
        <div className="col-md-3">
          <div className="social-inner">
            <a
              href="https://www.instagram.com/tour.wor1d/"
              className="instagram"
            >
              <center>
                <p className="my-2 mx-2">
                  <InstagramIcon /> Instagram
                </p>
              </center>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
