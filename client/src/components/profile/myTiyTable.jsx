import React, { Component } from "react";
import { getOwnTiy, removeTiy } from "../../services/tiyService";
import Spinner from "../common/spinner";

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
              {isLoaded &&
                data.tiys.map(d => (
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
    );
  }
}

export default MyTiyTable;
