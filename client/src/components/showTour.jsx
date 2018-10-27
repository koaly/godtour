import React, { Component } from "react";
import styles from "./../css/showtour.css"

class ShowTour extends Component {
	
	constructor( props ){
		super( props )
		this.state = {	Loading		: true

		}
		this.ShowMoreCallback = this.ShowMoreCallback.bind(this)
	}

	ShowMoreCallback(){
		console.log("===============>ShowTour:ShowMoreCallback")
	}

	render() {
		return (
			<div className="container mgtb">
				<h1>Tour List</h1>
				<button	className	= "ButtonMoreTour"
						onClick		= { this.ShowMoreCallback }
				>
					{ this.state.Loading ? 'Loading' : 'More Tour!' }
				</button>
			</div>
		);
	}
}

export default ShowTour;
