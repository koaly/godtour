import React, { Component } from "react";
import { TrashCanIcon, CancelIcon } from "mdi-react";
import SearchBox from "./searchBox";
import { getAllUsers } from "../services/allUserService";

class CancelBook extends Component {
  state = {
    users: [],
    searchQuery: ""
  };
  async componentDidMount() {
    const { data: users } = await getAllUsers();
    this.setState({ users });
    console.log(users);
  }
  handleSearch = query => {
    this.setState({ searchQuery: query });
  };
  render() {
    const { users, searchQuery } = this.state;
    let filtered = users;
    if (searchQuery)
      filtered = filtered.user.filter(f =>
        f.username.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
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
        </div>
        <SearchBox value={searchQuery} onChange={this.handleSearch} />
      </div>
    );
  }
}

export default CancelBook;
