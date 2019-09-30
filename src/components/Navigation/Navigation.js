import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';

import { AuthUserContext } from '../Session/index';
import { withFirebase } from '../Firebase/index';

import * as ROUTES from '../../constants/routes';
import SignOut from '../SignOut/SignOut';
import './Navigation.css';

const Navigation = ({authUser, firebase}) => {
	return(
		<div>
			<AuthUserContext.Consumer>
				{authUser => authUser ? <NavigationAuth firebase={firebase}/> : <NavigationNonAuth />}
			</AuthUserContext.Consumer>
		</div>
	);
}

 const NavigationAuth = (props) => {

 	const [userName, setUserName] = useState('');
 	const [lastVisit, setLastVisit] = useState(null);
 	const uid = props.firebase.auth.O;

 	useEffect(() => {
 		props.firebase.user(uid)
 			.get()
 			.then(snapshot => {
 				setUserName(snapshot.data().username);
 			})
 	},[]);
 	
 	let welcomeMessage = <p className="nav-item navbar-nav text-white ml-auto">Welcome {userName}!</p>;

 	return (
 		<nav className="navbar navbar-expand navbar-dark d-flex mb-5">
 			<h3 className="navbar-brand">Cookbook</h3>
	 		<ul className="navbar-nav mr-auto align-items-center">
				<li className="nav-item">
					<Link to={ROUTES.HOME} className="nav-link">Home</Link>
				</li>
				<li className="nav-item">
					<SignOut />
				</li>
			</ul>
			{userName !== '' ? welcomeMessage : null}
	 	</nav>
 	);
 }


const NavigationNonAuth = () => (
	<nav className="navbar navbar-expand navbar-dark d-flex mb-5">
		<h3 className="navbar-brand">Cookbook</h3>
		<ul className="navbar-nav mr-auto">
			<li className="nav-item">
				<Link to={ROUTES.SIGN_IN} className="nav-link">Sign In</Link>
			</li>
			<li className="nav-item">
				<Link to={ROUTES.SIGN_UP} className="nav-link">Sign Up</Link>
			</li>
		</ul>	
	</nav>
);

export default withFirebase(Navigation);
