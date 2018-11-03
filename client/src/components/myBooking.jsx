import React, { Component } from "react";
import OneTour from "./cancelBook";
import ProfileBar from "./common/profileBar";
import { getMovies } from "../services/Test";
import Pagination from "./common/pagination";
import { paginate } from "../utility/paginate";
import Axios from "axios";
import { toast } from "react-toastify";
import { showCurrentBookings } from "../services/profileService";
export default class MyBook extends Component {
  constructor(props) {
    super(props)
    this.state = {
      movies: getMovies(),
      pageSize: 3,
      currentPage: 1,
      user: this.props.user,
      isLoaded: false,
      booking: [],
    }

  }
  async getCurrentBooking() {
    this.setState({ isLoaded: false })
    try {
      const response = await showCurrentBookings()
      console.log(response)
      const { booking } = response.data
      this.setState({ booking })
      toast.success(`request booking success!`)
    }
    catch (e) {
      toast.error(`${e.response.data.error.message}`);
      console.log(e.response);
    }
    this.setState({ isLoaded: true })
  }
  componentDidMount() {
    this.getCurrentBooking()

    this.setState({ isLoaded: true })
  }
  handleDelete = movie => {
    const movies = this.state.movies.filter(m => m._id !== movie._id);
    this.setState({ movies });
  };
  handlePageChange = page => {
    this.setState({ currentPage: page });
  };
  render() {
    const { user, booking: totalBooking, currentPage, pageSize } = this.state;
    const { length: count } = this.state.booking;
    const booking = paginate(totalBooking, currentPage, pageSize);

    return (
      <div className="container">
        <div className="profile-container bglight mgtb">
          <h1 className="profile-head">My Booking</h1>
          <div className="row">
            <div className="col-md-4">
              <ProfileBar user={user} />
            </div>
            <div className="col-md-8 mgt">
              <p>{count} movies in the database.</p>
              <table className="table">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Genre</th>
                    <th>Stock</th>
                    <th>Rate</th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {booking.map((book, i) => (
                    <tr key={i}>
                      <td>{book.tourName}</td>
                      <td>{book.amountBooking}</td>
                      <td>
                        <button
                          onClick={() => this.handleDelete(book)}
                          className="btn btn-danger btn-sm"
                        >
                          Delete
                      </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Pagination
                itemsCount={count}
                pageSize={pageSize}
                onPageChange={this.handlePageChange}
                currentPage={currentPage}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

