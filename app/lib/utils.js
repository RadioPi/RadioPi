'use strict';
var fs = require('fs'),
	path = require('path'),
	Youtube = require('youtube-node');


module.exports = {
	checkCache: function() {
		if(!fs.existsSync("./cache/")){
			fs.mkdirSync("./cache");
		}
	},
	musicList: function() {
		var files = fs.readdirSync('./cache/');
		var queue = [];
		for(var i in files){
			if(path.extname(files[i]) === ".mp3");
			queue.push(files[i].replace('.mp3', ''));
		}

		return queue; //caca
	},
	in_array: function(string, array) {
		for(var i in array){
			if(array[i] === string)
				return true
		}
		return false;
	}
};
