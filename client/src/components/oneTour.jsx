import React, { Component } from "react";
import Axios from "axios";
import { toast } from "react-toastify";

export default class OneTour extends Component {
  constructor(props) {
    super(props)
    this.state = {
      id: this.props.match.params.id,
      tour: [],
      token: this.props.token,
      isLoaded: false,
      isLoadToken: false,
      numberOfBooking: 0
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  async getOneTour() {

    //jui can use change this to service
    this.setState({ isLoaded: false })
    const config = {
      headers: { Authorization: "JWT " + this.state.token }
    }
    console.log(config)

    const url = 'http://localhost:5000/tours/' + this.state.id
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

  async BookingOneTour() {

    //jui can use change this to service
    this.setState({ isLoaded: false })
    const config = {
      headers: { Authorization: "JWT " + this.state.token },

    }
    const field = {
      amountBooking: this.state.numberOfBooking

    }
    console.log(config)
    const url = 'http://localhost:5000/tours/' + this.state.id

    try {
      const result = await Axios.post(url, field, config)
      toast.success(`${result.data.message}`)
    }
    catch (e) {
      toast.error(`${e.response.data.message}`)
      console.log(e.response)
    }


    this.setState({ isLoaded: true })
  }

  componentDidMount() {
    this.getOneTour()
  }

  handleChange(event) {
    this.setState({ numberOfBooking: event.target.value })
  }

  handleSubmit(event) {
    this.BookingOneTour()
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
        <form onSubmit={this.handleSubmit}>
          <label>
            amountBooking:
          <input type="text" value={this.state.numberOfBooking} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Booking" />
        </form>
      </div>
    )
  }
}
