import UserConvert from "./UserFunction.jsx"

var {_start_url , _domain , _port} = require('./default_data.jsx')
var {_path } = require('./default_data.jsx')

var HandleObject = new UserConvert()

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
		this.PostData.email = email;
		this.PostData.password = password;
		console.log("<----- FetchUser : PostData ----->");
		console.log( this.PostData )

		this.Request = new Request( this.SumLink + _path._login , 
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
			this.SendInformation.status = response.status;
			this.SendInformation.url = response.url;
			return response.json()
		})
		.then( json =>{
			console.log( "<----- FetchUser : json ----->");
			console.log( json );
			this.SendData = HandleObject.convert_user_login( json.user );
			console.log( "<----- FetchUser : SendData ----->");
			console.log( this.SendData );
			callback( this.SendInformation , this.SendData );
		})
	}	
}
