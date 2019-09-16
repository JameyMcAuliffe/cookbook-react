import React from 'react';

const Instructions = (props) => (
	<div className="mt-4">
		<h5>Directions:</h5>
		<textarea
			onChange={props.onChange}
			value={props.value}
			name="directions" 
			className="form-control col-sm-8 offset-2" 
			cols="30" 
			rows="10"></textarea>
	</div>
);

export default Instructions;
