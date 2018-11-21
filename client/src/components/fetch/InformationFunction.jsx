export default class InformationConvert{

	convert_response( data ){
		return {	use_body	:	data.bodyUsed
				,	header		:	data.headers
				,	ok			:	data.ok
				,	redirect	:	data.redirected
				,	status		:	data.status
				,	type		:	data.type
				,	url			:	data.url	
		};
	}

} 
