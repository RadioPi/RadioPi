'use strict';
var fs = require('fs'),
	path = require('path'),
	Youtube = require('youtube-node');


module.exports = {
	checkCache: function() {
		if(!fs.existsSync("./cache")){
			fs.mkdirSync("./cache");
		}
		if(!fs.existsSync("./cache/songs")){
			fs.mkdirSync("./cache/songs");
		}
		if(!fs.existsSync("./cache/pics")){
			fs.mkdirSync("./cache/pics");
		}
	},
	musicList: function() {
		var files = fs.readdirSync('./cache/songs/');
		var queue = [];
		for(var i in files){
			if(path.extname(files[i]) === ".mp3");
			queue.push(files[i].replace('.mp3', ''));
		}

		return queue;
	},
	in_array: function(string, array) {
		for(var i in array){
			if(array[i] === string)
				return true
		}
		return false;
	},
	cleanName: function(name){
			name = name.replace(/"/g, '');
			name = name.replace(/\//g, '');
			name = name.replace(/\\/g, '');
			name = name.replace(/#/g, '');
			name = name.replace(/\(/g, '');
			name = name.replace(/\)/g, '');
			name = name.replace(/\./g, '');
			return name;
	},
	jpgName: function(name){
		return name.replace(/[^a-zA-Z0-9]/g, '');
	},
	guid: function(){
		function s4() {
			return Math.floor((1 + Math.random()) * 0x10000)
			.toString(16)
			.substring(1);
		}
		return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
		s4() + '-' + s4() + s4() + s4();
	}
};
