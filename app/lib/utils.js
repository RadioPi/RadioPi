'use strict';
var fs = require('fs');

module.exports = {
	checkCache: () => {
		if(!fs.existsSync("./cache/")){
			fs.mkdirSync("./cache");
		}
	}
};
