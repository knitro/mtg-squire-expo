import React, { useState } from 'react';
import {v4 as uuid} from 'uuid';
import { SearchHistoryState } from '../../../../states/SearchHistoryState';
import { AdvancedSearchTerms, advancedSearchTermsToString } from '../../../../dataManagers/DataMangerInterfaces';
import { ActivityIndicator, Alert, View } from 'react-native';
import { Card, CardHeader } from '@material-ui/core';
import { CardStyle, CardTextStyle } from '../../../../styles/CardStyle';
import { advancedSearchCall, searchCallURI } from '../../../../logic/dataManagerCall';

interface SingleSearchHistoryResultProps {
  currentSearchHistoryState : SearchHistoryState
}

const SingleSearchHistoryResult = (props : SingleSearchHistoryResultProps) => {

  /*Variable Initialisation*/
  let search : SearchHistoryState = props.currentSearchHistoryState;

  //Set the Display String to the type of Search used
  let displayString = "";
  if ("Quick Search".localeCompare(search.typeOfSearch) === 0) {
    displayString = search.searchTerm;
  } else if ("Advanced Search".localeCompare(search.typeOfSearch) === 0) {
    let searchTerms = JSON.parse(search.searchTerm) as AdvancedSearchTerms;
    displayString = advancedSearchTermsToString(searchTerms);
  } else {
    displayString = "ERROR";
  }

  /*Style Initialisation*/
  const cardStyle = CardStyle();
  const cardTextStyle = CardTextStyle();

  /*Hook Initialisation*/
  const [showLoading, setShowLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  /*Alert Initialisation*/
  const createErrorAlert = () => {
    Alert.alert(
      "ERROR",
      "Failed to Get Card Information. Please check your internet connection and re-perform the search.",
      [
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ],
      { cancelable: false }
    );
  }

  /**
   * Function that tells the logic to perform an API call.
   * This function will determine what type of search it refers to, and calls
   *  the relevant logic function call.
   */
  function buttonPress() {

    setShowLoading(true);

    /*Checks what kind of search the card refers to*/
    if ("Quick Search".localeCompare(search.typeOfSearch) === 0) {
      searchCallURI(search.url, setShowLoading, createErrorAlert);
    } else if ("Advanced Search".localeCompare(search.typeOfSearch) === 0) {
      let searchTerms = JSON.parse(search.searchTerm) as AdvancedSearchTerms;
      advancedSearchCall(searchTerms, setShowLoading, createErrorAlert);
    } else {
      console.log("This should not happen");
      setShowLoading(false);
      setShowAlert(true);
    }
  }

  /*Return*/
  return (
    
    <View>
      
      {/*Loading Popup*/}
      <ActivityIndicator
        animating={showLoading}
      />

      {/*Card Initialisation*/}
      <Card 
        key={uuid() } 
        className={cardStyle.normal}
        onClick={() => {buttonPress()}}
      >
        <CardHeader title={search.typeOfSearch} subheader={displayString} />
      </Card>
    
    </View>
  );
}

export default SingleSearchHistoryResult;

