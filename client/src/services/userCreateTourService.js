import http from "./httpService";
import auth from "./authService";

const apiMiddlePoint = "/api/tiys";

const config = {
	headers: {
		Authorization: "JWT " + auth.getJwt()
	}
};

export function sendDataCeateTourByUser(data) {
	let headers = {
		'Content-Type': 'application/json'
		, 'Authorization': "JWT" + auth.getJwt()
	}
	let apiEndPoint = "/create"
	return http.post(apiMiddlePoint + apiEndPoint
		, data
		, config )
}
