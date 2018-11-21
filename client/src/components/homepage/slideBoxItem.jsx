import React, { Component } from "react";
import Link from "react-router-dom/Link";
import "./slideBoxItem.css";

export default class SlideBoxItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tour: this.props.tour,
      id: this.props.id
    };
  }
  render() {
    const { tour, id } = this.state;

    let name = "carousel-item";
    if (id === 0) {
      name += " active";
    }
    console.log(tour);
    return (
      <div className={name}>
        <Link to={`/tours/id=${tour._id}`}>
          <img
            className="d-block w-100"
            style={{ maxHeight: 600 }}
            src={tour.imgsrc}
            alt={tour.name}
          />
        </Link>
        <div className="carousel-caption d-md-block panel-transparent">
          <div className="panel-body">
            <h5 style={{ fontSize: "3.5vw" }}>{tour.name}</h5>
            <p style={{ fontSize: "2.5vw" }}>{tour.highlight}</p>
          </div>
        </div>
      </div>
    );
  }
}
