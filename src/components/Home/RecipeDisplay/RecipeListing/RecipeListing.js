import React from 'react';

const RecipeListing = (props) => {

	const imageStyling = {
		width: '300px',
		height: '300px'
	}

	const cardStyling = {
		width: '300px',
		cursor: 'pointer'
	}

	return (
		<div className="card ml-2" style={cardStyling}>
			<img 
				src={props.image} alt="turkey sandwich"
				className="img-thumbnail float-left "
				style={imageStyling}
				/>
			<div className="card-body">
				<h5 className="card-title">{props.title}</h5>
			</div>	
		</div>
	);
}

export default RecipeListing;
