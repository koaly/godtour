import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import { TwitterIcon,FacebookIcon,InstagramIcon,YoutubeIcon } from "mdi-react";

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
            <hr className="info-color mb-4 mt-0 d-inline-block mx-auto"></hr>
            
          </div>
          <div className="col-md-4">
            <h5 className="mt-3">Contacts</h5>
              <dl className="contact-list">
                <dt>Address:</dt>
                <dd>798 South Park Avenue, Jaipur, Raj</dd>
              </dl>
              <dl className="contact-list">
                <dt>email:</dt>
                <dd>
                  hahahaha
                </dd>
              </dl>
              <dl className="contact-list">
                <dt>phones:</dt>
                <dd>
                  hahahaha
                </dd>
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
            <div className="d-lg-inline-block">
              <a href="https://twitter.com/tour_wor1d" className="social-inner">
                <p><TwitterIcon/></p>
                <p>Twitter</p>
              </a>
            </div>
            <div className="d-lg-inline-block">
              <a href="https://www.facebook.com/tour.wor1d" className="social-inner">
                <p><FacebookIcon/></p>
                <p>Facebook</p>
              </a>
            </div>
            <div className="d-lg-inline-block">
              <a href="https://www.youtube.com/channel/UCejOXMM5zGyD8GUETtqhJmQ" className="social-inner">
                <p><YoutubeIcon/></p>
                <p>Youtube</p>
              </a>
            </div>
            <div className="d-lg-inline-block">
              <a href="https://www.instagram.com/tour.wor1d/" className="social-inner">
                <p><InstagramIcon/></p>
                <p>Instagram</p>
              </a>
            </div>
      </div>
    </footer>
  );
};
export default Footer;
