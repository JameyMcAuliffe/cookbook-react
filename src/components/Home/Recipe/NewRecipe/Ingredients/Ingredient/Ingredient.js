import React from 'react';

const Ingredient = (props) => {

	return(
		<div className="offset-1 mb-1">
			<div className="row offset-2">
				<input 
					type="text" 
					className="form-control col-sm-5" 
					placeholder="Ingredient..."/>
				<input 
					type="text" 
					className="form-control col-sm-3"
					placeholder="Amount/measure..."/>
			</div>
		</div>
	);
};

export default Ingredient;

//<button 
				// 	className="btn btn-danger col-sm-1"
				// 	type="button"
				// 	id={props.id}
				// 	onClick={props.removeIngredient}>X</button>
