import React, { Component } from 'react';
import $ from 'jquery';
import Player from './components/player';
import TopBar from './components/TopBar';

const BASE_URL = 'http://192.168.1.103:1337/api/controls/';

export default class App extends Component {
	constructor(props){
		super(props);
		this.state = {
			songs: [],
			title: "#RadioPi"
		};
	}

	updateTitle = (title) => {
		this.setState({
			title: title + " | #RadioPi"
		});
	}

	componentDidMount() {
		$.get(BASE_URL + 'list', (data) => {
			this.setState({
				songs: data.songs
			});
		});
	}

	render(){
		window.document.title = this.state.title;
		return (
			<div>
				<TopBar title={this.state.title}/>
				<div className="row">
					<Player baseUrl={BASE_URL} updateTitle={this.updateTitle} songs={this.state.songs}/>
				</div>
			</div>
			)
	}
}
