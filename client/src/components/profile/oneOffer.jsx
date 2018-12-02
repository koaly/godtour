import React, { Component } from "react";
import { getOneOffer } from "../../services/tiyService";
import Spinner from "../common/spinner";
import { Link } from "react-router-dom/Link";
import { ClockIcon,
AirlineSeatReclineNormalIcon,
AirplaneIcon,
StarIcon,
CoinIcon,
FileDocumentIcon,
HumanMaleIcon,
AirplaneTakeoffIcon,
AirplaneLandingIcon,
FoodIcon,
AccountGroupIcon,
LandscapeIcon
} from "mdi-react";

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
      <div className="container">
        <div className="profile-container bglight mgtb">
          <h1 className="profile-head">{offer.name} Tour</h1>
          <ul>
            <h5 className="ml-4 my-3"><StarIcon className="mr-3 mb-1" />Highlight: {offer.highlight}</h5>
            <h5 className="ml-4 my-3"><ClockIcon className="mr-3 mb-1" />{offer.dayDuration} Day(s) {offer.nightDuration} Night(s)</h5>
            <h5 className="ml-4 my-3"><AirplaneIcon className="mr-3 mb-1" />Fly with {offer.airline}</h5>
            <h5 className="ml-4 my-3"><CoinIcon className="mr-3 mb-1" />Price: {offer.price} &#3647;</h5>
            <h5 className="ml-4 my-3"><AirplaneTakeoffIcon className="mr-3 mb-1" />Departure Date: {offer.departDate}</h5>
            <h5 className="ml-4 my-3"><AirplaneLandingIcon className="mr-3 mb-1" />Return Date: {offer.returnDate}</h5>
            <h5 className="ml-4 my-3"><LandscapeIcon className="mr-3 mb-1" />Destination: {offer.dest}</h5>
            <h5 className="ml-4 my-3"><FoodIcon className="mr-3 mb-1" />Food: {offer.food}</h5>
            <h5 className="ml-4 my-3"><AccountGroupIcon className="mr-3 mb-1" />Member: {offer.member}</h5>
            <h5 className="ml-4 my-3"><FileDocumentIcon className="mr-3 mb-1" />Detail: {offer.detail}</h5>
            <h5 className="ml-4 my-3"><HumanMaleIcon className="mr-3 mb-1" />Operated by {offer.operatorName}</h5>
          </ul>
        </div>
      </div>
    );
  }
}

export default OneOffer;
