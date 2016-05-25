var utils = require('./utils.js');

function Song(name){
	this.name = name;
	this.id = utils.guid();
}

module.exports = Song;