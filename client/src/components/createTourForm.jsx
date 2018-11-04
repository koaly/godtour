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
		if( ! document.getElementById("tourName").checkValidity() ){
			toast.error("require your tour name");
			result = false;
		}
		if( ! document.getElementById("yourDestination").checkValidity()){
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
			return(<div className = "mgtb container">
				<h1>Create Tour</h1>
				<ul>
					<li>
						<label>Your Tour Name : </label>
						<input	type="textarea" 
								id = "tourName" 
								name="name" required
								onChange={this.handleChange}  
						/>
					</li>
					<li>
						<label>Your Destination : </label>
						<input	type="textarea" 
								id = "yourDestination" 
								name="dest" required
								onChange={this.handleChange}  
						/>
					</li>
					<li>
						<label>Many you group  :&emsp;</label>
						<label>MIN</label>
						<input	type="number" name="minMember" min="0"  
								value={this.state.dataTour.minMember}
								onChange={this.handleChange}
						/>
						<label>MAX</label>
						<input	type="number" name="maxMember" 
								min={this.state.dataTour.minMember.toString()} 
								value={this.state.dataTour.maxMember}
								onChange={this.handleChange}
						/>
					</li>
					<li>
						<label>Duration Tour :&emsp;</label>
						<label>MIN&emsp;</label>
						<input	type="number" name="minDuration" min="0"  
								value={this.state.dataTour.minDuration}
								onChange={this.handleChange}
						/>
						<label>MAX&emsp;</label>
						<input	type="number" name="maxDuration" 
								min={this.state.dataTour.minDuration} 
								value={this.state.dataTour.maxDuration.toString()}
								onChange={this.handleChange}
						/>
					</li>
					<li>
						<label>Period Tour :&emsp;</label>
						<label>Start&emsp;</label>
						<input	type="date" name="startFreeDate"
								onChange={this.handleChange}
						/>
						<label>End&emsp;</label>
						<input	type="date" name="endFreeDate"
								onChange={this.handleChange}
						/>
					</li>
					<li>
						<label>Price:&emsp;</label>
						<label>&ensp;MIN</label>
						<input	type="number" name="minPrice"
								onChange={this.handleChange}
								value={this.state.dataTour.minPrice}
								min="0"
						/>
						<label>&ensp;MAX</label>
						<input	type="number" name="maxPrice"
								onChange={this.handleChange}
								value={this.state.dataTour.maxPrice}
								min={this.state.dataTour.minPrice.toString()}
						/>
					</li>
					<li>
						<label>Food:&emsp;</label>
						<input type="number" name="food"
								onChange={this.handleChange}
								value={this.state.dataTour.food}
								min="0"
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
						<p>Message to Tourism</p>
						<textarea	name="detail" cols="60" rows="5" 
									onChange={this.handleChange}
									placeholder="Let us know about your desired"
						></textarea>
					</li>
					<li>
						<p>Message special detail of this tour</p>
						<textarea	name="highlight" cols="60" rows="5" 
									onChange={this.handleChange}
									placeholder="Let us know about your desired"
						></textarea>
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

