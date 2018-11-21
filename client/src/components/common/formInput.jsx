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
							, manyText	: this.formManyText
		}
	}

	formTextArea( label , name , handleChange , mustHave = false){
		if( mustHave ){
			return	<label>{label}&ensp;
					<input	type = "textarea"
							id = {name}
							name = {name}
							required
							onChange = { handleChange.bind( this ) }/>
		&ensp;</label>}
		else{
			return	<label>{label}&ensp;
					<input	type ="textarea"
							id = {name}
							name = {name}
							onChange = { handleChange.bind( this ) } />
		&ensp;</label>}
	}

	formNumber( label , name , handleChange , mustHave = false, value , min = null ){
		if( mustHave ){
			return	(<label>{label}&ensp; 
					<input	type = "number"
							id	= {name}
							name = {name}
							required
							onChange = { handleChange.bind( this ) }
							min = {min}
							value = {value} 
		/>&ensp;</label>)}
		else{
			return	<label>{label}&ensp;
					< input	type = "number"
							id	= {name}
							name = {name}
							onChange = { handleChange.bind( this ) }
							min = {min}
							value = {value}
		/>&ensp;</label>}
	}	

	formDate( label , name , handleChange , mustHave = false ){
		if( mustHave ){
			return	<label>{label}&ensp;
					< input	type = "date"
							id = {name}
							name = {name}
							required
							onChange = { handleChange.bind( this ) }
		/>&ensp;</label>}
		else{
			return	<label>{label}&ensp;
					< input	type = "date"
							id = {name}
							name = {name}
							onChange = { handleChange.bind( this ) }
		/>&ensp;</label>}
	}

	formRadio( label , name , handleChange , check , value ){
		if( check ){
			return	<label>{label}&ensp;
					< input	type = "radio"
							id = {name}
							name = {name}
							onChange = {handleChange.bind( this ) }
							checked = "checked"	
							value = {value}
		/>&ensp;</label>} 
		else{
			return	< label>{label}&ensp;
					< input	type = "radio"
							id = {name}
							name = {name}
							onChange = { handleChange.bind( this )}
							value = {value}
		/>&ensp;</label>}
	}

	formManyText( label , name , handleChange , mustHave , column , row , placeHolder ){
		if( mustHave ){
			return	<p>{label}
					< textarea	id = { name }
								name = { name }
								onChange = { handleChange.bind( this ) }
								cols = { column.toString() }	
								rows = { row.toString() }
								placeholder = { placeHolder }
		/></p>}
		else{
			return	<p>{label}
					< textarea	id = { name }
								name = { name }
								onChange = { handleChange.bind( this ) }
								cols = { column.toString() }	
								rows = { row.toString() }
								placeholder = { placeHolder }
		/></p>}
	}

} 

export default FormInput;
