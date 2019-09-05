import React, {useState} from 'react';

import Ingredient from './Ingredient/Ingredient';

const Ingredients = () => {

	const [ingredientsArray, setIngredientsArray] = useState([<Ingredient />]);

	let addIngredient = () => {
		setIngredientsArray([...ingredientsArray, <Ingredient />]);
	}

	let renderedIngredientInputs = ingredientsArray.map((ingredient, i) => {
		return <Ingredient key={i} />
	});

	return (
		<div>
			<h5>Ingredients:</h5>
			{renderedIngredientInputs}
			<button 
				type="button" 
				className="form-group col-sm-4 btn-primary mt-1"
				onClick={addIngredient}>Add Ingredient</button>
		</div>
	);
}

export default Ingredients;
