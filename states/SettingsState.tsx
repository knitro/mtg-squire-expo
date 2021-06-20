////////////////////////
/*Imports*/
////////////////////////

import { Plugins } from '@capacitor/core';

////////////////////////
/*Local Initialisation*/
////////////////////////

const { Storage } = Plugins;

const storageKey : string = "settings";

////////////////////////
/*Export Initialisation*/
////////////////////////

export const defaultSettings : SettingsState = {
  searchStored : 20,
  diceStored : 20,
  currency : "USD",
};
  
export var cacheSettingsState : SettingsState = Object.assign([], defaultSettings);

////////////////////////
/*Settings*/
////////////////////////

/**
 * Settings Interface
 * Used to store state of settings
 */
export interface SettingsState {
  searchStored : number;
  diceStored : number;
  currency : string;
}

////////////////////////
/*Capacitor Storage for Settings*/
////////////////////////

/**
 * Saves settings value to storage.
 * @param s current settings to save
 */
export async function saveSettings(s : SettingsState) : Promise<boolean> {
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
  cacheSettingsState = s;

  return returnValue;
}

/**
 * Gets Settings from storage
 * Retrieve previously saved data.
 */
export async function getSettings() : Promise<SettingsState> {

  const storageReturn = await Storage.get({key: storageKey});

  if (typeof storageReturn.value === 'string') {
    return (JSON.parse(storageReturn.value) as SettingsState);
  } else { //Null Case
    return defaultSettings;
  }
}
