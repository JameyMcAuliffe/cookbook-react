import React from 'react';


const Ingredients = (props) => {

	return (
		<div>
			<h5 className="mt-4 text-white">Ingredients:</h5>
			{props.ingredientInputs}
			<button 
				type="button" 
				className="form-group col-sm-4 btn-primary mt-1"
				onClick={props.addNewIngredient}>Add Ingredient</button>
		</div>
	);
}

export default Ingredients;

