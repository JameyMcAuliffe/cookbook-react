import React from 'react';

const Ingredient = (props) => (
	<div className="offset-1">
		<div className="row offset-2">
			<input 
				type="text" 
				className="form-control col-sm-4" 
				placeholder="Ingredient..."/>
			<input 
				type="text" 
				className="form-control col-sm-4"
				placeholder="Amount/measure..."/>
		</div>
	</div>
);

export default Ingredient;
