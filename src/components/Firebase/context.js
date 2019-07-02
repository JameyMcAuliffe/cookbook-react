import React from 'react';

//createContext creates both Provider and Consumer components
const FirebaseContext = React.createContext(null);

export default FirebaseContext;


//export const withFirebase = Component => props => (
// 	<FirebaseContext.Consumer>
// 		{firebase => <Component {...props} firebase={firebase} />}
// 	</FirebaseContext.Consumer>
// );
