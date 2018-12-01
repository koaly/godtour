import React, { Component } from "react";
import { getAllTiys } from "../../services/tiyService";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "../common/spinner";

class AllTiys extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      tiys: [],
      data: []
    };
  }
  async componentDidMount() {
    try {
      const { data } = await getAllTiys();
      const { tiys } = data;
      this.setState({ tiys, isLoaded: true, data });
      console.log(data);
      console.log(tiys);
    } catch (ex) {
      const { message } = ex.response.data.error;
      toast.error(message);
    }
  }

  render() {
    const { tiys, isLoaded, data } = this.state;
    console.log(tiys);
    if (!isLoaded) {
      return (
        <div className="container text-align mgtb-2">
          <div>
            <Spinner />
          </div>
        </div>
      );
    }

    return (
      <div className="container mgtb">
        <div className="user-content mx-3 my-1">
          <h1 className="user-head">{data.count} Tiys in database</h1>
        </div>
        {isLoaded &&
          tiys.map((t, index) => (
            <div key={index} className="user-content mx-3 my-3">
              <div className="profile-infor mx-1 my-1">
                <div className="row">
                  <ul>
                    <div className="ml-3">{t.name}</div>
                  </ul>
                  <Link
                    // className="btn btn-primary ml-4 mb-5"
                    to={{
                      pathname: `/${t._id}/createOffer`,
                      state: {
                        tiys: t
                      }
                    }}
                  >
                    <div>
                      <button className="btn btn-primary ml-4 mb-5 float-right">
                        Create offer
                      </button>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          ))}
      </div>
    );
  }
}

export default AllTiys;
