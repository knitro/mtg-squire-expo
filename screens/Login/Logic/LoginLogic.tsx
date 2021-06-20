import { NativeSyntheticEvent, NativeTouchEvent } from "react-native";
import { Actions } from "react-native-router-flux";
import Firebase from "../../../components/Firebase";
import { LoginState, saveLogin, defaultSettings } from "../../../states/LoginState";

export interface LoginInfo {
  email           : string
  password        : string
}

/**
 * Performs the logging in process of the App.
 * @param info - the Login Information supplied by the user
 * @param firebase - the firebase instance (generally from context)
 * @param event - the touch event (passed to stop the page refresh of a button press)
 * @param loadingFunction - the loading function to show "progress"
 * @param errorAlert - the error alert when something goes wrong
 */
export function submitLoginButtonPress(info : LoginInfo, firebase : Firebase, 
  event : NativeSyntheticEvent<NativeTouchEvent>, loadingFunction : (value : boolean) => void, 
  errorAlert : (input : string) => void) {
 

  loadingFunction(true);

  firebase
    .doSignInWithEmailAndPassword(info.email, info.password)
    .then(async () => {
      let currentLoginState : LoginState = Object.assign([], defaultSettings);
      currentLoginState.authUser = firebase.auth.currentUser;
      await saveLogin(currentLoginState);
    })
    .then(() => {
      loadingFunction(false);
      console.log("Login Successful!");
      Actions.wishlist();
    })
    .catch((error : any) => {
      loadingFunction(false);
      console.log(error);
      errorAlert(error);
      console.log("Login Failed!");
    });
  event.preventDefault();
}