import React, { Component } from "react";
import { toast } from "react-toastify";
import { acceptStatus } from "../../services/requestStatusService";

export default class AcceptStatusButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.id,
      updateStatus: this.props.acceptStatus,
      isAccepting: false
    };
    console.log(this.state.updateStatus);
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
    const { updateStatus } = this.state;
    this.setState({ isAccepting: true });

    await this.acceptStatusById(id);
    await updateStatus();
    this.setState({ isAccepting: false });
  };

  render() {
    const { isAccepting, id } = this.state;

    if (!isAccepting) {
      return (
        <button
          onClick={() => this.handleAccept(id)}
          className="btn btn-success btn"
        >
          Accept
        </button>
      );
    } else {
      return <button className="btn btn-success btn-sm">Loading</button>;
    }
  }
}
