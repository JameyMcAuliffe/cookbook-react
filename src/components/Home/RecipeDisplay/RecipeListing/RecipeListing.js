import React from 'react';
import { Link } from 'react-router-dom';

import './RecipeListing.css';

const RecipeListing = (props) => {
	const recipeID = props.id
	const recipeURL = `/recipe/${recipeID}`;

	return (
		<Link to={recipeURL} style={{textDecoration: 'none'}} className="col-xl-3 col-md-4 col-sm-6 col-8 d-flex recipe-link justify-content-center">
			<div className="card card-div mb-4 rounded border-white">
				<img 
					src={props.image} alt={props.title}
					className="img-responsive thumbnail border-white img-fluid rec-card"
					/>
				<div className="card-body">
					<h5 className="card-title text-white">{props.title}</h5>
				</div>	
			</div>
		</Link>
	);
}

export default RecipeListing;
