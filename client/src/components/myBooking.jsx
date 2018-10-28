import React, { Component } from "react";
import OneTour from "./cancelBook";
import ProfileBar from "./common/profileBar";
import { getMovies } from "../services/Test";
import Pagination from "./common/pagination";
import { paginate } from "../utility/paginate";

class MyBook extends Component {
  state = {
    movies: getMovies(),
    pageSize: 3,
    currentPage: 1
  };
  handleDelete = movie => {
    const movies = this.state.movies.filter(m => m._id !== movie._id);
    this.setState({ movies });
  };
  handlePageChange = page => {
    this.setState({ currentPage: page });
  };
  render() {
    const { user } = this.props;
    const { length: count } = this.state.movies;
    const { pageSize, currentPage, movies: allMovies } = this.state;
    const movies = paginate(allMovies, currentPage, pageSize);

    return (
      <div className="container">
      <div className="profile-container bglight mgtb">
        <h1 className="profile-head">My Booking</h1>
        <div className="row">
          <div className="col-md-4">
            <ProfileBar userr={user} />
          </div>
          <div className="col-md-8">
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
                {movies.map(movie => (
                  <tr key={movie._id}>
                    <td>{movie.title}</td>
                    <td>{movie.genre.name}</td>
                    <td>{movie.numberInStock}</td>
                    <td>{movie.dailyRentalRate}</td>
                    <td>
                      <button
                        onClick={() => this.handleDelete(movie)}
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

export default MyBook;
