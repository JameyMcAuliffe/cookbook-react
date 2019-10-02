import React from 'react';

import ListIcon from '../../../../../images/list.png';
import './Instructions.css';

const Instructions = (props) => (
	<div className="mt-4">
		<div>
			<h5 className="text-white">Directions: </h5>
			<button className="btn" type="button">
				<img className="list-icon mb-3" src={ListIcon} alt="list_icon"/>
			</button>
		</div>
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
