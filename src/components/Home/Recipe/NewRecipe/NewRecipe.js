import React from 'react';

import Ingredients from './Ingredients/Ingredients';
import Instructions from './Instructions/Instructions';

//import classes from './NewRecipe.module.css';

const NewRecipe = () => {
	return (
		<div className="">
			<h1>New Recipe</h1>
			<form className="container">
				<div className="form-group">
					<label htmlFor="title">Name:</label>
					<input 
						type="text" 
						id="title" 
						className="form-control col-sm-4 offset-4"
						placeholder="Enter the recipe name..."/>
					<Ingredients />
					<Instructions />
				</div>
			</form>
		</div>
	);
}

export default NewRecipe;
