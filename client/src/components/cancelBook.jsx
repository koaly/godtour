import React, { Component } from "react";
import { TrashCanIcon, CancelIcon } from "mdi-react";
import SearchBox from "./searchBox";
import { getAllUsers } from "../services/allUserService";
import { query } from "express-validator/check";

class CancelBook extends Component {
  state = {
    count: 0,
    users: [],
    searchQuery: ""
  }
  async componentDidMount() {
    const { data: data } = await getAllUsers();
    const { users } = data
    const { count, user } = users

    await this.setState({ users: user, count });
    console.log(users);
  }
  handleSearch = query => {
    this.setState({ searchQuery: query })
  };

  render() {

    const { users, count, searchQuery } = this.state;
    console.log(users)
    console.log(count)
    let filtered = users;
    const username = Object.keys(users).map(i => { return users[i].username })
    if (searchQuery) {
      filtered = username.filter(username => username.toLowerCase().startsWith(searchQuery.toLowerCase()))

    }
    console.log(filtered)
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
        </div>
      </div>
    );

  }
}

export default CancelBook;
