import React, { Component } from "react";
import Axios from "axios";
import { toast } from "react-toastify";
import { getSpecificUser, booking } from "../services/specificUser";
import { MailIcon } from "mdi-react";


export default class OneUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: this.props.match.params.username,
      user: [],
      isLoaded: false,
    };
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

  render() {
    const { user, isLoaded } = this.state;

    if (!isLoaded) {
      return <h1>isLoading</h1>;
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
            <div className="col-md-6 mt-2 mb-3">
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
                  <h4>{user.displayName}</h4>
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