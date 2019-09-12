import React from 'react';

import Ingredients from './Ingredients/Ingredients';
import Instructions from './Instructions/Instructions';

//import classes from './NewRecipe.module.css';

const NewRecipe = () => {
	let saveRecipe = (e) => {
		e.preventDefault();
		console.log(e);
	}

	return (
		<div className="">
			<h1>New Recipe</h1>
			<form className="container"onSubmit={saveRecipe}>
				<div className="form-group">
					<label htmlFor="title">Name:</label>
					<input 
						type="text" 
						id="title" 
						className="form-control col-sm-4 offset-4"
						placeholder="Enter the recipe name..."/>
					<Ingredients />
					<Instructions />
					<button type="submit" className="btn btn-primary">Save</button>
				</div>
			</form>
		</div>
	);
}

export default NewRecipe;
