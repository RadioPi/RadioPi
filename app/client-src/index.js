require('./sass/main.scss');

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Test from './Test';
import { Router, Route, browserHistory } from 'react-router';


ReactDOM.render(
	<Router history={browserHistory}>
		<Route path="/" component={App}/>
		<Route path="/test" component={Test}/>
	</Router>
	, document.getElementById('root'));
