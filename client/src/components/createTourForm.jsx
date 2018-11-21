import React, { Component } from "react";
import listCountries from "./common/dataList";
import findDiffDay from "./common/otherFunction"; 
import { toast } from "react-toastify";
import FormInput from "./common/formInput";

class createTourForm extends FormInput {

	constructor( props ){
		super( props );
		this.state={
			fillingForm	: true
			, user		: props.user
			, dataTour	: { name				: ""
							, dest				: ""
							, minPrice			: 0
							, maxPrice			: 0
							, minDuration		: 0
							, maxDuration		: 0
							, minMember			: 0
							, maxMember			: 0
							, food				: 0
							, startFreeDate		: null
							, endFreeDate		: null
							, requireGuide		: false
							, detail			: ""
							, highlight			: ""
						  }
		};
		this.handleChange = this.handleChange.bind( this );
		this.handleSubmitData = this.handleSubmitData.bind( this );
		this.notReloadFunction = this.notReloadFunction.bind( this );
		this.conditionValue = [ "requireGuide"]
		this.numericalValue = [	"minDuration" , "maxDuration" , "minMember" , "maxMember"
								, "food" , "minPrice" , "maxPrice"];
	}

	notReloadFunction(){
		return false;
	}

	handleSubmitData( event ){
		var result = true;
		if( ! document.getElementById("name").checkValidity() ){
			toast.error("require your tour name");
			result = false;
		}
		if( ! document.getElementById("dest").checkValidity()){
			toast.error("require your destination");
			result = false;
		}
		if( this.state.dataTour.startFreeDate === null 
					|| this.state.dataTour.endFreeDate === null){
			toast.error("require period free date");
			result = false;
		}
		else{ 
			var startPeriod = new Date( this.state.dataTour.startFreeDate );
			var endPeriod = new Date( this.state.dataTour.endFreeDate );
			var freePeriod = findDiffDay(endPeriod , startPeriod);
			if( this.state.dataTour.maxDuration > freePeriod ){
				toast.error("Day of tour must less more than period of tour");
				result = false;
			}
		}
		if( result ){
			var submitDataTour = this.state.dataTour;
			localStorage.setItem("submitDataTour" , JSON.stringify(submitDataTour) );
			window.location="/sumDataCreateTour";
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
			return( <div className = "mgtb container">
				<h1>Create Tour</h1>
				<ul>
					<li>
						<label>Your Tour Name : </label>
						{ this.formHandle['textarea'](	"name"			, "name"
														, this.handleChange	, true
						)}
					</li>
					<li>
						<label>Your Destination : </label>
						{ this.formHandle['textarea'](	"dest"			, "dest"
														, this.handleChange , true
						) }
					</li>
					<li>
						<label>Many you group  :&emsp;</label>
						<label>MIN</label>
						{ this.formHandle['number']( "minMember"		, "minMember" 
													, this.handleChange , false
													, this.state.dataTour.minMember
													, "0"
						)}
						<label>MAX</label>
						{ this.formHandle['number']( "maxMember"		, "maxMember"
													, this.handleChange , false
													, this.state.dataTour.maxMember
													, this.state.dataTour.minMember.toString()
						)}
					</li>
					<li>
						<label>Duration Tour :&emsp;</label>
						<label>MIN&emsp;</label>
						{ this.formHandle["number"]( "minDuration"		, "minDuration"
													, this.handleChange , false
													, this.state.dataTour.minDuration.toString()
													, "0"
						)}
						<label>MAX&emsp;</label>
						{ this.formHandle["number"]( "maxDuration"		, "maxDuration"
													, this.handleChange , false
													, this.state.dataTour.maxDuration.toString()
													, this.state.dataTour.minDuration.toString()
						)}
					</li>
					<li>
						<label>Period Tour :&emsp;</label>
						<label>Start&emsp;</label>
						{ this.formHandle["date"]( "startFreeDate"		, "startFreeDate"
													, this.handleChange , false
						)}
						<label>End&emsp;</label>
						{ this.formHandle["date"]( "endFreeDate"		, "endFreeDate"
													, this.handleChange , false
						)}
					</li>
					<li>
						<label>Price:&emsp;</label>
						<label>&ensp;MIN</label>
						{ this.formHandle["number"]( "minPrice"			, "minPrice"
													, this.handleChange , false
													, this.state.dataTour.minPrice.toString()
													, "0"
						)}
						<label>&ensp;MAX</label>
						{ this.formHandle["number"]( "maxPrice"			, "maxPrice"
													, this.handleChange , false
													, this.state.dataTour.maxPrice.toString()
													, this.state.dataTour.minPrice.toString()
						)}
					</li>
					<li>
						<label>Food:&emsp;</label>
						{ this.formHandle["number"]( "food"				, "food"	
													, this.handleChange , false
													, this.state.dataTour.food
													, "0"
						)}
					</li>
					<li>
						<label>Want Guide&ensp;</label>
						{ this.formHandle["radio"]( "radio"				, "requireGuide"
													, this.handleChange	
													, this.state.dataTour.requireGuide 
													, "true" 
						)} YES 
						{ this.formHandle["radio"]( "radio"				, "requireGuide"
													, this.handleChange	
													, ! this.state.dataTour.requireGuide 
													, "false" 
						)} NO 
					</li>
					<li>
						<p>Message to Tourism</p>
						{ this.formHandle["manyText"]( "detail"			, "detail"
													, this.handleChange	, false
													, "60"				, "5"
													, "Let us know about your desired"
						)}
					</li>
					<li>
						<p>Message special detail of this tour</p>
						{ this.formHandle["manyText"]( "highlight"		, "highlight"
													, this.handleChange , false
													, "60"				, "5"
													, "Let us know about your desired"
						)}
					</li>
					<button onClick={this.handleSubmitData}>SUBMIT</button>	
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
