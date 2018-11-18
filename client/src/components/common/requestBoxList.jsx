import React, { Component } from "react";
import { getUserRequest } from "../../services/adminService";
import { toast } from "react-toastify";
import Spinner from "./spinner";
import Link from "react-router-dom/Link";
import { paginate } from "../../utility/paginate";
import Pagination from "./pagination";
import "./userBoxList.css";
import getStatus from "./status";
import AcceptStatusButton from "./acceptStatusButton";
import RefuseStatusButton from "./refuseStatusButton";
export default class RequestBoxList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      isLoaded: false,

      pageSize: 4,
      currentPage: 1
    };
  }

  async getRequest() {
    try {
      const result = await getUserRequest();
      const { users } = result.data;
      toast.info("Update RequestList");
      this.setState({ users: users });
    } catch (e) {
      const { message } = e.response.data.error;
      console.log(message)
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
    const { length: count } = this.state.users;
    const selectUsers = paginate(users, currentPage, pageSize);

    if (!isLoaded) {
      return (
        <div className="container text-align">
          <div className="user-content mx-3 my-3">
            <Spinner />
          </div>
        </div>
      );
    }

    return (
      <div className="profile-continer bgdark">
        <div className="user-content mx-3 my-1">
          <h1 className="user-head">{count} Users in database</h1>
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
                    <div className="col-sm-4 col-lg-4 my-3" >
                      <div className="row">
                        <div className="col-6">
                          <AcceptStatusButton id={user._id} acceptStatus={this.getRequest.bind(this)} />
                        </div>
                        <div className="col-6">
                          <RefuseStatusButton id={user._id} acceptStatus={this.getRequest.bind(this)} />
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
      </div >
    );
  }
}