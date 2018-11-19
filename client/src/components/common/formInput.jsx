import React, { Component } from "react";
import Input from "./input";
import Select from "./select";
import Textarea from "./textarea";

class FormInput extends Component{

	constructor( props ){
		super( props ); 
		this.formHandle = { textarea	: this.formTextArea
							, number	: this.formNumber 
							, date		: this.formDate
							, radio		: this.formRadio
		}
	}

	formTextArea( id , name , handleChange , mustHave = false){
		if( mustHave ){
			return <input	type = "textarea"
							id = {id}
							name = {name}
							required
							onChange = { handleChange.bind( this ) }/>
		}
		else{
			return <input	type ="textarea"
							id = {id}
							name = {name}
							onChange = { handleChange.bind( this ) } />
		}
	}

	formNumber( id , name , handleChange , mustHave = false, value , min = null ){
		if( mustHave ){
			return < input	type = "number"
							id	= {id}
							name = {name}
							required
							onChange = { handleChange.bind( this ) }
							min = {min}
							value = {value}
		/>}
		else{
			return < input	type = "number"
							id	= {id}
							name = {name}
							onChange = { handleChange.bind( this ) }
							min = {min}
							value = {value}
		/>}
	}	

	formDate( id , name , handleChange , mustHave = false ){
		if( mustHave ){
			return < input	type = "date"
							id = {id}
							name = {name}
							required
							onChange = { handleChange.bind( this ) }
		/>}
		else{
			return < input	type = "date"
							id = {id}
							name = {name}
							onChange = { handleChange.bind( this ) }
		/>}
	}

	formRadio( id , name , handleChange , check , value ){
		if( check ){
			return < input	type = "radio"
							id = {id}
							name = {name}
							onChange = {handleChange.bind( this ) }
							checked = "checked"	
							value = {value}
		/>} 
		else{
			return < input	type = "radio"
							id = {id}
							name = {name}
							onChange = { handleChange.bind( this )}
							value = {value}
		/>}
	}
} 

export default FormInput;
