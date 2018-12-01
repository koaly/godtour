import React, { Component } from "react";
import { getOwnOffer } from "../../../services/tiyService";
import { toast } from "react-toastify";

export default class OfferBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false
    };
  }
  async getOffer() {
    try {
      const response = await getOwnOffer();
      console.log(response);
      const { offers } = response.data;

      this.setState({ offers, isLoaded: true });
      console.log(offers);
      console.log(offers[0].airline);
      toast.info("Update OfferList");
    } catch (e) {
      const { message } = e.response.data.error;
      toast.error(`${message}`);
    }
  }
  async componentDidMount() {
    await this.getOffer();
  }
  render() {
    console.log(this.state.offers);
    const { offers, isLoaded } = this.state;
    return (
      <div className="profile-infor mx-3 ">
        <p>Offer</p>
        <div className="ovft">
          <table className="table">
            <thead>
              <tr>
                <th>TourName</th>
                <th>Price</th>
                <th>DepartDate/ReturnDate</th>
              </tr>
            </thead>
            {isLoaded &&
              offers.map(o => (
                <tbody>
                  <tr>
                    <td>{o.name}</td>
                    <td>{o.price}</td>
                    <td>
                      {o.departDate}/{o.returnDate}
                    </td>
                    <td>
                      <button className="btn btn-danger btn-sm">Delete</button>
                    </td>
                  </tr>
                </tbody>
              ))}
          </table>
        </div>
      </div>
    );
  }
}
