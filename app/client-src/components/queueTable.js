import React, { Component } from 'react';
import SongCard from './song_card';
import deleteButton from '../img/delete.png';

export default class SongsTable extends Component {

	constructor(props){
		super(props);
	}

	handleButtonClicks = (e) => {
		e.preventDefault();
		console.log(e.target.getAttribute("data"));
	}

	render() {
		var i = 0;
		return (
				<div className="large-6 columns">
					<h4>{this.props.title}:</h4>
					<div className="table-wrapper">
						<div className="table-scroll">
							<table className="songs">
								<tbody>
									{this.props.songs.map((value, i) => {
										return (
											<SongCard
											key={i}
											queuePos={i}
											buttonPic={deleteButton}
											data={value.name}
											changeSong={this.props.handleSongLinkClicks}
											handleButtonClick={this.handleButtonClicks}
											songName={value.name} />
											)
										})
									}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			)
	}
}