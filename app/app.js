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

var queue = ['mlg', 'xd', 'triple', 'sorry', 'stitches'];
var queuePos = 0;
var AUTO_NEXT = false;
var REPEAT = true;

var setFile = function(file){
	try{
		player.setFile(CACHE_PATH + file + '.mp3');
	} catch (error) {
		player = new Mplayer(CACHE_PATH + file + '.mp3');
	}
};

/**
Appeller stop() après avoir changé un morceau crash le player !
**/

var play = function(){
	//stop();
	player.play();
	console.log(nowPlaying());
};

var stop = function(){
	try {
		player.stop();
	} catch (error) {
		console.log(error);
	}
	console.log('[nowPlaying]', queue[queuePos]);
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
	if(queuePos + 1 >= queue.length)
		queuePos = -1;
	setFile(queue[++queuePos]);
	play();
};

var previous = function(){
	if(queuePos - 1 == -1)
		queuePos = queue.length;
	setFile(queue[--queuePos]);
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

var nowPlaying = function(){
	return "Now playing: " + queue[queuePos];
};

/**
Player Controls API
**/

var playerRouter = express.Router();

//Sends back all the player routes
playerRouter.get('/', function(req, res){
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({message: 'Hello, world!'}));
});

playerRouter.get('/togglePause', function(req, res){
	togglePause();
	res.send('Calling togglePause() method');
});

playerRouter.get('/next', function(req, res){
	next();
	res.send('Calling next() method');
});

playerRouter.get('/previous', function(req, res){
	previous();
	res.send('Calling previous method');
});

/**
Express APP
**/
var logger = function(req, res, next){
	console.log('[logger]', req.method, req.url);
	next();
};

app.use(logger);
app.use('/api/controls', playerRouter);

app.listen(1337, function(){
	console.log('App listening on port', 1337);
});
