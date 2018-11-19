import React, { Component } from "react";
import Input from "./input";
import Select from "./select";
import Textarea from "./textarea";

class FormInput extends Component{

	createForm( type , id , name , handleChange ){
		return(
			<input	type ={type}
					id = {id}
					name = {name}
					onChange = { handleChange.bind( this ) }
			/>
		)
	}	

} 

export default FormInput;
