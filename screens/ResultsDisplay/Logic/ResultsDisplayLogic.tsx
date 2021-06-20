import React from 'react';
import { MiscInformation } from "../../../states/SearchState";
import { CurrencyInformation } from '../../../states/CurrencyState';
import { getConvertedValue } from '../../../logic/currencyConvert';
import { CardContent, Typography } from '@material-ui/core';
import { View } from 'react-native';

/**
 * Creates an "HTML" or React Component containing the card's price.
 * @param source - the Label of the source of the price
 * @param currencyFrom 
 * @param currencyTo 
 * @param currencyMapping 
 * @param price - the price of the card
 * @param isFoil - boolean whether the card's price is for a foil card 
 * @param isOnline - boolean whether the card's price is for an online card 
 * @param miscInfo - the MiscInformation of the unique card.
 */
export function getPrice(source : string, currencyFrom : string, currencyTo : string, currencyMapping : CurrencyInformation, 
    price : string, isFoil : boolean, isOnline : boolean, miscInfo: MiscInformation) {

  /*Check if the Card actually exists or not*/
  if ( (isFoil && (miscInfo.foil === true)) || (!isFoil && (miscInfo.nonfoil === true)) ) {
    if ((isOnline && (miscInfo.digital_only === true)) || (!isOnline && (miscInfo.digital_only === false))) {

      //At this point, the card exists.
      //Check if the Price Exists:
      if ("".localeCompare(price) !== 0) {

        //Convert the Price:
        const sourcePrice : number = Number(price);
        const convertedPrice : number = getConvertedValue(sourcePrice, currencyFrom, currencyTo, currencyMapping);
        const displayString : string = (Math.round(convertedPrice * 100) / 100).toFixed(2);

        //Check for Valid Converted Price 
        if (convertedPrice !== -1) {
          return (
            <CardContent>
              <Typography align='justify' style={{fontWeight:'bold'}}>{source + " " + ((isFoil) ? ("Foil") : ("Non Foil")) + ": "}</Typography>
              <Typography align='left'>{displayString}{" " + currencyTo}</Typography>
            </CardContent>
          )
        }
      }

      //Returns with Price not Available if price does not exist, or price conversion failed
      return (
        <CardContent>
          {source + " " + ((isFoil) ? ("Foil") : ("Non Foil")) + ": Price Not Available"}
        </CardContent>
      );

    }
  }
  
  /*Fail Return, display nothing*/
  return (
    <View></View>
  );
}