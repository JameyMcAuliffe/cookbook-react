import React, {useState, useEffect} from 'react';

import { withAuthorization } from '../Session/index';
import RecipeListing from './RecipeDisplay/RecipeListing/RecipeListing';

const Home = (props) => {
	//let uid = "NZJUSTsBRTZ1KelLnbzhes1kQUZ2";
	const uid = props.firebase.auth.O;
	//const [recipeThumbnail, setRecipeThumbail] = useState({});
	const [recipesArray, setRecipesArray] = useState([]);

	useEffect(() => {
		let snapshotArray = [];

		props.firebase.getRecipes(uid)
		.then(snapshot => {
			snapshot.docs.forEach(doc => {
				//console.log(doc.data());
				let recipeID = doc.id;
				let recipeObj = {...doc.data(), recipeID};
				//console.log('ro: ', recipeObj);
				snapshotArray.push(recipeObj);
			})
		})
		.then(() => {
			setRecipesArray(snapshotArray);
		});
		// eslint-disable-next-line
	}, []);

	console.log(recipesArray);
	let renderedRecipes = recipesArray.map((recipe, i) => {
		return <RecipeListing image={recipe.image} title={recipe.title} key={recipe.recipeID} id={recipe.recipeID}/>
	});
	
	return (
		<div className="container-fluid">
			<div className="row">
				{renderedRecipes}	
			</div>
		</div>
	);
}

//returns true if authUser !== null
const condition = authUser => !!authUser;

export default withAuthorization(condition)(Home);
