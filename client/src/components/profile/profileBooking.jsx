import React, { Component } from "react";
import { showCurrentBookings } from "../../services/profileService";

import { cancelBooking } from "../../services/specificTourService.js";
import { toast } from "react-toastify";
import { paginate } from "../../utility/paginate";
import { Link } from "react-router-dom";
import Pagination from "../common/pagination";
import Spinner from "../common/spinner";
import MyBookingTable from "./myBookingTable";

export default class ProfileBooking extends Component {
  constructor(props) {
    super(props);
    this.state = {
      booking: [],
      isLoaded: false,

      pageSize: 3,
      currentPage: 1
    };
  }

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };
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
  async componentDidMount() {
    await this.getCurrentBooking();
    this.setState({ isLoaded: true });
  }

  render() {
    const { booking, isLoaded, currentPage, pageSize } = this.state;
    const { length: count } = this.state.booking;
    let selectBooking = paginate(booking, currentPage, pageSize);
    console.log(selectBooking);
    console.log(count);
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
          <MyBookingTable selectBooking={selectBooking} booking={booking} />
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
