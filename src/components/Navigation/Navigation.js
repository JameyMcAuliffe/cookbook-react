import React from 'react';
import { Link } from 'react-router-dom';

import { AuthUserContext } from '../Session/index';

import * as ROUTES from '../../constants/routes';
import SignOut from '../SignOut/SignOut';

const Navigation = ({authUser}) => (
	<div>
		<AuthUserContext.Consumer>
			{authUser => authUser ? <NavigationAuth /> : <NavigationNonAuth />}
		</AuthUserContext.Consumer>
	</div>
);

 const NavigationAuth = () => (
 	<nav className="navbar navbar-expand navbar-dark bg-primary">
 		<ul className="navbar-nav">
			<li className="nav-item">
				<Link to={ROUTES.LANDING} className="nav-link">Home</Link>
			</li>
			<li className="nav-item">
				<SignOut />
			</li>
		</ul>
 	</nav>
 );

const NavigationNonAuth = () => (
	<nav className="navbar navbar-expand navbar-dark bg-primary">
		<ul className="navbar-nav">
			<li className="nav-item">
				<Link to={ROUTES.LANDING} className="nav-link">Home</Link>
			</li>
			<li className="nav-item">
				<Link to={ROUTES.SIGN_IN} className="nav-link">Sign In</Link>
			</li>
		</ul>	
	</nav>
);

export default Navigation;
