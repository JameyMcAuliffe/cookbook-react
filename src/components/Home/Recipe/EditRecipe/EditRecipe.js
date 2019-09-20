import React, {useState, useEffect} from 'react';

import { withAuthorization } from '../../../Session/index';
import Ingredients from '../NewRecipe/Ingredients/Ingredients';
import Ingredient from '../NewRecipe/Ingredients/Ingredient/Ingredient';
import Instructions from '../NewRecipe/Instructions/Instructions';


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

	//console.log(mappedIngredientInputs);


	return(
		<div>
			<h1>Edit Recipe</h1>
			<div className="">
				<form className="container"onSubmit={saveRecipe}>
					<div className="form-group mt-4">
						<h5 htmlFor="title">Name:</h5>
						<input
							onChange={onChange}
							value={recipeDetails.title} 
							type="text" 
							name="title" 
							className="form-control col-sm-4 offset-4"
							placeholder="Enter the recipe name..."/>
						<h5 htmlFor="image" className="mt-4">Image</h5>
						<input
							onChange={onChange}
							value={recipeDetails.image} 
							type="text"
							name="image"
							className="form-control col-sm-4 offset-4"
							placeholder="Enter an image url..."
							/>
						<Ingredients 
							onChange={onChange}
							ingredientInputs={mappedIngredientInputs} 
							addNewIngredient={addNewIngredient}/>
						<Instructions onChange={onChange} value={recipeDetails.directions}/>
						<button type="submit" className="btn btn-primary mt-2">Save</button>
					</div>
				</form>
			</div>
		</div>
	);
}

//returns true if authUser !== null
const condition = authUser => !!authUser;

export default withAuthorization(condition)(EditRecipe);

