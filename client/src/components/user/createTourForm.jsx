import React, { Component } from "react";
import listCountries from "./../common/dataList";
import findDiffDay from "./../common/otherFunction"; 
import { toast } from "react-toastify";
import FormInput from ".././common/formInput";
import "./../common/formInput.css"

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
			, mode		: -1
		};
		this.handleChange = this.handleChange.bind( this );
		this.handleSubmitData = this.handleSubmitData.bind( this );
		this.notReloadFunction = this.notReloadFunction.bind( this );
		this.conditionValue = [ "requireGuide"]
		this.numericalValue = [	"minDuration" , "maxDuration" , "minMember" , "maxMember"
								, "food" , "minPrice" , "maxPrice"];
		this.testData = [ "Your Tour Name"	, "name" , this.handleChange	, true]
		this.updateData = this.updateData.bind( this )
	}

	notReloadFunction(){
		return false;
	}

	handleSubmitData( event ){
		var result = true;
		if( ! document.getElementById("tourName").checkValidity() ){
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

	countTime(){
		this.count = this.count + 1;
		if( this.count == 5 ){
			window.location = "/addTour";
		}
	}

	componentDidMount() {
		console.log("===============> createTourForm.componentDidMount");
		this.updateDimensions();
		window.addEventListener("resize" , this.updateDimensions.bind( this ) );
		if( this.state.user.info.status !== 0 ){
			this.intervalRedirection = setInterval( this.countTime.bind( this ) , 100 );
			this.count = 0 ;
		}
	}

	componentWillUnmount(){
		console.log("===============> createTourForm.componentWillUnmount");
		window.removeEventListener("resize" , this.updateDimensions.bind( this ));
		if( this.state.user.info.status !== 0 ){
			clearInterval( this.intervalRedirection );
		}
	}

	updateDimensions(){
		console.log( "width : height of window is " , window.innerWidth , window.innerHeight );
		let new_mode;
		if( window.innerWidth < 1000 ){
			new_mode = 1;
		}
		else{
			new_mode = 0;
		}
		if( new_mode !== this.state.mode ){
			this.setupClassName( new_mode );
			this.state.mode = new_mode;
			this.forceUpdate();
		}
	}

	updateData(){
/*	this.formData is array to collect information for create form it is 2 dimension array
		First Dimension tell many form have to fill data and have 2 component
		In each order have 2 component first component is type of form
			and second is array to input data to function create input form
*/
		this.dataForm = [
			[ "textarea" , ["Your Tour Name", "name" , this.handleChange , true , "tourName"]] 
		,	[ "textarea" , ["Your Destination" , "dest" , this.handleChange , true ] ]
		,	[ "doubleNumber" ,	[ "Many member your group" , this.handleChange , "MIN"
									, "minMember" , this.state.dataTour.minMember , false , "MAX"
									, "maxMember" , this.state.dataTour.maxMember , false
								] ]
		,	[ "doubleNumber" ,	[ "Duration Tour" , this.handleChange , "MIN" , "minDuration"
									, this.state.dataTour.minDuration.toString() , false , "MAX"
									, "maxDuration" , this.state.dataTour.maxDuration , false
								] ]
		,	[ "doubleDate" , [ "Period Tour" , this.handleChange 
									, "START" , "startFreeDate" , false
									, "END" , "endFreeDate" , false
								] ]
		,	[ "doubleNumber" ,	[ "Price" , this.handleChange , "MIN" , "minPrice" 
									, this.state.dataTour.minPrice , false , "MAX" , "maxPrice"
									, this.state.dataTour.maxPrice , false 
								] ] 
		,	[ "number" , [ "Food" , "food" , this.handleChange , false 
									, this.state.dataTour.food , 0 
								] ]
		,	[ "doubleRadio" , [  "Want Guide" , this.handleChange , "requireGuide" 
								, this.state.dataTour.requireGuide , "YES"	, "NO"
								] ]
		,	["manyText" , [ "Message to Tourism" , "detail" , this.handleChange	, false
									, "20"	, "2" , "Let us know about your desired"
								] ]
		,	["manyText" , [ "Message special detail of this tour" , "highlight"
									, this.handleChange , false , "20"	, "2"
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
			return( <div className = "componentStyle marginBottom10px">
				<h1>Create Tour</h1>
				<div className="noneMargin nonePadding">
					{ this.dataForm.map( form => (
						<div className="nonePadding noneMargin marginBottom10px">
							{this.formHandle[ form[0] ].apply( this , form[1])}
						</div>
					))}
					<button onClick={this.handleSubmitData}
							className="btn btn-primary minWidth100"
					>SUBMIT</button>	
				</div>
			</div>);
		}
		else{
			return(<div className="">
				<h1>Redirect Link to Page AddTour</h1>
			</div>);
		}
	}

}

export default createTourForm;
