import React, { Component } from "react";
import listCountries from "./common/dataList";

class createTourForm extends Component{

	constructor( props ){
		console.log("===============> createTourForm.constructor");
		super( props );
		console.log("=====> constructor.props " , props);
		this.state={
			isLoading	: true
			, user		: props.user
			, dataTour	: { country				: ""
							, province			: ""
							, dayDuration		: 0
							, nightDuration		: 0
							, sizeofYourGroup	: { child	: 0
													, adult : 0	
												}
							, privateTour		: true
						  }
		};
//		this.handleChange = this.handleChange.bind( this );
	}

	handleChange( type , event ){
		this.state.dataTour[ type ] = event.target.value;
		console.log( "=====> handleChange.state " , this.state);
	}

	componentDidMount() {
		console.log("===============> createTourForm.componentDidMount");
		sessionStorage.setItem("tourLastLink" , "/createTour");
		var test = sessionStorage.getItem("tourLastLink");
		console.log("test sessionStorage is " , test);
	}

	render(){
		console.log("===============> createTourForm.render" , this.state );
		if( this.state.user === null){
			return(<div> 
				<h1>Please Login Before Create Tour by Yourself</h1>
			</div>);
		}
		else if( this.state.user.info.status === 0 ){
			return(<div className = "mgtb container">
				<h1>Create Tour</h1>
				<ul>
					<li>
						<label>Country</label>
						<input	type="textarea" list="listCountries" 
								onChange={this.handleChange.bind( this , "country")}
						/>
						<datalist id="listCountries">
							{ listCountries.map( ( country) =>
							<option value={ country }/>
							)}
						</datalist>
					</li>
				</ul>
			</div>);
		}
		else{
			return(<div>
				<h1>Redirect Link to Page AddTour</h1>
			</div>);
		}
	}

}

export default createTourForm;

// Detail For Create Tour By YourSelf what is to should have
// Requirement Data
// maxPrice "The Most Price Costumer Can pay for this tour"
// Day & Night Duration "How many Day or Night Customer want to go for this tour"
// Period time for this Trip
// Country
// Province
// RequireGuide
// sizeOfYourGroup
// privateOrPublic
// Addition Select

