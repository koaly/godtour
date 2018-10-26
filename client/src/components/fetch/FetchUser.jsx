import UserConvert from "./UserFunction.jsx"

var {_start_url , _domain , _port} = require('./default_data.jsx')
var {_path } = require('./default_data.jsx')

var HandleObject = new UserConvert()

export default class FetchUser{

	constructor(){
		console.log("===============> FetchUser.constructor");	
		this.SumLink = _start_url + _domain + ":" + _port;
		this.PostData = {};	
		this.SendData = {}; 
		this.SendInformation = {};
	}

	login( email , password , callback){
		console.log("===============> FetchUser.login");	
		this.PostData.email = email;
		this.PostData.password = password;

		this.Request = new Request( this.SumLink + _path._login , 
							{ method	: 'POST'
							, headers	: {
											"Content-Type" : "application/json"
										  } 
							, body		: JSON.stringify( this.PostData ) 
							}
						);

		fetch( this.Request )
		.then( response =>{
				this.SendInformation.status = response.status;
				this.SendInformation.url = response.url;
				return response.json()
			}
		)
		.then( json =>	{
				console.log("=====> FetchUser.login : json " , json );
				this.SendData = HandleObject.convert_user_login( json.user );
				callback( this.SendInformation , this.SendData );
			}
		)
	}	
}
