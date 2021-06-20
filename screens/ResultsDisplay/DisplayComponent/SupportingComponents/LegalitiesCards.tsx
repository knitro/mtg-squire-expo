import React from 'react';
import { SearchState } from '../../../../states/SearchState';
import { Legality } from '../../DisplayStateManager/ResultsDisplay';
import {v4 as uuid} from 'uuid';
import '../ResultsDisplay.css';
import { Card, CardContent, CardHeader, Typography } from '@material-ui/core';
import { View, ScrollView } from "react-native";
import { CardStyle, CardTextStyle } from '../../../../styles/CardStyle';

/**
 * Props for the Legality Card.
 */
interface LegalityCardsProps {
  search : SearchState //The SearchState to get the general information about the card
  legalities : Legality[] //The formatted legalities to display
}

/**
 * Displays the OtherPrintings IonCard.
 * @param props - the information for the OtherPrintingsCard to display
 */
const LegalityCards = (props : LegalityCardsProps) => {

  /*Variable Initialisation*/
  const currentSearchState = props.search;
  const legalitiesFormatted = props.legalities;

  /*Hook Initialisation*/
  const cardStyle = CardStyle();
  const cardTextStyle = CardTextStyle();

  /*Return Display*/
  return (
    <ScrollView>
              
      {/*IonCard 0: Image Card*/}
      <Card className={cardStyle.image}>
        <img src={currentSearchState.imageOnlyLink} alt={currentSearchState.imageOnlyLink} className={"cardImage"}/>
      </Card>

      {/* IonCards 1: Legality Header*/}
      <Card className={cardStyle.header}>
        <CardHeader title={"Format Legality for:"} subheader={currentSearchState.cardName}/>
      </Card>

      {/* IonCard 2: Legalities */}
      <Card className={cardStyle.normal}>
        <CardHeader title={"Legalities"}/>
        <View>
            {legalitiesFormatted.map((currentItem: Legality) => 
              <CardContent key={uuid()}>                
                <Typography align='justify' className={cardTextStyle.label}>{currentItem.label}</Typography>
                <Typography align='left' className={
                  ("legal".localeCompare(currentItem.colour) == 0) ? (cardTextStyle.legal) : 
                  ("notLegal".localeCompare(currentItem.colour) == 0) ? (cardTextStyle.notLegal) :
                  ("restricted".localeCompare(currentItem.colour) == 0) ? (cardTextStyle.restricted) :
                  ("banned".localeCompare(currentItem.colour) == 0) ? (cardTextStyle.banned) : (cardTextStyle.unknown)
                }>
                  {currentItem.legality}
                </Typography>
              </CardContent>
            )}
        </View>
      </Card>
    </ScrollView>
  );
}

export default LegalityCards;