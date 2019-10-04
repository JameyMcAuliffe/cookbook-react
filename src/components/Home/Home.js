import React, {useState, useEffect} from 'react';

import { withAuthorization } from '../Session/index';
import RecipeListing from './RecipeDisplay/RecipeListing/RecipeListing';
import AddNewRecipeListing from './RecipeDisplay/RecipeListing/AddNewRecipeListing';
import './Home.css';

const Home = (props) => {
	const uid = props.firebase.auth.O;
	const [recipesArray, setRecipesArray] = useState([]);

	useEffect(() => {
		//temporary array to hold returned data from fb
		let snapshotArray = [];

		//add fb created id to each recipe obj
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

	//value to hold returned RecipeListing components for rendering below
	let renderedRecipes = recipesArray.map((recipe, i) => {
		return <RecipeListing image={recipe.image} title={recipe.title} key={recipe.recipeID} id={recipe.recipeID}/>
	});
	
	return (
		<div className="container-fluid home-div">
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
