import React from 'react';

import { withAuthorization } from '../Session/index';

const Home = () => {
	return (
		<h1>Home</h1>
	);
}

//returns true if authUser !== null
const condition = authUser => !!authUser;

export default withAuthorization(condition)(Home);
