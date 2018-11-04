import React, { Component } from "react";
import { sendDataCeateTourByUser } from "./../services/userCreateTourService"

class sumDataCreateTour extends Component{

	constructor( props ){
		super(props);
		this.state={
			user		: props.user
			, isLoading : true
		}
		this.dataTour = {};
		this.handleSendData = this.handleSendData.bind( this );
	}

	async handleSendData(){
		console.log("=====> handleSendData.dataTour" , this.dataTour );
		const result = await sendDataCeateTourByUser( this.dataTour );
		console.log("=====> handleSendData.result" , result );
	}

	componentDidMount(){
		this.dataTour = JSON.parse(localStorage.getItem("submitDataTour"));
		console.log("Information of user " , this.state.user )
		console.log("Information of dataTour" , this.dataTour );
		this.setState( state => ({
			isLoading : false
		}));
	}

	render(){
		if( this.state.isLoading ){
			return(<div>
				<h1>Now Loading!</h1>
			</div>)
		}
		return(<div>
			<h1>&emsp;Tour Name : {this.dataTour.name}</h1>
			<ul>
				<li>Destination : {this.dataTour.dest}</li>
			</ul>
			<button onClick={this.handleSendData}>Send Data</button>	
		</div>)
	}
}

export default sumDataCreateTour;
