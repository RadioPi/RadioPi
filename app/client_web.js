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
}).listen(3000, 'localhost', function (err, result) {
  if (err) {
    console.log(err);
  }

  console.log('Listening at localhost:3000');
});


//APP

var express = require('express');
var app = express();
//var STATES = require('./lib/playerStates.js');
var currentState = 0;

var PORT = 1337;

var nowPlaying = function(){
	return "Now playing: MLG";
};

/**
Player Controls API
**/

var playerRouter = express.Router();

playerRouter.get('/play', function(req, res){
	// play();
	res.send(nowPlaying());
});

playerRouter.get('/play/:song', function(req, res){
	// if(!utils.in_array(req.params.song, utils.musicList)){
	// 	youtube.search(req.params.song, function(data){
	// 		if(!utils.in_array(data.title, utils.musicList())){
	// 			youtube.download(data.id, function(name){
	// 				play(name);
	// 				res.send(nowPlaying());
	// 			});
	// 		} else {
	// 			play(data.title);
	// 			res.send(nowPlaying());
	// 		}
	// 	});
	// } else {
	// 	play(req.params.song);
	// 	res.send(nowPlaying());
	// }
	res.send(nowPlaying());
});

playerRouter.get('/togglePause', function(req, res){
	// togglePause();
	res.send('Calling togglePause() method');
});

playerRouter.get('/next', function(req, res){
	// next();
	res.send(nowPlaying());
});

playerRouter.get('/previous', function(req, res){
	// previous();
	res.send(nowPlaying());
});

playerRouter.get('/list', function(req, res){
    res.setHeader('Content-Type', 'application/json');
	res.send(JSON.stringify({
		// songs: utils.musicList()
		songs: ['mlg', 'yolo', 'ayyy']
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
