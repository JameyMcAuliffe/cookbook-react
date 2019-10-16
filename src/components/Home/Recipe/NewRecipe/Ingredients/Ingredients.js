import React, {useState, useEffect} from 'react';

import Ingredient from './Ingredient/Ingredient';
import './Ingredients.css';

const Ingredients = ({ingredientsArray, addNewIngredient, onDelete, onChange}) => {

	const [ingredientInputsArray, setIngredientInputsArray] = useState([]);
	
	//Creating array of Ingredient components for rendering
	useEffect(() => {
		let mappedIngredientsArray = ingredientsArray.map((ing, i) => {
			return <Ingredient
								id={i}
								key={i}
								value={ingredientsArray[i]}
								onDelete={onDelete}
								onChange={onChange} />
		});

		setIngredientInputsArray(mappedIngredientsArray);
	}, [ingredientsArray, onDelete, onChange]);

	return (
		<div>
			<h5 className="mt-4 text-white">Ingredients:</h5>
			{ingredientInputsArray}
			<button 
				type="button" 
				className="form-group add-ing-button btn-primary mt-1"
				onClick={addNewIngredient}>Add Ingredient</button>
		</div>
	);
}

export default Ingredients;

