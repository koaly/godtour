var _fetch_stream = require("fetch").FetchStream;

export class FetchStream{
	constructor( path ){
		this.url = "http://localhost:5000" + path;
		console.log( "path of fetch stream is " + this.url )
//		this.fetch = new _fetch_stream(this.url);
	}
}
