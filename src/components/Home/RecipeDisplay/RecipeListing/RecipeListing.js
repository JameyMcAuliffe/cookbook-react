import React from 'react';
import { Link } from 'react-router-dom';

import './RecipeListing.css';

const RecipeListing = (props) => {
	const recipeID = props.id
	const recipeURL = `/recipe/${recipeID}`;

	return (
		<Link to={recipeURL} style={{textDecoration: 'none'}}>
			<div className="card col-sm-3 card-div mb-4 bg-dark rounded border border-white">
				<img 
					src={props.image} alt={props.title}
					className="img-responsive thumbnail"
					/>
				<div className="card-body">
					<h5 className="card-title text-white">{props.title}</h5>
				</div>	
			</div>
		</Link>
	);
}

export default RecipeListing;
