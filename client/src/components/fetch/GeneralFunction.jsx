function convert_user_login( data ){
	var answer = {};
	answer.user_id = data._id;
	answer.user_email = data.email;
	answer.token = data.token;
	return answer;
}

function convert_user_data( data ){
	return {	user_id = data._id				,	user_email = data.email
			,	use_google_id = data.isGoogle	,	user_google_id = data.googleID
			,	use_date_register = data.registerDate
	};
}
