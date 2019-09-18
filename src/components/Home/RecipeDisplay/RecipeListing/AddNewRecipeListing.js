import React from 'react';
import { Link } from 'react-router-dom';

import { NEW_RECIPE } from '../../../../constants/routes';
import './RecipeListing.css';
import AddNewRecipeImageLink from '../../../../images/add-1.jpeg';

const AddNewRecipeListing = () => {

	return (
		<Link to={NEW_RECIPE}>
			<div className="card ml-2 col-sm-3 card-div">
				<img	 
					src={AddNewRecipeImageLink} alt="add new recipe link"
					className="img-fluid"
					/>
				<div className="card-body">
					<h5 className="card-title">Add New Recipe</h5>
				</div>	
			</div>
		</Link>
	);
}

export default AddNewRecipeListing;
