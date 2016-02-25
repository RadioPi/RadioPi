/**
* Written by Victor Bury and Antonio Calapez (mention spéciale Sacha Lecompte)
* TODO: Fixer l'autonext
**/

/**
On utilise webpack-dev-server pour donner l'interface au client
**/

var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: true
}).listen('3000', function (err, result) {
  if (err) {
    console.log(err);
  }

  console.log('Listening at localhost:3000');
});


//APP

var express = require('express');
var app = express();
var utils = require('./lib/utils.js');
//var STATES = require('./lib/playerStates.js');
var currentState = 0;

var PORT = 1337;

var nowPlaying = function(){
	return "MLG";
};

/**
Player Controls API
**/

var playerRouter = express.Router();

playerRouter.get('/nowPlaying', function(req, res){
	res.setHeader('Content-Type', 'application/json');
	res.send(JSON.stringify({
		nowPlaying: nowPlaying()
	}));
});

playerRouter.get('/play', function(req, res){
    res.setHeader('Content-Type', 'application/json');
	res.send(JSON.stringify({
		nowPlaying: nowPlaying()
	}));
});

playerRouter.get('/play/:song', function(req, res){
	res.setHeader('Content-Type', 'application/json');
	res.send(JSON.stringify({
		nowPlaying: req.params.song
	}));
});

playerRouter.get('/togglePause', function(req, res){
	// togglePause();
	res.send('Calling togglePause() method');
});

playerRouter.get('/next', function(req, res){
	res.setHeader('Content-Type', 'application/json');
	res.send(JSON.stringify({
		nowPlaying: nowPlaying()
	}));
});

playerRouter.get('/previous', function(req, res){
	res.setHeader('Content-Type', 'application/json');
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
