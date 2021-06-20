import React from 'react';
import './ResultsDisplay.css';
import { ResultsDisplayState } from '../DisplayStateManager/ResultsDisplay';
import OtherPrintingsCards from './SupportingComponents/OtherPrintingCards';
import GeneralInformationCards from './SupportingComponents/GeneralInformationCards';
import PricingCards from './SupportingComponents/PricingCards';
import MiscInformationCards from './SupportingComponents/MiscInformationCards';
import LegalityCards from './SupportingComponents/LegalitiesCards';
import SwipeableViews from 'react-swipeable-views';
import { View } from 'react-native';
import { AppBar, Box, Fab, Tab, Tabs } from '@material-ui/core';
import Overlay from '../../../components/Overlay/Overlay';
import AddIcon from '../../../components/Icons/AddIcon';
import { Actions } from 'react-native-router-flux';
import { FirebaseContext } from '../../../Firebase';
import AddToWishlistFab from './SupportingComponents/AddToWishlistFab';

/**
 * Props for the ResultsDisplayComponent.
 */
export interface ResultsDisplayComponentProps {
  state : ResultsDisplayState
};

/**
 * Displays the ResultsDisplay.
 * @param props - the interface of values that is to be displayed by the ResultsDisplayComponent
 */
const ResultsDisplayComponent = (props : ResultsDisplayComponentProps) => {

  /*Variable Initialisation*/
  //Props
  const currentSearchState = props.state.currentSearchState;
  const legalitiesFormatted = props.state.legalitiesFormatted;
  const additionalRulings = props.state.additionalRulings;
  const currencyTo = props.state.currentCurrency;
  const currencyMapping = props.state.currencyMapping;
  const pricing = props.state.pricing;

  /*Hook Initialisation*/
  const [index, setIndex] = React.useState(1);

  /*SwipeableView Index Functions*/
  const handleChange = (event: React.ChangeEvent<{}>, newIndex: number) => {
    setIndex(newIndex);
  };

  const handleChangeIndex = (index: number) => {
    setIndex(index);
  };

  /*Display*/ 
  return (
    
    <View style={{flex:1}}>
      
      {/*Displays the Overlay*/}
      <Overlay headerLabel="Quick Search" />

      {/*Display the Results Content*/}
      <View style={{flex:1}}>
        <AppBar position="sticky" color="default">
          <Tabs
            value={index}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="scrollable"
            scrollButtons="auto"
          >
            <Tab label="Other Printings" />
            <Tab label="General" />
            <Tab label="Prices"/>
            <Tab label="Legalities" />
            <Tab label="Miscellaneous"/>
          </Tabs>
        </AppBar>
        <SwipeableViews
          index={index}
          onChangeIndex={handleChangeIndex}
          animateHeight
          disableLazyLoading
        >
          {/* IonSlide 1: Other Printings */}
          <Box style={{flex:1}}>
            <OtherPrintingsCards search={currentSearchState}/>
          </Box>

          {/*Ion Slide 2: General Card Information*/}
          <Box>
            <GeneralInformationCards search={currentSearchState} additionalRulings={additionalRulings}/>
          </Box>

          {/* IonSlide 3: Pricing */}
          <Box>
            <PricingCards search={currentSearchState} currentCurrency={currencyTo} currencyMapping={currencyMapping} pricing={pricing}/>
          </Box>

          {/* IonSlide 4: Legalities */}
          <Box>
            <LegalityCards search={currentSearchState} legalities={legalitiesFormatted} />
          </Box>

          {/* IonSlide 5: Misc Information */}
          <Box>
          <MiscInformationCards search={currentSearchState} />
          </Box>
          
        </SwipeableViews>

      </View>

      {/*Create the Add to Wishlist Button*/}
      <FirebaseContext.Consumer>
        {firebase => <AddToWishlistFab firebase={firebase} search={currentSearchState}/>}
      </FirebaseContext.Consumer>
    </View>
  );

}

export default ResultsDisplayComponent;