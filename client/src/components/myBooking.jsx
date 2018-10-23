import React, { Component } from "react";
import OneTour from "./cancelBook";
import ProfileBar from "./common/profileBar";
import { getMovies } from "../services/Test";

class MyBook extends Component {
  state = {
    movies: getMovies()
  };
  handleDelete = movie => {
    const movies = this.state.movies.filter(m => m._id !== movie._id);
    this.setState({ movies });
  };
  render() {
    const { length: count } = this.state.movies;

    return (
      <div className="container mgtb">
        <h1>My Booking</h1>
        <div className="row">
          <div className="col-md-4">
            <ProfileBar />
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
                {this.state.movies.map(movie => (
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
          </div>
        </div>
      </div>
    );
  }
}

export default MyBook;
