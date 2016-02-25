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
//var STATES = require('./lib/playerStates.js');


// Initial config
//var currentState = 0;
var PORT = 1337;
utils.checkCache();
var CACHE_PATH = __dirname + '/cache/';
youtube.setCachePath(CACHE_PATH);

// var changeCurrentState = function(newState){
// this.currentState = newState;
// };

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

var queue = utils.musicList();
var queuePos = 0;
//changeCurrentState(STATES.STOPPED);
var AUTO_NEXT = true; // Si la variable est à true le player joue tout seul les musiques suivantes dans la file
var REPEAT = true; //TODO: l'utiliser dans next()

var setFile = function(file){
	//changeCurrentState(STATES.STOPPED);
	try{
		player.setFile(CACHE_PATH + file + '.mp3');
	} catch (error) {
		player = new Mplayer(CACHE_PATH + file + '.mp3');
	}
};

/**
Appeller stop() après avoir changé un morceau crash le player !
**/

var play = function(file){
	if(file === undefined){
		//stop();
		player.play();
		//changeCurrentState(STATES.PLAYING);
		console.log(nowPlaying());
	} else {
		setFile(file);
		player.play();
		var index = queue.indexOf(file);
		if(index == -1){
			queue.push(file);
			queuePos = queue.indexOf(file);
		}
		else
			queuePos = index;
		console.log(nowPlaying());
	}
};

var stop = function(){
	try {
		player.stop();
		//changeCurrentState(STATES.STOPPED);
	} catch (error) {
		console.log(error);
	}
};

//TODO: return le state dans lequel le player est

var togglePause = function(){
	try {
		player.pause();
		//changeCurrentState(currentState == STATES.PLAYING ? STATES.PAUSED : STATES.PLAYING);
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
		if(player.checkPlaying()){
			try{
				player.getPercentPosition(function(elapsedPercent){
					if(elapsedPercent !==undefined){
						if(elapsedPercent>=97){
							next();
						}
					}
				});
			} catch (e){
				console.log(e);
			}
		}
	}
};

setInterval(autoNext, 1000);

var nowPlaying = function(){
	return queue[queuePos];
};

/**
Player Controls API
**/

var playerRouter = express.Router();

playerRouter.get('/play', function(req, res){
	play();
	res.setHeader('Content-Type', 'application/json');
	res.send(JSON.stringify({
		nowPlaying: nowPlaying()
	}));
});

playerRouter.get('/play/:song', function(req, res){
	res.setHeader('Content-Type', 'application/json');
	if(queue.length == 0){
		youtube.search(req.params.song, function(data){
			if(!utils.in_array(utils.cleanName(data.title), utils.musicList())){
				youtube.download(data.id, function(name){
					play(name);
					res.send(JSON.stringify({
						nowPlaying: nowPlaying()
					}));
				});
			} else {
				play(data.title);
				res.send(JSON.stringify({
					nowPlaying: nowPlaying()
				}));
			}
		});
	} else {
		if(!utils.in_array(req.params.song, utils.musicList)){
			youtube.search(req.params.song, function(data){
				if(!utils.in_array(utils.cleanName(data.title), utils.musicList())){
					youtube.download(data.id, function(name){
						play(name);
						res.send(JSON.stringify({
							nowPlaying: nowPlaying()
						}));
					});
				} else {
					play(data.title);
					res.send(JSON.stringify({
						nowPlaying: nowPlaying()
					}));
				}
			});
		} else {
			play(req.params.song);
			res.send(JSON.stringify({
				nowPlaying: nowPlaying()
			}));
		}
	}

});

playerRouter.get('/togglePause', function(req, res){
	togglePause();
	res.send(JSON.stringify({
		message: "Calling togglePause method"
	}));
});

playerRouter.get('/next', function(req, res){
	next();
	res.send(JSON.stringify({
		nowPlaying: nowPlaying()
	}));
});

playerRouter.get('/previous', function(req, res){
	previous();
	res.send(JSON.stringify({
		nowPlaying: nowPlaying()
	}));
});

playerRouter.get('/list', function(req, res){
    res.setHeader('Content-Type', 'application/json');
	res.send(JSON.stringify({
		songs: utils.musicList()
	}));
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
