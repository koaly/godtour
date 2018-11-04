import React, { Component } from "react";
import Axios from "axios";
import { toast } from "react-toastify";
import { getSpecificUser } from "../services/specificUser";
import { MailIcon } from "mdi-react";
import Spinner from "./common/spinner";
import getStatus from "./common/status"
export default class OneUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: this.props.match.params.username,
      user: [],
      isLoaded: false,
      textLoad: "Now Loading"
    };
    this.count = 0;
    this.changeLoading = this.changeLoading.bind(this);
  }

  async getOneUser() {
    this.setState({ isLoaded: false });
    try {
      const result = await getSpecificUser(this.state.username);
      const { user } = result.data;
      this.setState({ user });

      toast.info('LoadOneUser Success')
    } catch (e) {
      console.log(e.response);
    }
    this.setState({ isLoaded: true });
  }

  componentDidMount() {
    this.getOneUser();
  }

  changeLoading() {
    let addingText = "";
    if (this.count === 0) {
      addingText = "";
      this.count = 1;
    } else if (this.count === 1) {
      addingText = ".";
      this.count = 2;
    } else if (this.count === 2) {
      addingText = "..";
      this.count = 3;
    } else {
      addingText = "...";
      this.count = 0;
    }
    this.setState(state => ({
      textLoad: "Now Loading" + addingText
    }));
  }

  render() {
    const { user, isLoaded } = this.state;
    const { registerDate } = user;
    const Rank = getStatus(user.status);

    if (!isLoaded) {
      return (
        <div className="text-align mgtb">
          <Spinner />
          <h1>{this.state.textLoad}</h1>
        </div>
      )
    }
    if (!user || user.length === 0) {
      return <h1>notFoundUser</h1>;
    }
    console.log(user);
    return (
      <div className="container">
        <div className="profile-container bglight mgtb">
          <h1 className="profile-head">{user.displayName}</h1>
          <div className="row">
            <div className="col-md-6 mt-2 mb-3 ">
              <img
                src={user.imgsrc}
                alt="sample image"
                height="350px"
                width="500px"
                className="ml-3 mt-1"
              />
            </div>
            <div className="col-md-6 mt-2 mb-3">

              <div className="profile-infor mr-5 mt-1 ">
                <div className="profile-infor ">
                  <h4>{user.displayName}({Rank})</h4>
                  <h5>@{user.username}</h5>
                  <h5>Gender: {user.gender}</h5>
                </div>
                <div className="profile-infor ">
                  <h4><MailIcon className="blue mr-2" />{user.email}</h4>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}