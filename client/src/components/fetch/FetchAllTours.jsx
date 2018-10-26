import TourConvert from "./TourFunction.jsx" // import function for convert object

var {_start_url , _domain , _port , _path} = require('./default_data.jsx') // import data for url

var HandleObject = new TourConvert();

export default class FetchAllTours{

	constructor(){
		this.FrontLink = _start_url + _domain + ":" + _port;
		this.SendData = {};
		this.SendInfomation = {};
		this.PostData = {};
	}

}
