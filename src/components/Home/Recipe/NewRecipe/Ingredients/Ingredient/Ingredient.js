import React from 'react';

const Ingredient = (props) => {

	return(
		<div className="offset-1 mb-1">
			<div className="row offset-2">
				<input
					name="name"
					id={props.id}
					onChange={props.onIngredientChange}
					value={props.ingValue.name} 
					type="text" 
					className="form-control col-sm-5" 
					placeholder="Ingredient..."/>
				<input
					name="amount"
					id={props.id}
					value={props.ingValue.amount}
					onChange={props.onIngredientChange} 
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
