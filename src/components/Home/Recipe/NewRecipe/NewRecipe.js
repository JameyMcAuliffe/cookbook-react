import React, {useState} from 'react';

import { withAuthorization } from '../../../Session/index';
import Ingredients from './Ingredients/Ingredients';
import Instructions from './Instructions/Instructions';
import { HOME } from '../../../../constants/routes';
import './NewRecipe.css';


const NewRecipe = (props) => {

	const initialIngredientState = {
		name: '',
		amount: ''
	}

	const initialState = {
		title: '',
		directions: '',
		ingredients: [],
		image: ''
	}

	const [newRecipeObj, setNewRecipeObj] = useState(initialState);
	
	let saveRecipe = (e) => {
		let uid = props.firebase.auth.O;
		props.firebase.addRecipe(newRecipeObj, uid)
			.then(() => {
				setNewRecipeObj({...initialState});
				props.history.push(HOME);
			});

		e.preventDefault();
	}

	let onChange = (e) => {
		setNewRecipeObj({...newRecipeObj, [e.target.name]: e.target.value});
	}

	let onIngredientChange = (e) => {
		let newRecipeObjClone = {...newRecipeObj};
		let index = e.target.id;
		newRecipeObjClone.ingredients[index][e.target.name] = e.target.value;
		setNewRecipeObj(newRecipeObjClone);
	}

	let onDeleteIngredient = (e) => {
		let id = parseInt(e.target.id);
		let ingredientsClone = [...newRecipeObj.ingredients];
		let recipeObjClone = {...newRecipeObj};
		ingredientsClone.splice(id, 1);
		recipeObjClone.ingredients = ingredientsClone;
		setNewRecipeObj(recipeObjClone);
	}

	let addNewIngredient = () => {
		let newRecipeObjClone = {...newRecipeObj};
		newRecipeObjClone.ingredients.push(initialIngredientState);
		setNewRecipeObj(newRecipeObjClone);
	}

	let onCancel = () => {
		setNewRecipeObj(initialState);
		props.history.push('/');
	}

	return (
		<div className="rounded new-main-div col-sm-6 offset-3 mb-5">
			<h1 className="text-white mt-2">New Recipe</h1>
			<form className="container"onSubmit={saveRecipe}>
				<div className="form-group mt-4">
					<h5 htmlFor="title" className="text-white">Name:</h5>
					<input
						onChange={onChange}
						value={newRecipeObj.title} 
						type="text" 
						name="title" 
						className="form-control col-sm-8 offset-2 bg-dark text-white"
						placeholder="Enter the recipe name..."/>
					<h5 htmlFor="image" className="mt-4 text-white">Image Url:</h5>
					<input
						onChange={onChange}
						value={newRecipeObj.image} 
						type="text"
						name="image"
						className="form-control bg-dark text-white col-sm-8 offset-2"
						placeholder="Paste an image url..."
						/>
					<Ingredients 
						onChange={onIngredientChange} 
						addNewIngredient={addNewIngredient}
						ingredientsArray={newRecipeObj.ingredients}
						onDelete={onDeleteIngredient}/>
					<Instructions onChange={onChange} value={newRecipeObj.directions}/>
					<button type="submit" className="btn btn-success mt-2 mr-1">Save</button>
					<button type="button" onClick={onCancel} className="btn btn-warning mt-2 ml-1">Cancel</button>
				</div>
			</form>
		</div>
	);
}

//returns true if authUser !== null
const condition = authUser => !!authUser;

export default withAuthorization(condition)(NewRecipe);
