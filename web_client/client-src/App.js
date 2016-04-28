import React, { Component } from 'react';
import $ from 'jquery';
import Player from './components/player';
import TopBar from './components/TopBar';
var socket = require('socket.io-client')();

const BASE_IP = socket.io.uri.replace('http://', '').replace(':1337', '');
const BASE_URL = `http://${BASE_IP}:1337/api/controls/`;

//const BASE_IP = '192.168.1.103';
//const BASE_URL = `http://${BASE_IP}:1337/api/controls/`;

export default class App extends Component {
	constructor(props){
		super(props);
		this.state = {
			songs: [],
			queue: [],
			title: "RadioPi"
		};
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
		/**socket.on('nowPlaying', (data) => {
			console.log(data);
			this.setState({
				title: data.nowPlaying
			});
		});**/

		socket.on('queue', (data) => {
			this.setState({
				queue: data.queue
			});
		});

		/**$.get(BASE_URL + 'nowPlaying', (data) => {
			this.setState({
				title: data.nowPlaying
			});
		});**/

		$.get(BASE_URL + 'list', (data) => {
			this.setState({
				songs: data.songs
			});
		});
		$.get(BASE_URL + 'queue', (data) => {
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
				<TopBar title={this.state.title}/>
				<Player
					title={this.state.title}
					baseUrl={BASE_URL}
					baseIP={BASE_IP}
					updateTitle={this.updateTitle}
					updateQueue={this.updateQueue}
					songs={this.state.songs}
					queue={this.state.queue} />
			</div>
			)
	}
}
