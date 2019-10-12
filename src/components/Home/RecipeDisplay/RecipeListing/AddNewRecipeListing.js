import React from 'react';
import { Link } from 'react-router-dom';

import { NEW_RECIPE } from '../../../../constants/routes';
import './AddNewRecipeListing.css';
import AddNewRecipeImageLink from '../../../../images/plus_3.png';

const AddNewRecipeListing = () => {

	return (
		<Link to={NEW_RECIPE} style={{textDecoration: 'none'}} className="col-xl-3 col-md-4 col-sm-6 col-8 d-flex recipe-link justify-content-center">
			<div className="card ml-2 card-div mb-4 rounded border-white">
				<img	 
					src={AddNewRecipeImageLink} alt="add new recipe link"
					className="img-fluid add-div"
					/>
				<div className="card-body">
					<h5 className="card-title text-white">Add New Recipe</h5>
				</div>	
			</div>
		</Link>
	);
}

export default AddNewRecipeListing;
