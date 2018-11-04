import React, { Component } from "react"
import { deleteTour } from "../../services/tourService"
import { toast } from "react-toastify";

export default class DeleteTourBar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: this.props.id,
            updateTour: this.props.updateTour,
            isDeleting: false
        }

    }
    removeTourById = async (id) => {
        try {
            const response = await deleteTour(id)
            const { message } = response.data

            toast.success(`${message}`)
        }
        catch (e) {
            console.log(e)
            const message = e.response.data.error.message
            toast.error(`${message}`)
        }
    }

    handleDelete = async (id) => {
        const { updateTour } = this.state
        this.setState({ isDeleting: true })

        await this.removeTourById(id)
        await updateTour()
        this.setState({ isDeleting: false })
    }

    render() {
        const { isDeleting, id } = this.state

        if (!isDeleting) {
            return (
                <button
                    onClick={() => this.handleDelete(id)}
                    className="btn btn-danger btn-sm"
                >
                    Delete
                </button>
            )
        } else {
            return (
                <button
                    className="btn btn-danger btn-sm"
                >
                    Loading
                </button>
            )
        }
    }
}