import React, { Component } from 'react';
import SongCard from './song_card';
import deleteButton from '../img/delete.png';

export default class SongsTable extends Component {

	constructor(props){
		super(props);
	}


	render() {
		return (
				<div className="large-6 columns">
					<h4>{this.props.title}:</h4>
					<div className="table-wrapper">
						<div className="table-scroll">
							<table className="songs">
								<tbody>
									{this.props.songs.map((value) => {
										return (
											<SongCard
											key={value.id}
											queuePos={value.id}
											buttonPic={this.props.buttonPic}
											handleButtonClick={this.props.handleButtonClick}
											data={value.name}
											changeSong={this.props.handleSongLinkClicks}
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