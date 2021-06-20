import React, { useState } from 'react';
import {v4 as uuid} from 'uuid';
import { SearchState } from '../../../../states/SearchState';
import { ActivityIndicator, Alert, View } from 'react-native';
import { Card, CardContent, CardHeader, Typography } from '@material-ui/core';
import { CardStyle } from '../../../../styles/CardStyle';
import { searchCallURI } from '../../../../logic/dataManagerCall';

/**
 * Props for the a Single Card of Other Printings.
 */
interface OtherPrintingProps {
  currentSearchState : SearchState //The SearchState to get the general information about the card
  isCurrent : boolean //Boolean that determines if the card is the currently selected card
}

/**
 * Component that renders a single card with information about a variant printing of a card.
 * @param props Other - the supplied information for the component to render and display.
 */
const OtherPrinting = (props : OtherPrintingProps) => {

  /*Variable Initialisation*/
  let search : SearchState = props.currentSearchState;
  let isCurrent : boolean = props.isCurrent;
  let subheaderTextBase : string = search.set.setCode.toUpperCase();
  let subheaderText : string = (isCurrent) ? (subheaderTextBase + " - Currently Selected") : (subheaderTextBase);

  /*Hook Initialisation*/
  const [showLoading, setShowLoading] = useState(false);

  /*Style Initialisation*/
  const cardStyle = CardStyle();

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
        className={(isCurrent) ? (cardStyle.selected) : (cardStyle.normal)}
        onClick={() => {searchCallURI(search.api_uri, setShowLoading, createErrorAlert);}}
      >
        <CardHeader title={search.set.setName} subheader={subheaderText}/>
        <CardContent>
          <img src={search.imageLink} alt={search.imageLink} className={"cardImage"}/>
          <Typography>{"Release Date: "}{search.misc.released}</Typography>
        </CardContent>
      </Card>

    </View>
  );
}

export default OtherPrinting;

