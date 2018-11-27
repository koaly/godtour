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
      const { offer } = response.data;

      this.setState({ offer });
      toast.info("Update OfferList");
    } catch (e) {
      const { message } = e.response.data.error;
      //toast.error(`${message}`)
    }
  }
  async componentDidMount() {
    await this.getOffer();
  }
  render() {
    return (
        <div className="profile-infor mx-3 ">
        <p>Offer</p>
        <div className="ovft">
          <table className="table">
            <thead>
              <tr>
                <th>TourName</th>
                <th>Price</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
                  <tr>
                    <td>
                      Name
                    </td>
                    <td>
                      Price
                    </td>
                    <td>
                      Date
                    </td>
                    <td>
                      <button
                        className="btn btn-danger btn-sm"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
            </tbody>
          </table>
        </div>
      </div>
      );
  }
}
