import app from 'firebase/app'
import 'firebase/database';
import 'firebase/auth';

const config = {
  apiKey:             "AIzaSyBhK3jzIq4Itk0LQbwlJolm_R5Ff9ybyO4",
  authDomain:         "mtg-squire.firebaseapp.com",
  databaseURL:        "https://mtg-squire.firebaseio.com",
  projectId:          "mtg-squire",
  storageBucket:      "mtg-squire.appspot.com",
  messagingSenderId:  "234236474386",
  appId:              "1:234236474386:web:4863d7ac896cff6188d4cb"
};

class Firebase {

  auth : app.auth.Auth;
  db: app.database.Database;

  constructor() {
    if (!app.apps.length) {
      app.initializeApp(config);
    }

    this.auth = app.auth();
    this.db = app.database();
  }

  doCreateUserWithEmailAndPassword = async (email : string, password : string) => {
    await this.auth.createUserWithEmailAndPassword(email, password);
    return this.auth.currentUser;
  }

  doSignInWithEmailAndPassword = async (email : string, password : string) => {
    this.auth.signInWithEmailAndPassword(email, password);
  }

  doSignOut = async () => {
    this.auth.signOut();
  }

  doPasswordReset = async (email : string) =>  {
    this.auth.sendPasswordResetEmail(email);
  }
 
  doPasswordUpdate = async (password : string) => {
    if (this.auth.currentUser !== null) {
      this.auth.currentUser.updatePassword(password);
    } else {
      //Attempted to Change password when the current user was not selected/logged in
    }
  }

  user = (uid : any) => {
    return this.db.ref(`users/${uid}`);
  }

}

export default Firebase;