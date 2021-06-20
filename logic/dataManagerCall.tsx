import { Actions } from "react-native-router-flux";

////////////////////////////////
/*Imports*/
////////////////////////////////

import DataManager from "../dataManagers/DataManager";
import { AdvancedSearchTerms } from "../dataManagers/DataMangerInterfaces";
import MTGAPI from "../dataManagers/MTGAPI/MTGAPI";
import ScryFall from "../dataManagers/ScryFall/ScryFall";
import { emptySearch, SearchState } from "../states/SearchState";

////////////////////////////////
/*DataManager Fields*/
////////////////////////////////

const currentDataManager : DataManager = new ScryFall(null);
// const currentDataManager : DataManager = new MTGAPI(null);

////////////////////////////////
/*Search Functions*/
////////////////////////////////

/**
 * Creates a quick call for the DataManager, and performs navigational changes.
 * @param cardNameSearchTerm - the card name of the card to search for
 * @param loadingFunction - the function to call to adjust whether the loading popup is active or not. The parameter of the method should set the alert on or off.
 * @param alertFunction - the function to call to create the alert popup for failure of execution.
 */
export function searchCall(cardNameSearchTerm : string, 
    loadingFunction : (value : boolean) => void,
    alertFunction : () => void) : void {

  /*Create the SearchState and add the Search Term*/
  let currentSearch: SearchState = Object.assign([], emptySearch); //Creates a blank search SearchState.
  currentSearch.cardName = cardNameSearchTerm;
  
  /*Perform the API Call*/
  loadingFunction(true)
  currentDataManager.performSearch(currentSearch).then(async (didPerform : boolean) => {
    if (didPerform) {
      loadingFunction(false);
      Actions.resultsDisplay();
    } else {
      loadingFunction(false);
      alertFunction();
    }
  });
}

/**
 * Creates a quick call for the DataManager, and performs navigational changes.
 * @param uri - the URI to get the card information
 * @param loadingFunction - the function to call to adjust whether the loading popup is active or not. The parameter of the method should set the alert on or off.
 * @param alertFunction - the function to call to create the alert popup for failure of execution.
 */
export function searchCallURI(uri : string, 
  loadingFunction : (value : boolean) => void,
  alertFunction : () => void) : void {

/*Create the SearchState and add the Search Term*/
let currentSearch: SearchState = Object.assign([], emptySearch); //Creates a blank search SearchState.
currentSearch.api_uri = uri;

/*Perform the API Call*/
loadingFunction(true)
currentDataManager.performSearch(currentSearch).then(async (didPerform : boolean) => {
  if (didPerform) {
    loadingFunction(false);
    Actions.resultsDisplay();
  } else {
    loadingFunction(false);
    alertFunction();
  }
});
}

/**
 * Creates an advanced call for the DataManager, and performs navigational changes.
 * @param search - the Advanced Search terms 
 * @param loadingFunction - the function to call to adjust whether the loading popup is active or not. The parameter of the method should set the alert on or off.
 * @param alertFunction - the function to call to create the alert popup for failure of execution.
 */
export function advancedSearchCall(search : AdvancedSearchTerms,
    loadingFunction : (value : boolean) => void,
    alertFunction : () => void) : void {

  /*Perform the Search and Redirect if needed*/
  loadingFunction(true)
  currentDataManager.performAllSearch(search).then((didPerform) => {
    if (didPerform) {
      loadingFunction(false);
      Actions.searchResults();
    } else {
      loadingFunction(false)
      alertFunction();
    }
  });
}
 