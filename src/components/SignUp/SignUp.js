import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import { withFirebase } from '../Firebase/index';
import * as ROUTES from '../../constants/routes';


const SignUp = () => {
	return (
		<div>
			<h1>Sign Up</h1>
			<SignUpForm />
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
		<form onSubmit={onSubmit} className="form-group">
			<input
				className="form-control col-sm-6 offset-3 mb-2"
				name="username"
				value={username}
				onChange={onChange}
				type="text"
				placeholder="What would you like to be called?"
			/>
			<input
				className="form-control col-sm-6 offset-3 mb-2"
				name="email"
				value={email}
				onChange={onChange}
				type="text"
				placeholder="Enter a valid email"
			/>
			<input
				className="form-control col-sm-6 offset-3 mb-2"
				name="passwordOne"
				value={passwordOne}
				onChange={onChange}
				type="text"
				placeholder="Create a password"
			/>
			<input
				className="form-control col-sm-6 offset-3 mb-2"
				name="passwordTwo"
				value={passwordTwo}
				onChange={onChange}
				type="text"
				placeholder="Confirm password"
			/>
			<button disabled={isInvalid} type="submit" className="btn btn-primary">Create Account</button>
			{error && <p>{error.message}</p>}
		</form>
	)
}

const SignUpLink = () => (
	<p>Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link></p>
);

//compose nests higher order components 
//withRouter is a higher order component that gives access to React Router
const SignUpForm = compose(
	withRouter,
	withFirebase,
)(SignUpFormBase);

export default SignUp;

export { SignUpForm, SignUpLink };
