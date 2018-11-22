import React, { Component } from "react";
import Input from "./input";
import Select from "./select";
import Textarea from "./textarea";
import "./formInput.css"

class FormInput extends Component{

	constructor( props ){
		super( props ); 
		this.formHandle = { textarea		: this.formTextArea.bind(this)
							, number		: this.formNumber.bind(this) 
							, date			: this.formDate.bind(this)
							, radio			: this.formRadio.bind(this)
							, manyText		: this.formManyText.bind(this)
							, doubleNumber	: this.formDoubleNumber.bind(this)
							, doubleRadio	: this.formDoubleRadio.bind(this)
							, doubleDate	: this.formDoubleDate.bind(this)
		}
	}

	doResize( event , ui ){
		console.log( "==========> FormInput.doResize " , event)
		console.log( "=====> ui is " , ui ) 
	}	

	setupClassNameLabel( numMode = 0){
		this.className = ""
	}

	formDoubleDate( label, handleChange, label1, name1, mustHave1, label2, name2, mustHave2){
		return	<label>{label}&ensp;
				{this.formHandle['date']( label1 , name1 , handleChange.bind(this) , mustHave1)}
				{this.formHandle['date']( label2 , name2 , handleChange.bind(this) , mustHave2)}
		</label>
	}

	formDoubleRadio( label , handleChange , name , value , labelTrue , labelFalse ){
		return <label>{label}&ensp;
			{this.formHandle['radio']( labelTrue, name, handleChange.bind(this), value, true)}
			{this.formHandle['radio']( labelFalse, name, handleChange.bind(this), !value, false)}
		</label>
	}

	formDoubleNumber( label , handleChange 
					, labelMin , nameMin , valueMin , mustHaveMin 
					, labelMax , nameMax , valueMax , mustHaveMax ){
		return <label>{label}&ensp;
			{this.formHandle['number']( labelMin , nameMin , handleChange.bind( this ) 
									, mustHaveMin , valueMin , "0")}
			{this.formHandle['number']( labelMax , nameMax , handleChange.bind( this ) 
									, mustHaveMax , valueMax , valueMin)}
		</label>
	}

	formTextArea( label , name , handleChange , mustHave = false , id = null){
		if( id === null ){
			id = name.toString()
		}
		if( mustHave ){
			return	<label>{label}&ensp;
					<input	type = "textarea"
							id = {id.toString()}
							name = {name.toString()}
							required
							onChange = { handleChange.bind( this ) }/>
		&ensp;</label>}
		else{
			return	<label>{label}&ensp;
					<input	type ="textarea"
							id = {id.toString()}
							name = {name.toString()}
							onChange = { handleChange.bind( this ) } />
		&ensp;</label>}
	}

	formNumber( label , name , handleChange , mustHave = false, value , min = null ){
		if( mustHave ){
			return	(<label>{label}&ensp; 
					<input	type = "number"
							id	= {name.toString()}
							name = {name.toString()}
							required
							onChange = { handleChange.bind( this ) }
							min = {min.toString()}
							value = {value.toString()} 
		/>&ensp;</label>)}
		else{
			return	<label>{label}&ensp;
					< input	type = "number"
							id	= {name.toString()}
							name = {name.toString()}
							onChange = { handleChange.bind( this ) }
							min = {min.toString()}
							value = {value.toString()}
		/>&ensp;</label>}
	}	

	formDate( label , name , handleChange , mustHave = false ){
		if( mustHave ){
			return	<label>{label}&ensp;
					< input	type = "date"
							id = {name.toString()}
							name = {name.toString()}
							required
							onChange = { handleChange.bind( this ) }
		/>&ensp;</label>}
		else{
			return	<label>{label}&ensp;
					< input	type = "date"
							id = {name.toString()}
							name = {name.toString()}
							onChange = { handleChange.bind( this ) }
		/>&ensp;</label>}
	}

	formRadio( label , name , handleChange , check , value ){
		if( check ){
			return	<label>{label}&ensp;
					< input	type = "radio"
							id = {name.toString()}
							name = {name.toString()}
							onChange = {handleChange.bind( this ) }
							checked = "checked"	
							value = {value.toString()}
		/>&ensp;</label>} 
		else{
			return	< label>{label}&ensp;
					< input	type = "radio"
							id = {name.toString()}
							name = {name.toString()}
							onChange = { handleChange.bind( this )}
							value = {value.toString()}
		/>&ensp;</label>}
	}

	formManyText( label , name , handleChange , mustHave , column , row , placeHolder ){
		if( mustHave ){
			return	<p>{label}
					< textarea	id = { name.toString() }
								name = { name.toString() }
								onChange = { handleChange.bind( this ) }
								cols = { column.toString() }	
								rows = { row.toString() }
								placeholder = { placeHolder }
		/></p>}
		else{
			return	<p>{label}
					< textarea	id = { name.toString() }
								name = { name.toString() }
								onChange = { handleChange.bind( this ) }
								cols = { column.toString() }	
								rows = { row.toString() }
								placeholder = { placeHolder }
		/></p>}
	}

} 

export default FormInput;
