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
	writeObjectToFile: function(file, object, callback){
		/**
		Vérification que les paramètres sont bien présents
		**/
		if(typeof file === "undefined" || typeof object === "undefined"){
			callback('Err: file or object undefined');
			return 0;
		}
		if(typeof file !== 'string')
			callback('File must be a path');
		if(typeof object !== 'object')
			callback('tyepof(object) must be an object');

		/**
		Sérialisation de l'objet et écriture dans le fichier
		**/
		try{
			var data = JSON.stringify(object);
			fs.writeFile(file, data, function(err){
				if(err)
					callback(err);
			});
		} catch(e) {
			console.log(e);
		}
	},
	/**
	Prend en paramètre un chemin
	Return un objet json ou une erreur
	**/
	readObjectFromFile: function(file, callback){

		/**
		Vérification que les paramètres sont bien présents
		**/
		if(typeof file === "undefined" || typeof callback !== 'function')
			callback(null, "Err: file undefined, typeof callback must be a function");

		/**
		Désérialisation de l'objet et écriture dans le fichier
		**/
		try{
			var contenu;
			fs.readFile(file, function(err, data){
				if(err)
					callback(undefined, err);
				callback(JSON.parse(data), null);
			});
		} catch(e) {
			callback(null, err);
		}
	}
};
