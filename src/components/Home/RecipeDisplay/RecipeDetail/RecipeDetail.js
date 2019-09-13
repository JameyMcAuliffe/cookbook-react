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
	},[])

	return (
		<div>
			<h3>{recipeDetails.title}</h3>
			<img src={recipeDetails.image} alt={recipeDetails.title}/>
			<h4>Ingredients:</h4>
			{Object.keys(recipeDetails.ingredients).map((ing, i) => {
				return (
					<div key={i}>
						<h5>{ing} - {recipeDetails.ingredients[ing]}</h5> 
					</div>
				)
			})}
			<h4>Directions:</h4>
			<h5>{recipeDetails.directions}</h5>
		</div>
	);
}

//export default RecipeDetail;

//returns true if authUser !== null
const condition = authUser => !!authUser;

export default withAuthorization(condition)(RecipeDetail);

