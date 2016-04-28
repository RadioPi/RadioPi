import React, { Component } from 'react';
import ReactTabs, {Tab, Tabs, TabList, TabPanel } from 'react-tabs';

export default class Test extends Component {
	constructor(props){
		super(props);
	}

	handleSelect = (index, last) => {
		console.log(`Select tab ${index}, Last tab: ${last}`);
	}

	render(){
		return (
			<Tabs
				onSelect={this.handleSelect}
				selectedIndex={0}>

				<TabList>
					<Tab>Morceaux</Tab>
					<Tab>Playlists</Tab>
					<Tab>File</Tab>
				</TabList>

				<TabPanel>
					<h2>Hello from Foo</h2>
				</TabPanel>
				<TabPanel>
					<h2>Hello from Bar</h2>
				</TabPanel>
				<TabPanel>
					<h2>Hello from Rocks</h2>
				</TabPanel>
			</Tabs>
			)
	}
}
