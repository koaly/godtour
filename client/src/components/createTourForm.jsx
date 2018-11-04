import React, { Component } from "react";
import listCountries from "./common/dataList";
import findDiffDay from "./common/otherFunction"; 
import { toast } from "react-toastify";

class createTourForm extends Component{

	constructor( props ){
		console.log("===============> createTourForm.constructor");
		super( props );
		console.log("=====> constructor.props " , props);
		this.state={
			fillingForm	: true
			, user		: props.user
			, dataTour	: { country				: ""
							, province			: ""
							, dayDuration		: 0
							, nightDuration		: 0
							, numberChild		: 0
							, numberAdult		: 0
							, privateTour		: true
							, requireGuide		: false
							, startPeriodTour	: null
							, endPeriodTour		: null
							, maxPrice			: "1000"
							, specificDetail	: "Let us know what you want most in your tour"
						  }
		};
		this.handleChange = this.handleChange.bind( this );
		this.handleSubmitData = this.handleSubmitData.bind( this );
		this.notReloadFunction = this.notReloadFunction.bind( this );
		this.conditionValue = ["privateTour" , "requireGuide"]
		this.numericalValue = [	"dayDuration" , "nightDuration" , "numberChild" , "numberAdult"];
	}

	notReloadFunction(){
		return false;
	}

	handleSubmitData( event ){
		console.log( "===============>createTourForm.handleSubmitData " );
		var result = document.getElementById("createTourForm").checkValidity();
		console.log( "=====> handleSubmitData.result " , result );
		if( this.state.dataTour.startPeriodTour === null 
					|| this.state.dataTour.endPeriodTour === null){
			toast.error("require period tour");
			result = false;
		}
		else{ 
			var startPeriod = new Date( this.state.dataTour.startPeriodTour );
			var endPeriod = new Date( this.state.dataTour.endPeriodTour );
			var freePeriod = findDiffDay(endPeriod , startPeriod);
			if( this.state.dataTour.dayDuration > freePeriod ){
				toast.error("Day of tour must less more than period of tour");
			}
		}
		if( result ){
			this.setState( state => ({
				fillingForm : false
			}))
		}
		return false;
	}

	handleChange( event ){
		if( this.conditionValue.includes( event.target.name ) ){
			if( event.target.value === "true") this.state.dataTour[ event.target.name ] = true;
			else this.state.dataTour[ event.target.name ] = false;
		}
		else if( this.numericalValue.includes( event.target.name ) ){
			this.state.dataTour[ event.target.name ] = parseInt(event.target.value);
		}
		else{
			this.state.dataTour[ event.target.name ] = event.target.value;
		}
		this.forceUpdate();
		console.log( "=====> handleChange.state " , this.state);
	}

	componentDidMount() {
		console.log("===============> createTourForm.componentDidMount");
	}

	render(){
		console.log("===============> createTourForm.render" , this.state );
		if( this.state.user === null){
			return(<div> 
				<h1>Please Login Before Create Tour by Yourself</h1>
			</div>);
		}
		else if( this.state.user.info.status === 0 && this.state.fillingForm ){
			return(<div className = "mgtb container">
				<h1>Create Tour</h1>
				<ul>
					<li>
						<label>Country : </label>
						<input	type="textarea" list="listCountries"
								id = "createTourForm" 
								name="country" required
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
								onChange={this.handleChange}
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
						<label>Children</label>
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
					<li>
						<label>Length Tour :&emsp;</label>
						<label>Day&emsp;</label>
						<input	type="number" name="dayDuration" min="0"  
								value={this.state.dataTour.dayDuration}
								onChange={this.handleChange}
						/>
						<label>Night&emsp;</label>
						<input	type="number" name="nightDuration" min="0" 
								value={this.state.dataTour.nightDuration}
								onChange={this.handleChange}
						/>
					</li>
					<li>
						<label>Period Tour :&emsp;</label>
						<label>Start&emsp;</label>
						<input	type="date" name="startPeriodTour"
								onChange={this.handleChange}
						/>
						<label>End&emsp;</label>
						<input	type="date" name="endPeriodTour"
								onChange={this.handleChange}
						/>
					</li>
					<li>
						<label>Max Price:&ensp;&ensp;</label>
						<input	type="number" name="maxPrice"
								onChange={this.handleChange}
								value={this.state.dataTour.maxPrice}
								min="0"
						/>
					</li>
					<li>
						<p>Message to Tourism</p>
						<textarea	name="specificDetail" cols="60" rows="5" 
									onChange={this.handleChange}
									placeholder="Let us know what special do you want"
						></textarea>
					</li>
					<button onClick={this.handleSubmitData}>SUBMIT</button>	
				</ul>
			</div>);
		}
		else if( this.state.user.info.status === 0 ){
			const tour = this.state.dataTour; 
			return(<div>
				<h1>Summany request create tour by {this.state.user.info.displayName}</h1>
				<ul>
					<li>Country  : {tour.country}</li>
					<li>Province : {tour.province==="" ? "-" : tour.province }</li>
					<li>
						Duration Tour : {tour.dayDuration} Day(s) : {tour.nightDuration} night(s)
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

