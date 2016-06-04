import React, { Component } from 'react';
import $ from 'jquery';
import Player from './components/player';
import TopBar from './components/TopBar';
var socket = require('socket.io-client')();
//var socket = require('socket.io-client')("192.168.0.4:1337");

//const BASE_IP = '192.168.0.4';
const BASE_IP = socket.io.uri.replace('http://', '').replace(':1337', '');
const BASE_URL = `http://${BASE_IP}:1337/api/`;
//const BASE_URL = `http://${BASE_IP}:1337/api/controls/`;

export default class App extends Component {
	constructor(props){
		super(props);
		this.state = {
			songs: [],
			queue: [],
			title: "RadioPi",
			API_token: ""
		};
	}

	updateToken = (token) => {
		this.setState({
			API_token: token
		});
	}

	updateQueue = (queue) => {
		this.setState({
			queue: queue
		});
	}

	updateTitle = (title) => {
		this.setState({
			title: title
		});
	}

	componentDidMount() {
		socket.on('nowPlaying', (data) => {
			console.log(data);
			this.setState({
				title: data.nowPlaying
			});
		});

		socket.on('queue', (data) => {
			this.setState({
				queue: data.queue
			});
		});

		$.get(BASE_URL + 'controls/list', (data) => {
			this.setState({
				songs: data.songs
			});
		});
		$.get(BASE_URL + 'controls/queue', (data) => {
			this.setState({
				queue: data.queue,
				title: nowPlaying
			})
		});
	}

	render(){
		window.document.title = this.state.title + " | #RadioPi";
		return (
			<div>
				<TopBar updateToken={this.updateToken} title={this.state.title} baseUrl={BASE_URL}/>
				<Player
					title={this.state.title}
					baseUrl={BASE_URL}
					baseIP={BASE_IP}
					updateTitle={this.updateTitle}
					updateQueue={this.updateQueue}
					songs={this.state.songs}
					queue={this.state.queue}
					token={this.state.API_token} />
			</div>
			)
	}
}
