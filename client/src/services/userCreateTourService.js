import http from "./httpService";
import auth from "./authService";

const apiMiddlePoint = "/tiy";

const config = {
  headers: {
    Authorization: "JWT " + auth.getJwt()
  }
};

export function sendDataCeateTourByUser( data ) {
	let headers = {	'Content-Type'		: 'application/json'
					, 'Authorization'	: "JWT" + auth.getJwt()
	}
	let apiEndPoint = "/create"
	http.post(	apiMiddlePoint + apiEndPoint 
				, data 
				, { headers : headers}
	).then( ( response ) =>{
		console.log("=====> sendDataCeateTourByUser.response ", response );	
	})	
}
