import React from 'react';

import { withFirebase } from '../Firebase/index';

const SignOut = ({firebase}) => {
	return(
		<button className="btn"onClick={firebase.doSignOut}>Sign Out</button>
	);
}

export default withFirebase(SignOut);
