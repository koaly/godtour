import React, { Component } from "react";
import { getOwnTiy, removeTiy } from "../../services/tiyService";
import Spinner from "../common/spinner";
import { Link } from "react-router-dom";

class MyTiyTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
    const { data } = await getOwnTiy();
    this.setState({ isLoaded: true, data });
  };
  render() {
    const { data, isLoaded } = this.state;
    const { count } = data;
    console.log(count);
    console.log(data);

    return (
      <div className="profile-infor mx-3 ">
        <p>{count} Tiys (click your tiy to see if someone offer you a tour)</p>
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
              {isLoaded &&
                data.tiys.map(d => (
                  <tr key={d._id}>
                    <td>
                      <Link
                        className="text-primary"
                        to={{
                          pathname: "/profile/myTiy/offered",
                          state: {
                            tiyID: d._id,
                            isAccepted: d.isAccepted
                          }
                        }}
                      >
                        {d.name}
                      </Link>
                    </td>
                    <td>
                      {d.minPrice}/{d.maxPrice}
                    </td>
                    <td>
                      {d.startFreeDate}/{d.endFreeDate}
                    </td>
                    <td>
                      {!d.isAccepted && (
                        <Link
                          className="btn btn-primary btn-sm mb-2 pl-3 pr-3"
                          to={{
                            pathname: `/profile/myTiy/edit/${d._id}`,
                            state: {
                              tiys: d
                            }
                          }}
                        >
                          Edit
                        </Link>
                      )}
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
    );
  }
}

export default MyTiyTable;
