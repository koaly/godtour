import React, { Component } from "react";
import { getUserRequest } from "../../services/adminService";
import { toast } from "react-toastify";
import Spinner from "../common/spinner";
import Link from "react-router-dom/Link";
import { paginate } from "../../utility/paginate";
import Pagination from "../common/pagination";
import "../user/userBoxList.css";
import getStatus from "../common/status";
import AcceptStatusButton from "./acceptStatusButton";
import RefuseStatusButton from "./refuseStatusButton";
export default class RequestBoxList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      isLoaded: false,

      pageSize: 2,
      currentPage: 1
    };
  }

  async getRequest() {
    try {
      const result = await getUserRequest();
      const { users } = result.data;
      toast.info("Update RequestList");
      this.setState({ users });
    } catch (e) {
      const { msg } = e.response.data.error;
      console.log(msg);
      //toast.error(`${message}`);
    }
  }

  async componentDidMount() {
    await this.getRequest();
    this.setState({ isLoaded: true });
  }

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };
  render() {
    const { users, isLoaded, currentPage, pageSize } = this.state;
    const { count } = this.state.users;
    const selectUsers = paginate(users.users, currentPage, pageSize);
    console.log(selectUsers);
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
          <h1 className="user-head">{count} User(s) in database</h1>
        </div>
        <ul>
          {selectUsers.map((user, i) => (
            <li key={i}>
              <div className="user-content mx-3 my-3">
                <div className="profile-infor mx-1 my-1">
                  <div className="row">
                    <div className="col-sm-12 col-lg-3 text-aligin ubl-imgbox mb-2">
                      <img
                        className="profileimg mgt img-thumbnail rounded"
                        src={user.imgsrc}
                        alt="profile"
                      />
                    </div>
                    <div className="col-sm-8 col-lg-5 my-3">
                      <h5>
                        {user.displayName} ({getStatus(user.status)})
                      </h5>
                      <h6>@{user.username}</h6>
                      <h6>Email: {user.email}</h6>
                      <h6>Request: {user.upgradeReason}</h6>
                      <br />
                      <h5>
                        <Link to={`/users/${user.username}`}>See more</Link>
                      </h5>
                    </div>
                    <div className="col-sm-4 col-lg-4 my-3">
                      <div className="row">
                        <div className="col-6">
                          <AcceptStatusButton
                            id={user.username}
                            acceptStatus={this.getRequest.bind(this)}
                          />
                        </div>
                        <div className="col-6">
                          <RefuseStatusButton
                            id={user.username}
                            acceptStatus={this.getRequest.bind(this)}
                          />
                        </div>
                      </div>
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
