import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../css/showtour.css"

class createTourForm extends Component{

	constructor( props ){
		super( props );
		this.state={
			isLoading : true
		};
	}

	componentDidMount() {}

	render(){
		return(<div className = "mgtb container">
			<h1>Create Tour</h1>
		</div>)
	}
}

export default createTourForm;
