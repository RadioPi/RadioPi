/**
* Written by Victor Bury and Antonio Calapez (mention spéciale Sacha Lecompte)
* TODO: Fixer l'autonext
**/

//Permet de s'assurer que l'application ne crash pas si on ne catch pas une erreur
process.on('uncaughtException', function (err) {
  console.log('Caught exception: ' + err);
});


//Imports
var utils = require('./lib/utils.js');
var Mplayer = require('node-mplayer');
var youtube = require('./lib/youtube.js');
var express = require('express');
var app = express();
var self = this;
var Song = require('./lib/song.js');


// Initial config
var PORT = 1337;
utils.checkCache();
var CACHE_PATH = __dirname + '/cache/';
youtube.setCachePath(CACHE_PATH);

/**

PLAYER DOCUMENTATION

TODO:
-> Check the player state
-> Function to switch playlist on the fly
-> Function to create playlists
-> Save playlists in some kind of database maybe?

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

var queue = [];
var queuePos = 0;
var AUTO_NEXT = true; // Si la variable est à true le player joue tout seul les musiques suivantes dans la file
var REPEAT = true; //TODO: l'utiliser dans next()

var setFile = function(file){
	var song = '';
	if(typeof(file) === 'string'){
		song = file;
	} else if(typeof(file) === 'object') {
		song = file.name;
	}

	try{
		player.setFile(CACHE_PATH + song + '.mp3');
	} catch (error) {
		player = new Mplayer(CACHE_PATH + song + '.mp3');
	}
};

function addToQueue(song){
	if(typeof(song) === 'string'){
		var nSong = new Song(song);
		queue.push(nSong);
	} else if(typeof(song) === 'object') {
		queue.push(song);
	}
}

/**
Appeller stop() après avoir changé un morceau crash le player !
**/

var play = function(file){
	if(file === undefined){
		setFile(queue[queuePos].name);
		player.play();
		console.log(nowPlaying());
	} else {
		var nSong = new Song(file);
		addToQueue(nSong);
		setFile(nSong);
		queuePos = queue.map(function(e) { return e.name; }).indexOf(file) - 1;
		next();
		console.log(queue);
		console.log(nowPlaying());
	}
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

var autoNext = function() {
	if(AUTO_NEXT){
		try{
			player.getPercentPosition(function(elapsedPercent){
				if(elapsedPercent !==undefined){
					if(elapsedPercent>=97){
						next();
					}
				}
			});
		} catch (e){
			if(e === "[Error: This socket is closed.]")
				next();
		}
	}
};

setInterval(autoNext, 500);

var nowPlaying = function(){
	return queue[queuePos].name;
};

/**
Player Controls API
**/

var playerRouter = express.Router();

playerRouter.get('/play', function(req, res){
	play();
	res.setHeader('Content-Type', 'application/json');
	res.send({
		nowPlaying: nowPlaying()
	});
});

playerRouter.get('/play/:song', function(req, res){
	res.setHeader('Content-Type', 'application/json');
	if(queue.length == 0){
		youtube.search(req.params.song, function(data){
			if(!utils.in_array(utils.cleanName(data.title), utils.musicList())){
				youtube.download(data.id, function(name){
					play(utils.cleanName(name));
					res.send({
						nowPlaying: nowPlaying()
					});
				});
			} else {
				play(utils.cleanName(data.title));
				res.send({
					nowPlaying: nowPlaying()
				});
			}
		});
	} else {
		if(!utils.in_array(req.params.song, utils.musicList)){
			youtube.search(req.params.song, function(data){
				if(!utils.in_array(utils.cleanName(data.title), utils.musicList())){
					youtube.download(data.id, function(name){
						play(utils.cleanName(name));
						res.send({
							nowPlaying: nowPlaying()
						});
					});
				} else {
					play(utils.cleanName(data.title));
					res.send({
						nowPlaying: nowPlaying()
					});
				}
			});
		} else {
			play(utils.cleanName(req.params.song));
			res.send({
				nowPlaying: nowPlaying()
			});
		}
	}

});

playerRouter.get('/play/:song/next', function(req, res){
	res.setHeader('Content-Type', 'application/json');
	if(utils.in_array(req.params.song, utils.musicList())){
		addToQueue(req.params.song);
		if(queue.length == 1)
			play();
		res.send({
			queue: queue,
			nowPlaying: nowPlaying()
		});
	} else {
		youtube.search(req.params.song, function(data){
			if(utils.in_array(utils.cleanName(data.title), utils.musicList())){
				addToQueue(utils.cleanName(data.title));
				if(queue.length == 1)
					play();
				res.send({
					queue: queue,
					nowPlaying: nowPlaying()
				});
			} else {
				youtube.download(data.id, function(name){
					addToQueue(name);
							if(queue.length == 1)
					play();
					res.send({
						queue: queue,
						nowPlaying: nowPlaying()
					});
				});
			}
		});
	}
});

playerRouter.get('/togglePause', function(req, res){
	togglePause();
	res.send({
		message: "Calling togglePause method"
	});
});

playerRouter.get('/next', function(req, res){
	next();
	res.send({
		nowPlaying: nowPlaying()
	});
});

playerRouter.get('/previous', function(req, res){
	previous();
	res.send({
		nowPlaying: nowPlaying()
	});
});

playerRouter.get('/list', function(req, res){
    res.setHeader('Content-Type', 'application/json');
	res.send({
		songs: utils.musicList()
	});
});

playerRouter.get('/queue', function(req, res){
	res.setHeader('Content-Type', 'application/json');
	res.send({
		queue: queue
	});
});
/**
Express APP
**/
var logger = function(req, res, next){
	console.log('[logger]', req.method, req.url);
	next();
};

//Permet à tout le monde d'accéder à l'API
var allowAll = function(req, res, next){
	res.header('Access-Control-Allow-Origin', "*");
	next();
};

app.use(logger);
app.use(allowAll);
app.use('/api/controls', playerRouter);

app.listen(PORT, function(){
	console.log('App listening on port', PORT);
});
