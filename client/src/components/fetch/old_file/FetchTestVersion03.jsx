import React from "react";
import ReactTable from 'react-table';
//import FetchMain from "./FetchMain.jsx";
import FetchAllUsers from "./FetchAllUsers.jsx";

class FetchClass extends React.Component{
// display
	
	constructor( props ){
		console.log("In constructor");
		super( props );
		this.fetch_class = new FetchAllUsers( this.callback ,this )
		this.finish = false;
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
//		this.fetch_class.get_all_user()
		this.fetch_class.get_specific_email("suck2@gmail.com")
		console.log("Finish get data ")	
	}

	callback( information , data , this_){
		console.log("<---------- In callback function ------------>")
		console.log("--------> receive data")
		console.log(information)
		console.log(data)
		console.log("--------> Information ")
		this_.state.num_res = information.status
		this_.state.url = information.url;
		console.log( this_.state );
		this_.data = data;	
		console.log("--------> data ")
		console.log( this_.data );
		console.log("--------> change isLoading")
		this_.state.isLoading = true
		this_.finish = true
		console.log("--------> finsh change isLoading")
	}

	render(){
		console.log("In render")
		const { error ,isLoading , item} = this.state;
		console.log("error is " + error);
		console.log("isLoading is " + isLoading );
// for use react table
		if( this.finish ){
			const data = this.data
			return(
				<div>
					<h1>Welcome to page for testing fetch</h1>
					<h2>General Information</h2>
					<ul>
						<li>&ensp;this status is {this.state.num_res}</li>
						<li>&ensp;last url is {this.state.url}</li>
					</ul>
					<h2>Data</h2>
					<ReactTable data = {data} 
						columns={[
							{ Header: "user_id" , accessor : "_id"}
							,{ Header: "email" , accessor : "email"}
							,{ Header: "is_google?" , accessor : "isGoogle"}
							,{ Header: "google_id" , accessor : "googleID"}
							,{ Header: "register_data" ,accessor : "registerDate"} 
						]}
					/>
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
