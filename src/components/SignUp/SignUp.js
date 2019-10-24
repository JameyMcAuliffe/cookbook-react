import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import { withFirebase } from '../Firebase/index';
import * as ROUTES from '../../constants/routes';
import './SignUp.css';


const SignUp = () => {
	return (
		<div className="d-flex justify-content-center">
			<div className="main-div sign-up-div rounded">
				<h1 className="text-white">Sign Up</h1>
				<SignUpForm />
			</div>
		</div>
	);
}

const SignUpFormBase = (props) => {

	const initialState = {
		email: '',
		username: '',
		passwordOne: '',
		passwordTwo: '',
		error: null
	}

	const [userState, setUserState] = useState({...initialState});

	let onSubmit = (e) => {
		const {username, email, passwordOne} = userState;
		
		props.firebase
			.doCreateUserWithEmailAndPassword(email, passwordOne)
			.then(authUser => {
				return props.firebase
					.user(authUser.user.uid)
					.set({username, email},
							 { merge: true }
					);
			})
			.then(() => {
				setUserState({...initialState});
				props.history.push(ROUTES.HOME);
			})
			.catch(error => {
				setUserState({...userState, error: error});
			});

		e.preventDefault();
	}

	let onChange = (e) => {
		setUserState({...userState, [e.target.name]: e.target.value});
	}

	const {username, email, passwordOne, passwordTwo, error} = userState;

	const isInvalid = 
		passwordOne !== passwordTwo ||
		passwordOne.trim() === '' ||
		email.trim() === '' ||
		username.trim() === '';

	return(
		<div>
			<form onSubmit={onSubmit} className="form-group">
				<input
					className="form-control col-sm-8 offset-2 mb-2 bg-dark text-white sign-up-input"
					name="username"
					value={username}
					onChange={onChange}
					type="text"
					placeholder="What would you like to be called?"
				/>
				<input
					className="form-control col-sm-8 offset-2 mb-2 bg-dark text-white sign-up-input"
					name="email"
					value={email}
					onChange={onChange}
					type="text"
					placeholder="Enter a valid email"
				/>
				<input
					className="form-control col-sm-8 offset-2 mb-2 bg-dark text-white sign-up-input"
					name="passwordOne"
					value={passwordOne}
					onChange={onChange}
					type="password"
					placeholder="Create a password at least 6 characters long"
				/>
				<input
					className="form-control col-sm-8 offset-2 mb-2 bg-dark text-white sign-up-input"
					name="passwordTwo"
					value={passwordTwo}
					onChange={onChange}
					type="password"
					placeholder="Confirm password"
				/>
				<button disabled={isInvalid} type="submit" className="btn btn-primary">Create Account</button>
				{error && <p className="text-white mt-2">{error.message}</p>}
			</form>
			<p className="text-white sign-in-link mb-2 rounded col-sm-6 offset-3">Already have an account? <Link to={ROUTES.SIGN_IN} className="text-primary">Sign In</Link></p>
		</div>
	)
}

const SignUpLink = () => (
	<p className="text-white rounded">Don't have an account? <Link to={ROUTES.SIGN_UP} className="text-primary">Sign Up</Link></p>
);

//compose nests higher order components 
//withRouter is a higher order component that gives access to React Router
const SignUpForm = compose(
	withRouter,
	withFirebase,
)(SignUpFormBase);

export default SignUp;

export { SignUpForm, SignUpLink };
