import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../css/showtour.css"
import FetchAllTours from "./fetch/FetchAllTours";
import {ClockIcon, PlaneShieldIcon, AirlineSeatReclineNormalIcon, AirplaneIcon} from "mdi-react";

class ShowTour extends Component {

	constructor(props) {
		super(props)
		this.state = {
			Loading: true
			, Max: false
			, CurrentOrder: 0
			, ListTour: []
		}
		this.condition = 0; // 0 not anythin 1 is now loading 2 can look more tour
		this.ShowMoreCallback = this.ShowMoreCallback.bind(this)
		this.FetchReceiveTourCallback = this.FetchReceiveTourCallback.bind(this)
		this.FetchAllTours = new FetchAllTours();
	}

	ShowMoreCallback() {
		console.log("===============> ShowTour:ShowMoreCallback");
		this.FetchAllTours.get_all_tours(this.state.CurrentOrder, 5
			, this.FetchReceiveTourCallback)
		this.setState(state => ({
			Loading: true
		}));
	}

	componentDidMount() {
		console.log("===============> ShowTour:componentDidMount");
		this.FetchAllTours.get_all_tours(this.state.CurrentOrder, 5
			, this.FetchReceiveTourCallback);
	}

	FetchReceiveTourCallback(ReceiveInformation, ReceiveData) {
		console.log("===============> ShowTour.FetchReceiveTourCallback", ReceiveData);
		var temporary = this.state.ListTour;
		for (let count = 0; count < ReceiveData.length; count++) {
			temporary.push(ReceiveData[count])
		}
		if (ReceiveData.length === 5) {
			this.setState(state => ({
				Loading: false
				, CurrentOrder: this.state.CurrentOrder + 5
				, ListTour: temporary
			}));
		} else {
			this.setState(state => ({
				Loading: false
				, Max: true
				, CurrentOrder: this.state.CurrentOrder + ReceiveData.length
				, ListTour: temporary
			}));
		}
	}

	render() {
		console.log("===============> Show_tour.render()", this.state);
		if (this.state.Max) this.condition = 0;
		else {
			if (this.state.Loading) this.condition = 1;
			else this.condition = 2;
		}
		return (
			<div className="container mgtb">
				<h1>Tour List</h1>
				<ul>
{/* tour have data follow  database so have _v , _id , airline , currentSeat , dayDuration ,
 departDate , dest , ddetail , endBooking , food , freeSeat , highlight , maxSeat , name ,
 nightDuration , operatorID , operatorName , price , rating , ratineCount , returnDate ,
 startBooking */}
					{this.state.ListTour.map( tour => 
						<li key={tour._id} className = "card mb-5 card-size">
							<img src="https://d1nabgopwop1kh.cloudfront.net/hotel-asset/30000002100149018_wh_32" alt="sample image" className="mb-3"/>
							<div className="showtour-content">
								<h3 className="mb-3">{tour.name}</h3>
								<p> 
									<ClockIcon className="mr-3 mb-1"/>{tour.dayDuration} Day(s) {tour.nightDuration} Night(s)
								</p>
								<p> 
									<AirplaneIcon className="mr-3 mb-1"/>Fly with {tour.airline}
								</p>
								<p> 
									<AirlineSeatReclineNormalIcon className="mr-3 mb-1"/>Current Seat : {tour.currentSeat}/{tour.maxSeat} Seats
								</p>
								<Link className="" to={`/tours/id=${tour._id}`}>
									Read More...
								</Link>
							</div>
						</li>
					)}
				</ul>
				{this.condition === 1 &&
					<button className="GeneralButtonTour" > 'Now Loading!' </button>
				}
				{this.condition === 2 &&
					<button className="ButtonMoreTour GeneralButtonTour"
						onClick={this.ShowMoreCallback}> "More Tour!" </button>
				}
			</div>
		);
	}
}

export default ShowTour;
