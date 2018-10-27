import React, { Component } from "react";
import Joi from "joi-browser";
import Select from "./select";
import Textarea from "./textarea";

class Form {

	constructor( props , schema ,CallBackSubmit , CallBackRender , Caller){
		console.log("constructor of Form_fetch" , props)
		this.form_state =	{	data		: {}
							,	errors		: {}
						}
		this.schema = schema;
		this.doSubmit = CallBackSubmit;
		this.CallRender = CallBackRender;
		this.handleChange = this.handleChange.bind( this )
		this.handleSubmit = this.handleSubmit.bind( this )
		this.Caller = Caller;
	}

	componentDidMount(){
		console.log("===============> form_fetch Mount Finish")
	}	

	validate(){
		console.log("===============> form_fetch.validate")
		var options = { abortEarly: false };
	    var { error } = Joi.validate(this.form_state.data, this.schema, options);
		if (!error) return null;

		var errors = {};
		for (let item of error.details) errors[item.path[0]] = item.message;
		return errors;
	};

	validateProperty({ name, value }){
		console.log("===============> form_fetch.validateProperty" , name , value)
		var obj = { [name]: value };
		var schema = { [name]: this.schema[name] };
		var { error } = Joi.validate(obj, schema);
		return error ? error.details[0].message : null;
	};

	handleSubmit(e){
		console.log("===============> form_fetch.handleSubmit")
		e.preventDefault();

		var errors = this.validate();
		this.form_state.errors = errors || {} ;
		if (errors) return;

		this.doSubmit();
		this.Caller.forceUpdate()
	};

	handleChange( Receive ){
		var input = Receive.currentTarget
		console.log("===============> form_fetch.handleChange" , input)
		var errors = {...this.form_state.errors};
	    var errorMessage = this.validateProperty(input);
		if (errorMessage) errors[input.name] = errorMessage;
		else delete errors[input.name];

		var data = { ...this.form_state.data };
		data[input.name] = input.value;

		this.form_state = { data, errors };
		console.log( this.form_state );
		this.Caller.forceUpdate()
//		this.CallRender();
	};

	renderButton(label) {
		console.log("===============> form_fetch.renderButton")
		return (
			<button disabled= {this.validate()} className="btn btn-primary mb-4">
				{label}
			</button>
		);
	}

	renderSelect( name, label, options) {
		console.log("===============> form_fetch.renderSelect")
		var { data, errors } = this.form_state;
		return ( <Select	name		=	{ name }
							value		=	{ data[name] }
							label		=	{ label }
							options		=	{ options }
							onChange	=	{ this.handleChange }
							error		=	{ errors[name] }
					/>
				);
	}

	renderInput(name, label, type = "text", placeholder) {
		var { data, errors } = this.form_state;
		var value = data[name];
		var error = errors[name];
		console.log("===============> form_fetch.renderInput")
		return (
			<div className = "form-group">
				<label className="strongg" htmlFor={name}>
					{label}
				</label>
				<input	type={type} value={value} placeholder={placeholder} 
						onChange={this.handleChange} name={name} className="form-control" />
				{ error && <div className = "alert alert-danger">{error}</div>}
			</div>
		);
	}

	renderTextarea(name, label, type = "text", placeholder) {
		var { data, errors } = this.form_state;
		console.log("===============> form_fetch.renderTextarea")
		return ( <Textarea	type		=	{ type }
							name		=	{ name }
							value		=	{ data[name] }
							label		=	{ label }
							placeholder =	{ placeholder }
							onChange	=	{ this.handleChange }
							error		=	{ errors[name] }
					/>
				);
	}
}

export default Form;
