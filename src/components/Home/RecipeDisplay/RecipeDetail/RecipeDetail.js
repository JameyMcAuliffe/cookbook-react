import React, {useState, useEffect} from 'react';

import { withAuthorization } from '../../../Session/index';

const RecipeDetail = (props) => {

	const recipeID = props.match.params.id.toString();
	const uID = props.firebase.auth.O;
	const initialState = {
		title: null,
		directions: null,
		image: null,
		ingredients: []
	}
	const [recipeDetails, setRecipeDetails] = useState(initialState);

	useEffect(() => {
		props.firebase.getRecipe(recipeID, uID)
			.then(snapshot => {
				console.log(snapshot.data());
				setRecipeDetails(snapshot.data());
			})
			// eslint-disable-next-line
	},[])

	return (
		<div className="mb-5">
			<h3>{recipeDetails.title}</h3>
			<img src={recipeDetails.image} alt={recipeDetails.title}/>
			<h4>Ingredients:</h4>
			{recipeDetails.ingredients.map((ing, i) => {
				return (
					<div key={i}>
						<h5>{ing.name} - {ing.amount}</h5>
					</div>
				);
			})}
			<h4>Directions:</h4>
			<h5>{recipeDetails.directions}</h5>
		</div>
	);
}



//returns true if authUser !== null
const condition = authUser => !!authUser;

export default withAuthorization(condition)(RecipeDetail);

	// {Object.keys(recipeDetails.ingredients).map((ing, i) => {
	// 			return (
	// 				<div key={i}>
	// 					<h5>{ing} - {recipeDetails.ingredients[ing]}</h5> 
	// 				</div>
	// 			)
	// 		})}

