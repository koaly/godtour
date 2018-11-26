import React, { Component } from "react";
import Input from "./input";
import Select from "./select";
import Textarea from "./textarea";
import "./formInput.css"

function doResize( event , ui ){
		console.log( "==========> FormInput.doResize " , event)
		console.log( "=====> ui is " , ui ) 
	}	

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
		this.freeString = "";
	}

	setupClassName( numMode = 0){
		console.log( "==========> FormInput.setupClassNameLabel " , numMode)
		if( numMode === 1 ){
			this.classNameLabel = "testBlockR labelHead01 textCenter"
			this.subLabel	= "sameLine"
			this.subTag		= "width25 sameLine"
			this.styleSingleInput = "minWidth100"
		}
		else{
			this.classNameLabel = "testBlockB labelHead00 textLeft blockInside"
			this.styleSingleInput = "width70 blockInside floatRight borderInput marginRight2"
			this.subLabel	= "width20 textRight marginRight3px"
			this.subTag		= "width75 "
		}
	}

	formDoubleDate( label, handleChange, label1, name1, mustHave1, label2, name2, mustHave2){
		return	<div className="minWidth100">
				<label className={this.classNameLabel}>{label}</label>
				{this.formHandle['date']( label1 , name1 , handleChange.bind(this) , mustHave1)}
				{this.formHandle['date']( label2 , name2 , handleChange.bind(this) , mustHave2)}
		</div>
	}

	formDoubleRadio( label , handleChange , name , value , labelTrue , labelFalse ){
		return	<div className="minWidth100">
				<label className={this.classNameLabel}>{label}</label>
					{this.formHandle['radio']( labelTrue, name, handleChange.bind(this)
												, value, true)}
					{this.formHandle['radio']( labelFalse, name, handleChange.bind(this)
												, !value, false)}
		</div>
	}

	formDoubleNumber( label , handleChange 
					, labelMin , nameMin , valueMin , mustHaveMin 
					, labelMax , nameMax , valueMax , mustHaveMax ){
		return	<div className="minWidth100 testBlockB">
				<label className={this.classNameLabel}>{label}</label>
					{this.formHandle['number']( labelMin , nameMin , handleChange.bind( this ) 
								, mustHaveMin , valueMin , "0"
								, this.subTag , this.subLabel , "sameLine")}
					{this.formHandle['number']( labelMax , nameMax , handleChange.bind( this ) 
								, mustHaveMax, valueMax, valueMin
								, this.subTag, this.subLabel , "sameLine")}
		</div>
	}

	formTextArea( label , name , handleChange , mustHave = false , id = null){
		if( id === null ){
			id = name.toString()
		}
		if( mustHave ){
			return	<div className="widht100">
					<label className={this.classNameLabel}>{label}</label>
					<input	type = "textarea"
							id = {id.toString()}
							className={this.styleSingleInput}
							name = {name.toString()}
							required
							onChange = { handleChange.bind( this ) }/>
		&ensp;</div>}
		else{
			return	<div><label className={this.classNameLabel}>{label}</label>
					<input	type ="textarea"
							id = {id.toString()}
							name = {name.toString()}
							onChange = { handleChange.bind( this ) } />
		&ensp;</div>}
	}

	formNumber( label , name , handleChange , mustHave = false, value , min = null 
					, styleTag = this.styleSingleInput , styleLabel = this.classNameLabel 
					, styleDIV = "widht100"){
		if( mustHave ){
			return	(<div className={styleDIV}>
					<label className={styleLabel}>{label}</label> 
					<input	type = "number"
							id	= {name.toString()}
							name = {name.toString()}
							required
							onChange = { handleChange.bind( this ) }
							min = {min.toString()}
							value = {value.toString()} 
							className = {styleTag}
		/>&ensp;</div>)}
		else{
			return	<div className={styleDIV}>
					<label className={styleLabel}>{label}</label> 
					< input	type = "number"
							id	= {name.toString()}
							name = {name.toString()}
							onChange = { handleChange.bind( this ) }
							min = {min.toString()}
							value = {value.toString()}
							className = {styleTag}
		/>&ensp;</div>}
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
			return	<div className="sameLine">{label}&ensp;
					< input	type = "date"
							id = {name.toString()}
							name = {name.toString()}
							onChange = { handleChange.bind( this ) }
		/>&ensp;</div>}
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
			return	<div>
					<label className={this.classNameLabel}>{label}</label>
					< textarea	id = { name.toString() }
								name = { name.toString() }
								onChange = { handleChange.bind( this ) }
								cols = { column.toString() }	
								rows = { row.toString() }
								placeholder = { placeHolder }
		/></div>}
		else{
			return	<div>
					<label className={this.classNameLabel}>{label}</label>
					< textarea	id = { name.toString() }
								name = { name.toString() }
								onChange = { handleChange.bind( this ) }
								cols = { column.toString() }	
								rows = { row.toString() }
								placeholder = { placeHolder }
		/></div>}
	}

} 

export default FormInput;
