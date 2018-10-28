import TourConvert from "./TourFunction.jsx" // import function for convert object
import InformationConvert from "./InformationFunction.jsx"

var {_start_url , _domain , _port , _path} = require('./default_data.jsx') // import data for url

var HandleObject = new TourConvert();
var HandleInformation = new InformationConvert();

export default class FetchAllTours{

	constructor(){
		this.FrontLink = _start_url + _domain + ":" + _port;
		this.SendData = {};
		this.SendInfomation = {};
		this.PostData = {};
	}

	get_all_tours( start , range , Callback ){
		console.log("===============> FetchAllTours.get_all_tours ");
		fetch( this.FrontLink + _path._all_tours )
			.then( response => {
				console.log("=====> get_all_tours.response" , response);
				this.SendInfomation = HandleInformation.convert_response( response );
				return response.json();	
			})
			.then( json => {
				console.log("=====> get_all_tours.json" , json );
				this.SendData = HandleObject.manage_group_tour_order( json , start , range )
				console.log("=====> get_all_tours.SendData" , this.SendData );
				Callback( this.SendInfomation , this.SendData)	
			})
	}	

}
