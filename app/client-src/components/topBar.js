import React, { Component } from 'react';

export default class TopBar extends Component {

	constructor(props){
		super(props);
	}

	render() {
		return (
			<div className="top-bar">
				<div className="row">
					<div className="top-bar-title">
						<h4>{this.props.title}</h4>
					</div>
				</div>
			</div>
			)
	}
}