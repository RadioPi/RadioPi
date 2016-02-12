'use strict';
var fs = require('fs');

module.exports = {
	checkCache: function() {
		if(!fs.existsSync("./cache/")){
			fs.mkdirSync("./cache");
		}
	}
};
