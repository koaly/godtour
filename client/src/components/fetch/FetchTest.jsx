import React from "react";
import FetchMain from "./FetchMain.jsx";

class FetchClass extends React.Component{
// display
	
	constructor( props ){
		console.log("In constructor");
		super( props );
		this.fetch_class = new FetchMain("users")
		this.finish = false;
		this.list_item = [];
		this.state = {
			error: null,
			isLoading: false,
			num_res: 0,
			url: ""
		}
		// if you run this you will see render have run before get_data finished
	/*		
		[ this.header , this.data ] = this.fetch_class.get_data()
		console.log("Finish get data ")
		this.finish = true
		this.forceUpdate()
	*/
		// didn't good because not sure I think rendor run after this constructor finish	
	}

	componentDidMount(){ // this function call when rendor first time
		[ this.header , this.data ] = this.fetch_class.get_data()
		console.log("Finish get data ")
		this.finish = true
		this.forceUpdate()
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
