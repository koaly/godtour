import React, { Component } from "react";
import ProfileBar from "./common/profileBar";
import { getOwnTiy, removeTiy } from "../services/tiyService";
import Spinner from "./common/spinner";
import { Link } from "react-router-dom";

export default class MyBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user,
      data: [],
      isLoaded: false
    };
  }

  async componentDidMount() {
    const { data } = await getOwnTiy();
    console.log(data);
    this.setState({ isLoaded: true, data });
  }
  handleDelete = async id => {
    this.setState({ isLoaded: false });

    await removeTiy(id);
    await getOwnTiy();
    this.setState({ isLoaded: true });
  };

  render() {
    const { user, isLoaded, data } = this.state;
    if (!isLoaded) {
      return <Spinner />;
    }
    console.log(data);
    const { count } = data;
    const showData = data.tiys.map(d => (
      <li key={d._id}>
        <h5>
          Name:
          {d.name}
        </h5>
        <h5>
          Destination:
          {d.dest}
        </h5>
        <h5>
          Destination:
          {d.dest}
        </h5>
        <h5>
          Detail:
          {d.detail}
        </h5>
        <h5>
          EndFreeDate:
          {d.endFreeDate}
        </h5>
        <h5>
          Food:
          {d.food}
        </h5>
        <h5>
          Highlight
          {d.highlight}
        </h5>
        <h5>
          MinDuration/MaxDuration:
          {d.minDuration}/{d.maxDuration}
        </h5>
        <h5>
          MinMember/MaxMember:
          {d.minMember}/{d.maxMember}
        </h5>
        <h5>
          MinPrice/MaxPrice:
          {d.minPrice}/{d.maxPrice}
        </h5>
        <h5>
          StartFreeDate:
          {d.startFreeDate}
        </h5>
      </li>
    ));
    return (
      <div className="container">
        <div className="profile-container bglight mgtb">
          <h1 className="profile-head">My Booking</h1>
          <div className="row">
            <div className="col-md-5 d-md-flex flex-column">
              <ProfileBar user={user} />
            </div>

            <div className="container col-md-7 mt-2 flex-column">
              <Link className="btn btn-primary ml-3" to="/createTour">
                create TIY
              </Link>
              <div className="profile-infor mx-3 ">
                <p>{count} Tiys</p>
                <div className="ovft">
                <table className="table">
                  <thead>
                    <tr>
                      <th>TourName</th>
                      <th>MinPrice/MaxPrice</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.tiys.map(d => (
                      <tr key={d._id}>
                        <td>
                          {/* <Link
                            className="text-primary"
                            to={`/tours/id=${book.tourID}`}
                          >
                            {book.tourName}
                          </Link> */}
                          {d.name}
                        </td>
                        <td>
                          {d.minPrice}/{d.maxPrice}
                        </td>
                        <td>
                          {d.startFreeDate}/{d.endFreeDate}
                        </td>
                        <td>
                          <button
                            onClick={() => this.handleDelete(d._id)}
                            className="btn btn-danger btn-sm"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
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
