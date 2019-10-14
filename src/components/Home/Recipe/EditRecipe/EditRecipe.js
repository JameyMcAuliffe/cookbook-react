import React, {useState, useEffect} from 'react';

import { withAuthorization } from '../../../Session/index';
import Ingredients from '../NewRecipe/Ingredients/Ingredients';
import Instructions from '../NewRecipe/Instructions/Instructions';
import './EditRecipe.css';


const EditRecipe = (props) => {
	
	const recipeID = props.match.params.id.toString();
	const uID = props.firebase.auth.O;
	const initialState = {
		title: '',
		directions: '',
		image: '',
		ingredients: []
	}
	const initialIngredientState = {
		name: '',
		amount: ''
	}

	const [recipeDetails, setRecipeDetails] = useState(initialState);

	useEffect(() => {
		props.firebase.getRecipe(recipeID, uID)
			.then(snapshot => {
				setRecipeDetails(snapshot.data());
				return snapshot.data();
			})
			// eslint-disable-next-line
	},[]);

	let saveRecipe = (e) => {
		props.firebase.editRecipe(recipeID, uID, recipeDetails)
			.then(() => {
				props.history.push(`../${recipeID}`);
			})
		e.preventDefault();
	}

	let onChange = (e) => {
		setRecipeDetails({...recipeDetails, [e.target.name]: e.target.value});
	}

	let onIngredientChange = (e) => {
		let recipeDetailsClone = {...recipeDetails};
		let index = e.target.id;
		recipeDetailsClone.ingredients[index][e.target.name] = e.target.value;
		setRecipeDetails(recipeDetailsClone);
	}

	let addNewIngredient = () => {
		let recipeDetailsClone = {...recipeDetails};
		recipeDetailsClone.ingredients.push(initialIngredientState);
		setRecipeDetails(recipeDetailsClone);
	}

	let onDeleteIngredient = (e) => {
		let id = parseInt(e.target.id);
		let ingredientsClone = [...recipeDetails.ingredients];
		let recipeObjClone = {...recipeDetails};
		ingredientsClone.splice(id, 1);
		recipeObjClone.ingredients = ingredientsClone;
		setRecipeDetails(recipeObjClone);
	}

	let cancelEdit = () => {
		props.history.push(`../${recipeID}`);
	}


	return(
		<div className="rounded mb-5 edit-main-div">
			<h1 className="text-white mt-4">Edit Recipe</h1>
			<div>
				<form className="container"onSubmit={saveRecipe}>
					<div className="form-group mt-4">
						<h5 htmlFor="title" className="text-white">Name:</h5>
						<input
							onChange={onChange}
							value={recipeDetails.title} 
							type="text" 
							name="title" 
							className="form-control edit-input bg-dark text-white"
							placeholder="Enter the recipe name..."/>
						<h5 htmlFor="image" className="mt-4 text-white">Image</h5>
						<input
							onChange={onChange}
							value={recipeDetails.image} 
							type="text"
							name="image"
							className="form-control edit-input bg-dark text-white"
							placeholder="Enter an image url..."
							/>
						<Ingredients 
							onChange={onIngredientChange} 
							addNewIngredient={addNewIngredient}
							ingredientsArray={recipeDetails.ingredients}
							onDelete={onDeleteIngredient}
							/>
						<Instructions onChange={onChange} value={recipeDetails.directions}/>
						<button type="submit" className="btn btn-success mt-2 mr-1 mb-2">Save</button>
						<button type="button" className="btn btn-warning mt-2 ml-1 mb-2" onClick={cancelEdit}>Cancel</button>
					</div>
				</form>
			</div>
		</div>
	);
}

//returns true if authUser !== null
const condition = authUser => !!authUser;

export default withAuthorization(condition)(EditRecipe);
