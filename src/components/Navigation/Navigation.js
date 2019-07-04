import React from 'react';
import { Link } from 'react-router-dom';

import * as ROUTES from '../../constants/routes';
import SignOut from '../SignOut/SignOut';

const Navigation = ({authUser}) => (
	<div>{authUser ? <NavigationAuth /> : <NavigationNonAuth />}</div>
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
