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
		$.get(this.props.baseUrl + 'next', (data) => {
			this.props.updateTitle(data.nowPlaying);
		})
	}

	previous = (e) => {
		e.preventDefault();
		$.get(this.props.baseUrl + 'previous', (data) => {
			this.props.updateTitle(data.nowPlaying);
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
		let size = 40;
		return (
			<div className="playerBar">
				<div  className="row">
					<div className="large-2 columns">
						<a onClick={this.previous} ><img  height={size+"px"} width={size+"px"} src={previous} /></a>
						<a onClick={this.togglePause} ><img  height={size+"px"} width={size+"px"} src={pause} /></a>
						<a onClick={this.next} ><img  height={size+"px"} width={size+"px"} src={next} /></a>
					</div>

					<div className="hide-for-small-only large-1 columns">
						<img height="50px" width="60px" src={this.props.thumbNail} />
					</div>
					<div className="large-1 columns">
						<p>{this.props.title}</p>
					</div>
				</div>
			</div>
			)
	}
}