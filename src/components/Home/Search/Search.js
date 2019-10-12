import React from 'react';

import './Search.css';

const Search = ({value, onChange}) => {
	return (
		<div className="mb-5 d-flex justify-content-center rounded">
			<input
				onChange={onChange}
				value={value} 
				type="text"
				placeholder="Search..."
				className="bg-dark text-white search-bar mt-4 mb-4 text-white"/>
		</div>
	);
}

export default Search;
