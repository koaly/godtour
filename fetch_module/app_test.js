const express = require('express')
const app_test = express()
const port = 4000

import {FetchStream} from "./fetch_class.js";

var fetch_from_url = require("fetch").fetchUrl;
var fetch_from_stream = require("fetch").FetchStream;
var count = 0;
var test_01;
var test_02;



app_test.use('/' , (req , res) => res.send('Hello World'))

var fetch = new fetch_from_stream("http://localhost:5000/users");

/*fetch.on("meta" , function(responseHeaders){
	console.log("<--------- fetch on meta --------->")
	console.log( responseHeaders )
});*/

fetch.on("end" , function(){
	console.log("<-------- fetch_end ------------>")
	console.log("test_01")
	console.log(test_01)
	console.log("test_02")
	console.log(test_02)
	console.log("sum_test")
	console.log( test_01 + test_02)
});

fetch.on("data" , function(chunk){
	console.log("<--------- fetch on data --------->")
	console.log( chunk )
	if( count == 0){
		test_01 = chunk
		count += 1
	}
	else{
		test_02 = chunk
	}
	console.log("<--------- finish chunk --------->")
});

//var fetch_end = new fetch_from_stream("http://localhost:5000/users" , { cookieJar : temporary});


app_test.listen( port , () => console.log('app_test listen on port ' + port))

a = new FetchStream( "users")

