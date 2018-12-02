import React, { Component } from "react";
import { Link } from "react-router-dom";

class MyBookingTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectBooking: this.props.selectBooking
    };
  }
  showDate(date) {
    return date.replace("T", " ").replace("Z", " ");
  }
  render() {
    const { selectBooking } = this.state;
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
