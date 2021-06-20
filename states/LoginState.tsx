////////////////////////
/*Imports*/
////////////////////////

import { Plugins } from '@capacitor/core';

////////////////////////
/*Local Initialisation*/
////////////////////////

const { Storage } = Plugins;

const storageKey : string = "login";

////////////////////////
/*Export Initialisation*/
////////////////////////

export const defaultSettings : LoginState = {
  authUser : null,
};
  
export var cacheLoginState : LoginState = Object.assign([], defaultSettings);

////////////////////////
/*Settings*/
////////////////////////

/**
 * Settings Interface
 * Used to store state of settings
 */
export interface LoginState {
  authUser : any //The Authentication User Values from Firebase
}

////////////////////////
/*Capacitor Storage for Settings*/
////////////////////////

/**
 * Saves Firebase Authentication value to storage.
 * @param s current settings to save
 */
export async function saveLogin(s : LoginState) : Promise<boolean> {
  /*Save the Settings into Capacitor Storage*/
  const returnValue = await Storage.set({
    key: storageKey,
    value: JSON.stringify(s)
  }).then( () => {
    return true;
  }).catch(err => {
    console.log(err);
    return false;
  });

  /*Save to Cache Storage*/
  cacheLoginState = s;

  return returnValue;
}

/**
 * Gets Firebase Authentication from storage
 * Retrieve previously saved data.
 */
export async function getLogin() : Promise<LoginState> {

  const storageReturn = await Storage.get({key: storageKey});

  if (typeof storageReturn.value === 'string') {
    let storageLogin : LoginState = JSON.parse(storageReturn.value) as LoginState;
    cacheLoginState = storageLogin;
    return storageLogin;
  } else { //Null Case
    return defaultSettings;
  }
}

export async function logout() : Promise<boolean>{

  /*Save the Settings into Capacitor Storage*/
  const returnValue = await Storage.set({
    key: storageKey,
    value: JSON.stringify(defaultSettings)
  }).then( () => {
    return true;
  }).catch(err => {
    console.log(err);
    return false;
  });

  /*Save to Cache Storage*/
  cacheLoginState = Object.assign([], defaultSettings);

  return returnValue;

}
