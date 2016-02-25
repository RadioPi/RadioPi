var http = require('http');
var fs = require('fs');
var sys = require('util');
var exec = require('child_process').exec;
var utils = require('./utils.js');

var Youtube = require('youtube-node');

var youtube = new Youtube();
youtube.setKey('AIzaSyAxIMJITZVLc0rH7h_8chJFtuZ4wQEF9uk');

var exports = module.exports = {};

var cachePath;

/**
Utilisation de l'api de http://www.youtubeinmp3.com
Elle nous permet de directement télécharger les musiques au format mp3 sans devoir les convertir sur le pi
ce qui réduit le travail à effectuer côté serveur
**/

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

function downloadVideo(url, name, callback){
	exec('curl -L -o "' + cachePath + utils.cleanName(name) + '.mp3" ' + url, puts).on('close', function(code){
		callback(utils.cleanName(name));
	});
}

exports.search = function(search, callback){
	youtube.search(search, 1, function(err, result){
		if(err){
			console.log(err);
			callback(null, err);
		}else{
			callback({
				id: result.items[0].id.videoId,
				title: result.items[0].snippet.title
			}, null);
		}
	});
};

exports.setCachePath = function(path){
	cachePath = path;
};

exports.download = function(id, callback){
	callApi(id, function(data){
		downloadVideo(data.link, data.title, callback);
	});
};

