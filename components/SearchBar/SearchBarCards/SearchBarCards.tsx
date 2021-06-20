import React, { useState } from 'react';
import { TextField } from '@material-ui/core';
import { currentTheme } from '../../../theme/Colours';
import { ActivityIndicator, Alert, Button, View } from 'react-native';
import { searchCall } from '../../../logic/dataManagerCall';

/**
 * Props for the SearchBarCards Component.
 */
interface SearchBarCardsProps {
  searchString: string;
  placeholderText: string;
}

/**
 * Search Bar for Cards Component.
 * Also declares the alert and loading animation that go in hand with the Search Bar.
 * @param props - Search Bar Props to set initial settings
 */
const SearchBarCards = (props : SearchBarCardsProps) => {

  /*Variable Initialisation*/
  let placeholderText : string = props.placeholderText;

  /*Hook Initialisation*/
  const [showLoading, setShowLoading] = useState(false);
  const [searchString, setSearchString] = useState(props.searchString);

  /*Alert Initialisation*/
  const createErrorAlert = () => {
    Alert.alert(
      "ERROR",
      "No Cards matching your criteria could be found! This is likely due to your search parameters being too restrictive. Try having less restrictions.",
      [
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ],
      { cancelable: false }
    );
  }

  /*Rendering*/
  return (
    <View>

      <TextField 
        variant="outlined"
        margin="normal"
        label="Search"
        autoComplete="off"
        placeholder={placeholderText}
        value={searchString} 
        onChange={(event : any) => {setSearchString(event.target.value);}}
        onSubmit={() => {searchCall(searchString, setShowLoading, createErrorAlert);}}
      />

      {/*Search Button*/}
      <Button 
        color={currentTheme.primary.tint}
        title="Perform Search"
        onPress={() => {searchCall(searchString, setShowLoading, createErrorAlert);}}
      />

      {/*Loading Popup*/}
      <ActivityIndicator
        animating={showLoading}
      />

    </View>
  );
}

export default SearchBarCards;