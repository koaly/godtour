import React from "react";

class FetchClass extends React.Component{
// display
	
	constructor( props ){
		console.log("In constructor");
		super( props );
		this.state = {
			error: null,
			isLoading: false,
			item: []
		}
	}

	componentDidMount(){
		console.log("In function componentDidMount");
		this.fetch_data();
	}

	fetch_data(){
		console.log("In function fetch_data");
		fetch("http://localhost:5000/tours")
			.then( response => {
				console.log( "status of response is " + response.status)
				return response.json()
			})
			.then( json => { 
				console.log( json )
				console.log( "type of json " + typeof( json ) )
			}) 
	}
	
	render(){
		console.log("In render")
		const { error ,isLoading , item} = this.state;
		console.log("error is " + error);
		console.log("isLoading is " + isLoading );
		console.log("item is " + item);
		return(
			<div>
				<h1>Welcome to page for testing fetch</h1>
			</div>
		);
	}
	
}

export default FetchClass;
