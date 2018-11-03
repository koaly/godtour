import React, { Component } from "react";

class createTourForm extends Component{

	constructor( props ){
		super( props );
		this.state={
			isLoading : true
		};
	}

	componentDidMount() {
		sessionStorage.setItem("tourLastLink" , "/createTour");
		var test = sessionStorage.getItem("tourLastLink");
		console.log("test sessionStorage is " , test);
	}

	render(){
		return(
			<div className = "mgtb container">
				<h1>Create Tour</h1>
			</div>
		);
	}
}

export default createTourForm;
