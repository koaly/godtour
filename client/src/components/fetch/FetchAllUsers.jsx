import UserConvert from "./UserFunction.jsx" // import function for convert object

var {_start_url , _domain , _port} = require('./default_data.jsx') // import data url

var HandleObject = new UserConvert(); // init class of convert for user data

export default class FetchAllUsers {

	constructor( callback ){
		console.log("===============> FetchAllUsers.construction");
		var path = "users"
		this.SumLink = _start_url + _domain + ":" + _port + "/" + path;
		this.SendData = [];
		this.SendInformation = [];
	}

	get_all_users( Callback ){
		console.log("===============> FetchAllUsers.get_all_users");	
		fetch( this.SumLink )
			.then( response =>{
				this.SendInformation.status = response.status;
				this.SendInformation.url = response.url;
				this.SendInformation.type = response.type;
				this.SendInformation.ok = response.ok;
				return response.json()
			})
			.then( json => {
				this.SendData = json;
				Callback( this.SendInformation , this.SendData )
			})			
	}

	// specific is object to assign what group do you want
	// specific have type{ email , telephone_number} data{ strign to equal } 
	get_specific_user( Specific , Callback){
		console.log("===============> FetchAllUsers.get_specific_user");	
		fetch( this.SumLink )
			.then( response =>{
//				console.log("=====> get_specific_user.response" , response);
				this.SendInformation.status = response.status;
				this.SendInformation.url = response.url;
				this.SendInformation.type = response.type;
				this.SendInformation.ok = response.ok;
				return response.json()
			})
			.then( json => {
				console.log("=====> get_specific_user.json" , json);
				if( Specific.type === "email"){
					var answer = this.filter_by_email( json , Specific.data )
				}
				this.SendData = HandleObject.convert_user_data(answer);
				Callback( this.SendInformation , this.SendData )
			})
	}
	
	filter_by_email( all_data , email ){
		console.log("===============> FetchAllUsers.filter_by_email");	
		console.log("=====> filter_by_email.all_data " , all_data);
		var answer = {have:false};
		for( var count = 0 ; count < all_data.users.count ; count++ ){
			if( email === all_data.users.user[count].email ){
				answer = all_data.users.user[count];
				break;
			}
		}
		return answer;
	}

}
