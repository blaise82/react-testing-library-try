import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import jwt from 'jsonwebtoken';
import SignIn from './views/SignIn';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Dashboard from './views/Dashboard';

const theme = createMuiTheme({
	typography: {
		fontFamily: '"Trebuchet MS", sans-serif'
	},
	palette: {
		primary: {
			main: '#2196f3'
		},
		secondary: {
			main: '#f50057'
		}
	}
});

const checkAuth = () => {
	const token =  localStorage.getItem('token');
	console.log(token)
	try {
	  const userInfo = jwt.verify(token, 'ThisThescret@123');
	  if (userInfo === null) return false;
	  return userInfo;
	} catch (err) {
	  return false;
	}
};

const AuthRoute = ({ component: Component, ...rest }) => (
	<Route
		{...rest}
		render={(props) => (checkAuth() ? <Component {...props} /> : <Redirect to={{ pathname: '/signin' }} />)}
	/>
);

export default class App extends Component {
	render() {
		return (
			<MuiThemeProvider theme={theme}>
				<Router>
					<Switch>
						<Route path="/" exact>
							<p>hello world</p>
						</Route>
						<Route path="/signin">
							<SignIn />
						</Route>
						<AuthRoute exact path="/dashboard" component={Dashboard} />
					</Switch>
				</Router>
			</MuiThemeProvider>
		);
	}
}
