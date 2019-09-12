import React, {useState, useEffect} from 'react';

import Ingredient from './Ingredient/Ingredient';

const Ingredients = () => {

	const [ingredientsArray, setIngredientsArray] = useState([]);

	let addIngredient = () => {
		let updatedIngredientsArray = [...ingredientsArray, <Ingredient />];
		setIngredientsArray(updatedIngredientsArray);
	}

	let renderedIngredientInputs = ingredientsArray.map((ingredient, i) => { 
		return <Ingredient key={i}/>
	});

	useEffect(() => {
		console.log('UE: ', renderedIngredientInputs);
	});

	return (
		<div>
			<h5 className="mt-4">Ingredients:</h5>
			{renderedIngredientInputs}
			<button 
				type="button" 
				className="form-group col-sm-4 btn-primary"
				onClick={addIngredient}>Add Ingredient</button>
		</div>
	);
}

export default Ingredients;

//let removeIngredient = (e) => {
	// 	let selectedId = parseInt(e.target.id);
		
	// 	let filteredIngredients = renderedIngredientInputs.filter(ingredient => {

	// 		return ingredient.props.id !== selectedId;
	// 	});
		
	// 	console.log(filteredIngredients);

	// 	setIngredientsArray([...filteredIngredients]);
	// }


