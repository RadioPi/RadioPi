import React, { Component } from 'react';
import $ from 'jquery';

/** Image pour les contrôles du player */
var next = require('../img/next.png');
var playPause = require('../img/play-pause.png');
var previous = require('../img/previous.png');

const BASE_URL = 'http://192.168.1.103:1337/api/controls/';

export default class PlayerBar extends Component {
	constructor(props){
		super(props);
	}

	next = (e) => {
		e.preventDefault();
		$.get(BASE_URL + 'next', function(data){
			console.log(data);
			//this.props.updateTitle(data);
		})
	}

	previous = (e) => {
		e.preventDefault();
		$.get(BASE_URL + 'previous', (data) => {
			//this.props.updateTitle(data.nowPlaying);
		})
	}

	togglePause = (e) => {
		e.preventDefault();
		$.get(BASE_URL + 'togglePause', (data) => {
			console.log(data.message);
		})
	}

	render(){
		return (
			<div className="playerBar">
				<a onClick={this.previous} ><img src={previous} /></a>
				<a onClick={this.togglePause} ><img src={playPause} /></a>
				<a onClick={this.next} ><img src={next} /></a>
			</div>
			)
	}
}