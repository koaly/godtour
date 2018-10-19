import React, { Component } from "react";
import Background from "../img/02_giant_swing.jpg"

var sectionStyle = {
  width: "100%",
  height: "300px",
  backgroundImage: "url(" + Background + ")",
  //borderTopWidth: "1000" ,
  position: "absolute",
  top: "100",
  left: "0",
};


class HomePage extends Component {
  render() {
    return (
      <div>
        <section style={ sectionStyle }>
          <center>
            <h1 className="align-center">Ohyohoho</h1>
          </center>
        </section>
        
      </div>
    );
  }
}

export default HomePage;
