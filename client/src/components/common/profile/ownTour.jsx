import React, { Component } from "react";
import { getOwnTours } from "../../../services/tourService";
import { toast } from "react-toastify";
import Spinner from "../spinner";
import { paginate } from "../../../utility/paginate";
import Link from "react-router-dom/Link";
import Pagination from "../pagination";
import DeleteTourBar from "../tour/deleteTourBar";

export default class OwnTour extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tours: [],
      isLoaded: false,

      pageSize: 5,
      currentPage: 1
    };
  }
  async getOwnTour() {
    try {
      const response = await getOwnTours();
      const { tours } = response.data;

      this.setState({ tours });
      toast.info("Update TourList");
    } catch (e) {
      const { message } = e.response.data.error;
      toast.error(`${message}`);
    }
  }
  async componentDidMount() {
    await this.getOwnTour();
    this.setState({ isLoaded: true });
  }

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };
  render() {
    const { tours, isLoaded, currentPage, pageSize } = this.state;
    const { length: count } = tours;
    const selectTours = paginate(tours, currentPage, pageSize);
    if (!isLoaded) {
      return <Spinner />;
    }

    return (
      <div>
        <p>Have {count} Own Tour(s)</p>
        <table className="table">
          <thead>
            <tr>
              <th>TourName</th>
              <th>Remaining Seat(s)</th>
            </tr>
          </thead>
          <tbody>
            {selectTours.map((tour, i) => (
              <tr key={i}>
                <td>
                  <Link className="text-primary" to={`/tours/${tour._id}`}>
                    {tour.name}
                  </Link>
                </td>
                <td>{tour.currentSeat}</td>
                <td>
                  <DeleteTourBar
                    id={tour._id}
                    updateTour={this.getOwnTour.bind(this)}
                  />
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
    );
  }
}
