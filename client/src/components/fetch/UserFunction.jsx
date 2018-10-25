export default class UserConvert{
	convert_user_login( data ){
		console.log("===============> UserConvert.convert_user_login");	
		if( data.token != undefined){
			return{	have			:	true
				,	id				:	data._id
				,	email			:	data.email				
				,	token			:	data.token
			};
		}
		else{
			return { have : false };
		}
	}	

	convert_user_data( data ){
		console.log("===============> UserConvert.convert_user_data");	
		if( data.have != undefined ){
			return { have : false };
		}
		else{
			return{	have			:	true					
				,	id				:	data._id 
				,	google_id		:	data.googleID	
				,	use_google_id	:	data.isGoogle
				,	email			:	data.email	
				,	register_date	:	data.registerDate
						
			};
		}
	}

}
