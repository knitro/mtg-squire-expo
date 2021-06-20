import { NativeSyntheticEvent, NativeTouchEvent } from "react-native";
import { Actions } from "react-native-router-flux";
import Firebase from "../../../components/Firebase";
import { defaultSettings, LoginState, saveLogin } from "../../../states/LoginState";

const minPasswordLength = 6;
const maxPasswordLength = 30;

export interface SignUpInfo {

  username        : string
  email           : string
  password        : string
  passwordConfirm : string

}

/**
 * Checks the Validity of the Passwords supplied
 * @param password - the password value
 * @param passwordConfirm - the password confirm value
 */
export function checkPasswordValidity(password : string, passwordConfirm : string) : boolean {

  //Null Check
  if ((password !== null) && (passwordConfirm !== null)) {
    //Check if the passwords are equal
    if (password.localeCompare(passwordConfirm) == 0) {
      //Check if the password meets the length requirements
      if ((password.length >= minPasswordLength) && (password.length <= maxPasswordLength)) {
        return true;
      }
    }
  }

  //Return false if one of the conditions above fail
  return false;
}

/**
 * Signs up the user with the provided information.
 * @param info 
 * @param props 
 */
export function submitButtonPress(info : SignUpInfo, firebase : Firebase, 
  event : NativeSyntheticEvent<NativeTouchEvent>,  loadingFunction : (value : boolean) => void, 
  errorAlert : (input : string) => void) {
 
  
  loadingFunction(true);

  firebase
    .doCreateUserWithEmailAndPassword(info.email, info.password)
    .then(async (authUser) => {
      if(authUser !== null) {
        authUser.updateProfile({
          displayName: info.username,
        });
        let currentLoginState : LoginState = Object.assign([], defaultSettings);
        currentLoginState.authUser = firebase.auth.currentUser;
        await saveLogin(currentLoginState);
        return true;
      }
      return false;
    })
    .then((successful : boolean) => {
      loadingFunction(false);
      if (successful) {
        Actions.wishlist();
      }
    })
    .catch((error : any) => {
      loadingFunction(false);
      errorAlert(error);
      console.log(error);
    });
  event.preventDefault();
}