import React, { Component } from 'react';
import $ from 'jquery';
import Player from './components/player';
import TopBar from './components/TopBar';

const BASE_URL = 'http://192.168.1.103:1337/api/controls/';

export default class App extends Component {
	constructor(props){
		super(props);
		this.state = {
			songs: [],
			queue: [],
			title: "RadioPi"
		};
	}

	pushSong = (song) => {
		let youShallNotPush = true;
		for(let song in this.state.songs){
			youShallNotPush = this.state.songs[song] == song ? false : true;
		}
		if(youShallNotPush)
			this.setState({
				songs: this.state.songs.push(song)
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
		$.get(BASE_URL + 'list', (data) => {
			this.setState({
				songs: data.songs
			});
		});
		$.get(BASE_URL + 'queue', (data) => {
			this.setState({
				queue: data.queue
			})
		});
	}

	render(){
		window.document.title = this.state.title + " | #RadioPi";
		return (
			<div>
				<TopBar title={this.state.title}/>
				<Player pushSong={this.pushSong}
				title={this.state.title}
				baseUrl={BASE_URL}
				updateTitle={this.updateTitle}
				updateQueue={this.updateQueue}
				songs={this.state.songs}
				queue={this.state.queue} />
			</div>
			)
	}
}
