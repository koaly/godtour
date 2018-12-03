import React, { Component } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { showCurrentBookings } from "../../services/profileService";

import { cancelBooking } from "../../services/specificTourService.js";
import Spinner from "../common/spinner";

class MyBookingTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false
    };
  }
  showDate(date) {
    return date.replace("T", " ").replace("Z", " ");
  }
  handleDelete = async id => {
    this.setState({ isLoading: false });
    await this.removeBooking(id);
    await this.getCurrentBooking();
    this.setState({ isLoading: true });
    window.location = "/profile/myBooking";
  };
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
  async getCurrentBooking() {
    try {
      const response = await showCurrentBookings();
      console.log(response);
      const {
        data: { booking }
      } = response;
      console.log(booking[0].booking);

      this.setState({ booking });
      console.log(booking);
      toast.info("Update BookingList");
    } catch (e) {
      const { message } = e.response.data.error;
      //toast.error(`${message}`)
    }
  }
  async componentDidMount() {
    await this.getCurrentBooking();
    this.setState({ isLoading: true });
  }
  render() {
    const { selectBooking } = this.props;
    const { isLoading } = this.state;
    if (!isLoading) {
      return <Spinner />;
    }
    return (
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
    );
  }
}

export default MyBookingTable;
