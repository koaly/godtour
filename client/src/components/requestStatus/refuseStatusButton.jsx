import React, { Component } from "react";
import { toast } from "react-toastify";
import { refuseStatus } from "../../services/requestStatusService";

export default class RefuseStatusButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.id,
      updateStatus: this.props.acceptStatus,
      isAccepting: false
    };
    console.log(this.state.updateStatus);
  }
  refuseStatusById = async id => {
    try {
      const response = await refuseStatus(id);
      const { msg } = response.data;

      toast.success(`${msg}`);
      // window.location = "/admin/request";
    } catch (e) {
      console.log(e);
      const msg = e.response.data.error.msg;
      toast.error(`${msg}`);
    }
  };

  handleAccept = async id => {
    const { updateStatus } = this.state;
    this.setState({ isAccepting: true });

    await this.refuseStatusById(id);
    await updateStatus();
    this.setState({ isAccepting: false });
    // window.location = "/admin/request";
  };

  render() {
    const { isAccepting, id } = this.state;

    if (!isAccepting) {
      return (
        <button
          onClick={() => this.handleAccept(id)}
          className="btn btn-danger btn"
        >
          Refuse
        </button>
      );
    } else {
      return <button className="btn btn-danger btn-sm">Loading</button>;
    }
  }
}
