import React, { Component } from 'react';
import $ from 'jquery';


export default class SearchBar extends Component {
	constructor(props){
		super(props);

		this.state = {
			search: ''
		}
	}

	handleChange = (e) => {
		this.setState({
			search: e.target.value
		})
	}

	playSong = (e) => {
		e.preventDefault();
		this.setState({
			search: ''
		});
		$.get(this.props.baseUrl + 'play/' + this.state.search + '/next/', (data) => {
			console.log(data);
			if(data.error){
				alert(data.error);
				return;
			} else if(data.nowPlaying && data.queue) {
				this.props.updateTitle(data.nowPlaying);
				this.props.updateQueue(data.queue);
			}
		});
	}

	render(){
		return (
			<form onSubmit={this.playSong}>
				<input value={this.state.search} onChange={this.handleChange} type="text" placeholder="Entrer un nom d'artiste ou le nom d'une chanson"className="large-12 columns" />
			</form>
			)
	}
}