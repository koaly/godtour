import React from "react"; // for import React.Component
import ReactTable from "react-table"; // for using ReactTable

import FetchUser extends React.Component{

	// study about lifecyces of React on 
	//			http://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/
	// inti class process Mounting
	constructor( props ){
		console.log("<---------- FetchUser : constructor ---------->")
		super( props ); // requirement to use this
		this.state = {
			IsLoading : true; // status now are loading
		}
		this.email = "suck@gmail.com";
		this.password = "123";
		// important to bindding you all function callback for using "this" in all callbck
		// please do in constructor 
		this.FetchLoginCallback = this.FetchLoginCallback.bind(this)
	}

	componentDidMount(){ // this function call auto when after run render one time by react
		console.log("<---------- FetchUser : componentDidMount ---------->");
		this.UserFetch = new FetchUser();
		this.UserFetch.login( this.email , this.password , this.FetchLoginCallback );
	}

	FetchLoginCallback( ReceiveInformation ,  ReceiveData ){
		console.log("<---------- FetchUser : FetchLoginCallback ---------->");
		console.log("<----- FetchUser : ReceiveInformation ----->");
		console.log( ReceiveInformation );
		console.log("<----- FetchUser : ReceiveData ----->");
		console.log( ReceiveData );
	}

	render(){
		console.log("<----------- FetchUser : render ---------->");
		if( this.state.IsLoading ){
			return(
				<div>
					<h1>Welcome to page for test fetch_post</h1>
					<h2>You use login</h2>
					<ul>
						<li>email is {this.email}</li>
						<li>password is {this.password}</li>
					</ul>
				</div>
			);
		}
	}
	

}
