import React, { Component } from "react";
import Form from "./common/form";
import { TrashCanIcon, CancelIcon } from "mdi-react";

class CancelBook extends Component {
  render() {
    return (
      <div className="container">
      <div className="row">
        <div className="col-md-3"></div>
        <div className="col-md-6">
          <div className="cancel-booking ">
            <center className="mt-2 mb-2">
              <h1 className="mb-4 ">Are you sure ?</h1>
              <button className="btn btn-danger btn-lg mb-4 mr-4 ">
                Delete <TrashCanIcon className="ml-1" />
              </button>
              <button className="btn btn-primary btn-lg mb-4">
                Cancel <CancelIcon className="ml-1" />
              </button>
            </center>
          </div>
        </div>
        <div className="col-md-3"></div>
      </div>
      </div>
    );
  }
}

export default CancelBook;
