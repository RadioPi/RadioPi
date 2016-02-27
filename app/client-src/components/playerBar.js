import React, { Component } from 'react';
import $ from 'jquery';

/** Image pour les contrôles du player */
var next = require('../img/next.png');
var pause = require('../img/pause.png');
var previous = require('../img/previous.png');

export default class PlayerBar extends Component {
	constructor(props){
		super(props);
	}

	next = (e) => {
		e.preventDefault();
		console.log(this.props.baseUrl + 'next');
		$.get(this.props.baseUrl + 'next', function(data){
			console.log(data);
			//this.props.updateTitle(data);
		})
	}

	previous = (e) => {
		e.preventDefault();
		console.log(this.props.baseUrl + 'previous');
		$.get(this.props.baseUrl + 'previous', (data) => {
			//this.props.updateTitle(data.nowPlaying);
		})
	}

	togglePause = (e) => {
		e.preventDefault();
		console.log(this.props.baseUrl + 'togglePause');
		$.get(this.props.baseUrl + 'togglePause', (data) => {
			console.log(data.message);
		})
	}

	render(){
		return (
			<div className="playerBar">
				<div  className="row">
					<div className="large-12 columns">
						<a onClick={this.previous} ><img src={previous} /></a>
						<a onClick={this.togglePause} ><img src={pause} /></a>
						<a onClick={this.next} ><img src={next} /></a>
					</div>
				</div>
			</div>
			)
	}
}