import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "./input";
import Select from "./select";
import Textarea from "./textarea";

class Form extends Component {

	constructor( props , Schema , CallBackSubmit , CallBackRender ){
		console.log("constrictor of Form_fetch")
		super( props );
		this.state ={	data		: {}
					,	errors		: {}
					}
		this.schema = Schema;
		this.doSubmit = CallBackSubmit;
		this.CallRender = CallBackRender;
		this.handleChange = this.handleChange.bind( this );
	}

	componentDidMount(){
		console.log("==========> form_fetch Mount Finish")
	}	

	validate(){
		var options = { abortEarly: false };
	    var { error } = Joi.validate(this.state.data, this.schema, options);
		if (!error) return null;

		var errors = {};
		for (let item of error.details) errors[item.path[0]] = item.message;
		return errors;
	};

	validateProperty({ name, value }){
		var obj = { [name]: value };
		var schema = { [name]: this.schema[name] };
		var { error } = Joi.validate(obj, schema);
		return error ? error.details[0].message : null;
	};

	handleSubmit(e){
		e.preventDefault();

		var errors = this.validate();
		this.setState({ errors: errors || {} });
		if (errors) return;

		this.doSubmit();
	};

	handleChange({ currentTarget: input }){
		var errors = { ...this.state.errors };
	    var errorMessage = this.validateProperty(input);
		if (errorMessage) errors[input.name] = errorMessage;
		else delete errors[input.name];

		var data = { ...this.state.data };
		data[input.name] = input.value;

		this.state = { data, errors };
		this.CallRender();
	};

	renderButton(label) {
		return (
			<button disabled={this.validate()} className="btn btn-primary mb-4">
				{label}
			</button>
		);
	}

	renderSelect( name, label, options) {
		var { data, errors } = this.state;
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
		var { data, errors } = this.state;

		return ( <Input		type		=	{ type }
							name		=	{ name }
							value		=	{ data[name] }
							label		=	{ label }
							placeholder =	{ placeholder }
							onChange	=	{ this.handleChange }
							error		=	{ errors[name] }
					/>
				);
	}

	renderTextarea(name, label, type = "text", placeholder) {
		var { data, errors } = this.state;

		return ( <Textarea	type		=	{ type }
							name		=	{ name }
							value		=	{ data[name] }
							label		=	{ label }
							placeholder =	{ placeholder }
							onChange	=	{ this.andleChange }
							error		=	{ errors[name] }
					/>
				);
	}
}

export default Form;
