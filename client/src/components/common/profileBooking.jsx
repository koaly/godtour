import React, { Component } from "react";
import { showCurrentBookings, removeCurrentBookings } from "../../services/profileService";
import { toast } from "react-toastify"
import { paginate } from "../../utility/paginate";
import { Link } from "react-router-dom"
import Pagination from "./pagination";
export default class ProfileBooking extends Component {
    constructor(props) {
        super(props)
        this.state = {
            booking: [],
            isLoaded: false,

            pageSize: 3,
            currentPage: 1,
        }
    }

    async getCurrentBooking() {
        try {
            const response = await showCurrentBookings()
            const { booking } = response.data

            this.setState({ booking })
            toast.info('Update BookingList')
        }
        catch (e) {
            const { message } = e.response.data.error
            toast.error(`${message}`)
        }
    }

    async removeBooking(id) {

        try {
            const response = await removeCurrentBookings(id)
            const { message } = response.data

            toast.success(`${message}`)
        }
        catch (e) {
            console.log(e)
            const message = e.response.data.error.message
            toast.error(`${message}`)
        }
    }
    handlePageChange = (page) => {
        this.setState({ currentPage: page })
    }


    handleDelete = async (id) => {
        this.setState({ isLoaded: false })

        await this.removeBooking(id)
        await this.getCurrentBooking()

        this.setState({ isLoaded: true })
    }
    async componentDidMount() {
        await this.getCurrentBooking()
        this.setState({ isLoaded: true })

    }

    render() {
        const { booking, isLoaded, currentPage, pageSize } = this.state;
        const { length: count } = this.state.booking;
        const selectBooking = paginate(booking, currentPage, pageSize)

        if (!isLoaded) {
            return <div>Loading</div>
        }

        console.log(booking)
        return (
            <div className="col-md-8 mgt">
                <p>{count} bookings</p>
                <table className="table">
                    <thead>
                        <tr>
                            <th>TourName</th>
                            <th>Amount</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {selectBooking.map((book, i) => (
                            <tr key={i}>
                                <td>{book.tourName}</td>
                                <td>{book.amountBooking}</td>
                                <td>{book.bookingDate}</td>
                                <td><Link className="btn btn-primary btn-sm" to={`/tours/id=${book.tourID}`}>Goto</Link></td>
                                <td>
                                    <button
                                        onClick={() => this.handleDelete(book.id)}
                                        className="btn btn-danger btn-sm"
                                    >
                                        Delete
                                </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <Pagination
                    itemsCount={count}
                    pageSize={pageSize}
                    onPageChange={this.handlePageChange}
                    currentPage={currentPage}
                />
            </div>
        )
    }


}