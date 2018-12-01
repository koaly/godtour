import React, { Component } from "react";
import { getAllTiys } from "../services/tiyService";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "../components/common/spinner";

class AllTiys extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      tiys: []
    };
  }
  async componentDidMount() {
    try {
      const { data } = await getAllTiys();
      const { tiys } = data;
      this.setState({ tiys, isLoaded: true });
      console.log(data);
      console.log(tiys);
    } catch (ex) {
      const { message } = ex.response.data.error;
      toast.error(message);
    }
  }

  render() {
    const { tiys, isLoaded } = this.state;
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
      <div className="container">
        <h1>hello</h1>
        {isLoaded &&
          tiys.map((t, index) => (
            <div key={index} className="row">
              <li>{t.name}</li>
              <Link
                className="btn btn-primary ml-4 mb-5"
                to={{
                  pathname: `/${t._id}/createOffer`,
                  state: {
                    tiys: t
                  }
                }}
              >
                Create offer
              </Link>
            </div>
          ))}
      </div>
    );
  }
}

export default AllTiys;
