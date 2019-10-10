import React from 'react';

import { withFirebase } from '../Firebase/index';

const SignOut = ({firebase, styling}) => {
	return(
		<button 
			className={styling}  
			onClick={firebase.doSignOut} >Sign Out</button>
	);
}

export default withFirebase(SignOut);
