import React from 'react';
import { HashRouter, Link, Route, Switch } from 'react-router-dom';

import People from './People';
import Groups from './Groups';

import './App.css';

const App = () => {
	return <HashRouter>
	<div className="App">
		<ul className="navbar">
			<Link to="/"><li>Acceuil</li></Link>
			<Link to="/people"><li>People</li></Link>
			<Link to="/groups"><li>Groups</li></Link>
		</ul>

		<Switch>
			<Route exact path="/">
				<h1>Acceuil</h1>
				<p>Acceuil</p>
			</Route>

			<Route path="/people"> 
				<h1>People</h1>
				<People />
			</Route>

			<Route exact path="/groups">
				<h1>Groups</h1>
				<Groups />
			</Route>
		</Switch>
    </div>
  </HashRouter>
};

export default App;
