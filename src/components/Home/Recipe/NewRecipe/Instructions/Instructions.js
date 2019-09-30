import React from 'react';

const Instructions = (props) => (
	<div className="mt-4">
		<h5 className="text-white">Directions:</h5>
		<textarea
			onChange={props.onChange}
			value={props.value}
			name="directions" 
			className="form-control col-sm-8 offset-2 bg-dark text-white" 
			cols="30" 
			rows="10"></textarea>
	</div>
);

export default Instructions;
