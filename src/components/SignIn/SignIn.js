import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import { SignUpLink } from '../SignUp/SignUp';
import { withFirebase } from '../Firebase/index';
import * as ROUTES from '../../constants/routes';


const SignIn = () => {
	return (
		<div>
			<h1>Sign In</h1>
			<SignInForm/>
			<SignUpLink />
		</div>
	);
}

const INITIAL_STATE = {
	email: '',
	password: '',
	error: null
};

const SignInFormBase = (props) => {

	const [userState, setUserState] = useState({...INITIAL_STATE});

	let onSubmit = (e) => {
		const { email, password } = userState;

		props.firebase
			.doSignInWithEmailAndPassword(email, password)
			.then(() => {
				setUserState({...INITIAL_STATE});
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

	const {email, password, error} = userState;

	const isInvalid = password.trim() === '' || email.trim() === '';

	return (
		<form onSubmit={onSubmit}>
			<input
				name="email"
				value={email}
				onChange={onChange}
				type="text"
				placeholder="Enter your email address"
			/>
			<input
				name="password"
				value={password}
				onChange={onChange}
				type="text"
				placeholder="Enter your password"
			/>
			<button disabled={isInvalid} type="submit">Sign In</button>
			{error && <p>{error.message}</p>}
		</form>
	);
}

//withRouter is a higher order component that gives access to React Router
const SignInForm = compose(
	withRouter,
	withFirebase
)(SignInFormBase)

export default SignIn;

//j@gmail.com 123456
