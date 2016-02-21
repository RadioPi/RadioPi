var http = require('http');
var fs = require('fs');
var sys = require('util');
var exec = require('child_process').exec;

var exports = module.exports = {};

var BASE_URL = 'http://www.youtubeinmp3.com/fetch/?format=JSON&video=http://www.youtube.com/watch?v=';

function callApi(id, callback){
	http.get(BASE_URL + id, function(res){
		var body = '';

		res.on('data', function(chunk){
			body += chunk;
		});

		res.on('end', function(){
			var apiResponse = JSON.parse(body);
			callback(apiResponse);
		});
	}).on('error', function(e){
		console.log('Got an error:', e);
	});
}

function puts(error, stdout, stderr){
	console.log(stdout);
}

function cleanName(name){
	//name = name.replace(/\ /g, '_'); //Change spaces into underscores

	return name;
}

function downloadVideo(url, name, callback){
	exec('curl -L -o "' + cleanName(name) + '.mp3" ' + url, puts).on('close', function(code){
		console.log(cleanName(name));
	});
}


// callApi('F1pB4rCz3dQ', function(data){
// 	console.log(data);
// 	downloadVideo(data.link, data.title);
// });

exports.download = function(id, callback){
	callApi(id, function(data){
		downloadVideo(data.link, data.title, callback);
	});
};