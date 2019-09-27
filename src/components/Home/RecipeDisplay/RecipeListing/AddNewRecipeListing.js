import React from 'react';
import { Link } from 'react-router-dom';

import { NEW_RECIPE } from '../../../../constants/routes';
import './RecipeListing.css';
import AddNewRecipeImageLink from '../../../../images/plus_3.png';

const AddNewRecipeListing = () => {

	return (
		<Link to={NEW_RECIPE} style={{textDecoration: 'none'}}>
			<div className="card ml-2 col-sm-3 card-div mb-4 bg-dark border border-white rounded">
				<img	 
					src={AddNewRecipeImageLink} alt="add new recipe link"
					className="img-fluid"
					/>
				<div className="card-body">
					<h5 className="card-title text-white">Add New Recipe</h5>
				</div>	
			</div>
		</Link>
	);
}

export default AddNewRecipeListing;
