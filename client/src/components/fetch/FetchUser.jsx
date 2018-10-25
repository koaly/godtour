var {_start_url , _domain , _port} = require('./default_data.jsx')
var {_path } = require('./default_data.jsx')

export default class FetchUser{

	constructor(){
		console.log( "<---------- FetchUser : console ---------->")
		this.SumLink = _start_url + _domain + ":" + _port;
		this.PostData = {};	
		this.SendData = {}; 
		this.SendInformation = {};
		console.log("<----- FetchAllUsers : this.SumLink ----->");
		console.log( this.SumLink );
		console.log("<----- FetchAllUsers : this.PostData ----->");
		console.log( this.PostData );
		console.log("<----- FetchAllUsers : this.SendData ----->");
		console.log( this.SendData );
		console.log("<----- FetchAllUsers : this.SendInformation ----->");
		console.log( this.SendInformation );
	}

	login( email , password , callback){
		console.log( "<---------- FetchUser : login ---------->" );
		console.log( "email argument is " + email );
		console.log( "password argument is " + password );
		var last_link = this.SumLink + _path._login;
		console.log( "last_link is" + last_link);
		this.PostData.email = email;
		this.PostData.password = password;
		console.log("<----- FetchUser : PostData ----->");
		console.log( this.PostData )
		
		this.Request = new Request( last_link , 
							{ method: 'POST'
							, headers : {
									"Content-Type" : "application/json"
								} 
							, body : JSON.stringify( this.PostData ) 
							}
						);

		console.log("<----- FetchUser : Request ----->");
		console.log( this.Request );
		console.log("=====> url of request  ");
		console.log( this.Request.url );

		fetch( this.Request )
		.then( response =>{
			console.log( "<----- FetchUser : response ----->");
			console.log( response );
			return response.json()
		})
		.then( json =>{
			console.log( "<----- FetchUser : json ----->");
			console.log( json );

		})
	}	
}
