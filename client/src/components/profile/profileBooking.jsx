import React, { Component } from "react";
import { showCurrentBookings } from "../../services/profileService";

import { cancelBooking } from "../../services/specificTourService.js";
import { toast } from "react-toastify";
import { paginate } from "../../utility/paginate";
import { Link } from "react-router-dom";
import Pagination from "../common/pagination";
import Spinner from "../common/spinner";

export default class ProfileBooking extends Component {
  constructor(props) {
    super(props);
    this.state = {
      booking: [],
      isLoaded: false,

      pageSize: 4,
      currentPage: 1
    };
  }

  async getCurrentBooking() {
    try {
      const response = await showCurrentBookings();
      console.log(response);
      const {
        data: { booking }
      } = response;
      console.log(booking[0].booking);

      this.setState({ booking });
      toast.info("Update BookingList");
    } catch (e) {
      const { message } = e.response.data.error;
      //toast.error(`${message}`)
    }
  }

  async removeBooking(id) {
    try {
      const response = await cancelBooking(id);
      const { msg } = response.data;

      toast.success(`${msg}`);
    } catch (e) {
      console.log(e);
      const message = e.response.data.error.message;
      toast.error(`${message}`);
    }
  }
  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  handleDelete = async id => {
    this.setState({ isLoaded: false });

    await this.removeBooking(id);
    await this.getCurrentBooking();

    this.setState({ isLoaded: true });
  };
  async componentDidMount() {
    await this.getCurrentBooking();
    this.setState({ isLoaded: true });
  }
  showDate(date) {
    return date.replace("T", " ").replace("Z", " ");
  }
  render() {
    const { booking, isLoaded, currentPage, pageSize } = this.state;
    const { length: count } = this.state.booking;
    const selectBooking = paginate(booking, currentPage, pageSize);

    if (!isLoaded) {
      return (
        <div className="container text-align mgtb-2">
          <div>
            <Spinner />
          </div>
        </div>
      );
    }

    console.log(booking);
    return (
      <div className="profile-infor mx-3">
        <p>{count} bookings</p>
        <div className="ovft">
          <table className="table">
            <thead>
              <tr>
                <th>TourName</th>
                <th>Amount</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {selectBooking.map((book, i) => (
                <tr key={i}>
                  <td>
                    <Link className="text-primary" to={`/tours/${book.tourID}`}>
                      {book.tourName}
                    </Link>
                  </td>
                  <td>{book.amountBooking}</td>
                  <td>{this.showDate(book.bookingDate)}</td>
                  <td>
                    <button
                      onClick={() => this.handleDelete(book.id)}
                      className="btn btn-danger btn-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pagination
          itemsCount={count}
          pageSize={pageSize}
          onPageChange={this.handlePageChange}
          currentPage={currentPage}
        />
      </div>
    );
  }
}
