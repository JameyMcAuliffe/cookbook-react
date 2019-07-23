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
	<ul>
		<li>
			<Link to={ROUTES.LANDING}>Home</Link>
		</li>
		<li>
			<SignOut />
		</li>
	</ul>
 );

const NavigationNonAuth = () => (
	<ul>
		<li>
			<Link to={ROUTES.LANDING}>Home</Link>
		</li>
		<li>
			<Link to={ROUTES.SIGN_IN}>Sign In</Link>
		</li>
	</ul>
);

export default Navigation;
