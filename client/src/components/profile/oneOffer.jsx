import React, { Component } from "react";
import { getOneOffer } from "../../services/tiyService";
import Spinner from "../common/spinner";
import { Link } from "react-router-dom/Link";

class OneOffer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tiyId: this.props.match.params.tiyId,
      offerId: this.props.match.params.offerId,
      token: this.props.token,
      isLoaded: false,
      user: this.props.user,
      data: []
    };
  }
  async componentDidMount() {
    try {
      const { tiyId, offerId } = this.state;
      const { data } = await getOneOffer(tiyId, offerId);
      console.log(data);
      this.setState({ isLoaded: true, data });
    } catch (e) {
      console.log(e);
    }
  }
  render() {
    const { tiyId, offerId, data, isLoaded } = this.state;
    const { offer } = data;
    console.log(this.state);
    console.log(this.props);
    console.log(tiyId);
    console.log(offerId);
    if (!isLoaded) {
      return <Spinner />;
    }
    return (
      <div className="container-fluid">
        <ul>
          <li>{offer.name}</li>
          <li>{offer.airline}</li>
          <li>{offer.dayDuration}</li>
          <li>{offer.departDate}</li>
          <li>{offer.dest}</li>
          <li>{offer.food}</li>
          <li>{offer.detail}</li>
          <li>{offer.highlight}</li>
          <li>{offer.member}</li>
          <li>{offer.nightDuration}</li>
          <li>{offer.price}</li>
          <li>{offer.returnDate}</li>
          <li>{offer.operatorName}</li>
        </ul>
      </div>
    );
  }
}

export default OneOffer;
