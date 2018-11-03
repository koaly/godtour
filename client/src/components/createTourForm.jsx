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
							, dayDuration		: "0"
							, nightDuration		: "0"
							, numberChild		: "0"
							, numberAdult		: "0"
							, privateTour		: true
							, requireGuide		: false
						  }
		};
		this.handleChange = this.handleChange.bind( this );
		this.conditionVale = ["privateTour" , "requireGuide"]
	}

	handleChange( event ){
		if( this.conditionVale.includes( event.target.name ) ){
			if( event.target.value === "true") this.state.dataTour[ event.target.name ] = true;
			else this.state.dataTour[ event.target.name ] = false;
		}
		else{
			this.state.dataTour[ event.target.name ] = event.target.value;
		}
		console.log( "=====> handleChange.state " , this.state);
		this.forceUpdate();
	}

	componentDidMount() {
		console.log("===============> createTourForm.componentDidMount");
		sessionStorage.setItem("tourLastLink" , "/createTour");
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
						<label>Country : </label>
						<input	type="textarea" list="listCountries" name="country"
								onChange={this.handleChange} 
						/>
						<datalist id="listCountries">
							{ listCountries.map( ( country) =>
							<option key={country} value={ country }/>
							)}
						</datalist>
					</li>
					<li>
						<label>Province : </label>
						<input	type="textarea" name="province"
								onChange={this.handleChange.bind}
						/>
					</li>
					<li>
						{ this.state.dataTour.requireGuide ? (<div>
							<label>Require Guide : </label>
							<input	type="radio" name="requireGuide" value="true" 
									checked="checked"
									onChange={this.handleChange}/> YES
							<input	type="radio" name="requireGuide" value="false" 
									onChange={this.handleChange}/> NO
						</div>) : (<div>
							<label>Require Guide : </label>
							<input	type="radio" name="requireGuide" value="true" 
									onChange={this.handleChange}/> YES
							<input	type="radio" name="requireGuide" value="false" 
									checked="checked"
									onChange={this.handleChange}/> NO
						</div>)
						}
					</li>
					<li>
						<label>people in your group  :&emsp;</label>
						<label>children</label>
						<input	type="number" name="numberChild" min="0"  
								value={this.state.dataTour.numberChild}
								onChange={this.handleChange}
						/>
						<label>Adult</label>
						<input	type="number" name="numberAdult" min="0" 
								value={this.state.dataTour.numberAdult}
								onChange={this.handleChange}
						/>
					</li>
					<li>
						{ this.state.dataTour.privateTour ? (<div>
							<label>Private Tour : </label>
							<input	type="radio" name="privateTour" value="true"
									checked="checked"
									onChange={ this.handleChange}/> YES
							<input	type="radio" name="privateTour" value="false" 
									onChange={this.handleChange}/> NO	
						</div>) : (<div>
							<label>Private Tour : &emsp</label>
							<input	type="radio" name="privateTour" value="true"
									onChange={ this.handleChange}/> YES
							<input	type="radio" name="privateTour" value="false" 
									checked="checked"
									onChange={this.handleChange}/> NO	
						</div>)
						}
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

