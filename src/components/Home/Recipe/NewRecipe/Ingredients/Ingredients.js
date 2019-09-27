import React from 'react';


const Ingredients = (props) => {

	return (
		<div>
			<h5 className="mt-4">Ingredients:</h5>
			{props.ingredientInputs}
			<button 
				type="button" 
				className="form-group col-sm-4 btn-primary"
				onClick={props.addNewIngredient}>Add Ingredient</button>
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


	//index={i} onIngredientChange={props.onIngredientChange} ingValue={props.ingValue}


