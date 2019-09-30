import React, {useState, useEffect} from 'react';

import { withAuthorization } from '../../../Session/index';
import Ingredients from '../NewRecipe/Ingredients/Ingredients';
import Ingredient from '../NewRecipe/Ingredients/Ingredient/Ingredient';
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
	const [ingredientInputsArray, setIngredientInputsArray] = useState([]);
	const [mappedIngredientInputs, setMappedIngredientInputs] = useState();

	useEffect(() => {
		props.firebase.getRecipe(recipeID, uID)
			.then(snapshot => {
				//console.log(snapshot.data());
				setRecipeDetails(snapshot.data());
				return snapshot.data();
			})
			// eslint-disable-next-line
	},[]);

	useEffect(() => {
		let ingredientsArray = recipeDetails.ingredients.map((ing, i) => {
				return <Ingredient 
									ingValue={ing}
									onIngredientChange={onIngredientChange}
									id={i}
									key={i}/>
			});
			setIngredientInputsArray(ingredientsArray);
			// eslint-disable-next-line
	}, [recipeDetails]);

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

		let ingredientInputsArrayClone = [...ingredientInputsArray];
		ingredientInputsArrayClone.push(<Ingredient 
																			onIngredientChange={onIngredientChange}
																			id={ingredientInputsArray.length}
																			ingValue={recipeDetails.ingredients[ingredientInputsArray.length - 1]}
																			key={ingredientInputsArray.length}/>);
		setIngredientInputsArray(ingredientInputsArrayClone);
	}

	useEffect(() => {
		let mappedArray = ingredientInputsArray.map(ing => {
			return ing;
		});

		setMappedIngredientInputs(mappedArray);
	}, [ingredientInputsArray]);

	let cancelEdit = () => {
		props.history.push(`../${recipeID}`);
	}


	return(
		<div className="rounded col-sm-6 offset-3 mb-5 main-edit-div">
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
							className="form-control col-sm-8 offset-2 bg-dark text-white"
							placeholder="Enter the recipe name..."/>
						<h5 htmlFor="image" className="mt-4 text-white">Image</h5>
						<input
							onChange={onChange}
							value={recipeDetails.image} 
							type="text"
							name="image"
							className="form-control col-sm-8 offset-2 bg-dark text-white"
							placeholder="Enter an image url..."
							/>
						<Ingredients 
							onChange={onChange}
							ingredientInputs={mappedIngredientInputs} 
							addNewIngredient={addNewIngredient}/>
						<Instructions onChange={onChange} value={recipeDetails.directions}/>
						<button type="submit" className="btn btn-success mt-2 mr-1 mb-2">Save</button>
						<button className="btn btn-warning mt-2 ml-1 mb-2" onClick={cancelEdit}>Cancel</button>
					</div>
				</form>
			</div>
		</div>
	);
}

//returns true if authUser !== null
const condition = authUser => !!authUser;

export default withAuthorization(condition)(EditRecipe);

