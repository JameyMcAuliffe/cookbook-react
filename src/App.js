import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import './App.css';
import * as ROUTES from './constants/routes';
import Navigation from './components/Navigation/Navigation';
import SignUp from './components/SignUp/SignUp';
import SignIn from './components/SignIn/SignIn';
import Home from './components/Home/Home';


function App() { 

  return (
    <Router>
      <div className="App">
        <Navigation />
        <Route exact path={ROUTES.SIGN_UP} component={SignUp}/>
        <Route exact path={ROUTES.SIGN_IN} component={SignIn}/>
        <Route exact path={ROUTES.HOME} component={Home}/>
      </div>
    </Router>
  );
}

export default App;
