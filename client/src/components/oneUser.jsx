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
      numberOfBooking: 0,
      user: this.props.user
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
    const { tour, isLoaded, user } = this.state;
    if (!isLoaded) {
      return <h1>isLoading</h1>;
    }
    if (!tour || tour.length === 0) {
      return <h1>notFoundTour</h1>;
    }
    console.log(tour);
    return (
      <div className="container">
        <div className="profile-container bglight mgtb">
          <div className="row">
            <div className="col-md-7 mt-4">
              <h1 className="ml-4">img</h1>
            </div>
            <div className="col-md-5 mt-4 mb-4">
              <h1 className="mgbi">{tour.name}</h1>
              <h5 className="mgbi">Fly with {tour.airline}</h5>
              <h5 className="mgbi">{tour.dayDuration} Day(s) {tour.nightDuration} Night(s)</h5>
              <h5 className="mgbi">Price: {tour.price} $</h5>
              <h5 className="mgbi">
                Current Seat : {tour.currentSeat}/{tour.maxSeat} Seats
              </h5>
              <h5 className="mgbi">Operated by {tour.operatorName}</h5>
              {user.info.status === 0 && <form onSubmit={this.handleSubmit}>
                <label >
                  <h5>Amount of Booking:</h5>
                  <input
                    type="text"
                    value={this.state.numberOfBooking}
                    onChange={this.handleChange}
                  />
                </label>
                <input type="submit" value="Book Seat(s)" className="btn btn-primary ml-4 mb-1" />
              </form>
              }
              {user.info.status !== 0 &&
                <React.Fragment>
                  <input type="submit" value="Delete Tour" className="btn btn-danger  mt-4" />
                  <input type="submit" value="Edit Tour" className="btn btn-primary  ml-4 mt-4" />
                </React.Fragment>
              }

              {/*<input type="submit" value="Delete Tour" className="btn btn-danger  mt-4" />
            <input type="submit" value="Edit Tour" className="btn btn-primary  ml-4 mt-4" />*/}
            </div>
          </div>
        </div>
      </div>
    );
  }
}