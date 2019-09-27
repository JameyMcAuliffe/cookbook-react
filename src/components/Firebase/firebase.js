import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const config = {
	apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID
}

class Firebase {
	constructor() {
		app.initializeApp(config);

    /**** FIREBASE APIS ****/
    this.auth = app.auth();
    this.db = app.firestore();
	}


  /**** AUTH API ****/
  doCreateUserWithEmailAndPassword = (email, password) => {
    return this.auth.createUserWithEmailAndPassword(email, password);
  }

  doSignInWithEmailAndPassword = (email, password) => {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  doSignOut = () => {
    return this.auth.signOut();
  }

  /**** USER API ****/
  user = uid => this.db.doc(`users/${uid}`);

  users = () => this.db.collection('users');

  /**** DATABASE API ****/
  addRecipe = (recipe, uid) => this.db.doc(`users/${uid}`).collection("recipes").add(recipe);
  getRecipes = (uid) => this.db.doc(`users/${uid}`).collection("recipes").get();

  getRecipe = (recipeID, uid) => this.db.doc(`users/${uid}`).collection("recipes").doc(recipeID).get();

  editRecipe = (recipeID, uid, recipe) => this.db.doc(`users/${uid}`).collection("recipes").doc(recipeID).update(recipe);

}

export default Firebase;
