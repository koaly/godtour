console.log('import script registes.js');

function update_picture( ){
	console.log('I\'m in function update picture');
	var original_source = document.getElementById('profile_picture');
	console.log('original_source of picture is ' + original_source.src);
	var new_source = new Image();
	new_source.src = document.getElementById('browse_picture').value;
	new_source.id = 'profile_picture';
	console.log('new_source of picture is ' + new_source.src);
	if( new_source.src != "" ){
		console.log('I change picture');
		original_source.parentNode.insertBefore( new_source , original_source );
		original_source.parentNode.removeChild( original_source );
		console.log('New image is ' + original_source.src);
	}
	else{
		console.log("you don't chose some picture")
	}
}
