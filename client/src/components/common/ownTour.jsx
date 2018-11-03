import React, { Component } from "react";
import { getOwnTours } from "../../services/tourService"
import { toast } from "react-toastify";
import Spinner from "./spinner";
import { paginate } from "../../utility/paginate";
import Link from "react-router-dom/Link";

export default class OwnTour extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tours: [],
            isLoaded: false,

            pageSize: 4,
            currentPage: 1,
        }
    }
    async getOwnTour() {
        this.setState({ isLoaded: false })

        try {
            const response = await getOwnTours()
            const { tours } = response.data

            this.setState({ tours })
            toast.info("Update TourList")
        }
        catch (e) {
            const { message } = e.response.data.error
            toast.error(`${message}`)
        }

        this.setState({ isLoaded: true })
    }
    componentDidMount() {
        this.getOwnTour()
    }
    render() {
        const { tours, isLoaded, currentPage, pageSize } = this.state
        const { length: count } = tours
        const selectTours = paginate(tours, currentPage, pageSize)
        if (!isLoaded) {
            return <Spinner />
        }

        return (
            <div>
                <p>{count} ownTour</p>
                <table className="table">
                    <thread>
                        <tr>
                            <th>TourName</th>
                        </tr>
                    </thread>
                    <tbody>
                        {selectTours.map((tour, i) => (
                            <tr key={i}>
                                <td><Link className="text-primary" to={`/tours/id=${tour._id}`}>{tour.name}</Link></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        )
    }
}