import React, { Component } from "react";
import { TrashCanIcon, CancelIcon } from "mdi-react";
import SearchBox from "./searchBox";
import { query } from "express-validator/check";
import { getAllTours } from "../services/tourService";

class CancelBook extends Component {
  state = {
    count: 0,
    tours: [],
    searchQuery: ""
  };
  async componentDidMount() {
    const { data: data } = await getAllTours();
    const { tours, count } = data;

    this.setState({ tours, count });
    console.log(tours);
  }
  handleSearch = query => {
    this.setState({ searchQuery: query });
  };

  render() {
    const { tours, count, searchQuery } = this.state;
    console.log(tours);
    console.log(count);
    let filtered = tours;
    // const name = Object.keys(tours).map(i => {
    //   return tours[i].name;
    // });
    if (searchQuery) {
      filtered = tours.filter(tour =>
        tour.name.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    }
    const a = filtered.map(n => <li>{n.name}</li>);
    console.log(filtered);
    console.log(searchQuery);
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-3" />
          <div className="col-md-6">
            <div className="cancel-booking ">
              <center className="mt-2 mb-2">
                <h1 className="mb-4 ">Are you sure ?</h1>
                <button className="btn btn-danger btn-lg mb-4 mr-4 ">
                  Delete <TrashCanIcon className="ml-1" />
                </button>
                <button className="btn btn-primary btn-lg mb-4">
                  Cancel <CancelIcon className="ml-1" />
                </button>
              </center>
            </div>
          </div>
          <div className="col-md-3" />
          <SearchBox value={searchQuery} onChange={this.handleSearch} />
          <div>{a}</div>
        </div>
      </div>
    );
  }
}

export default CancelBook;
