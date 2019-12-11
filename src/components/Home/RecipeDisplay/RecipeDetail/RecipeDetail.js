import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import ReactLoading from 'react-loading';

import { withAuthorization } from '../../../Session/index';
import './RecipeDetail.css';
import { HOME } from '../../../../constants/routes';
import ConfirmDelete from './ConfirmDelete/ConfirmDelete';
import DefaultImage from '../../../../images/food_default_2.gif';

const RecipeDetail = (props) => {

	const recipeID = props.match.params.id.toString();
	const uID = props.firebase.auth.O;
	const initialState = {
		title: null,
		directions: '',
		image: null,
		ingredients: []
	}
	const editRecipePath = `${props.history.location.pathname}/edit`;
	const emptyIngredients = <h4 className="handwriting">Edit to add ingredients</h4>;
	const emptyDirections = <h4 className="handwriting">Edit to add directions</h4>;

	//object containing the info to be rendered
	const [recipeDetails, setRecipeDetails] = useState(initialState);
	const [mappedIngredients, setMappedIngredients] = useState([]);
	const [renderedDirections, setRenderedDirections] = useState('');
	const [showDelete, setShowDelete] = useState(false);
	const [dataFetched, setDataFetched] = useState(false);

	const onBackClick = () => {
		props.history.push(HOME);
	}

	let onDeleteRecipe = () => {
		props.firebase.deleteRecipe(recipeID, uID)
			.then(() => {
				setShowDelete(!showDelete);
				props.history.push('/');
			})
			.catch(error => {
				return error;
			});
	}

	//toggles delete confirmation div plus styling
	let toggleShowDelete = () => {
		setShowDelete(!showDelete);
	}

	let addDefaultImage = (e) => {
		e.target.src = DefaultImage;
	}

	//Creates elements for rendering ingredient info
	useEffect(() => {
		let mapIngredients = recipeDetails.ingredients.filter(ing => {
			//filters out any ingredients with empty name values
			return ing.name.trim('') !== '';
		})
		.map((ing, i) => {
			//if amount is empty no dash renders after ingredient
			let amountCondition = ing.amount.trim('') === '' ? null : ` - ${ing.amount}`;

			return (
				<div key={i}>
					<h4 className="handwriting">{ing.name}{amountCondition}</h4>
				</div>
			);
		});

		setMappedIngredients(mapIngredients);
	}, [recipeDetails.ingredients]);

	//Fetching recipe data
	useEffect(() => {
		props.firebase.getRecipe(recipeID, uID)
			.then(snapshot => {
				setRecipeDetails(snapshot.data());
				setDataFetched(true);
			})
			.catch(err => {
				return err
			});
			// eslint-disable-next-line
	},[]);

	//splits directions on line breaks, then renders as a numbered list
	useEffect(() => {
			let splitDirections = recipeDetails.directions.split('\n');
			//filters out any blank lines
			let mappedDirections = splitDirections.filter(dir => {
				return dir.trim() !== '';
			})
			.map((dir, i) => {
				return (
					<li key={i} className="ml-2 mr-2">
						<h4 className="handwriting">{i+1}) {dir}</h4>
					</li>
				);
			});
			
			setRenderedDirections(mappedDirections);
	},[recipeDetails]);

	return (
		<div>
			{!dataFetched ? 
			<div className="d-flex justify-content-center recipe-detail-loader">
				<ReactLoading 
					type={"spinningBubbles"} 
					color={"#055227"} 
					height={"150px"} 
					width={"150px"}
					className="recipe-detail-loader"/>
			</div> :
			<div className={showDelete ? "showDeleteStyling" : null}>
				{showDelete ? <ConfirmDelete toggle={toggleShowDelete} deleteRecipe={onDeleteRecipe}/> : null}
				<button type="button" onClick={onBackClick} className="btn btn-success mb-4 mt-4 mr-auto border-dark">Back to Recipes</button>
				<div className="mb-5 recipe-detail-div rounded border border-dark recipeBackground">
					<h2 className="title handwriting mt-4 mb-5">{recipeDetails.title}</h2>
					<div>
						<img 
							onError={addDefaultImage} 
							src={recipeDetails.image} 
							alt={recipeDetails.title}
							className="rounded recipeImage mb-5 img-fluid img-responsive"/>	
					</div>
					<h3><u>Ingredients</u></h3>
					{mappedIngredients.length === 0 ? emptyIngredients : mappedIngredients}
					<h3 className="mt-4"><u>Directions</u></h3>
					<ul className="directions-list mr-auto">
						{recipeDetails.directions.trim('') === '' ? emptyDirections : renderedDirections}
					</ul>	
					<div className="mb-5">
						<Link to={editRecipePath}>
							<button className="btn btn-primary m-4 border-dark">Edit</button>
						</Link>
						<button className="btn btn-danger ml-4 border-dark" onClick={toggleShowDelete}>Delete</button>
					</div>
				</div>
			</div>}
		</div>
	);
}

//returns true if authUser !== null
const condition = authUser => !!authUser;

export default withAuthorization(condition)(RecipeDetail);


