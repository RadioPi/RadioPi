import React, { Component } from 'react';
import $ from 'jquery';

export default class App extends Component {
	constructor(props){
		super(props);
		this.state = {
			songs: []
		};
	}

	componentDidMount() {
		$.get('http://localhost:1337/api/controls/list', (data) => {
			this.setState({
				songs: data.songs
			});
		});
	}

	render(){
		return (
			<div>
				<h1>Hello, world</h1>
				{this.state.songs.map(function(value){
					return <li key={value}>{value}</li>
				})}
			</div>
			)
	}
}
