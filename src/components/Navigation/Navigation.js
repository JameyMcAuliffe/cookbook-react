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
 	<nav className="navbar navbar-expand navbar-dark d-flex mb-5 bg-dark">
 		<h3 className="navbar-brand">Cookbook</h3>
 		<ul className="navbar-nav ml-auto">
			<li className="nav-item">
				<Link to={ROUTES.HOME} className="nav-link">Home</Link>
			</li>
			<li className="nav-item">
				<SignOut />
			</li>
		</ul>
 	</nav>
 );

const NavigationNonAuth = () => (
	<nav className="navbar navbar-expand navbar-dark d-flex mb-5 bg-dark">
		<h3 className="navbar-brand">Cookbook</h3>
		<ul className="navbar-nav ml-auto">
			<li className="nav-item">
				<Link to={ROUTES.SIGN_IN} className="nav-link">Sign In</Link>
			</li>
			<li className="nav-item">
				<Link to={ROUTES.SIGN_UP} className="nav-link">Sign Up</Link>
			</li>
		</ul>	
	</nav>
);

export default Navigation;

/*<li className="nav-item">
				<Link to={ROUTES.LANDING} className="nav-link">Home</Link>
			</li>*/
