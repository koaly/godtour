import React, { Component } from "react";
import "../css/showtour.css"
import FetchAllTours from "./fetch/FetchAllTours";

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
					{this.state.ListTour.map( tour => 
						<li key={tour.id} className = "BlockTour">
							<h3 className="HeadTour TestBlock">{tour.name}</h3>
							<p className="SeatTour TestBlock"> 
								booked : {tour.free_seat}/{tour.max_seat}
							</p>
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
