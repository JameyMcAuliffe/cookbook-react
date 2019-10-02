import React, {useState, useEffect} from 'react';

import Ingredient from './Ingredient/Ingredient';

const Ingredients = ({ingredientsArray, addNewIngredient, onDelete, onChange}) => {

	const [ingredientInputsArray, setIngredientInputsArray] = useState([]);

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
				className="form-group col-sm-4 btn-primary mt-1"
				onClick={addNewIngredient}>Add Ingredient</button>
		</div>
	);
}

export default Ingredients;

