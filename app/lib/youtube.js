var http = require('http');
var fs = require('fs');
var sys = require('util');
var exec = require('child_process').exec;
var utils = require('./utils.js');
var request = require('request');

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
			try {
				var apiResponse = JSON.parse(body);
				console.log(apiResponse);
				callback(apiResponse);
			} catch(err) {
				// console.log("Got err", err);
				// var apiError  = {
				// 	error: "Titre undisponible"
				// }
				// callback(apiError);
			}
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

function download2(url, name, callback){
    var f = fs.createWriteStream(cachePath + 'songs/' + utils.cleanName(name) + '.mp3');
	request
	.get(url)
	.on('error', function(err) {
		console.log(err);
	})
	.pipe(f);
	f.on('finish', function(){
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
				title: result.items[0].snippet.title,
				thumbnail: result.items[0].snippet.thumbnails.default.url
			}, null);
			var f = fs.createWriteStream(cachePath + 'pics/' + utils.jpgName(result.items[0].snippet.title) + '.jpg');
			request
			.get(result.items[0].snippet.thumbnails.default.url)
			.on('error', function(err) {
				console.log(err);
			})
			.pipe(f);
		}
	});
};

exports.setCachePath = function(path){
	cachePath = path;
};

exports.download = function(id, callback){
	callApi(id, function(data){
		if(data.error)
			callback(data);
		else if(data.link && data.title)
			download2(data.link, data.title, callback);
		else
			console.log('unavailable title');
		// downloadVideo(data.link, data.title, callback);
	});
};


