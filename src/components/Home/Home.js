import React, {useState, useEffect} from 'react';

import { withAuthorization } from '../Session/index';
import RecipeListing from './RecipeDisplay/RecipeListing/RecipeListing';
import AddNewRecipeListing from './RecipeDisplay/RecipeListing/AddNewRecipeListing';

const Home = (props) => {
	const uid = props.firebase.auth.O;
	const [recipesArray, setRecipesArray] = useState([]);

	useEffect(() => {
		let snapshotArray = [];

		props.firebase.getRecipes(uid)
		.then(snapshot => {
			snapshot.docs.forEach(doc => {
				let recipeID = doc.id;
				let recipeObj = {...doc.data(), recipeID};
				snapshotArray.push(recipeObj);
			})
		})
		.then(() => {
			setRecipesArray(snapshotArray);
		})
		.catch(err => {
			return err;
		});
		// eslint-disable-next-line
	}, []);

	let renderedRecipes = recipesArray.map((recipe, i) => {
		return <RecipeListing image={recipe.image} title={recipe.title} key={recipe.recipeID} id={recipe.recipeID}/>
	});
	
	return (
		<div className="container-fluid">
			<div className="row d-flex justify-content-around">
				<AddNewRecipeListing />
				{renderedRecipes}	
			</div>
		</div>
	);
}

//returns true if authUser !== null
const condition = authUser => !!authUser;

export default withAuthorization(condition)(Home);
