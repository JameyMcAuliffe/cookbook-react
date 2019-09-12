import React, {useEffect} from 'react';

import { withAuthorization } from '../../../Session/index';

const RecipeDetail = (props) => {

	const recipeID = props.match.params.id.toString();
	const uID = props.firebase.auth.O;

	useEffect(() => {
		props.firebase.getRecipe(recipeID, uID)
			.then(snapshot => {
				console.log(snapshot.data());
			})
	},[])

	return (
		<div>Recipe Detail</div>
	);
}

//export default RecipeDetail;

//returns true if authUser !== null
const condition = authUser => !!authUser;

export default withAuthorization(condition)(RecipeDetail);

