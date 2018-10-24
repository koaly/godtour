import React from "react";
import FetchMain from "./FetchMain.jsx";

class FetchClass extends React.Component{
// display
	
	constructor( props ){
		console.log("In constructor");
		super( props );
		this.finish = false;
		this.list_item = [];
		this.state = {
			error: null,
			isLoading: false,
			num_res: 0,
			url: ""
		}
	}

	componentDidMount(){
		console.log("In function componentDidMount");
		this.fetch_data();
	}

	fetch_data(){
		console.log("In function fetch_data");
		fetch("http://localhost:5000/users")
			.then( response => {
				console.log( "status of response is " + response.status)
				this.state.num_res = response.status 
				this.state.url = response.url
				return response.json()
			})
			.then( json => { 
				console.log( json );
				console.log( "type of json " + typeof( json ) );
				this.finish = true;
				this.list_item = json;
				console.log( "finish setstate")
				console.log( typeof(this.state.isLoading) )
				this.state.isLoading = this.finish
				console.log( this.state )
				this.forceUpdate()
				console.log("After forceUpdate")
			})
	}
	
	render(){
		console.log("In render")
		const { error ,isLoading , item} = this.state;
		console.log("error is " + error);
		console.log("isLoading is " + isLoading );
		console.log("item is " + item);
		if( this.finish ){
			return(
				<div>
					<h1>Welcome to page for testing fetch</h1>
					<h2>General Information</h2>
					<ul>
						<li>&ensp;this status is {this.state.num_res}</li>
						<li>&ensp;last url is {this.state.url}</li>
					</ul>
					<h2>Data</h2>
					
				</div>
			);
		}
		else{
			return(
				<div>
					<h1>Welcome to page for testing fetch</h1>
					<p> Now Loading </p>
				</div>
			);
		}
	}
	
}

export default FetchClass;
