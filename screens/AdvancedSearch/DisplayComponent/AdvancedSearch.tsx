import React, { useState } from 'react';
import Overlay from '../../../components/Overlay/Overlay';
import { AdvancedSearchTerms } from '../../../dataManagers/DataMangerInterfaces';
import { currentTheme } from '../../../theme/Colours';
import { View, ScrollView, Button, Alert, ActivityIndicator } from 'react-native';
import { CardStyle, CardTextStyle } from '../../../styles/CardStyle';
import { Card, CardHeader, Checkbox, CardContent, Grid, Input, Typography } from '@material-ui/core';
import '../../../styles/Style.css';
import { advancedSearchCall } from '../../../logic/dataManagerCall';

/**
 * Displays the Advanced Search Page.
 */
const AdvancedSearch: React.FC = () => {

  /*Hook Initialisation*/
  //String Related Hooks
  const [mainSearchTerm,  setMainSearchTerm]  = useState<string>("");
  const [cardTypesValue,  setCardTypesValue]  = useState<string>("");
  const [cardTextValue,   setCardTextValue]   = useState<string>("");

  //Colour Inclusion Hooks
  const [includeWhite,    setIncludeWhite]    = useState(false);
  const [includeBlue,     setIncludeBlue]     = useState(false);
  const [includeBlack,    setIncludeBlack]    = useState(false);
  const [includeRed,      setIncludeRed]      = useState(false);
  const [includeGreen,    setIncludeGreen]    = useState(false);
  const [includeColourless, setIncludeColourless] = useState(false);

  //Colour Exclusion Hooks
  const [excludeWhite,  setExcludeWhite]  = useState(false);
  const [excludeBlue,   setExcludeBlue]   = useState(false);
  const [excludeBlack,  setExcludeBlack]  = useState(false);
  const [excludeRed,    setExcludeRed]    = useState(false);
  const [excludeGreen,  setExcludeGreen]  = useState(false);

  //Loading Hook
  const [showLoading,   setShowLoading]   = useState(false);

  /*Style Initialisation*/
  const cardStyle = CardStyle();

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

  /*Search Button Function*/
  function searchButtonFunction() : void {

    /*Variable Initialisation*/
    let coloursInclude  : string[] = [];
    let coloursExclude  : string[] = [];
    let cardTypes       : string[] = [];
    let cardText        : string[] = [];

    //coloursInclude Initialisation
    if (includeWhite)       {coloursInclude.push("w");}
    if (includeBlue)        {coloursInclude.push("u");}
    if (includeBlack)       {coloursInclude.push("b");}
    if (includeRed)         {coloursInclude.push("r");}
    if (includeGreen)       {coloursInclude.push("g");}
    if (includeColourless)  {coloursInclude.push("c");}

    //coloursExclude Initialisation
    if (excludeWhite)       {coloursExclude.push("w");}
    if (excludeBlue)        {coloursExclude.push("u");}
    if (excludeBlack)       {coloursExclude.push("b");}
    if (excludeRed)         {coloursExclude.push("r");}
    if (excludeGreen)       {coloursExclude.push("g");}
    
    //cardTypes Initialisation
    if ("".localeCompare(cardTypesValue) !== 0) {
      cardTypesValue.split(" ").map((cardType) => {
        return cardTypes.push(cardType);
      });
    }

    //cardText Initialisation
    if ("".localeCompare(cardTextValue) !== 0) {
      cardTextValue.split(" ").map((currentCardText) => {
        return cardText.push(currentCardText);
      });
    }
    
    /*Collate the Initialised Information and Create the Search Term*/
    let searchTerms : AdvancedSearchTerms = {
      mainSearch:     mainSearchTerm,
      coloursInclude: coloursInclude,
      coloursExclude: coloursExclude,
      cardTypes:      cardTypes,
      cardText:       cardText
    }

    advancedSearchCall(searchTerms, setShowLoading, createErrorAlert);
  }

  /*Return*/
  return (

    <View style={{flex:1}}>

      {/* Displays the Overlay */}
      <Overlay headerLabel="Advanced Search"/>

      {/* Displays the Content of the Page*/}
      <ScrollView>
            
        {/*Main Search Terms*/}
        <Card className={cardStyle.normal}>
          <CardHeader title={"Main Search Terms"} subheader={"Put Card Names Here"}/>
          <CardContent>
            <Input
              autoComplete="off"
              placeholder={"Add Search Terms Here"}
              fullWidth={true}
              value={mainSearchTerm} 
              onChange={(event) => {setMainSearchTerm(event.target.value);} 
              }
            />
          </CardContent>
        </Card>
          

        {/*Colour Inclusions*/}
        <Card className={cardStyle.normal}>
          <CardHeader title={"Colours"} subheader={"To Include"}/>
          <CardContent>
            <Grid
              container
              direction="column"
              justify="flex-start"
              alignItems="flex-start"
            >
              <Grid
                container
                direction="row"
                justify="space-around"
                alignItems="center"
              >
                <Grid>
                  <Typography>{"White"}</Typography>
                  <Checkbox checked={includeWhite} onChange={(event) => setIncludeWhite(event.target.checked)}/>
                </Grid>
                <Grid>
                  <Typography>{"Blue"}</Typography>
                  <Checkbox checked={includeBlue} onChange={(event) => setIncludeBlue(event.target.checked)}/>
                </Grid>
                <Grid>
                  <Typography>{"Black"}</Typography>
                  <Checkbox checked={includeBlack} onChange={(event) => setIncludeBlack(event.target.checked)}/>
                </Grid>
                <Grid>
                  <Typography>{"Red"}</Typography>
                  <Checkbox checked={includeRed} onChange={(event) => setIncludeRed(event.target.checked)}/>
                </Grid>
                <Grid>
                  <Typography>{"Green"}</Typography>
                  <Checkbox checked={includeGreen} onChange={(event) => setIncludeGreen(event.target.checked)}/>
                </Grid>
                <Grid>
                  <Typography>{"Colourless"}</Typography>
                  <Checkbox checked={includeColourless} onChange={(event) => setIncludeColourless(event.target.checked)}/>
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/*Colour Exclusions*/}
        <Card className={cardStyle.normal}>
          <CardHeader title={"Colours"} subheader={"To Exclude"}/>
          <CardContent>
            <Grid
              container
              direction="column"
              justify="flex-start"
              alignItems="flex-start"
            >
              <Grid
                container
                direction="row"
                justify="space-around"
                alignItems="center"
              >
                <Grid>
                  <Typography>{"White"}</Typography>
                  <Checkbox checked={excludeWhite} onChange={(event) => setExcludeWhite(event.target.checked)}/>
                </Grid>
                <Grid>
                  <Typography>{"Blue"}</Typography>
                  <Checkbox checked={excludeBlue} onChange={(event) => setExcludeBlue(event.target.checked)}/>
                </Grid>
                <Grid>
                  <Typography>{"Black"}</Typography>
                  <Checkbox checked={excludeBlack} onChange={(event) => setExcludeBlack(event.target.checked)}/>
                </Grid>
                <Grid>
                  <Typography>{"Red"}</Typography>
                  <Checkbox checked={excludeRed} onChange={(event) => setExcludeRed(event.target.checked)}/>
                </Grid>
                <Grid>
                  <Typography>{"Green"}</Typography>
                  <Checkbox checked={excludeGreen} onChange={(event) => setExcludeGreen(event.target.checked)}/>
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        
        {/*Card Types*/}
        <Card className={cardStyle.normal}>
          <CardHeader title={"Card Types"} subheader={"Leave a space between each card type"}/>
          <CardContent>
            <Input
              autoComplete="off"
              placeholder={"Add Card Types Here"}
              fullWidth={true}
              value={cardTypesValue} 
              onChange={(event) => {setCardTypesValue(event.target.value);} 
              }
            />
          </CardContent>
        </Card>

        {/*Card Text*/}
        <Card className={cardStyle.normal}>
          <CardHeader title={"Card Text"} subheader={"Put the text that would appear in the card's text box"}/>
          <CardContent>
            <Input
              autoComplete="off"
              placeholder={"Add Card Text Here"}
              fullWidth={true}
              value={cardTextValue} 
              onChange={(event) => {setCardTextValue(event.target.value);} 
              }
            />
          </CardContent>
        </Card>

        {/*Search Button*/}
        <Button 
          color={currentTheme.primary.shade}
          title="Perform Search"
          onPress={() => searchButtonFunction()}
        />
        
        {/*Loading Popup*/}
        <ActivityIndicator
          animating={showLoading}
        />

      </ScrollView>
    </View>
  );
};

export default AdvancedSearch;
