import React, { Component } from "react";
import Axios from "axios";
import { toast } from "react-toastify";
import { getSpecificUser, deleteSpecificUser } from "../services/specificUser";
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

      toast.info("LoadOneUser Success");
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

  handleDelete = async user => {
    try {
      console.log(user.id);
      await deleteSpecificUser(user.username);
      toast.success("Delete success");
      window.location = "/users";
    } catch (ex) {
      const errorRes = ex.response.data.errors;
      if (errorRes) {
        errorRes.forEach(error => {
          toast.error(` ${error.param}: ${error.msg}`);
        });
      } else {
        toast.error(`${ex.response.data.error.message}`);
      }
    }
  };

  render() {
    const { user, isLoaded } = this.state;
    const { registerDate } = user;
    const { currentUser } = this.props;
    console.log(currentUser);
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
    const registerDateWithoutTZ = registerDate
      .replace("T", " ")
      .replace("Z", " ");
    return (
      <div className="container">
        <div className="profile-container bglight mgtb">
          <h1 className="profile-head">{user.displayName}</h1>
          <div className="row">
            <div className="col-md-6 d-md-flex flex-column user-leftside mt-2 mb-3 ">
              <img
                src={user.imgsrc}
                alt="sample image"
                className=" mt-1 ml-2 "
              />
            </div>
            <div className="col-md-6 d-md-flex flex-column mt-2 mb-3">
              <div className="user-rightside profile-infor mr-5 mt-1 mx-5">
                <div className="profile-infor ">
                  <h4>
                    {user.displayName}({Rank})
                  </h4>
                  <h5>@{user.username}</h5>
                  <h5>Gender: {user.gender}</h5>
                </div>
                <div className="profile-infor ">
                  <h4>
                    <MailIcon className="blue mr-2" />
                    {user.email}
                  </h4>
                  <h5>เป็นสมาชิกตั้งแต่ {registerDateWithoutTZ}</h5>
                </div>
                {currentUser.info.status === 2 && (
                  <React.Fragment>
                    <button
                      onClick={() => this.handleDelete(user)}
                      className="btn btn-danger "
                    >
                      Delete User
                    </button>
                  </React.Fragment>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
