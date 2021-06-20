import React from 'react';
import { SearchState } from '../../../../states/SearchState';
import { getPrice } from '../../Logic/ResultsDisplayLogic';
import StarCityGames from './StarCityGames';
import { CurrencyInformation } from '../../../../states/CurrencyState';
import '../ResultsDisplay.css';
import { ScrollView } from 'react-native-gesture-handler';
import { Card, CardHeader } from '@material-ui/core';
import { CardStyle } from '../../../../styles/CardStyle';
import { View } from 'react-native';
import { PriceInformation } from '../../../../logic/priceChecker/PriceInterfaces';
import {v4 as uuid} from 'uuid';

interface  PricingCardsProps {
  search : SearchState //The SearchState to get the general information about the card
  currentCurrency : string //The current currency being used for the setting
  currencyMapping : CurrencyInformation //The currency conversion information
  pricing : PriceInformation[] //Other Non-Scryfall Prices 
}

/**
 * Displays the OtherPrintings IonCard.
 * @param props - the information for the OtherPrintingsCard to display
 */
const PricingCards = (props : PricingCardsProps) => {

  /*Variable Initialisation*/
  const currentSearchState = props.search;
  const currencyTo = props.currentCurrency;
  const currencyMapping = props.currencyMapping;
  const pricing = props.pricing;

  /*Hook Initialisation*/
  const cardStyle = CardStyle();

  /*Return Display*/
  return (
    <ScrollView>
                
      {/*Card 0: Image Card*/}
      <Card className={cardStyle.image}>
        <img src={currentSearchState.imageOnlyLink} alt={currentSearchState.imageOnlyLink} className={"cardImage"}/>
      </Card>

      {/* Cards 1: Prices and Purchase Link Header*/}
      <Card className={cardStyle.header}>
        <CardHeader title={"Prices for:"} subheader={currentSearchState.cardName}/>
      </Card>

      {/* Cards 2:  Scryfall Pricing*/}
      <Card className={cardStyle.normal}>
        <CardHeader title={"ScryFall Prices:"}/>
        <View>
          {getPrice("Scryfall", "USD", currencyTo, currencyMapping, currentSearchState.prices.scryFallPricing_nonfoil, false, false, currentSearchState.misc)}
          {getPrice("Scryfall", "USD", currencyTo, currencyMapping, currentSearchState.prices.scryFallPricing_foil,     true, false, currentSearchState.misc)}
        </View>
      </Card>

      {/* Cards 3:  TCGPlayer Pricing*/}
      <Card className={cardStyle.normal}>
        <CardHeader title={"TCGPlayer Prices:"}/>
        <View>
          {
            <View>
            {[...pricing].map((price : PriceInformation) =>
              ('TCGPlayer'.localeCompare(price.provider) === 0 ) 
              ?
                <View key={uuid()}>
                  {getPrice(price.label, "USD", currencyTo, currencyMapping, (price.value !== null) ? price.value.toString() : "Price not Available", 
                    ('Foil'.localeCompare(price.type) === 0), false, currentSearchState.misc)}
                </View>
              : 
                <View/>                     
            )}
          </View>  
            
          }
        </View>
      </Card>
      
      {/* Cards 4:  Prices and Purchase Link Header*/}
      <Card className={cardStyle.header}>
        <CardHeader title={"Purchase Links for:"} subheader={currentSearchState.cardName}/>
      </Card>

      {/* Cards 5:  Purchase Links*/}
      <StarCityGames search={currentSearchState}/>
    
    </ScrollView>
  );
}

export default PricingCards;