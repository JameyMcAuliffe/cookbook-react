import React from 'react';

//createContext creates both Provider and Consumer components
const FirebaseContext = React.createContext(null);

export const withFirebase = Component => props => (
	<FirebaseContext.Consumer>
		{firebase => <Component {...props} firebase={firebase} />}
	</FirebaseContext.Consumer>
);

export default FirebaseContext;

