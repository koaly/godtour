import React, { Component } from "react";
import ProfileBar from "./profileBar";

import { Link } from "react-router-dom";
import MyTiyTable from "./myTiyTable";

export default class MyBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user
    };
  }

  render() {
    const { user } = this.state;

    // const showData = data.tiys.map(d => (
    //   <li key={d._id}>
    //     <h5>
    //       Name:
    //       {d.name}
    //     </h5>
    //     <h5>
    //       Destination:
    //       {d.dest}
    //     </h5>
    //     <h5>
    //       Destination:
    //       {d.dest}
    //     </h5>
    //     <h5>
    //       Detail:
    //       {d.detail}
    //     </h5>
    //     <h5>
    //       EndFreeDate:
    //       {d.endFreeDate}
    //     </h5>
    //     <h5>
    //       Food:
    //       {d.food}
    //     </h5>
    //     <h5>
    //       Highlight
    //       {d.highlight}
    //     </h5>
    //     <h5>
    //       MinDuration/MaxDuration:
    //       {d.minDuration}/{d.maxDuration}
    //     </h5>
    //     <h5>
    //       MinMember/MaxMember:
    //       {d.minMember}/{d.maxMember}
    //     </h5>
    //     <h5>
    //       MinPrice/MaxPrice:
    //       {d.minPrice}/{d.maxPrice}
    //     </h5>
    //     <h5>
    //       StartFreeDate:
    //       {d.startFreeDate}
    //     </h5>
    //   </li>
    // ));
    return (
      <div className="container">
        <div className="profile-container bglight mgtb">
          <h1 className="profile-head">My Tiys</h1>
          <div className="row">
            <div className="col-md-5 d-md-flex flex-column">
              <ProfileBar user={user} />
            </div>

            <div className="container col-md-7 mt-2 flex-column">
              <Link className="btn btn-primary ml-3" to="/createTour">
                create TIY
              </Link>
              <MyTiyTable />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
