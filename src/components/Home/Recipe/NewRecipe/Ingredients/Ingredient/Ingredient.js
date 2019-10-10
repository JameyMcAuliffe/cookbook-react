import React from 'react';

import './Ingredient.css';

const Ingredient = ({id, value, onDelete, onChange}) => {

	return(
		<div className="mb-1">
			<div className="row ing-div">
				<input
					name="name"
					id={id}
					onChange={onChange}
					value={value.name} 
					type="text" 
					className="form-control bg-dark text-white ing-name" 
					placeholder="Ingredient..."/>
				<input
					name="amount"
					id={id}
					value={value.amount}
					onChange={onChange} 
					type="text" 
					className="form-control bg-dark text-white ing-amount"
					placeholder="Amount/measure..."/>
				<button
					id={id}
					onClick={onDelete} 
					className="btn btn-danger border-white text-white font-weight-bold ing-delete" 
					type="button">X</button>
			</div>
		</div>
	);
};

export default Ingredient;
