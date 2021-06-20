import React, { useState } from 'react';
import {v4 as uuid} from 'uuid';
import { SearchState } from '../../../../states/SearchState';
import { CardStyle, CardTextStyle } from '../../../../styles/CardStyle';
import { ActivityIndicator, Alert, View } from 'react-native';
import { searchCallURI } from '../../../../logic/dataManagerCall';
import { Card, CardContent, CardHeader, Typography } from '@material-ui/core';

/**
 * Props for the SingleSearchResult component.
 */
interface SingleSearchResultProps {
  currentSearchState : SearchState
}

/**
 * Displays the information of a single search result of a card provided by props.
 * @param props - the information that represents a single card
 */
const SingleSearchResult = (props : SingleSearchResultProps) => {

  /*Variable Initialisation*/
  let search : SearchState = props.currentSearchState;

  /*Hook Initialisation*/
  const [showLoading, setShowLoading] = useState(false);

  /*Hook Initialisation*/
  const cardStyle = CardStyle();
  const cardTextStyle = CardTextStyle();

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

  /*Return*/
  return (
    
    <View>

      {/*Loading Popup*/}
      <ActivityIndicator
        animating={showLoading}
      />

      {/*Card Initialisation*/}
      <Card 
        key={uuid()} 
        className={cardStyle.normal}
        onClick={() => {searchCallURI(search.api_uri, setShowLoading, createErrorAlert);}}
      >
        <CardHeader title={search.cardName} subheader={search.fullType}/>
        <CardContent>
          <img src={search.imageLink} alt={search.imageLink} className={"cardImage"}/>
          <Typography>{"Release Date: "}{search.misc.released}</Typography>
        </CardContent>
      </Card>
    
    </View>
  );
}

export default SingleSearchResult;

