export default class Convert{
	convert_user_login( data ){
		var answer = {};
		answer.id = data.id;
		answer.email = data.email;
		answer.token = data.token;
		return answer;
	}	

	convert_user_data( data ){
		console.log("<---------- Convert : convert_user_data ---------->")
		if( data.have != undefined ){
			return { have : false };
		}
		else{
			return {	have : true					, id : data._id 
					,	google_id : data.googleID	, use_google_id : data.isGoogle
					,	email : data.email			, register_date : data.registerDate
						
			}
		}
	}

}
