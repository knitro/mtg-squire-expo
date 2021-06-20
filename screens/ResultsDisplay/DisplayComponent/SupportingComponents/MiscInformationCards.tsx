import React from 'react';
import { SearchState } from '../../../../states/SearchState';
import { capitaliseFirstLetter, convertBooleanToString } from '../../../../logic/stringHelper';
import '../ResultsDisplay.css';
import { Card, CardContent, CardHeader, Typography } from '@material-ui/core';
import { ScrollView } from 'react-native';
import { CardStyle, CardTextStyle } from '../../../../styles/CardStyle';

/**
 * Props for the Misc Information Card
 */
interface MiscInformationCardsProps {
  search : SearchState //The SearchState to get the general information about the card
}

/**
 * Displays the OtherPrintings Card.
 * @param props - the information for the OtherPrintingsCard to display
 */
const MiscInformationCards = (props : MiscInformationCardsProps) => {

  /*Variable Initialisation*/
  const currentSearchState = props.search;
  const miscInformation = currentSearchState.misc;

  /*Hook Initialisation*/
  const cardStyle = CardStyle();
  const cardTextStyle = CardTextStyle();

  /*Return Display*/
  return (
    <ScrollView>
              
      {/*Card 0: Image Card*/}
      <Card className={cardStyle.image}>
        <img src={currentSearchState.imageOnlyLink} alt={currentSearchState.imageOnlyLink} className={"cardImage"}/>
      </Card>

      {/* Cards 1: Misc Information Header*/}
      <Card className={cardStyle.header}>
        <CardHeader title={"Miscellaneous Information for:"} subheader={currentSearchState.cardName}/>
      </Card>

      {/* Card 2:  Misc Information*/}
      <Card>

        <CardHeader title={"Miscellaneous Information"} className={cardStyle.normal}/>
        
        <CardContent>  
          <Typography className={cardTextStyle.label}>{"Released Date: "}</Typography>
          <Typography>{capitaliseFirstLetter(miscInformation.released)}</Typography>
        </CardContent>
        
        <CardContent>  
          <Typography className={cardTextStyle.label}>{"Artist: "}</Typography>
          <Typography>{capitaliseFirstLetter(miscInformation.artist)}</Typography>
        </CardContent>
        
        <CardContent>  
          <Typography className={cardTextStyle.label}>{"Rarity: "}</Typography>
          <Typography>{capitaliseFirstLetter(miscInformation.rarity)}</Typography>
        </CardContent>

        <CardContent>  
          <Typography className={cardTextStyle.label}>{"Collector Number: "}</Typography>
          <Typography>{capitaliseFirstLetter(miscInformation.collector_number)}</Typography>
        </CardContent>

        <CardContent>  
          <Typography className={cardTextStyle.label}>{"Exists Non-Foil Version: "}</Typography>
          <Typography>{convertBooleanToString(miscInformation.nonfoil)}</Typography>
        </CardContent>

        <CardContent>  
          <Typography className={cardTextStyle.label}>{"Exists Foil Version: "}</Typography>
          <Typography>{convertBooleanToString(miscInformation.foil)}</Typography>
        </CardContent>

        <CardContent>  
          <Typography className={cardTextStyle.label}>{"Is a Promo Variant: "}</Typography>
          <Typography>{convertBooleanToString(miscInformation.promo)}</Typography>
        </CardContent>

        <CardContent>  
          <Typography className={cardTextStyle.label}>{"Is it a Reprint?: "} </Typography>
          <Typography>{capitaliseFirstLetter(miscInformation.rarity)}</Typography>
        </CardContent>

        <CardContent>  
          <Typography className={cardTextStyle.label}>{"Frame Version: "}</Typography>
          <Typography>{capitaliseFirstLetter(miscInformation.frame)}</Typography>
        </CardContent>

        <CardContent>  
          <Typography className={cardTextStyle.label}>{"On the Reserve List?: "}</Typography>
          <Typography>{convertBooleanToString(miscInformation.reserved)}</Typography>
        </CardContent>

      </Card>
    </ScrollView>
  );
}

export default MiscInformationCards;