import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Login from './components/Login/Login';
import SignUp from './components/SignUp/signup';


const getRoutes = (role, token) => {
	let routes;
	if (token && role === 'admin') {
		routes = (
			<Switch>
				<Redirect to='/'></Redirect>
			</Switch>
		);
	} else if (token && role === 'worker') {
		routes = (
			<Switch>
				<Redirect to='/'></Redirect>
			</Switch>
		);
	} else if (token && role === 'manager') {
		routes = (
			<Switch>
			
			
				<Redirect to='/'></Redirect>
			</Switch>
		);
	} else {
		routes = (
			<Switch>
				<Route exact path='/'>
					<Login />
				</Route>
				<Route exact path='/signup'>
					<SignUp />
				</Route>
				<Route exact path='/login'>
					<Login />
				</Route>

				<Redirect to='/login'></Redirect>
			</Switch>
		);
	}
	return routes;
};

export default getRoutes;
