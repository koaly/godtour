export default class UserConvert{
	convert_user_login( data ){
		console.log("===============> UserConvert.convert_user_login" , data );	
		try{
			if( data.user.token !== undefined){
				console.log("Have Value");
				return{	have			:	true
					,	user_name		:	data.user.info.username
					,	display_name	:	data.user.info.displayName					
					,	profile_image	:	data.user.info.imgsrc
					,	gender			:	data.user.info.gender
					,	status			:	data.user.info.status
					,	id				:	data.user.info.id 
					,	use_google_id	:	data.user.info.isGoogle
					,	google_id		:	data.user.info.googleID	
					,	email			:	data.user.info.email	
					,	register_date	:	data.user.info.registerDate
					,	upgrade_reason	:	data.user.info.upgradeReason
					,	upgrade_request	:	data.user.info.upgradeRequest
					,	token			:	data.user.token
				};
			}
		}
		catch (ex){
			console.log( ex ); 
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
