import React, {useState, useEffect} from 'react';
import ReactLoading from 'react-loading';

import { withAuthorization } from '../Session/index';
import RecipeListing from './RecipeDisplay/RecipeListing/RecipeListing';
import AddNewRecipeListing from './RecipeDisplay/RecipeListing/AddNewRecipeListing';
import Search from './Search/Search';
import './Home.css';

const Home = (props) => {
	const uid = props.firebase.auth.O;
	const [recipesArray, setRecipesArray] = useState([]);
	const [searchTerm, setSearchTerm] = useState('');
	const [renderedRecipes, setRenderedRecipes] = useState([]);
	const [dataFetched, setDataFetched] = useState(false);

	useEffect(() => {
		//temporary array to hold returned data from fb
		let snapshotArray = [];

		props.firebase.getRecipes(uid)
		.then(snapshot => {
			snapshot.docs.forEach(doc => {
				//add fb created id to each recipe obj
				let recipeID = doc.id;
				let recipeObj = {...doc.data(), recipeID};
				snapshotArray.push(recipeObj);
			})
		})
		.then(() => {
			setRecipesArray(snapshotArray);
			setDataFetched(true);
		})
		.catch(err => {
			return err;
		});
		// eslint-disable-next-line
	}, []);

	let onSearchUpdate = (e) => {
		setSearchTerm(e.target.value);
	}

	//filters recipesArray with the search term then returns RecipeListing components for each result
	useEffect(() => {
		let recipeComponents = recipesArray.filter((recipe) => {
			return recipe.title.toLowerCase().trim('').includes(searchTerm.toLowerCase().trim(''));
		})
		.map((recipe) => {
			return <RecipeListing image={recipe.image} title={recipe.title} key={recipe.recipeID} id={recipe.recipeID}/>
		});

		setRenderedRecipes(recipeComponents);
	},[recipesArray, searchTerm]);
	
	return (
		<div className="container-fluid home-div">
			<Search onChange={onSearchUpdate} value={searchTerm}/>
			{!dataFetched ? 
			<ReactLoading 
				type={"spinningBubbles"} 
				color={"#055227"} 
				height={"150px"} 
				width={"150px"}
				className="loader"/> :
			<div className="row cards-row">
				{searchTerm.trim('') === '' ? <AddNewRecipeListing /> : null}
				{renderedRecipes}	
			</div>}
		</div>
	);
}

//returns true if authUser !== null
const condition = authUser => !!authUser;

export default withAuthorization(condition)(Home);
