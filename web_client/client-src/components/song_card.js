import React, { Component } from 'react';
import deletePicture from '../img/delete.png';

export default class SongCard extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		var button;
		if(this.props.buttonPic !== undefined){
			var button = (<td>
						<a href="" data={this.props.queuePos} onClick={this.props.handleButtonClick}>
							<img src={this.props.buttonPic} data={this.props.queuePos}/>
						</a>
					</td>);
		}
		return (
				<tr>
					{button}
					<td>
						<a href="#" className="musicLinks" data={this.props.data} onClick={this.props.changeSong}>
							{this.props.songName}
						</a>
					</td>
				</tr>
			)
	}
}