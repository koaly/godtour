import React, { Component } from "react";
import { toast } from "react-toastify";
import { acceptStatus } from "../../services/requestStatusService";

export default class acceptStatusButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.id,
      acceptStatus: this.props.acceptStatus,
      isAccepting: false
    };
  }
  acceptStatusById = async id => {
    try {
      const response = await acceptStatus(id);
      const { message } = response.data;

      toast.success(`${message}`);
    } catch (e) {
      console.log(e);
      const message = e.response.data.error.message;
      toast.error(`${message}`);
    }
  };

  handleAccept = async id => {
    const { acceptStatus } = this.state;
    this.setState({ isAccepting: true });

    await this.upgradeStatusById(id);
    await acceptStatus();
    this.setState({ isAccepting: false });
  };

  render() {
    const { isAccepting, id } = this.state;

    if (!isAccepting) {
      return (
        <button
          onClick={() => this.handleAccept(id)}
          className="btn btn-danger btn-sm"
        >
          Accept
        </button>
      );
    } else {
      return <button className="btn btn-danger btn-sm">Loading</button>;
    }
  }
}
