////////////////////////
/*Imports*/
////////////////////////

import { Plugins } from '@capacitor/core';
import { getSettings } from './SettingsState';

////////////////////////
/*Local Initialisation*/
////////////////////////

const { Storage } = Plugins;
const historyStorageKey   : string = "searchHistory";   // String that dictates the string that the history of searches is stored under in capacitor.

////////////////////////
/*Export Initialisation*/
////////////////////////

export var cacheSearchHistoryState : SearchHistoryState[] = Object.assign([], []);

////////////////////////
/*SearchHistoryState*/
////////////////////////

/**
 * SearchHistoryState Interface, used to store information about a single search.
 */
export interface SearchHistoryState {
  typeOfSearch:   string
  searchTerm:     string
  url:            string
}

////////////////////////
/*Capacitor Storage for History Storage*/
////////////////////////

/**
 * Saves an single of SearchHistoryState into storage.
 * This is used for SearchHistory to show what has been previously been searched up.
 * This will retrieve the previous entries, append to it, and remove the earliest record if it goes over the max.
 * @param currentSearchHistoryState - the SearchHistoryState to be saved in storage.
 */
export async function saveSearchHistory(currentSearchHistoryState : SearchHistoryState) : Promise<boolean> {

  /*Get the Current Search History and make sure it meets Maximum Counts*/
  let maxHistoryCount : number = (await getSettings()).searchStored;

  let searchHistory : SearchHistoryState[] = await getSearchHistory();
  while (searchHistory.length >= maxHistoryCount) {
    searchHistory.shift();
  }
  
  /*Add New Search URL Link*/
  searchHistory.push(currentSearchHistoryState);

  /*JSONStringify the Updated Search History Array*/
  let valueToSave : string = JSON.stringify(searchHistory);

  /*Save the Search History into Capacitor Storage*/
  const returnValue = await Storage.set({
    key: historyStorageKey,
    value: valueToSave
  }).then( () => {
    return true;
  }).catch(err => {
    console.log(err);
    return false;
  });

  /*Save to Cache Storage*/
  cacheSearchHistoryState = searchHistory;

  return returnValue;
}

/**
 * Retrieves the SearchHistoryState Array in storage.
 * This is used for SearchHistory to retrieve the previously saved data.
 */
export async function getSearchHistory() : Promise<SearchHistoryState[]> {

  const storageReturn = await Storage.get({key: historyStorageKey});

  if (typeof storageReturn.value === 'string') {
    return (JSON.parse(storageReturn.value) as SearchHistoryState[]);
  } else { //Null Case
    return [];
  }
}