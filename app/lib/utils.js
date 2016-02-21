'use strict';
var fs = require('fs'),
	path = require('path'),
	Youtube = require('youtube-node');

var youtube = new Youtube();
youtube.setKey('AIzaSyAxIMJITZVLc0rH7h_8chJFtuZ4wQEF9uk');

module.exports = {
	checkCache: function() {
		if(!fs.existsSync("./cache/")){
			fs.mkdirSync("./cache");
		}
	},
	musicList: function(){
		var files = fs.readdirSync('./cache/');
		var queue = [];
		for(var i in files){
			if(path.extname(files[i]) === ".mp3");
			queue.push(files[i].replace('.mp3', ''));
		}

		return queue; //caca
	},
	ytbSearch: function(search, callback){
		youtube.search(search, 1, function(err, result){
			if(err){
				console.log(err);
				callback(err);
			}else{
				callback(err, result);
			}
		});
	},
};
