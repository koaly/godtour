export default class UserConvert{
	convert_user_login( data ){
		console.log("===============> UserConvert.convert_user_login");	
		if( data.token !== undefined){
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
		console.log("=====> convert_user_data.data " , data );	
		if( data.have !== undefined ){
			return { have : false };
		}
		else{
			return{	have			:	true
				,	user_name		:	data.username
				,	display_name	:	data.displayName					
				,	profile_image	:	data.imgsrc
				,	gender			:	data.gender
				,	status			:	data.status
				,	id				:	data.id 
				,	use_google_id	:	data.isGoogle
				,	google_id		:	data.googleID	
				,	email			:	data.email	
				,	register_date	:	data.registerDate
				,	upgrade_reason	:	data.upgradeReason
				,	upgrade_request	:	data.upgradeRequest
						
			};
		}
	}

}
