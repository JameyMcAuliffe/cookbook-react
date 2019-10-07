import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import { SignUpLink } from '../SignUp/SignUp';
import { withFirebase } from '../Firebase/index';
import * as ROUTES from '../../constants/routes';
import './SignIn.css';


const SignIn = () => {
	return (
		<div className="d-flex justify-content-center signin-div">
			<div className="main-div rounded">
				<h1 className="text-white col-sm-4 offset-4 pb-1 sign-in-text">Sign In</h1>
				<SignInForm/>
				<SignUpLink />
			</div>
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
		<form onSubmit={onSubmit} className="form-group">
			<input
				className="form-control col-sm-8 offset-2 mb-2 bg-dark text-white"
				name="email"
				value={email}
				onChange={onChange}
				type="text"
				placeholder="Enter your email address..."
			/>
			<input
				className="form-control col-sm-8 offset-2 mb-2 bg-dark text-white"
				name="password"
				value={password}
				onChange={onChange}
				type="text"
				placeholder="Enter your password..."
			/>
			<button disabled={isInvalid} type="submit" className="btn btn-primary">Sign In</button>
			{error && <p className="text-white mt-2">{error.message}</p>}
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
