import React, { Component } from "react";
import { showRandomTour } from "../../services/homeService";
import { toast } from "react-toastify";
import Spinner from "./spinner";
import SlideBoxItem from "./slideBoxItem";
import "./slideBoxItem.css"
export default class SlideBox extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tours: [],
            isLoaded: false,
        }
    }
    async getTour() {
        try {
            const response = await showRandomTour();
            const { tours } = response.data
            this.setState({ tours })
        }
        catch (e) {
            const message = e.response.data.error.message
            toast.error(`${message}`)
        }
    }
    async componentDidMount() {
        await this.getTour()
        this.setState({ isLoaded: true })
    }
    createTab = (max) => {
        let result = []

        // Outer loop to create parent
        for (let i = 1; i < max; i++) {
            result.push(<li data-target="#carouselExampleIndicators" data-slide-to={i} />)
        }
        return result
    }
    render() {
        const { isLoaded, tours } = this.state
        console.log(tours)
        if (!isLoaded) {
            return (
                <Spinner />
            )
        }

        return (
            <div
                id="carouselExampleIndicators"
                className="carousel slide mb-5"
                data-ride="carousel"
            >
                <ol className="carousel-indicators">
                    <li
                        data-target="#carouselExampleIndicators"
                        data-slide-to="0"
                        className="active"
                    />
                    {this.createTab(tours.length)}
                </ol>
                <div className="carousel-inner">
                    {tours.map((tour, i) => (

                        <SlideBoxItem key={i} id={i} tour={tour} />
                    ))}
                </div>
                <a
                    className="carousel-control-prev panel-heading"
                    href="#carouselExampleIndicators"
                    role="button"
                    data-slide="prev"
                >
                    <span className="carousel-control-prev-icon" aria-hidden="true" />
                    <span className="sr-only">Previous</span>
                </a>
                <a
                    className="carousel-control-next panel-heading"
                    href="#carouselExampleIndicators"
                    role="button"
                    data-slide="next"
                >
                    <span className="carousel-control-next-icon" aria-hidden="true" />
                    <span className="sr-only">Next</span>
                </a>
            </div>
        )
    }
}