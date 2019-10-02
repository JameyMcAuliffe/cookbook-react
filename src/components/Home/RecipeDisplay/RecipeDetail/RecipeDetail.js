import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';

import { withAuthorization } from '../../../Session/index';
import './RecipeDetail.css';
import { HOME } from '../../../../constants/routes';
import ConfirmDelete from './ConfirmDelete/ConfirmDelete';

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
	const [showDelete, setShowDelete] = useState(false);

	const onBackClick = () => {
		props.history.push(HOME);
	}

	let onDeleteRecipe = () => {
		props.firebase.deleteRecipe(recipeID, uID)
			.then(() => {
				setShowDelete(!showDelete);
				props.history.push('/');
			})
	}

	let toggleShowDelete = () => {
		setShowDelete(!showDelete);
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
		<div className={showDelete ? "showDeleteStyling" : null}>
			{showDelete ? <ConfirmDelete toggle={toggleShowDelete} deleteRecipe={onDeleteRecipe}/> : null}
			<button type="button" onClick={onBackClick} className="btn btn-success mb-4 mt-4 mr-auto border-dark">Back to Recipes</button>
			<div className="mb-5 col-sm-6 offset-3 rounded border border-dark recipeBackground">
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
					<button className="btn btn-danger ml-4 border-dark" onClick={toggleShowDelete}>Delete</button>
				</div>
			</div>
		</div>
	);
}

//returns true if authUser !== null
const condition = authUser => !!authUser;

export default withAuthorization(condition)(RecipeDetail);


