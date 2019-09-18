import React from 'react';
import { Link } from 'react-router-dom';

import './RecipeListing.css';

const RecipeListing = (props) => {
	const recipeID = props.id
	const recipeURL = `/recipe/${recipeID}`;

	return (
		<Link to={recipeURL}>
			<div className="card col-sm-3 card-div">
				<img 
					src={props.image} alt={props.title}
					className="img-fluid"
					/>
				<div className="card-body">
					<h5 className="card-title">{props.title}</h5>
				</div>	
			</div>
		</Link>
	);
}

export default RecipeListing;
