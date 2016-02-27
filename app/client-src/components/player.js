import React, { Component } from 'react';
import SongCard from './song_card';
import SearchBar from './searchBar';
import PlayerBar from './playerBar';
import $ from 'jquery'




export default class Player extends Component {


	constructor(props){
		super(props);
	}

	handleSongLinkClicks = (e) => {
		e.preventDefault();
		let song = e.target.getAttribute("data");
		$.get(this.props.baseUrl + 'play/' + song, (data) => {
			this.props.updateTitle(data.nowPlaying);
		});
	}


	render() {
		return (
			<div className="large-12 columns">
				<h4>Songs:</h4>
				<SearchBar baseUrl={this.props.baseUrl} updateTitle={this.props.updateTitle} songs={this.props.songs}/>
				<div id="table-wrapper">
					<div id="table-scroll">
						<table id="songs">
							<tbody>
								{this.props.songs.map((value) => {
									return (
										<SongCard key={value} data={value} changeSong={this.handleSongLinkClicks} songName={value} />
										)
									})
								}
							</tbody>
						</table>
					</div>
				</div>
				<PlayerBar baseUrl={this.props.baseUrl} title={this.props.title} updateTitle={this.props.updateTitle}/>
			</div>
			)
	}
}