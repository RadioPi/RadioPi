var express = require('express')
var app = express()


var playerRouter = express.Router()

playerRouter.get('/nowPlaying', (req, res) => {
	res.setHeader('Content-Type', 'application/json')
	res.send({
		nowPlaying: 'RiverBank spinnin\' top 100'
	})
})

playerRouter.get('/play/:song', (req, res) => {
	res.setHeader('Content-Type', 'application/json')
	res.send({

	})
})

playerRouter.get('/list', (req, res) => {
	res.setHeader('Content-Type', 'application/json')
	res.send({
		songs: [
			{
				name: 'ABC',
				id: '0',
				votes: {
					up: 0,
					down: 0
				}
			},
			{
				name: 'DEF',
				id: '0a',
				votes: {
					up: 0,
					down: 0
				}
			},
			{
				name: 'GHI',
				id: '0b',
				votes: {
					up: 0,
					down: 0
				}
			},
		]
	})
})

app.use('/api/controls', playerRouter)

app.listen('1337', () => {
	console.log('We up on port 1337 🎉')
})