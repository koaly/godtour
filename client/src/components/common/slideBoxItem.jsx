import React, { Component } from "react";
import Link from "react-router-dom/Link";
import "./slideBoxItem.css"

export default class SlideBoxItem extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tour: this.props.tour,
            id: this.props.id
        }
    }
    render() {
        const { tour, id } = this.state

        let name = "carousel-item"
        if (id === 0) {
            name += " active"
        }
        console.log(tour)
        return (
            <div className={name}>
                <Link to={`/tours/id=${tour._id}`}>
                    <img
                        className="d-block w-100"
                        width="800"
                        height="600"
                        src={tour.imgsrc}
                        alt={tour.name}
                    />
                    <div className="carousel-caption d-none d-md-block panel-transparent">
                        <div className="panel-body">
                            <h5>{tour.name}</h5>
                            <p>{tour.highlight}</p>
                        </div>

                    </div>
                </Link>
            </div>
        )
    }
}