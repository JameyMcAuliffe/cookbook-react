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
 	const [showSideBar, setShowSideBar] = useState(false);
 	const uid = props.firebase.auth.O;

 	useEffect(() => {
 		props.firebase.user(uid)
 			.get()
 			.then(snapshot => {
 				setUserName(snapshot.data().username);
 			})
 			.catch((err) => {
 				return err;
 			})
 			// eslint-disable-next-line
 	},[]);

 	let toggleSideBar = () => {
 		setShowSideBar(!showSideBar);
 	}
 	
 	let welcomeMessage = <h5 className="nav-item navbar-nav text-white ml-auto">Welcome {userName}!</h5>;

 	return (
 		<div>
	 		<nav className="navbar navbar-expand-sm navbar-dark d-flex mb-5">
	 			<h3 className="navbar-brand">Cookbook</h3>
	 			<button 
	 				className="navbar-toggler" 
	 				onClick={toggleSideBar}
	 				data-toggle="collapse" 
	 				data-target="collapse_target"
	 				type="button">
	 					<span className="navbar-toggler-icon"></span>
	 			</button>
	 			<div className="collapse navbar-collapse" id="#collapse_target">
			 		<ul className="navbar-nav mr-auto align-items-center">
						<li className="nav-item">
							<Link to={ROUTES.HOME} className="nav-link">Home</Link>
						</li>
						<li className="nav-item">
							<SignOut styling="text-secondary btn"/>
						</li>
					</ul>
					{userName !== '' ? welcomeMessage : null}
	 				
	 			</div>
		 	</nav>
		 	{showSideBar ? <NavSideBar toggleSideBar={toggleSideBar}/> : null}
	 	</div>
 	);
 }


const NavigationNonAuth = () => (
	<nav className="navbar navbar-expand navbar-dark d-flex mb-5">
		<h3 className="navbar-brand">Cookbook</h3>
	</nav>
);

const NavSideBar = ({toggleSideBar}) => (
	<div>
		<nav className="navbar sidebar rounded ml-auto d-flex">
			<ul className="navbar-nav flex-column align-items-center">
				<li className="nav-item">
					<Link to={ROUTES.HOME} className="nav-link sidebar-item" onClick={toggleSideBar}>Home</Link>
				</li>
				<li className="nav-item nav-link">
					<SignOut styling="text-white btn"/>
				</li>
			</ul>
		</nav>
		<button className="btn btn-sm text-white close-sidebar" onClick={toggleSideBar}>Close</button>
	</div>
);

export default withFirebase(Navigation);

