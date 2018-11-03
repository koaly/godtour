import React, { Component } from "react";
import Axios from "axios";
import { getAllUsers } from "../services/allUserService";
import { Link } from "react-router-dom";

export default class ShowUser extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
      isLoaded: false
    };
  }
  async getUser() {
    this.setState({ isLoaded: false });
    try {
      const result = await getAllUsers();
      console.log(result.data.users);
      const { user } = result.data.users;
      this.setState({ users: user });
    } catch (e) {
      console.log(e);
    }
    this.setState({ isLoaded: true });
  }
  componentDidMount() {
    this.getUser();
  }
  render() {
    const { users, isLoaded } = this.state;
    if (!isLoaded) {
      return <h1>isLoaded</h1>;
    }
    console.log(users);
    if (!users || users.length == 0) {
      return <h1>notFoundUser</h1>;
    }
    return (
      <div>
        <h1>User List</h1>
        <ul>
          {users.map((user, i) => (
            <li key={i}>
              <h3>
                {user.username}
                {user.displayName}
                <Link to={`/users/${user.username}`}>next</Link>
              </h3>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}