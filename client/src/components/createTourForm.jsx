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
		this.testData = [ "Your Tour Name"	, "name" , this.handleChange	, true]
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

	updateData(){
/*	this.formData is array to collect information for create form it is 2 dimension array
		First Dimension tell many form have to fill data and have 2 component
		In each order have 2 component first component is type of form
			and second is array to input data to function create input form
*/
		this.formData = [
			[ "textarea" , ["Your Tour Name :", "name" , this.handleChange , true ] ] 
		,	[ "textarea" , ["Your Destination :" , "dest" , this.handleChange , true ] ]
		,	[ "doubleNumber" ,	[ "Many member your group : " , this.handleChange , "MIN"
									, "minMember" , this.state.dataTour.minMember , false , "MAX"
									, "maxMember" , this.state.dataTour.maxMember , false
								] ]
		,	[ "doubleNumber" ,	[ "Duration Tour :" , this.handleChange , "MIN" , "minDuration"
									, this.state.dataTour.minDuration.toString() , false , "MAX"
									, "maxDuration" , this.state.dataTour.maxDuration , false
								] ]
		,	[ "doubleDate" , [ "Period Tour :" , this.handleChange ,
									, "Start" , "startFreeDate" , false
									, "End" , "endFreeDate" , false
								] ]
		,	[ "doubleNumber" ,	[ "Price :" , this.handleChange , "MIN" , "minPrice" ,
									, this.state.dataTour.minPrice , false , "MAX" , "maxPrice"
									, this.state.dataTour.maxPrice , false 
								] ] 
		,	[ "number" , [ "Food" , "food" , this.handleChange , false 
									, this.state.dataTour.food , 0 ] ]
		,	[ "doubleRadio" , [  "Want Guide" , this.handleChange , "requireGuide" 
								, this.state.dataTour.requireGuide , "YES"	, "NO"
								] ]
		,	["manyText" , [ "Message to Tourism" , "detail" , this.handleChange	, false
									, "60"	, "5" , "Let us know about your desired"
								] ]
		,	["manyText" , [ "Message special detail of this tour" , "highlight"
									, this.handleChange , false , "60"	, "5"
									, "Let us know about your desired"
								] ]
		]
	}

	render(){
		console.log("===============> createTourForm.render" , this.state );
		this.updateData()
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
						{ this.formHandle['textarea'].apply( this , this.testData ) }
{/*						{ this.formHandle['textarea'](	"Your Tour Name"	, "name"
														, this.handleChange	, true
						)}*/}
					</li>
					<li>
						{ this.formHandle['textarea'](	"Your Destination"	, "dest"
														, this.handleChange , true
						) }
					</li>
					<li>
						{ this.formHandle["doubleNumber"]( "Many member your grorp :" 
														, this.handleChange 
														, "MIN"				, "minMember"
														, this.state.dataTour.minMember
														, false
														, "MAX"				, "maxMember"
														, this.state.dataTour.maxMember
														, false

						)}
					</li>
					<li>
						{ this.formHandle["doubleNumber"]( "Duration Tour"	, this.handleChange
													, "MIN"				, "minDuration"
													, this.state.dataTour.minDuration.toString()
													, false
													, "MAX"				, "maxDuration"
													, this.state.dataTour.maxDuration.toString()
													, false
						)}
					</li>
					<li>
						{ this.formHandle["doubleDate"]( "Period Tour :" , this.handleChange
									, "Start" , "startFreeDate" , false
									, "End" , "endFreeDate" , false
								)}
					</li>
					<li>
						{ this.formHandle["doubleNumber"]( "Price : "	, this.handleChange
													, "MIN"				, "minPrice"
													, this.state.dataTour.minPrice.toString()
													, false
													, "MAX"				, "maxPrice"
													, this.state.dataTour.maxPrice.toString()
													, false
						)}
					</li>
					<li>
						{ this.formHandle["number"]( "Food"				, "food"	
													, this.handleChange , false
													, this.state.dataTour.food
													, "0"
						)}
					</li>
					<li>
						{ this.formHandle["doubleRadio"]( "Want Guide" , this.handleChange 
													, "requireGuide" 
													, this.state.dataTour.requireGuide
													, "YES"				, "NO"
						)}
					</li>
					<li>
						{ this.formHandle["manyText"]( "Message to Tourism"			, "detail"
													, this.handleChange	, false
													, "60"				, "5"
													, "Let us know about your desired"
						)}
					</li>
					<li>
						{ this.formHandle["manyText"]( "Message special detail of this tour"	
													, "highlight"
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
