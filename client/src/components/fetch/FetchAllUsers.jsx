var {_start_url , _domain , _port} = require('./default_data.jsx')

export default class FetchAllUsers{

	constructor( callback ){
		console.log("<---------- FetchAllUsers : constructor ---------->")
		var path = "users"
		this.SumLink = _start_url + _domain + ":" + _port + "/" + path;
		this.SendData = [];
		this.SendInformation = [];
		this.ReturnCallback = callback;
		console.log("<----- FetchAllUsers : this.SumLink ----->");
		console.log( this.SumLink );
		console.log("<----- FetchAllUsers : this.SendData ----->");
		console.log( this.SendData );
		console.log("<----- FetchAllUsers : this.SendInformation ----->");
		console.log( this.SendInformation );
		console.log("<----- FetchAllUsers : this.ReturnCallback ----->");
		console.log( this.ReturnCallback );
	}

	get_all_users(){
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
				this.ReturnCallback( this.SendInformation , this.SendData )
			})			
	}

	// specific is object to assign what group do you want
	// specific have type{ email , telephone_number} data{ strign to equal } 
	get_specific_user( specific ){
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
				if( specific.type == "email"){
					var answer = this.filter_by_email( json , specific.data )
				}
				this.SendData = answer;
				this.ReturnCallback( this.SendInformation , this.SendData )
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

	create_object_users( data ){
		if( data.have ){
			return { have : true , user_id : data._id , user_email : data.email 
				,	user_use_google : data.isGoogle , user_google_id : data.googleID
				,	user_register_date : data.registerDate}
		}
		else{
			return { have : false}
		}
	}

}
