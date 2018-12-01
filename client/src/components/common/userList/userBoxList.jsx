import React, { Component } from "react";
import { getAllUsers } from "../../../services/userService";
import { toast } from "react-toastify";
import Spinner from "../spinner";
import Link from "react-router-dom/Link";
import { paginate } from "../../../utility/paginate";
import Pagination from "../pagination";
import "./userBoxList.css";
import getStatus from "../status";
import "./../../../css/showtour.css";

export default class UserBoxList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      count: 0,
      isLoaded: false,

      pageSize: 4,
      currentPage: 1
    };
  }

  async getUser() {
    try {
      const result = await getAllUsers();
      const { users, count } = result.data;
      console.log(users);
      toast.info("Update UserList");
      this.setState({ users, count });
    } catch (e) {
      const { message } = e.response.data.error;
      toast.error(`${message}`);
    }
  }

  async componentDidMount() {
    await this.getUser();
    this.setState({ isLoaded: true });
  }

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };
  render() {
    const { users, isLoaded, currentPage, pageSize, count } = this.state;
    console.log(users);
    const selectUsers = paginate(users, currentPage, pageSize);

    if (!isLoaded) {
      return (
        <div className="container text-align mgtb-2">
          <div>
            <Spinner />
          </div>
        </div>
      );
    }

    return (
      <div className="profile-container">
        <div className="user-content mx-3 my-1">
          <h1 className="user-head">{count} Users in database</h1>
        </div>
        <ul>
          {selectUsers.map((user, i) => (
            <li key={i}>
              <div className="user-content mx-3 my-3">
                <div className="profile-infor mx-1 my-1">
                  <div className="row">
                    <div className="col-sm-12 col-lg-3 mb-2">
                      <img
                        className="sizeIMG roundIMG"
                        src={user.imgsrc}
                        alt="profile"
                      />
                      {/*                      <img
                        className="profileimg mgt img-thumbnail rounded"
                        src={user.imgsrc}
                        alt="profile"
                      />*/}
                    </div>
                    <div className="col-sm-12 col-lg-9 my-3">
                      <h5>
                        {user.displayName} ({getStatus(user.status)})
                      </h5>
                      <h6>@{user.username}</h6>
                      <h6>Email: {user.email}</h6>
                      <br />
                      <h5>
                        <Link to={`/users/${user.username}`}>See more</Link>
                      </h5>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <div className="mx-3 my-3">
          <Pagination
            itemsCount={count}
            pageSize={pageSize}
            onPageChange={this.handlePageChange}
            currentPage={currentPage}
          />
        </div>
      </div>
    );
  }
}
