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
              <h5 className="mt-3">Copyright © 2018 TO-UR WORLD</h5>
              <h5 className="mt-3">All Rights Reserved</h5>
            </div>
            <hr className="info-color mb-4 mt-0 d-inline-block mx-auto" />
          </div>
          <div className="col-md-4">
            <h5 className="mt-3">Contacts</h5>
            <dl className="contact-list">
              <dt>Address:</dt>
              <dd>50 Ngam Wong Wan Rd, Ladyaow Chatuchak</dd>
            </dl>
            <dl className="contact-list">
              <dt>email:</dt>
              <dd>godtour@gmail.com</dd>
            </dl>
            <dl className="contact-list">
              <dt>phones:</dt>
              <dd>02-5920422</dd>
            </dl>
          </div>
          <div className="visib col-md-4 col-xl-3">
            <h5 className="mt-3">Tours</h5>
            <ul className="nav-list">
               <li>
                <a href="/tours/5bf4e94fe06f311ca128b121">Turkey</a>
              </li> 
              <li>
                <a href="/tours/5bdea081df29330e611b47c1">Russia</a>
              </li>
              <li>
                <a href="/tours/5bde9d6ddf29330e611b47bf">Hongkong</a>
              </li>
              <li>
                <a href="/tours/5bdea317c44f8217ececa502">Macau</a>
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
