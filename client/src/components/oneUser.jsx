import React, { Component } from "react";
import Axios from "axios";
import { toast } from "react-toastify";
import { getSpecificUser, booking } from "../services/specificUser";
import { MailIcon } from "mdi-react";
import getStatus from "./common/status";

export default class OneUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: this.props.user.username,
      user: [],
      token: this.props.token,
      isLoaded: false,
      isLoadToken: false,
      user: this.props.user
    };
  }

  async getOneUser() {
    this.setState({ isLoaded: false });
    try {
      const result = await getSpecificUser(this.state.username);
      const { user } = result.data.users;
      this.setState({ user: user[0] });
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
    const {
        displayName,
        username,
        email,
        gender,
        registerDate,
        status,
      } = user.info; 
    const Rank = getStatus(status)
    const timeDate = registerDate.replace('T', ' ').replace('Z', ' ')
    
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
                <h1 className="profile-head">{user.info.displayName}</h1>
                <div className="row">
                    <div className="col-md-6 mt-2 mb-3">
                        <img
                            src={user.info.imgsrc}
                            alt="sample image"
                            height="350px"
                            width="500px"
                            className="ml-3 mt-1"
                        />
                    </div>
                    <div className="col-md-6 mt-2 mb-3">
                    
                        <div className="profile-infor mr-5 mt-1 ">
                            <div className="profile-infor ">
                                <h4>{displayName} ({Rank})</h4>
                                <h5>@{username}</h5>
                                <h5>Gender: {gender}</h5>
                            </div>
                            <div className="profile-infor ">
                                <h4><MailIcon className="blue mr-2" />{email}</h4>
                                <h5>เป็นสมาชิกตั้งแต่ {timeDate}</h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    </div>
    );
  }
}