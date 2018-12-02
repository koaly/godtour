import React, { Component } from "react";
import { sendDataCeateTourByUser } from "../../services/userCreateTourService";

class sumDataCreateTour extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: props.user,
      isLoading: true
    };
    this.dataTour = {};
    this.handleSendData = this.handleSendData.bind(this);
  }

  async handleSendData() {
    console.log("=====> handleSendData.dataTour", this.dataTour);
    const result = await sendDataCeateTourByUser(this.dataTour);
    window.location = "/profile/myTiy";
    console.log("=====> handleSendData.result", result);
  }

  componentDidMount() {
    this.dataTour = JSON.parse(localStorage.getItem("submitDataTour"));
    console.log("Information of user ", this.state.user);
    console.log("Information of dataTour", this.dataTour);
    this.setState(state => ({
      isLoading: false
    }));
  }

  render() {
    if (this.state.isLoading) {
      return (
        <div>
          <h1>Now Loading!</h1>
        </div>
      );
    }
    return (
      <div>
        <h1>&emsp;Tour Name : {this.dataTour.name}</h1>
        <ul>
          <li>Destination : {this.dataTour.dest}</li>
          <li>
            Duration : {this.dataTour.minDuration} - {this.dataTour.maxDuration}
          </li>
          <li>
            Member : {this.dataTour.minMember} - {this.dataTour.minMember}
          </li>
          <li>
            Price : {this.dataTour.minPrice} - {this.dataTour.maxPrice}
          </li>
          <li>
            Free Date : {this.dataTour.startFreeDate} to{" "}
            {this.dataTour.endFreeDate}
          </li>
          <li>food : {this.dataTour.food}</li>
          <li>Require Guide : {this.dataTour.requireGuide ? "YES" : "NO"}</li>
          <li>Detail : {this.dataTour.detail}</li>
          <li>Highlight : {this.dataTour.highlight}</li>
        </ul>
        <button onClick={this.handleSendData}>Send Data</button>
      </div>
    );
  }
}

export default sumDataCreateTour;
