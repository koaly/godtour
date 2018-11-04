import React, { Component } from "react";
import ProfileBar from "./common/profileBar";
import { getOwnTiy } from "../services/tiyService";
import Spinner from "./common/spinner";

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

  render() {
    const { user, isLoaded, data } = this.state;
    if (!isLoaded) {
      return <Spinner />;
    }
    console.log(data);
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
            <div className="col-md-4">
              <ProfileBar user={user} />
            </div>
            <div className="col-md-8 mt-2 ">{showData}</div>
          </div>
        </div>
      </div>
    );
  }
}
