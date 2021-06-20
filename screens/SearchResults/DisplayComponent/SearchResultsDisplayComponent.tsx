import React from 'react';
import { SearchState } from '../../../states/SearchState';
import Overlay from '../../../components/Overlay/Overlay';
import SingleSearchResult from '../DisplayComponent/SupportingComponents/SingleSearchResult';
import {v4 as uuid} from 'uuid';
import { SearchResultsState } from '../DisplayStateManager/SearchResults';
import { CardStyle, CardTextStyle } from '../../../styles/CardStyle';
import { ScrollView, View } from 'react-native';
import { Card, CardHeader } from '@material-ui/core';

interface SearchResultsComponentProps {
  state : SearchResultsState
};

/**
 * Displays the Search Results using the information provided by props.
 * @param props - the information required to display all the search results
 */
const SearchResultsComponent = (props : SearchResultsComponentProps) => {

  /*Variable Initialisation*/
  let searchArray = props.state.currentSearchState;

  /*Hook Initialisation*/
  const cardStyle = CardStyle();
  const cardTextStyle = CardTextStyle();

  return (
    
    <View style={{flex:1}}>
      <ScrollView>

        {/* Displays the Overlay*/}
        <Overlay headerLabel={"Search Results:"}/>

          {/*Header Card*/}
          <Card className={cardStyle.header}>
            <CardHeader title={"Search Complete"} subheader={"Found " + searchArray.length + " Results:"}/>
          </Card>
          
          {/*Displays Each SearchResultCard*/}
          <View>
            {searchArray.map((renderSearchState : SearchState) =>
              <SingleSearchResult key={uuid()} currentSearchState={renderSearchState}/>
            )}
          </View>

      </ScrollView>
    </View>
  );
}

export default SearchResultsComponent;