import React, { Component } from 'react';

export default class SongCard extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
				<tr>
					<td><a href="#" className="musicLinks" data={this.props.data} onClick={this.props.changeSong}>{this.props.songName}</a></td>
				</tr>
			)
	}
}