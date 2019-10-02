import React from 'react';

const Ingredient = ({id, value, onDelete, onChange}) => {

	// let button = props.ingValue.deleted 
	// 	? <button 
	// 			className="btn btn-primary border-white text-white col-sm-1 font-weight-bold"
	// 			id={props.id}
	// 			type="button"
	// 			onClick={props.onDeleteIngredient}
	// 			>+</button> :
	// 		<button
	// 			id={props.id}
	// 			onClick={props.onDeleteIngredient} 
	// 			className="btn btn-danger border-white text-white col-sm-1 font-weight-bold" 
	// 			type="button">X</button>;


	return(
		<div className="mb-1">
			<div className="row">
				<input
					name="name"
					id={id}
					onChange={onChange}
					value={value.name} 
					type="text" 
					className="form-control col-sm-6 bg-dark text-white" 
					placeholder="Ingredient..."/>
				<input
					name="amount"
					id={id}
					value={value.amount}
					onChange={onChange} 
					type="text" 
					className="form-control col-sm-5 bg-dark text-white"
					placeholder="Amount/measure..."/>
				<button
					id={id}
					onClick={onDelete} 
					className="btn btn-danger border-white text-white col-sm-1 font-weight-bold" 
					type="button">X</button>
			</div>
		</div>
	);
};

export default Ingredient;
