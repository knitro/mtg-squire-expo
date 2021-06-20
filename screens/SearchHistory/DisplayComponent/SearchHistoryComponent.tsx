import React from 'react';
import Overlay from '../../../components/Overlay/Overlay';
import SingleSearchHistoryResult from './SupportingComponents/SingleSearchHistoryResult';
import {v4 as uuid} from 'uuid';
import { SearchHistoryState } from '../../../states/SearchHistoryState';
import { SearchHistoryPageState } from '../DisplayStateManager/SearchHistory';
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Card, CardHeader } from '@material-ui/core';
import { CardStyle, CardTextStyle } from '../../../styles/CardStyle';

/**
 * Props for the Search History Component
 */
interface SearchHistoryComponentProps {
  state : SearchHistoryPageState
};

/**
 * Displays the Search History using information provided from props.
 * @param props - contains the information to display on the page
 */
const SearchHistoryComponent = (props : SearchHistoryComponentProps) => {

  /*Variable Initialisation*/
  let previousSearches : SearchHistoryState[] = props.state.currentSearchHistoryState;

  /*Hook Initialisation*/
  const cardStyle = CardStyle();

  return (
    
    <View style={{flex:1}}>

      {/* Displays the Header */}
      <Overlay headerLabel="Search History"/>

      <ScrollView>
          
        {/* IonCard 1:  All Printings Header*/}
        <Card className={cardStyle.header}>
          <CardHeader title={"Your Search History:"} subheader={"Showing your last " + previousSearches.length + " Results:"}/>
        </Card>

        <View>
          {[...previousSearches].reverse().map((currentPreviousSearch : SearchHistoryState) =>
            <SingleSearchHistoryResult key={uuid()} currentSearchHistoryState={currentPreviousSearch}/>
          )}
        </View>

      </ScrollView>
      
    </View>
  );
};

export default SearchHistoryComponent;
