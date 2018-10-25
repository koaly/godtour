import React from "react"; // for import React.Component
import ReactTable from "react-table"; // for using ReactTable

import FetchAllUsers from "./FetchAllUsers.jsx";

class FetchClass extends React.Component{

	// study about lifecyces of React on 
	//			http://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/
	// inti class process Mounting
	constructor( props ){ 
		super( props ); // requirement to use this
		this.state = {
			IsLoading : true 
		}

		// important to binding that will make 'this' work in the callback
		this.FetchCallback = this.FetchCallback.bind( this );
	}


	componentDidMount(){ // this function call when after render one time
		console.log("<---------- FetchClass : componentDidMount ---------->")
		this.fetch_data = new FetchAllUsers();
		this.fetch_data.get_specific_user( {type:"email" , data:"suck3@gmail.com"} 
											, this.FetchCallback );	
		
	}

	FetchCallback( ReceiveInformation , ReceiveData ){
		console.log("<---------- FetchClass : FetchCallback ---------->")
		console.log("<----- FetchClass : ReceiveInformation ----->")
		console.log( ReceiveInformation )
		console.log("<----- FetchClass : ReceiveData ----->")		
		console.log( ReceiveData )
		this.setState( state => ({
			IsLoading : false,
			Data : ReceiveData,
			Information : ReceiveInformation
		}));
	}

	render(){
		console.log("<---------- FetchClass : render ---------->")
		if( this.state.IsLoading ){
			return(
				<div>
					<h1>Welcome to page for testing fetch</h1>
					<h2>Now Loading</h2>
				</div>
			);
		}
		else{
			const data = this.state.Data;
			return(
				<div>
					<h1>Welcome to page for testing fetch</h1>
					<h3>General Information</h3>
					<ul>
						<li>url {this.state.Information.url}</li>
						<li>status {this.state.Information.status}</li>
					</ul>
					<h3>Data</h3>
					<ul>
						<p>Example Users who have email suck3@gmail.com</p>
						<p>user id is { data.id }</p>
						<p>user email is { data.email }</p>
						<p>user Google? is { data.use_google_id }</p>
					</ul>		
				</div>
				
			);
		}
	}

}

export default FetchClass;
