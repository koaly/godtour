import React, { Component } from "react";
import Axios from "axios";
import { toast } from "react-toastify";
import { getSpecificTour, booking } from "../services/specificTourService";
import "../css/showtour.css";
import { deleteTour } from "../services/tourService";
import Spinner from "./common/spinner";
import { Link } from "react-router-dom";
import EditTourForm from "./editTourForm";

import {
  ClockIcon,
  AirlineSeatReclineNormalIcon,
  AirplaneIcon,
  StarIcon,
  CoinIcon,
  FileDocumentIcon,
  HumanMaleIcon
} from "mdi-react";

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
      textLoad: "Now Loading",
      textBooking: "Now Booking",
      nowBooking: false,
      user: this.props.user
    };
    this.count = 0;
    this.handleChange = this.handleChange.bind(this);
    this.changeLoading = this.changeLoading.bind(this);
    this.changeBooking = this.changeBooking.bind(this);
    this.BookingOneTour = this.BookingOneTour.bind(this);
    this.intervalLoadingID = setInterval(this.changeLoading, 200);
  }

  async getOneTour() {
    this.setState({ isLoaded: false });
    try {
      const result = await getSpecificTour(this.state.id);
      console.log(result);
      const { tour } = result.data;
      this.setState({ tour });
    } catch (e) {
      //			console.log(e.response);
    }
    clearInterval(this.intervalLoadingID); // use this for stoping interval
    this.setState({ isLoaded: true });
  }

  async BookingOneTour() {
    this.intervalBookingID = setInterval(this.changeBooking, 10);
    console.log("Booking One Tour");
    this.setState(state => ({
      nowBooking: true
    }));
    const field = {
      amountBooking: this.state.numberOfBooking
    };
    try {
      const result = await booking(this.state.id, field);
      toast.success(`${result.data.message}`);
    } catch (e) {
      //mutliple error handliing
      const valiationError = e.response.data.errors;

      if (valiationError) {
        valiationError.forEach(element => {
          toast.error(`${element.param}: ${element.msg}`);
        });
      } else if (e.response.status === 401) {
        toast.error("Please Login...");
      } else {
        toast.error(`${e.response.data.message}`);
      }

      //			console.log(e.response);
    }
    clearInterval(this.intervalBookingID); // use this for stoping interval
    this.setState(state => ({
      textBook: "Now Booking",
      nowBooking: false
    }));
  }

  componentDidMount() {
    this.getOneTour();
  }

  handleChange(event) {
    this.setState({ numberOfBooking: event.target.value });
  }

  handleDelete = async tour => {
    // const originalTour = this.state.tour;
    // const tour = originalTour.filter(t => t._id !== tour._id);
    // this.setState({ tour });

    try {
      console.log(tour._id);
      await deleteTour(tour._id);
      toast.success("Delete success");
      window.location = "/tours?page=1&limit=3";
      // await Axios.delete("http://localhost:5000/tours/" + this.state.tour._id, {
      //   headers: {
      //     Authorization: "JWT " + this.state.token
      //   }
      // });
    } catch (ex) {
      // if (ex.response && ex.response.status >= 400 && ex.response.status < 500)
      //   toast.error("This Tour has already been deleted.");
      const errorRes = ex.response.data.errors;
      if (errorRes) {
        errorRes.forEach(error => {
          toast.error(` ${error.param}: ${error.msg}`);
        });
      } else {
        toast.error(`${ex.response.data.error.message}`);
      }
    }
  };

  changeLoading() {
    let addingText = "";
    if (this.count === 0) {
      addingText = "";
      this.count = 1;
    } else if (this.count === 1) {
      addingText = ".";
      this.count = 2;
    } else if (this.count === 2) {
      addingText = "..";
      this.count = 3;
    } else {
      addingText = "...";
      this.count = 0;
    }
    this.setState(state => ({
      textLoad: "Now Loading" + addingText
    }));
  }

  changeBooking() {
    let addingText = "";
    if (this.count === 0) {
      addingText = "";
      this.count = 1;
    } else if (this.count === 1) {
      addingText = ".";
      this.count = 2;
    } else if (this.count === 2) {
      addingText = "..";
      this.count = 3;
    } else {
      addingText = "...";
      this.count = 0;
    }
    this.setState(state => ({
      textBooking: "Now Booking" + addingText
    }));
  }

  handleSubmit(event) {
    this.BookingOneTour();
  }

  render() {
    const { tour, isLoaded } = this.state;
    console.log("render have state is ", this.state);
    if (this.state.user === null) {
      console.log("Test user is null");
      this.state.user = { info: { status: 0 } };
    } else {
      console.log("Test user is defined");
    }
    var user = this.state.user;
    if (!isLoaded) {
      return (
        <div className="text-align mgtb">
          <Spinner />
          <h1>{this.state.textLoad}</h1>
        </div>
      );
    }
    if (!tour) {
      return <h1>notFoundTour</h1>;
    }
    console.log(tour);
    var freeSeat = tour.maxSeat - tour.currentSeat;

    return (
      <div className="container">
        <div className="profile-container bglight mgtb">
          <div className="row ot-container">
            <div className="col-12 d-md-flex flex-column mt-2">
              {/* <h1 className="ml-4">img</h1> */}
              <center>
                <img
                  src={tour.imgsrc}
                  alt="sample image"
                  className="mt-3 onetourr-leftside rounded img-thumbnail"
                />
              </center>
            </div>
            <div className="col-12 ml-1 mt-4">
              <h2 className="mgbi mx-5">{tour.name}</h2>
              <h5 className="mgbi mx-5">
                <StarIcon className="mr-3 mb-1" />
                Hightlight : {tour.highlight}{" "}
              </h5>
              <h5 className="mgbi mx-5">
                <ClockIcon className="mr-3 mb-1" />
                {tour.dayDuration} Day(s) {tour.nightDuration} Night(s)
              </h5>
              <h5 className="mgbi mx-5">
                <AirplaneIcon className="mr-3 mb-1" />
                Fly with {tour.airline}
              </h5>
              <h5 className="mgbi mx-5">
                <AirlineSeatReclineNormalIcon className="mr-3 mb-1" />
                Remaining Seat(s) : {tour.currentSeat}/{tour.maxSeat} Seat(s)
              </h5>
              <h5 className="mgbi mx-5">
                <CoinIcon className="mr-3 mb-1" />
                Price: {tour.price} $
              </h5>
              <h5 className="mgbi mx-5">
                <FileDocumentIcon className="mr-3 mb-1" />
                Detail: {tour.detail}{" "}
              </h5>
              <h5 className="mgbi mx-5">
                <HumanMaleIcon className="mr-3 mb-1" />
                Operated by {tour.operatorName}
              </h5>
              {user.info.status === 0 && (
                <label>
                  <h5 className="mx-5">Amount of Booking</h5>
                  <input
                    type="number"
                    min="0"
                    max={freeSeat}
                    value={this.state.numberOfBooking}
                    onChange={this.handleChange}
                    className="mx-5"
                  />
                  {!this.state.nowBooking && (
                    <button
                      className="btn btn-primary ml-4 mb-1"
                      onClick={this.BookingOneTour}
                    >
                      Book Seat(s)
                    </button>
                  )}
                  {this.state.nowBooking && (
                    <button className="btn btn-primary">
                      {this.state.textBooking}
                    </button>
                  )}
                </label>
              )}

              {user.info.status !== 0 && (
                <React.Fragment>
                  {/* <input
                    type="submit"
                    value="Delete Tour"
                    className="btn btn-danger  mt-4"
									/> */}
                  <button
                    onClick={() => this.handleDelete(tour)}
                    className="btn btn-danger ml-5 mb-5"
                  >
                    Delete Tour
                  </button>
                  {/* <input
                    type="submit"
                    value="Edit Tour"
                    className="btn btn-primary  ml-4 "
                  /> */}
                  {/* <Link
                    className="btn btn-primary ml-4"
                    to={`/editTour/${this.state.id}`}
                    render={props => <EditTourForm />}
                    class="<EditTourForm />"
                    // params={{ testvalue: this.state.id }}
                  >
                    Edit Tour
                  </Link> */}
                  <Link
                    className="btn btn-primary ml-4 mb-5"
                    to={{
                      pathname: `/editTour/${this.state.id}`,
                      state: {
                        tour: this.state.tour
                      }
                    }}
                  >
                    Edit Tour
                  </Link>
                </React.Fragment>
              )}

              {/*<input type="submit" value="Delete Tour" className="btn btn-danger  mt-4" />
            <input type="submit" value="Edit Tour" className="btn btn-primary  ml-4 mt-4" />*/}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
