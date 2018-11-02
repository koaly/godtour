import React, { Component } from "react";
import Axios from "axios";
import { toast } from "react-toastify";
import { getSpecificTour, booking } from "../services/specificTourService";

export default class OneTour extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.id,
      tour: [],
      token: this.props.token,
      isLoaded: false,
      isLoadToken: false,
      numberOfBooking: 0
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  async getOneTour() {
    this.setState({ isLoaded: false });
    try {
      const result = await getSpecificTour(this.state.id);
      const { tour } = result.data;
      this.setState({ tour: tour[0] });
    } catch (e) {
      console.log(e.response);
    }
    this.setState({ isLoaded: true });
  }

  async BookingOneTour() {
    this.setState({ isLoaded: false });
    const field = {
      amountBooking: this.state.numberOfBooking
    };

    try {
      const result = await booking(this.state.id, field);
      toast.success(`${result.data.message}`);
    } catch (e) {
      toast.error(`${e.response.data.message}`);
      console.log(e.response);
    }

    this.setState({ isLoaded: true });
  }

  componentDidMount() {
    this.getOneTour();
  }

  handleChange(event) {
    this.setState({ numberOfBooking: event.target.value });
  }

  handleSubmit(event) {
    this.BookingOneTour();
  }

  render() {
    const { tour, isLoaded } = this.state;
    if (!isLoaded) {
      return <h1>isLoading</h1>;
    }
    if (!tour || tour.length === 0) {
      return <h1>notFoundTour</h1>;
    }
    console.log(tour);
    return (
      <div className="container">
        <div className="profile-container bglight mgtb profile-container">
          <div className="row">
            <div className="col-md-6 mt-4">
              <h1 className="ml-4">img</h1>
            </div>
            <div className="col-md-6 mt-4 mb-4">
              <h1 className="mgbi">{tour.name}</h1>
              
              <h4 className="mgbi">fly with {tour.airline}</h4>
              <h4 className="mgbi">{tour.dayDuration} Day(s) {tour.nightDuration} Night(s)</h4>
              <h4 className="mgbi">Price: {tour.price} $</h4>
              <h4 className="mgbi">
                Current Seat : {tour.currentSeat}/{tour.maxSeat} Seats
              </h4>
              <h4 className="mgbi">Operated by {tour.operatorName}</h4>
              <form onSubmit={this.handleSubmit}>
                <label>
                  <h4>Amount of Booking:</h4>
                  <input
                    type="text"
                    value={this.state.numberOfBooking}
                    onChange={this.handleChange}
                  />
                </label>
                <input type="submit" value="Book Seat(s)" />
              </form>
              
            </div>
          </div>
        </div>
      </div>
    );
  }
}
