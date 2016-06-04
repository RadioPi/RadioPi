import React, { Component } from 'react';
import $ from 'jquery';

export default class TopBar extends Component {

	constructor(props){
		super(props);
	}

	adminLogin = (e) => {
		let password = prompt("Password?");
		$.get(`${this.props.baseUrl}login/${password}`, (data) => {
			console.log(data);
			if(data.success){
				this.props.updateToken(data.token);
				alert('Password valide!');
			} else {
				alert('Password invalide');
			}

		});
	}

	render() {
		return (
			<div className="top-bar">
				<div className="row">
					<div className="top-bar-title">
						<h4>{this.props.title}</h4>
					</div>
					<a onClick={this.adminLogin} className="button">Admin</a>
				</div>
			</div>
			)
	}
}