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
    return <h1>Offer</h1>;
  }
}
