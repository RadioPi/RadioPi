require('./sass/main.scss');

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Router, Route, hashHistory } from 'react-router';


ReactDOM.render(
	<Router history={hashHistory}>
		<Route path="/" component={App}/>
	</Router>
	, document.getElementById('root'));
