import React, { Component } from "react";
import { getAllTiys } from "../services/tiyService";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

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
    return (
      <div className="container">
        <h1>hello</h1>
        {isLoaded &&
          tiys.map(t => (
            <div className="row">
              <li key={t._id}>{t.name}</li>
              <Link className="btn btn-primary" to={`/${t._id}/createOffer`}>
                haha
              </Link>
            </div>
          ))}
      </div>
    );
  }
}

export default AllTiys;
