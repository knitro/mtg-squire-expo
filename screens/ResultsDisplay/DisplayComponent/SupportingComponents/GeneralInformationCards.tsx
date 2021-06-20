import React from 'react';
import '../ResultsDisplay.css';
import {v4 as uuid} from 'uuid';
import { SearchState } from '../../../../states/SearchState';
import ManaCost from '../../../../components/ManaCost/ManaCost';
import { Card, CardContent, CardHeader, Grid, Typography } from '@material-ui/core';
import { ScrollView } from 'react-native-gesture-handler';
import { View } from 'react-native';
import { CardStyle, CardTextStyle } from '../../../../styles/CardStyle';

/**
 * Props for the GeneralInformation Card.
 */
interface  GeneralInformationCardsProps {
  search : SearchState //The SearchState to get the general information about the card
  additionalRulings : string[] //The additional rulings to display
}

/**
 * Displays the OtherPrintings Card.
 * @param props - the information for the OtherPrintingsCard to display
 */
const GeneralInformationCards = (props : GeneralInformationCardsProps) => {

  /*Variable Initialisation*/
  const currentSearchState = props.search;
  const additionalRulings = props.additionalRulings;

  /*Style Initialisation*/
  const cardStyle = CardStyle();
  const textStyle = CardTextStyle();

  /*Return Display*/
  return (
    <View style={{flex:1}}>
      <ScrollView>
            
        {/* Card 1: Name + Image */}
        <Card className={cardStyle.header}>
          <CardHeader title={currentSearchState.cardName} subheader={currentSearchState.fullType} />
          <CardContent>
            <img src={currentSearchState.imageLink} alt={currentSearchState.imageLink} className={"cardImage"}/>
            <Typography className={textStyle.normal}>{currentSearchState.set.setName}{" ("}{currentSearchState.set.setCode.toUpperCase()}{")"}</Typography>
          </CardContent>
        </Card>

        {/* Card 2:  Mana Cost*/}
        <Card>
          <CardHeader title={"Mana Cost"} className={cardStyle.normal}/>
          <Grid>
            <ManaCost cost={currentSearchState.manaCost}/>
          </Grid>
          <CardContent></CardContent> {/*Added for Margin at the Bottom*/}
        </Card>

        {/* Card 3:  Oracle Text*/}
        <Card>
          <CardHeader title={"Oracle Text"} className={cardStyle.normal}/>
          <View>
            {currentSearchState.oracleText.split("\n").map((currentItem: string) => 
              <CardContent key={uuid()}>
                <Typography variant="body2">{currentItem}</Typography>
              </CardContent>
            )}
          </View>
        </Card>

        {/* Card 4:  Additional Rulings*/}
        <Card>
          <CardHeader title={"Additional Rulings"} className={cardStyle.normal}/>
          <View>
              {additionalRulings.map((currentItem: string) => 
                <CardContent key={uuid()}>
                  <Typography variant="body2">{currentItem}</Typography>
                </CardContent>
              )}
          </View>
        </Card>

      </ScrollView>
    </View>
  );
}

export default GeneralInformationCards;