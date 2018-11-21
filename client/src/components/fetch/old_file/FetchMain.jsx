const _DOMAIN_ADDRESS_	= "http://localhost"
const _PORT_			= "5000" 

export default class FetchMain{
	constructor( path , callback , caller ){
		this.SumLink = _DOMAIN_ADDRESS_ + ":" +  _PORT_ + "/" + path;
		console.log("<- Fetch Main -> constructor in FetchMain " + this.SumLink );
		this.SendInformation = [];
		this.SendData = [];
		this.callback = callback;
		this.caller = caller;
	}

	get_data( SelectSpecific ,  heritage ){
		console.log("<- Fetch Main -> functin get_data()");
		fetch( this.SumLink )
			.then( response => {
				console.log("<- Fetch Main -> response");
				this.SendInformation.status = response.status;
				this.SendInformation.url = response.url;
				console.log("<---------- Fetch Main : Information ----------->");
				console.log( this.SendInformation );
				return response.json()
			})
			.then( json => {
				console.log("<- Fetch Main -> json");
				this.SendData = json;
				console.log("<---------- Fetch Main : Data ---------->");
				console.log( this.SendData );
				if( SelectSpecific == undefined ){
					console.log("<- Fetch Main -> Direct data")
					this.callback( this.SendInformation , this.SendData , this.caller );
//					this.caller.forceUpdate()
				}
				else{
					console.log("<- Fetch Main -> Have to Select data");
					this.SendData = SelectSpecific( this.SendInformation 
											, this.SendData , heritage );
					console.log("<- Fetch Main -> After Filter ");
					console.log( this.SendData )
					heritage.callback( this.SendInformation , this.SendData , this.caller );
					
				}
			})
	}		
	
}
