import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import AuthUserContext from './context';
import { withFirebase } from '../Firebase/index';
import * as ROUTES from '../../constants/routes';

//custom component protecting routes from non authorized users
const withAuthorization = condition => Component => {
	const WithAuthorization = (props) => {

		useEffect(() => {
			props.firebase.auth.onAuthStateChanged(
				authUser => {
					if (!condition(authUser)) {
						props.history.push(ROUTES.SIGN_IN);
					}
				}
			);
		},[props.firebase.auth, props.history]);

		return (
			<AuthUserContext.Consumer>
				{authUser => condition(authUser) ? <Component {...props} /> : null}
			</AuthUserContext.Consumer>
		);
	}

	return compose(withRouter, withFirebase)(WithAuthorization);
};

export default withAuthorization;
