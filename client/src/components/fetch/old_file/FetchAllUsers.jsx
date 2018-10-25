import FetchMain from "./FetchMain.jsx";

export default class FetchAllUsers{
	// init function 
	constructor( callback , caller ){
		console.log("<- FetchAllUser ->")
//		super( "users" , callback , caller); // send arguments to FetchMain	
		this.connection = new FetchMain( "users" , callback , caller)
		this.caller = caller
		this.callback = callback
	}

	get_all_user(){
		this.connection.get_data()
	}

	get_specific_email( email ){
		this.email = email;
		this.connection.get_data( this.filter_email , this );
		this.caller.forceUpdate()	
	}

	update_render( this_ ){
		this_.caller.forceUpdate()
	}

	filter_email( information , data , this_){
		var count = 0;
		var max = data.users.count;
		console.log("<- FetchAllusers -> email for filter is " + this_.email )
		console.log("<----- FetchAllusers : filter_email : data ----->")
		console.log( data )
		console.log("<----- FetchAllusers : filter_email : temporary ----->")
		let temporary = data.users.user;
		var answer = this_.create_user_object()
		console.log("<----- FetchAllusers : filter_email : answer -----> before loop")
		console.log( answer )
		for( count = 0 ; count < max ; count++){
			if( temporary[count].email == this_.email ){
				console.log("<----- FetchAllusers : fileter_email -----> correct email")
				console.log("count is " + count )
				answer	= this_.create_user_object( temporary[count] )
//				this_.caller.forceUpdate()
				break
			}
			else{
				console.log("count : email are " + count + " : " + temporary[count].email)
			}
		}
		return answer
	}

	create_user_object( data ){
		var answer
		if( data == undefined ){
			answer = {
				have : false , id : null , email : null , use_google_id : null 
			,	google_id : null , register_date : null
			}
		}
		else{
			answer = {
				have : true , id : data._id , email : data.email , use_google_id : data.isGoogle
			,	google_id : data.googleID , register_date : data.registerDate
			}
		}
		return answer
	}

} 
