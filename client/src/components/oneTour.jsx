import React, { Component } from "react";
import Axios from "axios";
import { toast } from "react-toastify";
import { getSpecificTour, booking } from "../services/specificTourService";

export default class OneTour extends Component {
	constructor(props) {
		super(props);
		this.state = {
			id: this.props.match.params.id,
			tour: [],
			token: this.props.token,
			isLoaded: false,
			isLoadToken: false,
			numberOfBooking: 0,
			textLoad : "Now Loading"
		};
		this.count = 0 ;
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.changeLoading = this.changeLoading.bind(this);
		this.intervalLoadingID = setInterval( this.changeLoading , 100 );
	}

	async getOneTour() {
		this.setState({ isLoaded: false });
		try {
			const result = await getSpecificTour(this.state.id);
			const { tour } = result.data;
			this.setState({ tour: tour[0] });
			clearInterval( this.intervalLoadingID );
		} catch (e) {
			console.log(e.response);
		}
		this.setState({ isLoaded: true });
	}	

	async BookingOneTour() {
		this.setState({ isLoaded: false });
		const field = {
			amountBooking: this.state.numberOfBooking
		};

		try {
			const result = await booking(this.state.id, field);
			toast.success(`${result.data.message}`);
		} catch (e) {
			toast.error(`${e.response.data.message}`);
			console.log(e.response);
		}
		this.setState({ isLoaded: true });
	}

	componentDidMount() {
		this.getOneTour();
	}

	handleChange(event) {
		this.setState({ numberOfBooking: event.target.value });
	}

	handleSubmit(event) {
		this.BookingOneTour();
	}

	changeLoading( empty ){
		let addingText = "";
		if( this.count === 0 ){
			addingText = "";
			this.count = 1;
		}
		else if( this.count === 1){
			addingText = ".";
			this.count = 2;
		}
		else if( this.count === 2){
			addingText = "..";
			this.count = 3;
		}
		else{
			addingText = "...";
			this.count = 0;
		}
		this.setState( state => ({
			textLoad : "Now Loading"+addingText
		}));
	}

	render() {
		const { tour, isLoaded } = this.state;
		console.log( this.state.textLoad)
		if (!isLoaded) {
			return <h1>{this.state.textLoad}</h1>;
		}
		if (!tour || tour.length === 0) {
			return <h1>notFoundTour</h1>;
		}
		return (
			<div>
				<h1>{tour.name}</h1>
				<h3>{tour.price} $</h3>
				<h3>{tour.airline}</h3>
				<h3>
					{tour.currentSeat}/{tour.maxSeat}
				</h3>
				<h3>by {tour.operatorName}</h3>
				<h3>fly with {tour.airline}</h3>
				<form onSubmit={this.handleSubmit}>
					<label>
						amountBooking:
						<input
							type="text"
							value={this.state.numberOfBooking}
							onChange={this.handleChange}
						/>
					</label>
					<input type="submit" value="Booking" />
				</form>
			</div>
		);
	}
}
