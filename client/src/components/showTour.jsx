import React, { Component } from "react";
import styles from "./../css/showtour.css";
import FetchAllTours from "./fetch/FetchAllTours";

class ShowTour extends Component {
	
	constructor( props ){
		super( props )
		this.state = {	
			Loading		: true
		}
		this.ShowMoreCallback = this.ShowMoreCallback.bind(this)
		this.FetchReceiveTourCallback = this.FetchReceiveTourCallback.bind(this)
		this.FetchAllTours = new FetchAllTours();
	}

	ShowMoreCallback(){
		console.log("===============> ShowTour:ShowMoreCallback");
		this.setstate( state => ({
			Loading		: true
		}));	
	}

	componentDidMount(){
		console.log("===============> ShowTour:componentDidMount");
		this.FetchAllTours.get_all_tours( 0 , 5 , this.FetchReceiveTourCallback );
	}

	FetchReceiveTourCallback( ReceiveInformation , ReceiveData ){
		console.log("===============> ShowTour.FetchReceiveTourCallback" , ReceiveData );
		this.setState( state => ({ 
			Loading		: false 
		}));
	}

	render() {
		console.log("===============> Show_tour.render()")
		return (
			<div className="container mgtb">
				<h1>Tour List</h1>
				{ this.state.Loading &&	<button	className = "GeneralButtonTour" > 'Now Loading!' 
					</button> }
				{ ! this.state.Loading && <button className = "ButtonMoreTour GeneralButtonTour"
						onClick = { this.ShowMoreCallback }> "More Tour!" </button>}
			</div>
		);
	}
}

export default ShowTour;
