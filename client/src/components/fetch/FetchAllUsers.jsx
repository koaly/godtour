import Convert from "./GeneralFunction.jsx"

var {_start_url , _domain , _port} = require('./default_data.jsx')

var HandleObject = new Convert();

export default class FetchAllUsers {

	constructor( callback ){
		console.log("<---------- FetchAllUsers : constructor ---------->")
		var path = "users"
		this.SumLink = _start_url + _domain + ":" + _port + "/" + path;
		this.SendData = [];
		this.SendInformation = [];
		console.log("<----- FetchAllUsers : this.SumLink ----->");
		console.log( this.SumLink );
		console.log("<----- FetchAllUsers : this.SendData ----->");
		console.log( this.SendData );
		console.log("<----- FetchAllUsers : this.SendInformation ----->");
		console.log( this.SendInformation );
	}

	get_all_users( Callback ){
		console.log("<---------- FetchAllUsers : get_all_users ---------->");
		fetch( this.SumLink )
			.then( response =>{
				console.log("<----- FetchAllUsers : response ----->");
				console.log( response )
				this.SendInformation.status = response.status;
				this.SendInformation.url = response.url;
				this.SendInformation.type = response.type;
				this.SendInformation.ok = response.ok;
				return response.json()
			})
			.then( json => {
				console.log("<----- FetchAllUsers : json ----->");
				console.log( json )
				this.SendData = json;
//				this.ReturnCallback( this.SendInformation , this.SendData )
				Callback( this.SendInformation , this.SendData )
			})			
	}

	// specific is object to assign what group do you want
	// specific have type{ email , telephone_number} data{ strign to equal } 
	get_specific_user( Specific , Callback){
		console.log("<---------- FetchAllUsers : get_specific_user ---------->");
		fetch( this.SumLink )
			.then( response =>{
				console.log("<----- FetchAllUsers : response ----->");
				console.log( response )
				this.SendInformation.status = response.status;
				this.SendInformation.url = response.url;
				this.SendInformation.type = response.type;
				this.SendInformation.ok = response.ok;
				return response.json()
			})
			.then( json => {
				console.log("<----- FetchAllUsers : json ----->");
				console.log( json );
				if( Specific.type === "email"){
					var answer = this.filter_by_email( json , Specific.data )
				}
				console.log("<----- FetchAllUsers : answer ----->");
				console.log( answer );
				this.SendData = HandleObject.convert_user_data(answer);
				Callback( this.SendInformation , this.SendData )
			})
	}
	
	filter_by_email( all_data , email ){
		console.log("<---------- FetchAllUsers : filter_by_email ---------->");
		console.log("target email is " + email);
		var answer = {have:false};
		for( var count = 0 ; count < all_data.users.count ; count++ ){
			if( email == all_data.users.user[count].email ){
				console.log("found it count is " + count + " and data is" 
								+ all_data.users.user[count].email);
				answer = all_data.users.user[count];
				break;
			}
		}
		return answer;
	}

}
