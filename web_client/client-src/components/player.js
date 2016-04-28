import React, { Component } from 'react';
import $ from 'jquery';


import SongCard from './song_card';
import SearchBar from './searchBar';
import PlayerBar from './playerBar';
import SongsTable from './songsTable';


import deleteButton from '../img/delete.png';




export default class Player extends Component {

	constructor(props){
		super(props);
	}

	handleSongLinkClicks = (e) => {
		e.preventDefault();
		let song = e.target.getAttribute("data");
		let url = `${this.props.baseUrl}play/${song}/next/`;
		console.log(url);
		$.get(url, (data) => {
			console.log(data);
			this.props.updateTitle(data.nowPlaying);
			this.props.updateQueue(data.queue);
		});
	}

	handleQueueLinkClicks = (e) => {
		e.preventDefault();
		let song = e.target.getAttribute("data");
		let url = `${this.props.baseUrl}play/`;
		$.get(`${this.props.baseUrl}play/${song}`, (data) => {
			this.props.updateTitle(data.nowPlaying);
		});
	}

	deleteFromQueue = (index) => {
		let url = `${this.props.baseUrl}queue/remove/${index}`;
		$.get(url, (data) => {
			if(!data.error)
				this.props.updateQueue(data.queue);
			console.log(data.error);
		});
	}

	handleDeleteClick = (e) => {
		e.preventDefault();
		console.log(e.target.getAttribute("data"));
		this.deleteFromQueue(e.target.getAttribute("data"));
	}

	render() {
		var thumbNail = `http://${this.props.baseIP}:1337/${this.props.title.replace(/[^a-zA-Z0-9]/g, '')}.jpg`;
		console.log(thumbNail);
		return (
			<div>
				<div className="row">
					<div className="large-12 columns">
						<h4>Recherche: </h4>
						<SearchBar baseUrl={this.props.baseUrl}
						updateTitle={this.props.updateTitle}
						updateQueue={this.props.updateQueue}
						songs={this.props.songs}/>
					</div>
				</div>
				<div className="row">
					<SongsTable
						classes={['hide-for-small-only', 'large-4']}
						title="Morceaux"
						size="6"
						songs={this.props.songs}
						handleSongLinkClicks={this.handleSongLinkClicks}/>

					<SongsTable
						classes={['large-8']}
						title="File"
						size="6"
						songs={this.props.queue}
						handleSongLinkClicks={this.handleQueueLinkClicks}
						buttonPic={deleteButton}
						handleButtonClick={this.handleDeleteClick}/>

					<PlayerBar
						baseUrl={this.props.baseUrl}
						title={this.props.title} 
						thumbNail={thumbNail}
						updateTitle={this.props.updateTitle}
						updateQueue={this.props.updateQueue}/>
				</div>
			</div>
			)
	}
}