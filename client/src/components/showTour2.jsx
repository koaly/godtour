import React, { Component } from "react";
import Axios from "axios";
import { getAllTours } from "../services/tourService";
import { Link } from "react-router-dom";

export default class showTour2 extends Component {
  constructor() {
    super();
    this.state = {
      tours: [],
      isLoaded: false
    };
  }
  async getTour() {
    this.setState({ isLoaded: false });
    try {
      const result = await getAllTours();
      console.log(result.data);
      const { tours } = result.data;
      this.setState({ tours: tours });
    } catch (e) {
      console.log(e);
    }
    this.setState({ isLoaded: true });
  }
  componentDidMount() {
    this.getTour();
  }
  render() {
    const { tours, isLoaded } = this.state;
    if (!isLoaded) {
      return <h1>isLoaded</h1>;
    }
    console.log(tours);
    if (!tours || tours.length == 0) {
      return <h1>notFoundTour</h1>;
    }
    return (
      <div>
        <h1>Tour List</h1>
        <ul>
          {tours.map(tour => (
            <li key={tour._id}>
              <h3>
                {tour.name}
                {/* <a href={this.getURL(tour._id)}>next</a> */}
                <Link to={`/tours/id=${tour._id}`}>next</Link>
              </h3>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
