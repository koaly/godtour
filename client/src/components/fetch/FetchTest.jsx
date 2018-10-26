import React from "react"; // for import React.Component
import ReactTable from "react-table"; // for using ReactTable

import FetchAllUsers from "./FetchAllUsers.jsx";

class FetchClass extends React.Component{

	// study about lifecyces of React on 
	//			http://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/
	// inti class process Mounting
	constructor( props ){ 
		console.log("===============> FetchClass.constructor");	
		super( props ); // requirement to use this
		this.state = {
			IsLoading : true 
		}

		// important to binding that will make 'this' work in the callback
		this.FetchCallback = this.FetchCallback.bind( this );
	}


	componentDidMount(){ // this function call when after render one time
		console.log("===============> FetchClass.componentDidMount");	
		this.target_type = "user_name";
		this.target_data = "jui";
		this.fetch_data = new FetchAllUsers();
		this.fetch_data.get_specific_user( {type: this.target_type , data: this.target_data} 
											, this.FetchCallback );	
		
	}

	FetchCallback( ReceiveInformation , ReceiveData ){
		console.log("===============> FetchClass.FetchCallback");	
		console.log("=====> FetchCallback.ReceiveData " , ReceiveData );
		this.setState( state => ({
			IsLoading : false,
			Data : ReceiveData,
			Information : ReceiveInformation
		}));
	}

	render(){
		console.log("===============> FetchClass.render");	
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
//	please learn about condition in html when use react
//		on website https://reactjs.org/docs/conditional-rendering.html
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
						<p>Example Users who have {this.target_type} is { this.target_data }</p>
						{ data.have &&
							<p>	user id is { data.id }<br/>
								user email is { data.email }<br/> 
								user Google? is { data.use_google_id } </p>
						}
						{ ! data.have &&
							<p>Do not have user have email {data.email}</p>
						}
					</ul>		
				</div>
				
			);
		}
	}

}

export default FetchClass;
