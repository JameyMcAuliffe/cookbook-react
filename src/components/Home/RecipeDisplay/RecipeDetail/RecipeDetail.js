import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';

import { withAuthorization } from '../../../Session/index';
import './RecipeDetail.css';
import { HOME } from '../../../../constants/routes';

const RecipeDetail = (props) => {

	const recipeID = props.match.params.id.toString();
	const uID = props.firebase.auth.O;
	const initialState = {
		title: null,
		directions: null,
		image: null,
		ingredients: []
	}
	const editRecipePath = `${props.history.location.pathname}/edit`;

	const [recipeDetails, setRecipeDetails] = useState(initialState);
	const styling = {
		background: 'radial-gradient(circle, rgba(255, 232, 168, 1) 5%, rgba(173, 143, 62, 1) 60%)'
	}

	const onBackClick = () => {
		props.history.push(HOME);
	}

	useEffect(() => {
		props.firebase.getRecipe(recipeID, uID)
			.then(snapshot => {
				setRecipeDetails(snapshot.data());
			})
			.catch(err => {
				return err
			});
			// eslint-disable-next-line
	},[]);

	return (
		<div>
			<button type="button" onClick={onBackClick} className="btn btn-success mb-4 mr-auto border-dark">Back to Recipes</button>
			<div className="mb-5 col-sm-6 offset-3 rounded border border-dark" style={styling}>
				<h2 className="title handwriting mt-4 mb-5">{recipeDetails.title}</h2>
				<img  
					src={recipeDetails.image} 
					alt={recipeDetails.title}
					className="rounded recipeImage mb-5 img-fluid"/>
				<h3>Ingredients:</h3>
				{recipeDetails.ingredients.map((ing, i) => {
					return (
						<div key={i}>
							<h4 className="handwriting">{ing.name} - {ing.amount}</h4>
						</div>
					);
				})}
				<h3 className="mt-4">Directions:</h3>
				<h4 className="mb-4 handwriting">{recipeDetails.directions}</h4>
				<div className="mb-5">
					<Link to={editRecipePath}>
						<button className="btn btn-primary m-4 border-dark">Edit</button>
					</Link>
					<button className="btn btn-danger ml-4 border-dark">Delete</button>
				</div>
			</div>
		</div>
	);
}



//returns true if authUser !== null
const condition = authUser => !!authUser;

export default withAuthorization(condition)(RecipeDetail);


