import React, { Component } from "react";
import {
  getOwnTiy,
  removeTiy,
  showTiyOffered
} from "../../services/tiyService";
import Spinner from "../common/spinner";
import ProfileBar from "./profileBar";
import { Link } from "react-router-dom/Link";

class TiyOffered extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isLoaded: false,
      user: this.props.user,
      id: this.props.location.state.tiyID
    };
  }
  async componentDidMount() {
    const { id } = this.state;
    const { data } = await showTiyOffered(id);
    console.log(data);
    this.setState({ isLoaded: true, data });
  }
  //   handleDelete = async id => {
  //     this.setState({ isLoaded: false });

  //     await removeTiy(id);
  //     const { data } = await getOwnTiy();
  //     this.setState({ isLoaded: true, data });
  //   };
  render() {
    const { data, isLoaded, user } = this.state;
    const { count } = data;
    console.log(count);
    console.log(data);
    return (
      <div className="container">
        <div className="profile-container bglight mgtb">
          <h1 className="profile-head">My Booking</h1>
          <div className="row">
            <div className="col-md-5 d-md-flex flex-column">
              <ProfileBar user={user} />
            </div>

            <div className="container col-md-7 mt-2 flex-column">
              <div className="profile-infor mx-3 ">
                {count === 0 ? (
                  <p>no one offer you haha</p>
                ) : (
                  <p>{count} offer(s) is coming</p>
                )}
                <div className="ovft">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>TourName</th>
                        <th>Price</th>
                        <th>DepartDate/ReturnDate</th>
                      </tr>
                    </thead>
                    <tbody>
                      {!isLoaded ? (
                        <Spinner />
                      ) : (
                        data.offers.map(o => (
                          <tr key={o._id}>
                            <td>{o.name}</td>
                            <td>{o.price}</td>
                            <td>
                              {o.departDate}/{o.returnDate}
                            </td>
                            <td>
                              {/* <button
                                // onClick={() => this.handleDelete(o._id)}
                                className="btn btn-danger btn-sm"
                              >
                                Delete
                              </button> */}
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default TiyOffered;
