import React from 'react';

import ListIcon from '../../../../../images/list.png';
import './Instructions.css';

const Instructions = ({onChange, value}) => {

	return (
		<div className="mt-4">
			<div>
				<h5 className="text-white">Directions: </h5>
				<button className="btn" type="button">
					<img className="list-icon mb-3" src={ListIcon} alt="list_icon"/>
				</button>
			</div>
			<textarea
				onChange={onChange}
				value={value}
				name="directions" 
				className="form-control col-sm-8 offset-2 bg-dark text-white" 
				cols="30" 
				rows="10"
				placeholder="Hit enter for a new step, each step will automatically be numbered after submitting the recipe..."></textarea>
		</div>
	);
}

export default Instructions;
