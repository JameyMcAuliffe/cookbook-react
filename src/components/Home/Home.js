import React, {useState, useEffect} from 'react';

import { withAuthorization } from '../Session/index';
import RecipeListing from './RecipeDisplay/RecipeListing/RecipeListing';

const Home = (props) => {
	//console.log('au: ', props.firebase.auth.O);
	let uid = "NZJUSTsBRTZ1KelLnbzhes1kQUZ2";
	const [recipeThumbnail, setRecipeThumbail] = useState({});

	useEffect(() => {
		props.firebase.getRecipes(uid)
		.then(snapshot => {
			snapshot.docs.forEach(doc => {
				console.log(doc.data());
				setRecipeThumbail(doc.data());
			});
		});
		// eslint-disable-next-line
	}, []);
	
	return (
		<RecipeListing image={recipeThumbnail.image} title={recipeThumbnail.title}/>
	);
}

//returns true if authUser !== null
const condition = authUser => !!authUser;

export default withAuthorization(condition)(Home);
