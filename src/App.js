import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import './App.css';
import { withFirebase } from './components/Firebase/index';
import { AuthUserContext } from './components/Session/index';

import * as ROUTES from './constants/routes';
import Navigation from './components/Navigation/Navigation';
import Footer from './components/Footer/Footer';
import SignUp from './components/SignUp/SignUp';
import SignIn from './components/SignIn/SignIn';
import Home from './components/Home/Home';
import NewRecipe from './components/Home/Recipe/NewRecipe/NewRecipe';
import EditRecipe from './components/Home/Recipe/EditRecipe/EditRecipe';
import RecipeDetail from './components/Home/RecipeDisplay/RecipeDetail/RecipeDetail';
import ScrollToTop from './components/Scroll/ScrollToTop';


const App = (props) => { 

  const [authUserState, setAuthUserState] = useState(null);

  //used to conditionally render nav links
  useEffect(() => {
    props.firebase.auth.onAuthStateChanged(authUser => {
      authUser ? setAuthUserState(authUser) : setAuthUserState(null);
    });
  },[props.firebase.auth]); 

  return (
    <AuthUserContext.Provider value={authUserState}>
      <Router>
        <ScrollToTop>
          <div className="App">
            <Navigation/>
            <Route exact path={ROUTES.SIGN_UP} component={SignUp}/>
            <Route exact path={ROUTES.SIGN_IN} component={SignIn}/>
            <Route exact path={ROUTES.HOME} component={Home}/>
            <Route exact path={ROUTES.NEW_RECIPE} component={NewRecipe}/>
            <Route exact path={ROUTES.RECIPE} component={RecipeDetail}/>
            <Route exact path={ROUTES.EDIT} component={EditRecipe}/>
            <Footer/>
          </div>
        </ScrollToTop>
      </Router>
    </AuthUserContext.Provider>
  );
}

export default withFirebase(App);
