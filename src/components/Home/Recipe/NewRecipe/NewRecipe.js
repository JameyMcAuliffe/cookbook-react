import React, {useState, useEffect} from 'react';

import { withAuthorization } from '../../../Session/index';
import Ingredients from './Ingredients/Ingredients';
import Ingredient from './Ingredients/Ingredient/Ingredient';
import Instructions from './Instructions/Instructions';
import { HOME } from '../../../../constants/routes';


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
	const [ingredientInputsArray, setIngredientInputsArray] = useState([]);
	const [mappedIngredientInputs, setMappedIngredientInputs] = useState();


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

	let addNewIngredient = () => {
		let newRecipeObjClone = {...newRecipeObj};
		newRecipeObjClone.ingredients.push(initialIngredientState);
		setNewRecipeObj(newRecipeObjClone);

		let ingredientInputsArrayClone = [...ingredientInputsArray];
		ingredientInputsArrayClone.push(<Ingredient 
																			onIngredientChange={onIngredientChange}
																			id={ingredientInputsArray.length}
																			ingValue={newRecipeObj.ingredients}
																			key={ingredientInputsArray.length}/>);
		setIngredientInputsArray(ingredientInputsArrayClone);
	}

	useEffect(() => {
		let mappedArray = ingredientInputsArray.map(ing => {
			return ing;
		});

		setMappedIngredientInputs(mappedArray);
	}, [ingredientInputsArray]);

	return (
		<div className="">
			<h1>New Recipe</h1>
			<form className="container"onSubmit={saveRecipe}>
				<div className="form-group mt-4">
					<h5 htmlFor="title">Name:</h5>
					<input
						onChange={onChange}
						value={newRecipeObj.title} 
						type="text" 
						name="title" 
						className="form-control col-sm-4 offset-4"
						placeholder="Enter the recipe name..."/>
					<h5 htmlFor="image" className="mt-4">Image</h5>
					<input
						onChange={onChange}
						value={newRecipeObj.image} 
						type="text"
						name="image"
						className="form-control col-sm-4 offset-4"
						placeholder="Enter an image url..."
						/>
					<Ingredients 
						onChange={onChange}
						ingredientInputs={mappedIngredientInputs} 
						addNewIngredient={addNewIngredient}/>
					<Instructions onChange={onChange} value={newRecipeObj.directions}/>
					<button type="submit" className="btn btn-primary mt-2">Save</button>
				</div>
			</form>
		</div>
	);
}

//returns true if authUser !== null
const condition = authUser => !!authUser;

export default withAuthorization(condition)(NewRecipe);
