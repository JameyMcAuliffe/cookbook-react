import React, {useEffect} from 'react';

//import Ingredient from './Ingredient/Ingredient';

const Ingredients = (props) => {

	// const [ingredientsArray, setIngredientsArray] = useState([]);

	// let addIngredient = () => {
	// 	let updatedIngredientsArray = [...ingredientsArray, <Ingredient />];
	// 	setIngredientsArray(updatedIngredientsArray);
	// }

	// let renderedIngredientInputs = props.ingredientInputsArray.map((ingredient, i) => { 
	// 	return <Ingredient key={i} />
	// });

	useEffect(() => {
		//console.log(props.ingredientInputs);
		//console.log('props: ', props);
	})

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


