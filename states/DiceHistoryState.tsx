////////////////////////
/*Imports*/
////////////////////////

import { Plugins } from '@capacitor/core';

////////////////////////
/*Local Initialisation*/
////////////////////////

const { Storage } = Plugins;

const historyStorageKey : string = "diceHistory";   // String that dictates the string that the history of dice rolls is stored under in capacitor.

////////////////////////
/*DiceHistoryState*/
////////////////////////

/**
 * DiceHistoryState Interface, used to store information about a single roll.
 */
export interface DiceHistoryState {
  dieType:    string
  dieValue:   string
}

////////////////////////
/*Capacitor Storage for History Storage*/
////////////////////////

/**
 * Saves a set of DiceHistoryState into storage.
 * This is used for DiceHistory to show what has been previously been rolled up.
 * This will retrieve the previous entries, append to it, and remove the earliest record if it goes over the max.
 * @param currentDiceHistoryState - the DiceHistoryState to be saved in storage.
 */
export async function saveDiceHistory(currentDiceHistoryState : DiceHistoryState, maxHistoryCount : number) : Promise<boolean> {

  /*Get the Current Dice History and make sure it meets Maximum Counts*/
  let diceHistory : DiceHistoryState[] = await getDiceHistory();

  // let settings : Settings = await getSettings();
  // let maxHistoryCount : number = settings.diceStored;
    while (diceHistory.length >= maxHistoryCount) {
    diceHistory.shift();
  }
  
  /*Add New Dice URL Link*/
  diceHistory.push(currentDiceHistoryState);

  /*JSONStringify the Updated Dice History Array*/
  let valueToSave : string = JSON.stringify(diceHistory);

  /*Save the Dice History into Capacitor Storage*/
  const returnValue = await Storage.set({
    key: historyStorageKey,
    value: valueToSave
  }).then( () => {
    return true;
  }).catch(err => {
    console.log(err);
    return false;
  });

  return returnValue;
}

/**
 * Retrieves the DiceHistoryState Array in storage.
 * This is used for DiceHistory to retrieve the previously saved data.
 */
export async function getDiceHistory() : Promise<DiceHistoryState[]> {

  const storageReturn = await Storage.get({key: historyStorageKey});

  if (typeof storageReturn.value === 'string') {
    return (JSON.parse(storageReturn.value) as DiceHistoryState[]);
  } else { //Null Case
    return [];
  }
}


/**
 * Clears the Dice History stored on storage.
 */
export async function clearDiceHistory() :  Promise<boolean> {

  /*JSONStringify the Updated Dice History Array*/
  let valueToSave : string = JSON.stringify([]);

  /*Save the Dice History into Capacitor Storage*/
  const returnValue = await Storage.set({
    key: historyStorageKey,
    value: valueToSave
  }).then( () => {
    return true;
  }).catch(err => {
    console.log(err);
    return false;
  });

  return returnValue;
}