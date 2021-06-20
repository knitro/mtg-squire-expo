import React from 'react';
import {v4 as uuid} from 'uuid';
import OtherPrinting from './SingleOtherPrinting';
import { SearchState } from '../../../../states/SearchState';
import '../ResultsDisplay.css';
import { Card, CardHeader } from '@material-ui/core';
import { ScrollView, View } from 'react-native';
import { CardStyle } from '../../../../styles/CardStyle';

/**
 * Props for the Other Printings Card
 */
interface OtherPrintingsCardsProps {
  search : SearchState //The SearchState to get the general information about the card
}

/**
 * Displays the OtherPrintings IonCard.
 * @param props - the information for the OtherPrintingsCard to display
 */
const OtherPrintingsCards = (props : OtherPrintingsCardsProps) => {

  /*Variable Initialisation*/
  const currentSearchState = props.search;

  /*Style Initialisation*/
  const cardStyle = CardStyle();

  /*Return Display*/
  return (
    <ScrollView>

      {/* Card 1:  All Printings Header*/}
      <Card className={cardStyle.header}>
        <CardHeader title={"All Printings for:"} subheader={currentSearchState.cardName} />
      </Card>

      {/* Cards 2+:  All the Printings as Individual Cards*/}
      <View>
        {currentSearchState.otherPrints.sort(function(a,b) {
          return b.misc.released.localeCompare(a.misc.released)
        }).map((renderSearchState : SearchState) =>
          <OtherPrinting key={uuid()} currentSearchState={renderSearchState} isCurrent={currentSearchState.imageLink == renderSearchState.imageLink}/>
        )}
      </View>

    </ScrollView>
  );
}

export default OtherPrintingsCards;