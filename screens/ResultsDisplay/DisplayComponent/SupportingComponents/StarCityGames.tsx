import React from 'react';
import { SearchState } from '../../../../states/SearchState';
import {v4 as uuid} from 'uuid';
import { Plugins } from '@capacitor/core';
import { Card, CardContent, CardHeader, Typography } from '@material-ui/core';
import { View } from 'react-native';
import { CardStyle, CardTextStyle } from '../../../../styles/CardStyle';

////////////////////////
/*Variable Initialisation*/
////////////////////////

const { Browser } = Plugins;

////////////////////////
/*Supporting Functions*/
////////////////////////

/**
 * Creates a SCG Link from supplied information.
 * @param cardName - the card name
 * @param setCode - the card's set code
 * @param collector_number - the card's collector number
 * @param isFoil - whether the SCG link is for a foil variant or not
 */
function createSCGLink(cardName : string, setCode : string, collector_number : string, isFoil : boolean) {

  /*Variable Initialisation*/
  const baseLink : string = "https://starcitygames.com/";

  /*Format the Card Name for the SCG Link*/
  let cardNameFormatted : string = cardName.toLowerCase();
  cardNameFormatted = cardNameFormatted.split(" ").join("-");
  cardNameFormatted = cardNameFormatted.split("'").join("");
  cardNameFormatted = cardNameFormatted.split(",").join("");
  
  /*Add the SCG Suffixes*/
  const setCodeFormatted : string = setCode.toLowerCase();
  const collectorNumberFormatted : string = collector_number.toLowerCase();
  const foilingString : string = (isFoil) ? ("enf/") : ("enn/");  

  /*Create and Return the URL*/
  const returnString : string = baseLink + cardNameFormatted + "-sgl-mtg-" + setCodeFormatted + "-" + collectorNumberFormatted + "-" + foilingString;
  return returnString;
}

/**
 * Creates the NonFoil Card for SCG Link
 * It returns "nothing" if the Variant of the card does not exist.
 * Eg. If a non-foil variant does not exist, it will not return a card of information.
 * @param currentSearchState - the search state that has the card information.
 */
function createNonFoilCard(currentSearchState : SearchState) {

  /*Check if the Card Exists*/
  if (currentSearchState.misc.nonfoil && !currentSearchState.misc.digital_only) {
    const currentLink : string = createSCGLink(currentSearchState.cardName, currentSearchState.set.setCode, currentSearchState.misc.collector_number, false);
    return createCard("Non-Foil", "StarCityGames", currentLink);
  } else {
    return (<View></View>); //Return Nothing if the card does not exist.
  }
}

/**
 * Creates the Foil Card for SCG Link.
 * It returns "nothing" if the Variant of the card does not exist.
 * Eg. If a foil variant does not exist, it will not return a card of information.
 * @param currentSearchState - the search state that has the card information.
 */
function createFoilCard(currentSearchState : SearchState) {

  /*Check if the Card Exists*/
  if (currentSearchState.misc.foil && !currentSearchState.misc.digital_only)  {
    const currentLink : string = createSCGLink(currentSearchState.cardName, currentSearchState.set.setCode, currentSearchState.misc.collector_number, true);
    return createCard("Foil", "StarCityGames", currentLink);
  } else {
    return (<View></View>); //Return Nothing if the card does not exist.
  }
}

/**
 * Creates the Card that displays the SCG Information.
 * @param subtitle - the subtitle of the card
 * @param title - the title of the card
 * @param link - the SCG Link to display and link
 */
function createCard(subtitle: string, title: string, link : string) {

  /*Style Initialisation*/
  const cardStyle = CardStyle();
  const textStyle = CardTextStyle();

  return (
    <Card 
      key={uuid()}
      className={cardStyle.normal}
      onClick={async () => {
        await Browser.open({ url: link });
      }}
    >
      <CardHeader title={title} subheader={subtitle}/>
      <CardContent>
        <Typography className={textStyle.normal}>{link}</Typography>
      </CardContent>
    </Card>
  );
}

////////////////////////
/*Component Code*/
////////////////////////

/**
 * Props for the StarCityGames.
 */
interface StarCityGamesProps {
  search : SearchState //The SearchState to get the general information about the card
}

/**
 * The StarCityGames component generates both a Non-Foil and Foil variants.
 * @param props - the supplied information for the StarCityGames component.
 */
const StarCityGames = (props : StarCityGamesProps) => {

  /*Variable Initialisation*/
  const currentSearchState : SearchState = props.search;

  /*Return*/
  return (
    <View key={uuid()}>
      {createNonFoilCard(currentSearchState)}
      {createFoilCard(currentSearchState)}
    </View>
  );
}

export default StarCityGames;