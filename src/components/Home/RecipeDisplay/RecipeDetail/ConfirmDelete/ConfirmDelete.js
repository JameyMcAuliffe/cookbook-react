import React from 'react';

import './ConfirmDelete.css';

const ConfirmDelete = ({toggle, deleteRecipe}) => {
	return(
		<div className="confirmDiv rounded col-sm-6 offset-3">
				<h4 className="text-white mt-3 mb-3 confirm-message">Are you sure you wish to delete this recipe?</h4>	
			<div className="mb-4">
				<button className="btn btn-danger mr-1" type="button" onClick={deleteRecipe}>Delete</button>
				<button className="btn btn-warning ml-1" type="button" onClick={toggle}>Cancel</button>
			</div>
		</div>
	);
}

export default ConfirmDelete;
