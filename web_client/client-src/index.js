import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Router, Route, browserHistory } from 'react-router';
require('./sass/main.scss');



ReactDOM.render(
	<Router history={browserHistory}>
		<Route path="/" component={App}/>
	</Router>
	, document.getElementById('root'));
