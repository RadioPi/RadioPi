/**
* Written by Victor Bury and Antonio Calapez (mention spéciale Sacha Lecompte)
* TODO: Fixer l'autonext
**/

/**
On utilise webpack-dev-server pour donner l'interface au client
**/

var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config.dev');

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

