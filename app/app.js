var utils = require('./lib/utils.js');
var Mplayer = require('node-mplayer');

utils.checkCache();

var player1 = new Mplayer();

player1.setFile('cache/sorry.mp3');

player1.play();
