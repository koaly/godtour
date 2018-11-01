import React, { Component } from "react";
import Axios from "axios";

export default class showTour2 extends Component {
    constructor() {
        super()
        this.state = {
            tours: [],
            isLoaded: false
        }
    }
    async getTour(token) {
        this.setState({ isLoaded: false })
        const config = {
            headers: { Authorization: "JWT " + token }
        }
        const url = 'http://localhost:5000/tours/browse'
        try {
            const result = await Axios.get(url, config)
            console.log(result.data)
            const { tours } = result.data
            this.setState({ tours: tours })
        }
        catch (e) {
            console.log(e)
        }
        this.setState({ isLoaded: true })

    }
    componentDidMount() {
        const { token } = this.props

        this.getTour(token)
    }
    getURL(id) {
        return "http://localhost:3000/tours/id=" + id
    }
    render() {
        const { tours, isLoaded } = this.state
        if (!isLoaded) {
            return <h1>isLoaded</h1>
        }
        console.log(tours)
        if (!tours || tours.length == 0) {
            return <h1>notFoundTour</h1>
        }
        return (
            <div>
                <h1>Tour List</h1>
                <ul>
                    {tours.map(tour =>
                        <li key={tour._id}>
                            <h3>
                                {tour.name}
                                <a href={this.getURL(tour._id)}>
                                    next
                                </a>
                            </h3>
                        </li>
                    )}
                </ul>
            </div>
        )
    }
}
