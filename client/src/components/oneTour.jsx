import React, { Component } from "react";
import Axios from "axios";

export default class OneTour extends Component {
  constructor() {
    super()
    this.state = {
      tour: [],
      isLoaded: false
    }
  }
  async getOneTour(id, token) {
    this.setState({ isLoaded: false })
    const config = {
      headers: { Authorization: "JWT " + token }
    }
    console.log(config)

    const url = 'http://localhost:5000/tours/' + id
    console.log(url)
    try {
      const result = await Axios.get(url, config)
      const { tour } = result.data
      this.setState({ tour: tour[0] })
    }
    catch (e) {
      console.log(e.response)
    }
    this.setState({ isLoaded: true })

  }
  componentDidMount() {
    const { id } = this.props.match.params
    const { token } = this.props
    console.log(token)

    this.getOneTour(id, token)
  }

  render() {
    const { tour, isLoaded } = this.state
    if (!isLoaded) {
      return <h1>isLoading</h1>
    }
    if (!tour || tour.length === 0) {
      return <h1>notFoundTour</h1>
    }
    console.log(tour)
    return (
      <div>
        <h1>{tour.name}</h1>
        <h3>{tour.price} $</h3>
        <h3>{tour.airline}</h3>
        <h3>{tour.currentSeat}/{tour.maxSeat}</h3>
        <h3>by {tour.operatorName}</h3>
        <h3>fly with {tour.airline}</h3>
      </div>
    )
  }
}
