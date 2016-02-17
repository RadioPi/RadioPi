/**
* Written by Victor Bury and Antonio Calapez
**/

var utils = require('./lib/utils.js');
var Mplayer = require('node-mplayer');
var express = require('express');
var app = express();

var PORT = 1337;

utils.checkCache();
var CACHE_PATH = __dirname + '/cache/';

/**

PLAYER DOCUMENTATION

player.setFile() a besoin d'être try/catch
car il crash si le morceau précédent est fini
à utiliser de cette manière-ci:
	try{
		player.setFile(file);
	} catch(error) {
		console.log(error);
		player = new Mplayer(file);
	}
Si on l'appelle alors qu'on morceau est en train d'être joué
player.setFile() va stop le morceau actuel.

player.play() crash si on l'appelle alors qu'un
morceau est déjà en train d'être joué.
Il faut donc arrêter le morceau qui est entrain
d'être joué pour lancer le nouveau
Utiliser de cette manière-ci:
	try{
		player.stop();
	} catch(error) {
		console.log(error);
	}
	player.play();

player.pause()/player.stop() crash si rien n'est joué,
pareil que les autres il faut les try/catch:
	try{
		player.pause()/stop();
	} catch(error) {
		console.log(error);
	}

player.checkPlaying() retourne:
	true si le player est en train de jouer ou si il est en pause
	false dans tous les autres cas.
**/

var player = new Mplayer();

var queue = ['cache/mlg.mp3', 'cache/sorry.mp3'];
var queuePos = 0;
var AUTO_NEXT = false;
var REPEAT = true;

var setFile = function(file){
	try{
		player.setFile(file);
	} catch (error) {
		player = new Mplayer(file);
	}
};

var play = function(){
	stop();
	player.play();
};

var stop = function(){
	try {
		player.stop();
	} catch (error) {
		console.log(error);
	}
};


//TODO: return le state dans lequel le player est

var togglePause = function(){
	try {
		player.pause();
	} catch (error) {
		console.log(error);
	}
};

var next = function(){
	if(queuePos == queue.length)
		queuePos = 0;
	setFile(queue[queuePos++]);
	play();
};

var previous = function(){
	if((queuePos - 1) == -1)
		queuePos = queue.length - 1;
	setFile(queuePos);
	play();
};

var autoNext = function(){
	if(!player.checkPlaying()){
		if(AUTO_NEXT){
			next();
		}
	}
};

setInterval(autoNext, 1000);
