import React, { Component } from "react";
import Link from "react-router-dom/Link";
import "./tourIntro.css";

export default class TourIn extends Component {
  render() {
      return (
        <div>
            <div id="boxes">
                <div className="box-container">
                    <div className="box">
                        <img
                            src="https://cdn4.iconfinder.com/data/icons/world-travel-guide/512/travel-13-512.png"
                            style={{ maxHeight: 100, maxWidth: 100, width: "100%" }}
                            className="mb-3"
                        />
                        <h4>Can Create Your Own Tour</h4>
                        <h5>
                            We will make your dream trip come true, just tell us your wish.
                        </h5>
                        {/* <h5>just tell us your wish.</h5> */}
                    </div>
                    <div className="box">
                        <img
                            src="https://cdn0.iconfinder.com/data/icons/finance-65/100/HAND_MONEY-512.png"
                            style={{ maxHeight: 100, maxWidth: 100, width: "100%" }}
                            className="mb-3"
                        />
                        <h4>Save Money</h4>
                        <h5>Wonderful trip with low price and no booking fee.</h5>
                    </div>
                    <div className="box">
                        <img                   
                            src="https://png.icons8.com/ios/1600/guarantee-filled.png"
                            style={{ maxHeight: 100, maxWidth: 100, width: "100%" }}
                            className="mb-3"
                        />
                        <h4>Guarantee</h4>
                        <h5>
                            If you have a problem during the trip, you will get your money back.
                        </h5>
                        {/* <h5>you will get your money back.</h5> */}
                    </div>
                    <div className="box">
                        <img
                            src="http://cdn.onlinewebfonts.com/svg/img_456356.png"
                            style={{ maxHeight: 100, maxWidth: 100, width: "100%" }}
                            className="mb-3"
                        />
                        <h4>Special Discount</h4>
                        <h5>Special price and more special promotion only for VIP user.</h5>
                    </div>
                </div>
                <center>
                    <Link to="/tours">
                        <button className="brownbut">Book Tour Now</button>
                    </Link>
                </center>
            </div>
        </div>
      );
  }
}